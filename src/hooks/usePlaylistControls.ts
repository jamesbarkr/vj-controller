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
  preParty: () => void;
  postParty: () => void;
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
    setViz(orderedVizList[0]);
    setCityState(CityState.ENTRY_WORMHOLE);
  }, [setViz, setCityState]);

  const throttledPlayFromStart = useThrottle(playFromStart, 2000);

  const toggleBlackout = useCallback(() => {
    setHideVisuals(!hideVisuals);
  }, [setHideVisuals, hideVisuals]);

  const throttledToggleBlackout = useThrottle(toggleBlackout, 2000);

  const preParty = useCallback(() => {
    setViz(Visualization.TILES);
  }, [setViz]);

  const throttledPreParty = useThrottle(preParty, 2000);

  const postParty = useCallback(() => {
    setViz(Visualization.DVD_BOUNCE);
  }, [setViz]);

  const throttledPostParty = useThrottle(postParty, 2000);

  return {
    nextViz: throttledNextTransitionState,
    restart: throttledPlayFromStart,
    toggleBlackout: throttledToggleBlackout,
    preParty: throttledPreParty,
    postParty: throttledPostParty,
  };
};
