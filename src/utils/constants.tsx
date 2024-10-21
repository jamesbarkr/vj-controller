import { ReactNode } from "react";
import Cube from "../components/Cube";
import SpinningCube from "../components/SpinningCube";

export const LOCAL_VIZ_KEY = "VJ-Controller__visualization";
export const LOCAL_SCALE_KEY = "VJ-Controller__scale";
export const LOCAL_CAMERA_CONTROLS_KEY = "VJ-Controller__camera_controls";

export enum Visualization {
  CUBE = "cube",
  SPINNING_CUBE = "spinningCube",
}

export const VisualizationMap: Record<string, ReactNode> = {
  [Visualization.CUBE]: <Cube />,
  [Visualization.SPINNING_CUBE]: <SpinningCube />,
};
