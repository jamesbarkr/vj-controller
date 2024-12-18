import { Mesh } from "three";
import { useState, RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BowlingShapeProps } from "../../../../../utils/bowlingCarpet";
import { createRefsArray } from "../../../../../utils/refs";

const BowlingCarpetSquares = ({
  duration,
  shapes: squares,
}: BowlingShapeProps) => {
  const [squareRefs] = useState<Array<RefObject<Mesh>>>(
    createRefsArray<Mesh>(squares.length),
  );

  useGSAP(() => {
    squareRefs.forEach((ref) => {
      gsap.to(ref.current!.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        z: 0,
        duration,
        ease: "none",
        repeat: -1,
      });
    });
  });

  return squares.map(({ position, color }, i) => (
    <mesh key={`square-${i}`} ref={squareRefs[i]} position={position}>
      <torusGeometry args={[0.8, 0.2, 12, 4]} />
      <meshToonMaterial color={color} />
    </mesh>
  ));
};

export default BowlingCarpetSquares;
