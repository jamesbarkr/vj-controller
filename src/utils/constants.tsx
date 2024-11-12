import { ReactNode } from "react";
import AspenPlaygroundScene from "../components/three/scenes/AspenPlaygroundScene";
import LaserScene from "../components/three/scenes/LaserScene";
import MuonLogoSpinScene from "../components/three/scenes/MuonLogoSpinScene";
import Cube from "../components/three/scenes/Cube";
import SpinningCube from "../components/three/scenes/SpinningCube";
import MuonDvdBounceScene from "../components/pixi/scenes/MuonDvdBounceScene";
import MuonTiledScene from "../components/pixi/scenes/MuonTiledScene";

export const LOCAL_VIZ_KEY = "VJ-Controller__visualization";
export const LOCAL_SCALE_KEY = "VJ-Controller__scale";
export const LOCAL_CAMERA_CONTROLS_KEY = "VJ-Controller__camera_controls";

export enum Visualization {
  CUBE = "cube",
  SPINNING_CUBE = "spinningCube",
  ASPEN_PLAYGROUND = "aspenPlayground",
  LASERS = "lasers",
  MUON_SPIN = "muonSpin",
  DVD_BOUNCE = "dvdBounce",
  TILES = "tiles",
}

export enum CameraType {
  PERSPECTIVE = "perspective",
  ORTHOGRAPHIC = "orthographic",
}

export enum FrameworkType {
  THREE = "three",
  PIXI = "pixi",
}

export type VisualizationDefinition = {
  visualization: ReactNode;
  cameraType?: CameraType;
  cameraZoom?: number;
  frameworkType?: FrameworkType;
};

export const VisualizationMap: Record<Visualization, VisualizationDefinition> =
  {
    [Visualization.CUBE]: { visualization: <Cube /> },
    [Visualization.SPINNING_CUBE]: { visualization: <SpinningCube /> },
    [Visualization.ASPEN_PLAYGROUND]: {
      visualization: <AspenPlaygroundScene />,
    },
    [Visualization.LASERS]: { visualization: <LaserScene /> },
    [Visualization.MUON_SPIN]: {
      visualization: <MuonLogoSpinScene />,
      cameraType: CameraType.ORTHOGRAPHIC,
      cameraZoom: 7,
    },
    [Visualization.DVD_BOUNCE]: {
      visualization: <MuonDvdBounceScene />,
      frameworkType: FrameworkType.PIXI,
    },
    [Visualization.TILES]: {
      visualization: <MuonTiledScene />,
      frameworkType: FrameworkType.PIXI,
    },
  };
