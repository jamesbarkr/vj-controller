import { Vector3 } from "three";

export enum BowlingColor {
  NEON_YELLOW = "#1122ff",
  CYAN = "#00aaaa",
  MAGENTA = "#dd34dd",
  NEON_GREEN = "#9669ff",
  ORANGE = "#008bff",
  DARK_BLUE = "#5a25ff",
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
