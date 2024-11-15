import { CatmullRomCurve3, Mesh, Vector3 } from "three";
import { BowlingShapeProps } from "../../../../utils/bowlingCarpet";
import { useState, RefObject } from "react";
import { createRefsArray } from "../../../../utils/refs";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const BowlingCarpetSquiggles = ({
  duration,
  shapes: squiggles,
}: BowlingShapeProps) => {
  const [squiggleRefs] = useState<Array<RefObject<Mesh>>>(
    createRefsArray<Mesh>(squiggles.length),
  );

  useGSAP(() => {
    squiggleRefs.forEach((ref) => {
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

  return squiggles.map(({ position, color }, i) => (
    <mesh ref={squiggleRefs[i]} position={position} scale={0.7}>
      <tubeGeometry
        args={[
          new CatmullRomCurve3([
            new Vector3(-2.5, 0, 0),
            new Vector3(-2, 1, 0),
            new Vector3(-1, -1, 0),
            new Vector3(0, 2, 0),
            new Vector3(1, -2, 0),
            new Vector3(1.5, 3, 0),
            new Vector3(2.5, -1, 0),
          ]),
          1000,
          0.2,
          8,
        ]}
      />
      <meshToonMaterial color={color} />
    </mesh>
  ));
};

export default BowlingCarpetSquiggles;
