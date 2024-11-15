import { Vector3 } from "three";

export enum BowlingColor {
  NEON_YELLOW = "#ffff34",
  CYAN = "#00ffff",
  MAGENTA = "#ff34ff",
  NEON_GREEN = "#34ff34",
  ORANGE = "#ff832c",
  DARK_BLUE = "#3e08e3",
}

export type BowlingShape = {
  position: Vector3;
  color: BowlingColor;
  scale?: number;
};

export type BowlingShapeProps = {
  duration: number;
  shapes: BowlingShape[];
};
