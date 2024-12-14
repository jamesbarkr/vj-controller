import { LineCurve3, Mesh, Vector3 } from "three";
import { getNormalizedRandomNumber } from "../../../utils/random";
import { useState, RefObject } from "react";
import { createRefsArray } from "../../../utils/refs";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NUM_LINES = 70;
type LineCoordinatesArray = [Vector3, Vector3][];

const generateLineCoordinates = (numLines: number): LineCoordinatesArray => {
  const coordsArray: LineCoordinatesArray = [];

  for (let i = 0; i < numLines; i++) {
    const x = getNormalizedRandomNumber(-500, 500);
    const z = getNormalizedRandomNumber(-500, 500);
    coordsArray.push([new Vector3(x, 100, z), new Vector3(x, -100, z)]);
  }

  return coordsArray;
};

const RandomLinesScene = () => {
  const [lineRefs] = useState<Array<RefObject<Mesh>>>(
    createRefsArray<Mesh>(NUM_LINES),
  );
  const [linePositions] = useState<LineCoordinatesArray>(
    generateLineCoordinates(NUM_LINES),
  );

  useGSAP(() => {
    lineRefs.forEach((ref) => {
      const duration = getNormalizedRandomNumber(200, 500);
      const y = getNormalizedRandomNumber(-50, 50);
      gsap.to(ref.current!.rotation, {
        y,
        repeat: -1,
        duration,
      });
    });
  });

  return (
    <>
      {lineRefs.map((ref, index) => {
        const [v1, v2] = linePositions[index];
        return (
          <mesh
            key={`${v1.x}${v1.y}${v1.z}${v2.x}${v2.y}${v2.z}`}
            position={[0, 0, -100]}
            ref={ref}
            rotation={[
              // getNormalizedRandomNumber(-0.15 * Math.PI, 0.15 * Math.PI),
              0,
              0,
              getNormalizedRandomNumber(-0.25 * Math.PI, 0.25 * Math.PI),
            ]}
          >
            <tubeGeometry
              args={[
                new LineCurve3(v1, v2),
                64,
                getNormalizedRandomNumber(0.01, 0.1),
                8,
              ]}
            />
            <meshStandardMaterial
              color={Math.random() > 0.5 ? "hotpink" : "cyan"}
              toneMapped={false}
            />
          </mesh>
        );
      })}
      <ambientLight intensity={250} color="white" />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0} intensity={1} />
      </EffectComposer>
    </>
  );
};

export default RandomLinesScene;
