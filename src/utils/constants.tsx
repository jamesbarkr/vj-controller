import { ReactNode } from "react";
import AspenPlaygroundScene from "../components/three/scenes/AspenPlaygroundScene";
import LaserScene from "../components/three/scenes/LaserScene";
import MuonLogoSpinScene from "../components/three/scenes/MuonLogoSpinScene";
import Cube from "../components/three/scenes/Cube";
import SpinningCube from "../components/three/scenes/SpinningCube";
import MuonDvdBounceScene from "../components/pixi/scenes/MuonDvdBounceScene";
import MuonTiledScene from "../components/pixi/scenes/MuonTiledScene";
import BowlingCarpetScene from "../components/three/scenes/BowlingCarpetScene/BowlingCarpetScene";
import SanFranScenesco from "../components/three/scenes/SanFranScenesco";
import SpikyBallScene from "../components/three/scenes/SpikyBallScene";
import RandomLinesScene from "../components/three/scenes/RandomLinesScene";
import SpeakersScene from "../components/three/scenes/SpeakersScene";

export const LOCAL_VIZ_KEY = "VJ-Controller__visualization";
export const LOCAL_SCALE_KEY = "VJ-Controller__scale";
export const LOCAL_CAMERA_CONTROLS_KEY = "VJ-Controller__camera_controls";
export const LOCAL_CITY_STATE_KEY = "VJ-Controller__city_state_key";
export const LOCAL_HIDE_VISUALS_KEY = "VJ-Controller__hide_visuals_key";

export enum Visualization {
  CUBE = "cube",
  SPINNING_CUBE = "spinningCube",
  ASPEN_PLAYGROUND = "aspenPlayground",
  LASERS = "lasers",
  MUON_SPIN = "muonSpin",
  DVD_BOUNCE = "dvdBounce",
  TILES = "tiles",
  BOWLING_CARPET = "bowlingCarpet",
  CITY = "city",
  BLACKOUT = "blackout",
  SPIKY_BALL = "spikyBall",
  LINES = "randomLines",
  SPEAKERS = "speakers",
}

export enum FrameworkType {
  THREE = "three",
  PIXI = "pixi",
}

export type VisualizationDefinition = {
  visualization: ReactNode;
  frameworkType: FrameworkType;
};

export const VisualizationMap: Record<Visualization, VisualizationDefinition> =
  {
    [Visualization.CUBE]: {
      visualization: <Cube />,
      frameworkType: FrameworkType.THREE,
    },
    [Visualization.SPINNING_CUBE]: {
      visualization: <SpinningCube />,
      frameworkType: FrameworkType.THREE,
    },
    [Visualization.ASPEN_PLAYGROUND]: {
      visualization: <AspenPlaygroundScene />,
      frameworkType: FrameworkType.THREE,
    },
    [Visualization.LASERS]: {
      visualization: <LaserScene />,
      frameworkType: FrameworkType.THREE,
    },
    [Visualization.MUON_SPIN]: {
      visualization: <MuonLogoSpinScene />,
      frameworkType: FrameworkType.THREE,
    },
    [Visualization.DVD_BOUNCE]: {
      visualization: <MuonDvdBounceScene />,
      frameworkType: FrameworkType.PIXI,
    },
    [Visualization.TILES]: {
      visualization: <MuonTiledScene />,
      frameworkType: FrameworkType.PIXI,
    },
    [Visualization.BOWLING_CARPET]: {
      visualization: <BowlingCarpetScene />,
      frameworkType: FrameworkType.THREE,
    },
    [Visualization.CITY]: {
      visualization: <SanFranScenesco />,
      frameworkType: FrameworkType.THREE,
    },
    [Visualization.BLACKOUT]: {
      visualization: <mesh></mesh>,
      frameworkType: FrameworkType.THREE,
    },
    [Visualization.SPIKY_BALL]: {
      visualization: <SpikyBallScene />,
      frameworkType: FrameworkType.THREE,
    },
    [Visualization.LINES]: {
      visualization: <RandomLinesScene />,
      frameworkType: FrameworkType.THREE,
    },
    [Visualization.SPEAKERS]: {
      visualization: <SpeakersScene />,
      frameworkType: FrameworkType.THREE,
    },
  };

export const orderedVizList: Visualization[] = [
  Visualization.BLACKOUT,
  Visualization.MUON_SPIN,
  Visualization.SPIKY_BALL,
  Visualization.LINES,
  Visualization.BOWLING_CARPET,
  Visualization.BLACKOUT,
  Visualization.CITY,
  Visualization.SPEAKERS,
];

export enum CityState {
  ENTRY_WORMHOLE = "entryWormhole",
  CITY = "city",
  EXIT_WORMHOLE = "exitWormhole",
}

export const transitionDuration = 1;
