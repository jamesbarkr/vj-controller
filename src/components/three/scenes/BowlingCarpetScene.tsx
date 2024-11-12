import { createRef, RefObject, useState } from "react";
import { CatmullRomCurve3, Vector3, Mesh } from "three";
import { SpiralCurve } from "../../../utils/SpiralCurve";
import gsap from "gsap";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useGSAP } from "@gsap/react";

const bowlingColors = {
  neonYellow : "#ffff34",
  cyan: "#00ffff",
  magenta: "#ff34ff",
  neonGreen: "#34ff34",
  orange: "#ff832c",
  darkBlue: "#3e08e3"
};

const duration: number = 5;

const squiggleProps: { position: Vector3, color: string, }[] = [
  { position: new Vector3(7 , 5, 0), color: bowlingColors.cyan },
  { position: new Vector3(-5, 4, 0), color: bowlingColors.neonGreen },
  { position: new Vector3(1 , -3, 0), color: bowlingColors.orange },
  { position: new Vector3(-10 , -6, 0), color: bowlingColors.magenta },
];

const circleProps: { position: Vector3, color: string}[] = [
  { position: new Vector3(-1, 6, 0), color: bowlingColors.magenta },
  { position: new Vector3(6, 0, 0), color: bowlingColors.neonGreen },
  { position: new Vector3(-6, -4, 0), color: bowlingColors.darkBlue },
];

const sphereProps: { position: Vector3, color: string}[] = [
  { position: new Vector3(6, 6, 0), color: bowlingColors.neonYellow },
];

const triangleProps: { position: Vector3, scale: number, color: string}[] = [
  { position: new Vector3(-12 , 3, 0), scale: 1, color: bowlingColors.orange },
  { position: new Vector3(9 , 2, 0), scale: 1, color: bowlingColors.magenta },
  { position: new Vector3(3 , 5, 0), scale: 1, color: bowlingColors.darkBlue },
];

const squareProps: { position: Vector3, color: string}[] = [
  { position: new Vector3(-10 , 6, 0), color: bowlingColors.darkBlue },
  { position: new Vector3(-3 , -5, 0), color: bowlingColors.neonGreen },
];

const capsuleProps: { position: Vector3, color: string}[] = [
  { position: new Vector3(-9 , 0, 0), color: bowlingColors.neonYellow },
];

const springProps: { position: Vector3, color: string}[] = [
  { position: new Vector3(-8, -1, 0), color: bowlingColors.cyan },
  { position: new Vector3(0, 2, 0), color: bowlingColors.neonYellow },
  { position: new Vector3(10 , -4, 0), color: bowlingColors.darkBlue },
];

function createRefsArray(length: number) : Array<RefObject<Mesh>> {
  const refs: RefObject<Mesh>[] = [];
  for(let i = 0; i < length; i++) {
    refs.push(createRef<Mesh>());
  }
  return refs;
}

