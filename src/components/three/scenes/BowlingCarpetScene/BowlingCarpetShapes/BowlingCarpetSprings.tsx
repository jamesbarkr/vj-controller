import { Mesh } from "three";
import { useState, RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BowlingShapeProps } from "../../../../../utils/bowlingCarpet";
import { createRefsArray } from "../../../../../utils/refs";
import { SpiralCurve } from "../../../../../utils/SpiralCurve";

const BowlingCarpetSprings = ({
  duration,
  shapes: springs,
}: BowlingShapeProps) => {
  const [springRefs] = useState<Array<RefObject<Mesh>>>(
    createRefsArray<Mesh>(springs.length),
  );

  useGSAP(() => {
    springRefs.forEach((ref) => {
      gsap.to(ref.current!.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        z: 0,
        duration: duration,
        ease: "none",
        repeat: -1,
      });
    });
  });

  return springs.map(({ position, color }, i) => (
    <mesh
      key={`spring-${i}`}
      ref={springRefs[i]}
      position={position}
      rotation={[0, 0, 0]}
      scale={0.8}
    >
      <tubeGeometry args={[new SpiralCurve(), 1000, 0.2, 8]} />
      <meshToonMaterial color={color} />
    </mesh>
  ));
};

export default BowlingCarpetSprings;
