import { useLocalStorage } from "@mantine/hooks";
import {
  Visualization,
  LOCAL_VIZ_KEY,
  CityState,
  LOCAL_CITY_STATE_KEY,
  LOCAL_HIDE_VISUALS_KEY,
  orderedVizList,
} from "../utils/constants";
import { getNextTransitionState } from "../utils/transitions";
import _ from "lodash";

export type PlaylistControls = {
  nextViz: () => void;
  restart: () => void;
  toggleBlackout: () => void;
};

export const usePlaylistControls = (): PlaylistControls => {
  const [viz, setViz] = useLocalStorage<Visualization>({
    key: LOCAL_VIZ_KEY,
    defaultValue: Visualization.CUBE,
  });
  const [cityState, setCityState] = useLocalStorage<CityState>({
    key: LOCAL_CITY_STATE_KEY,
    defaultValue: CityState.ENTRY_WORMHOLE,
  });
  const [hideVisuals, setHideVisuals] = useLocalStorage({
    key: LOCAL_HIDE_VISUALS_KEY,
    defaultValue: false,
  });

  const setNextTransitionState = () => {
    if (hideVisuals) {
      setHideVisuals(false);
    } else {
      const nextState = getNextTransitionState(viz, cityState);
      setViz(nextState.visualization);
      setCityState(nextState.cityState);
    }
  };

  const playFromStart = () => {
    setViz(orderedVizList[0]);
    setCityState(CityState.ENTRY_WORMHOLE);
  };

  const toggleBlackout = () => {
    setHideVisuals(!hideVisuals);
  };

  return {
    nextViz: _.throttle(setNextTransitionState, 1000, { leading: true }),
    restart: _.throttle(playFromStart, 1000, { leading: true }),
    toggleBlackout: _.throttle(toggleBlackout, 1000, { leading: true }),
  };
};
