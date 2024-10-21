import { ReactNode } from "react";
import Cube from "../components/Cube";
import FirstScene from "../components/FirstScene";

export const LOCAL_VIZ_KEY = "VJ-Controller__visualization";
export const LOCAL_SCALE_KEY = "VJ-Controller__scale";

export enum Visualization {
  CUBE = "cube",
  FIRST_SCENE = "firstScene",
}

export const VisualizationMap: Record<string, ReactNode> = {
  [Visualization.CUBE]: <Cube />,
  [Visualization.FIRST_SCENE]: <FirstScene />,
};
