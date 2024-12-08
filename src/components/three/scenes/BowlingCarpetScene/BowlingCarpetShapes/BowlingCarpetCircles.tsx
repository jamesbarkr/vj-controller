import { useState, RefObject } from "react";
import { Mesh } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BowlingShapeProps } from "../../../../../utils/bowlingCarpet";
import { createRefsArray } from "../../../../../utils/refs";

const BowlingCarpetCircles = ({
  duration,
  shapes: circles,
}: BowlingShapeProps) => {
  const [circleRefs] = useState<Array<RefObject<Mesh>>>(
    createRefsArray<Mesh>(circles.length),
  );

  useGSAP(() => {
    circleRefs.forEach((ref) => {
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

  return circles.map(({ position, color }, i) => (
    <mesh key={`circle-${i}`} ref={circleRefs[i]} position={position}>
      <torusGeometry args={[1, 0.17]} />
      <meshToonMaterial color={color} />
    </mesh>
  ));
};

export default BowlingCarpetCircles;
