import { Mesh } from "three";
import { useState, RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BowlingShapeProps } from "../../../../../utils/bowlingCarpet";
import { createRefsArray } from "../../../../../utils/refs";

const BowlingCarpetCapsules = ({
  duration,
  shapes: capsules,
}: BowlingShapeProps) => {
  const [capsuleRefs] = useState<Array<RefObject<Mesh>>>(
    createRefsArray<Mesh>(capsules.length),
  );

  useGSAP(() => {
    capsuleRefs.forEach((ref) => {
      gsap.to(ref.current!.rotation, {
        x: 0,
        y: Math.PI * 2,
        z: Math.PI * 2,
        duration: duration,
        ease: "none",
        repeat: -1,
      });
    });
  });

  return capsules.map(({ position, color }, i) => (
    <mesh key={`capsule-${i}`} ref={capsuleRefs[i]} position={position} scale={0.25}>
      <capsuleGeometry args={[1, 3, 4, 8]} />
      <meshToonMaterial color={color} />
    </mesh>
  ));
};

export default BowlingCarpetCapsules;