function BowlingCarpetScene() {
  const [squiggleRefs] = useState<Array<RefObject<Mesh>>>(createRefsArray(squiggleProps.length));
  const [circleRefs] = useState<Array<RefObject<Mesh>>>(createRefsArray(circleProps.length));
  const [sphereRefs] = useState<Array<RefObject<Mesh>>>(createRefsArray(sphereProps.length));
  const [triangleRefs] = useState<Array<RefObject<Mesh>>>(createRefsArray(triangleProps.length));
  const [squareRefs] = useState<Array<RefObject<Mesh>>>(createRefsArray(squareProps.length));
  const [capsuleRefs] = useState<Array<RefObject<Mesh>>>(createRefsArray(capsuleProps.length));
  const [springRefs] = useState<Array<RefObject<Mesh>>>(createRefsArray(springProps.length));

  useGSAP(() => {
    squiggleRefs.forEach((ref) => { 
      gsap.to(ref.current?.rotation, { x: Math.PI * 2, y: Math.PI * 2, z: 0, duration: duration, ease: "none", repeat: -1})
    })
    circleRefs.forEach((ref) => { 
      gsap.to(ref.current?.rotation, { x: Math.PI * 2, y: Math.PI * 2, z: 0, duration: duration, ease: "none", repeat: -1})
    })
    sphereRefs.forEach((ref) => { 
      // squish animation
      gsap.to(ref.current?.scale, { x: 1, y: 1, z: 1, duration: duration, ease: "sine", repeat: -1, keyframes: [
        {x: 0.7, y: 0.7, duration: duration / 4},
        {x: 0.7, y: 0.5, duration: duration / 4},
        {x: 0.5, y: 0.7, duration: duration / 4},
        {x: 1, y: 1, duration: duration / 4}
      ]})
      gsap.to(ref.current?.rotation, { x: 0, y: Math.PI * 2, z: 0, duration: duration, ease: "none", repeat: -1})
    })
    triangleRefs.forEach((ref) => { 
      gsap.to(ref.current?.rotation, { x: 0, y: Math.PI * 2, z: Math.PI * 2, duration: duration, ease: "none", repeat: -1})
    })
    squareRefs.forEach((ref) => { 
      gsap.to(ref.current?.rotation, { x: Math.PI * 2, y: Math.PI * 2, z: 0, duration: duration, ease: "none", repeat: -1})
    })
    capsuleRefs.forEach((ref) => { 
      gsap.to(ref.current?.rotation, { x: 0, y: Math.PI * 2, z: Math.PI * 2, duration: duration, ease: "none", repeat: -1})
    })
    springRefs.forEach((ref) => { 
      gsap.to(ref.current?.rotation, { x: Math.PI * 2, y: Math.PI * 2, z: 0, duration: duration, ease: "none", repeat: -1})
    })
  });

  return (
    <>
      <mesh position-z={-5}>
        {squiggleProps.map(({position, color}, i) =>
          <mesh ref={squiggleRefs[i]} position={position} scale={0.7}>
            <tubeGeometry args={[new CatmullRomCurve3([new Vector3(-2.5, 0, 0), new Vector3(-2, 1, 0), new Vector3(-1, -1, 0), new Vector3(0, 2, 0), new Vector3(1, -2, 0), new Vector3(1.5, 3, 0), new Vector3(2.5, -1, 0)]), 1000, 0.2, 8]} />
            <meshToonMaterial color={color} />
          </mesh>
        )}
        {circleProps.map(({position, color}, i) =>
          <mesh ref={circleRefs[i]} position={position}>
            <torusGeometry args={[1, 0.17]}/>
            <meshToonMaterial color={color}/>
          </mesh>
        )}
        {sphereProps.map(({position, color}, i) =>
          <mesh  ref={sphereRefs[i]} position={position}>
            <mesh position={[0.2, 0, 0]} >
              <sphereGeometry args={[0.3]}/>
              <meshToonMaterial color={color}/>
            </mesh>
          </mesh>
        )}
        {triangleProps.map(({position, scale, color}, i) =>
          <mesh ref={triangleRefs[i]} position={position}>
            <torusGeometry args={[1 * scale, 0.2, 12, 3]}/>
            <meshToonMaterial color={color} />
          </mesh>
        )}
        {squareProps.map(({position, color}, i) =>
          <mesh ref={squareRefs[i]} position={position}>
            <torusGeometry args={[0.8, 0.2, 12, 4]}/>
            <meshToonMaterial color={color} />
          </mesh>
        )}
        {capsuleProps.map(({position, color}, i) =>
          <mesh ref={capsuleRefs[i]} position={position} scale={0.25}>
            <capsuleGeometry args={[1, 3, 4, 8]} />
            <meshToonMaterial color={color}/>
          </mesh>
        )}
        {springProps.map(({position, color}, i) =>
          <mesh ref={springRefs[i]} position={position} rotation={[0, 0, 0]} scale={0.8} >
            <tubeGeometry args={[new SpiralCurve(), 1000, 0.2, 8]} />
            <meshToonMaterial color={color}/>
          </mesh>
        )}
      </mesh>
      <mesh position={[1, -20, -50]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <meshBasicMaterial  color="black"/>
      </mesh>
      <ambientLight intensity={0.5} color="white" />
      <spotLight color="white" position={[0, 0, 5]} intensity={100}/>
      <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={0} intensity={4}/>
      </EffectComposer>
    </>
  );
}

export default BowlingCarpetScene;
