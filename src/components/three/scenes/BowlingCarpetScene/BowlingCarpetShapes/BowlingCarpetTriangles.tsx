import { Mesh } from "three";
import { useState, RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BowlingShapeProps } from "../../../../../utils/bowlingCarpet";
import { createRefsArray } from "../../../../../utils/refs";

const BowlingCarpetTriangles = ({
  duration,
  shapes: triangles,
}: BowlingShapeProps) => {
  const [triangleRefs] = useState<Array<RefObject<Mesh>>>(
    createRefsArray<Mesh>(triangles.length),
  );

  useGSAP(() => {
    triangleRefs.forEach((ref) => {
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

  return triangles.map(({ position, scale, color }, i) => (
    <mesh ref={triangleRefs[i]} position={position}>
      <torusGeometry args={[1 * (scale ?? 1), 0.2, 12, 3]} />
      <meshToonMaterial color={color} />
    </mesh>
  ));
};

export default BowlingCarpetTriangles;
