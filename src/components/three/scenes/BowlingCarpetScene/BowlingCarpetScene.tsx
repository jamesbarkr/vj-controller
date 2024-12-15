import { Vector3 } from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { BowlingShape, BowlingColor } from "../../../../utils/bowlingCarpet";
import BowlingCarpetCapsules from "./BowlingCarpetShapes/BowlingCarpetCapsules";
import BowlingCarpetCircles from "./BowlingCarpetShapes/BowlingCarpetCircles";
import BowlingCarpetSpheres from "./BowlingCarpetShapes/BowlingCarpetSpheres";
import BowlingCarpetSprings from "./BowlingCarpetShapes/BowlingCarpetSprings";
import BowlingCarpetSquares from "./BowlingCarpetShapes/BowlingCarpetSquares";
import BowlingCarpetSquiggles from "./BowlingCarpetShapes/BowlingCarpetSquiggles";
import BowlingCarpetTriangles from "./BowlingCarpetShapes/BowlingCarpetTriangles";

const duration: number = 5;

const SquiggleShapes: BowlingShape[] = [
  { position: new Vector3(7, 5, 0), color: BowlingColor.CYAN },
  { position: new Vector3(-5, 4, 0), color: BowlingColor.NEON_GREEN },
  { position: new Vector3(1, -3, 0), color: BowlingColor.ORANGE },
  { position: new Vector3(-10, -6, 0), color: BowlingColor.MAGENTA },
];

const CircleShapes: BowlingShape[] = [
  { position: new Vector3(-1, 6, 0), color: BowlingColor.MAGENTA },
  { position: new Vector3(6, 0, 0), color: BowlingColor.NEON_GREEN },
  { position: new Vector3(-6, -4, 0), color: BowlingColor.DARK_BLUE },
];

const SquareShapes: BowlingShape[] = [
  { position: new Vector3(-10, 6, 0), color: BowlingColor.DARK_BLUE },
  { position: new Vector3(-3, -5, 0), color: BowlingColor.NEON_GREEN },
];

const SphereShapes: BowlingShape[] = [
  { position: new Vector3(6, 6, 0), color: BowlingColor.NEON_YELLOW },
];

const TriangleShapes: BowlingShape[] = [
  { position: new Vector3(-12, 3, 0), scale: 1, color: BowlingColor.ORANGE },
  { position: new Vector3(9, 2, 0), scale: 1, color: BowlingColor.MAGENTA },
  { position: new Vector3(3, 5, 0), scale: 1, color: BowlingColor.DARK_BLUE },
];

const CapsuleShapes: BowlingShape[] = [
  { position: new Vector3(-9, 0, 0), color: BowlingColor.NEON_YELLOW },
];

const SpringShapes: BowlingShape[] = [
  { position: new Vector3(-8, -1, 0), color: BowlingColor.CYAN },
  { position: new Vector3(0, 2, 0), color: BowlingColor.NEON_YELLOW },
  { position: new Vector3(10, -4, 0), color: BowlingColor.DARK_BLUE },
];

const BowlingCarpetScene = () => {
  return (
    <>
      <mesh position-z={-5}>
        <BowlingCarpetSquiggles duration={duration} shapes={SquiggleShapes} />
        <BowlingCarpetCircles duration={duration} shapes={CircleShapes} />
        <BowlingCarpetSpheres duration={duration} shapes={SphereShapes} />
        <BowlingCarpetTriangles duration={duration} shapes={TriangleShapes} />
        <BowlingCarpetSquares duration={duration} shapes={SquareShapes} />
        <BowlingCarpetCapsules duration={duration} shapes={CapsuleShapes} />
        <BowlingCarpetSprings duration={duration} shapes={SpringShapes} />
      </mesh>
      <ambientLight intensity={2} color="white" />
      <spotLight color="white" position={[0, 0, 5]} intensity={100} />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0} intensity={8} />
      </EffectComposer>
    </>
  );
};

export default BowlingCarpetScene;
