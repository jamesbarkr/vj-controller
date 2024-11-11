import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { SinCurve } from "../../../utils/SinCurve";
import {
  AnimationSpecs,
  animationSpecsToData,
  interpolateAnimationDataAtTime,
} from "../../../utils/animation";

interface SinCurveProps {
  scale: number;
}

enum RotationAnimationState {
  NONE,
  BACK,
  FORWARD,
}

const animationSpecs: AnimationSpecs = {
  states: {
    [RotationAnimationState.NONE]: [0, 0, 0, 0, 0, 5],
    [RotationAnimationState.BACK]: [
      -Math.PI / 2,
      Math.PI / 4,
      -Math.PI,
      40,
      0,
      -20,
    ],
    [RotationAnimationState.FORWARD]: [
      Math.PI / 2,
      -Math.PI / 4,
      Math.PI,
      -30,
      0,
      -20,
    ],
  },
  initialState: [0, 0, 0, 0, 0, 5],
  orderedAnimations: [
    {
      state: RotationAnimationState.BACK,
      duration: 2,
    },
    {
      state: RotationAnimationState.NONE,
      duration: 2,
    },
    {
      state: RotationAnimationState.FORWARD,
      duration: 2,
    },
    {
      state: RotationAnimationState.NONE,
      duration: 2,
    },
  ],
};

const animationData = animationSpecsToData(animationSpecs);

function SinCurveGeometry({ scale }: SinCurveProps) {
  const tubeRef = useRef<Mesh>(null!);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    console.log(`TIME is ${time}`);
    const values = interpolateAnimationDataAtTime(animationData, time, true);
    tubeRef.current.rotation.x = values[0];
    tubeRef.current.rotation.y = values[1];
    tubeRef.current.rotation.z = values[2];
    tubeRef.current.position.x = values[3];
    tubeRef.current.position.y = values[4];
    tubeRef.current.position.z = values[5];
  });
  return (
    <mesh ref={tubeRef}>
      <tubeGeometry args={[new SinCurve(scale), 64, 1, 8]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default SinCurveGeometry;

