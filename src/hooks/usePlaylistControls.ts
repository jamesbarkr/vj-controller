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
import { useCallback } from "react";
import { useThrottle } from "./useThrottle";

export type PlaylistControls = {
  nextViz: () => void;
  restart: () => void;
  toggleBlackout: () => void;
};

export const usePlaylistControls = (): PlaylistControls => {
  const [viz, setViz] = useLocalStorage<Visualization>({
    key: LOCAL_VIZ_KEY,
    defaultValue: Visualization.BLACKOUT,
  });
  const [cityState, setCityState] = useLocalStorage<CityState>({
    key: LOCAL_CITY_STATE_KEY,
    defaultValue: CityState.ENTRY_WORMHOLE,
  });
  const [hideVisuals, setHideVisuals] = useLocalStorage({
    key: LOCAL_HIDE_VISUALS_KEY,
    defaultValue: false,
  });

  const setNextTransitionState = useCallback(() => {
    console.log("next viz");
    if (hideVisuals) {
      setHideVisuals(false);
    } else {
      const nextState = getNextTransitionState(viz, cityState);
      setViz(nextState.visualization);
      setCityState(nextState.cityState);
    }
  }, [cityState, viz, setHideVisuals, setViz, setCityState, hideVisuals]);

  const throttledNextTransitionState = useThrottle(
    setNextTransitionState,
    2000,
  );

  const playFromStart = useCallback(() => {
    console.log("play from start");
    setViz(orderedVizList[0]);
    setCityState(CityState.ENTRY_WORMHOLE);
  }, [setViz, setCityState]);

  const throttledPlayFromStart = useThrottle(playFromStart, 2000);

  const toggleBlackout = useCallback(() => {
    console.log("blackout");
    setHideVisuals(!hideVisuals);
  }, [setHideVisuals, hideVisuals]);

  const throttledToggleBlackout = useThrottle(toggleBlackout, 2000);

  return {
    nextViz: throttledNextTransitionState,
    restart: throttledPlayFromStart,
    toggleBlackout: throttledToggleBlackout,
  };
};
