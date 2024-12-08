import { CityState, orderedVizList, Visualization } from "./constants";

export type TransitionState = {
    visualization: Visualization;
    cityState: CityState
};

export function getNextTransitionState(viz: Visualization, cityState: CityState) : TransitionState {
    const currentIndex = orderedVizList.indexOf(viz);
    const nextIndex = currentIndex + 1 < orderedVizList.length ? currentIndex + 1 : 0
    let nextViz = viz
    let nextCityState = cityState

    if (viz == Visualization.CITY) {
      switch (cityState) {
        case CityState.ENTRY_WORMHOLE:
          nextCityState = CityState.CITY
          break
        case CityState.CITY:
          nextCityState = CityState.EXIT_WORMHOLE
          break
        case CityState.EXIT_WORMHOLE:
          nextViz = orderedVizList[nextIndex]
          nextCityState = CityState.ENTRY_WORMHOLE
      }
    } else {
      nextViz = orderedVizList[nextIndex]
    }

    return { visualization: nextViz, cityState: nextCityState };
  }