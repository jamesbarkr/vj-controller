import { ReactNode } from "react";
import Cube from "../components/Cube";
import SpinningCube from "../components/SpinningCube";
import AspenPlaygroundScene from "../components/scenes/AspenPlaygroundScene";
import LaserScene from "../components/scenes/LaserScene";
import MuonLogoSpinScene from "../components/scenes/MuonLogoSpinScene";

export const LOCAL_VIZ_KEY = "VJ-Controller__visualization";
export const LOCAL_SCALE_KEY = "VJ-Controller__scale";
export const LOCAL_CAMERA_CONTROLS_KEY = "VJ-Controller__camera_controls";

export enum Visualization {
  CUBE = "cube",
  SPINNING_CUBE = "spinningCube",
  ASPEN_PLAYGROUND = "aspenPlayground",
  LASERS = "lasers",
  MUON_SPIN = "muonSpin",
}

export enum CameraType {
  PERSPECTIVE = "perspective",
  ORTHOGRAPHIC = "orthographic",
}

export enum RendererType {
  THREE = "three",
  PIXI = "pixi",
}

export type VisualizationDefinition = {
  visualization: ReactNode;
  cameraType?: CameraType;
  cameraZoom?: number;
  rendererType?: RendererType;
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
  };
