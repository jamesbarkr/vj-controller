import { Mesh } from "three";
import { BowlingShapeProps } from "../../../../utils/bowlingCarpet";
import { useState, RefObject } from "react";
import { createRefsArray } from "../../../../utils/refs";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const BowlingCarpetSpheres = ({
  duration,
  shapes: spheres,
}: BowlingShapeProps) => {
  const [sphereRefs] = useState<Array<RefObject<Mesh>>>(
    createRefsArray<Mesh>(spheres.length),
  );

  useGSAP(() => {
    sphereRefs.forEach((ref) => {
      // squish animation
      gsap.to(ref.current!.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: duration,
        ease: "sine",
        repeat: -1,
        keyframes: [
          { x: 0.7, y: 0.7, duration: duration / 4 },
          { x: 0.7, y: 0.5, duration: duration / 4 },
          { x: 0.5, y: 0.7, duration: duration / 4 },
          { x: 1, y: 1, duration: duration / 4 },
        ],
      });

      gsap.to(ref.current!.rotation, {
        x: 0,
        y: Math.PI * 2,
        z: 0,
        duration: duration,
        ease: "none",
        repeat: -1,
      });
    });
  });

  return spheres.map(({ position, color }, i) => (
    <mesh ref={sphereRefs[i]} position={position}>
      <mesh position={[0.2, 0, 0]}>
        <sphereGeometry args={[0.3]} />
        <meshToonMaterial color={color} />
      </mesh>
    </mesh>
  ));
};

export default BowlingCarpetSpheres;
