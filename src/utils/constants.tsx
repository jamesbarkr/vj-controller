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

export type VisualizationDefinition = {
  vizualization: Visualization;
  useThree?: boolean;
};

export const VisualizationMap: Record<string, ReactNode> = {
  [Visualization.CUBE]: <Cube />,
  [Visualization.SPINNING_CUBE]: <SpinningCube />,
  [Visualization.ASPEN_PLAYGROUND]: <AspenPlaygroundScene />,
  [Visualization.LASERS]: <LaserScene />,
  [Visualization.MUON_SPIN]: <MuonLogoSpinScene />,
};
