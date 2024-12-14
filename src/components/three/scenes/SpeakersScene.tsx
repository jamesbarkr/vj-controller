import { useGSAP } from "@gsap/react";
import { Line } from "@react-three/drei";
import { RefObject, useRef, useState } from "react";
import { EllipseCurve, Group, Mesh, Vector3 } from "three";
import gsap from "gsap";
import { createRefsArray } from "../../../utils/refs";
import { Line2 } from "three/examples/jsm/Addons.js";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

type SoundWaveItem = { // probably put a uuid in here
  hasAppeared: boolean;
};

const speakerColor = "cyan";
const soundWaveColor = "#ff77ff";

const w = 0.9;
const frontTopLeft = new Vector3(-w, -2, 1);
const frontTopRight = new Vector3(w, -2, 1);
const frontBottomLeft = new Vector3(-w, 2, 1);
const frontBottomRight = new Vector3(w, 2, 1);
const backTopLeft = new Vector3(-w, -2, -1);
const backTopRight = new Vector3(w, -2, -1);
const backBottomLeft = new Vector3(-w, 2, -1);
const backBottomRight = new Vector3(w, 2, -1);

const speakerPoints: Vector3[] = [
  frontTopLeft, frontTopRight,
  frontTopRight, frontBottomRight,
  frontBottomRight, frontBottomLeft,
  frontBottomLeft, frontTopLeft,

  backTopLeft, backTopRight,
  backTopRight, backBottomRight,
  backBottomRight, backBottomLeft,
  backBottomLeft, backTopLeft,

  frontTopLeft, backTopLeft,
  frontTopRight, backTopRight,
  frontBottomLeft, backBottomLeft,
  frontBottomRight, backBottomRight,
];

const pulseDuration = 0.1;
const soundWaveCurve = new EllipseCurve(0, 0, 1, 1);
const soundWavePoints = soundWaveCurve.getSpacedPoints(64);
const soundWaveCount = 10;
const timeBeforeNewWave = 1;
const scaleMultiplier = 1.5;
const zIncrement = 0.25;
const jitterDist = 0.05;

function intializeSoundWaveItems(count: number) : SoundWaveItem[] {
  const soundWaveItems: SoundWaveItem[] = [];
  for(let i = 0; i < count; i++) {
    soundWaveItems.push({ hasAppeared: false });
  }
  return soundWaveItems;
}

const SpeakerCircle = () => {
  const groupRef = useRef<Mesh>(null!);
  const [soundWaveItems] = useState(intializeSoundWaveItems(soundWaveCount));
  const [soundWaveRefs] = useState<Array<RefObject<Mesh>>>(
    createRefsArray<Mesh>(soundWaveCount),
  );
  const [lineRefs] = useState<Array<RefObject<Line2>>>(
    createRefsArray<Line2>(soundWaveCount),
  );
  const [startIndex, setStartIndex] = useState(0);

  useGSAP(() => {
    if (soundWaveItems[startIndex].hasAppeared) {
      lineRefs[startIndex].current!.material.opacity = 1;

      soundWaveRefs[startIndex].current!.scale.x = 1;
      soundWaveRefs[startIndex].current!.scale.y = 1;
      soundWaveRefs[startIndex].current!.scale.z = 1;

      soundWaveRefs[startIndex].current!.position.z = -0.5;
    } else {
      soundWaveItems[startIndex].hasAppeared = true;
      soundWaveRefs[startIndex].current!.visible = true;
    }

    soundWaveItems.forEach((item, i) => {
      if (item.hasAppeared) {
        const currScale = soundWaveRefs[i].current!.scale;
        gsap.to(soundWaveRefs[i].current!.scale, {
          x: currScale.x * scaleMultiplier,
          y: currScale.y * scaleMultiplier,
          z: currScale.z * scaleMultiplier,
          duration: timeBeforeNewWave,
          ease: "none",
        });
        const currZPosition = soundWaveRefs[i].current!.position.z;
        gsap.to(soundWaveRefs[i].current!.position, {
          z: currZPosition + zIncrement,
          duration: timeBeforeNewWave,
          ease: "none",
        });
        const currOpacity = lineRefs[i].current!.material.opacity;
        gsap.to(lineRefs[i].current!.material, {
          opacity: currOpacity * (Math.abs(i - startIndex) > 3 ? 0.5 : 1),
          duration: timeBeforeNewWave,
          ease: "none",
        });
      }
    })
    gsap.delayedCall(timeBeforeNewWave, () => {
      setStartIndex(startIndex + 1 < soundWaveCount ? startIndex + 1 : 0)
    });
  }, [startIndex]);

  useGSAP(() => {
    const scale = 1.1
    gsap.to(groupRef.current.scale, { 
      x: scale, 
      y: scale, 
      z: scale, 
      duration: pulseDuration, 
      repeat: -1, 
      yoyo: true, 
      ease: "power1.in"
    })
  });

  return (
    <mesh ref={groupRef}>
      <mesh position={[0, 0, -0.5]} scale={[1, 1, 0.1]}>
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial color={speakerColor} wireframe/>
      </mesh>
      <mesh scale={[1, 1, 0.5]}>
        <torusGeometry args={[0.75, 0.1]} />
        <meshStandardMaterial color={speakerColor} wireframe/>
      </mesh>
      {soundWaveRefs.map((ref, i) => (
        <mesh key={i} ref={ref} position={[0, 0, -0.5]} visible={false} >
          <Line ref={lineRefs[i]} points={soundWavePoints} color={soundWaveColor} scale={0.25} transparent/>  
        </mesh>
      ))}
    </mesh>
  );
}

const Speaker = () => {
  const lineGroupRef = useRef<Group>(null!);
  const speakerGroupRef = useRef<Group>(null!);

  useGSAP(() => {
    gsap.to(speakerGroupRef.current.position, { 
      x: speakerGroupRef.current.position.x + jitterDist,
      y: speakerGroupRef.current.position.y + jitterDist,
      z: speakerGroupRef.current.position.z + jitterDist,
      duration: 0.01,
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <group ref={speakerGroupRef} scale={1.2}>
      <group ref={lineGroupRef} scale={[1, 0.9, 1]}>
        <Line points={speakerPoints} color={speakerColor} segments/>
      </group>
      <group position={[0, 0, 1]}>
        <group scale={0.6} position-y={1}>
          <SpeakerCircle/>
        </group>
        <group position-y={-0.6} >
          <SpeakerCircle/>
        </group>
      </group>
    </group>
  );
}

const SpeakersScene = () => {
  return (
    <>
    <group position={[-4, 0, 0]} rotation-y={Math.PI / 3}>
      <Speaker/>
    </group>
    <group position={[4, 0, 0]} rotation-y={-Math.PI / 3}>
      <Speaker/>
    </group>
    <ambientLight color="white" intensity={1}/>
    <EffectComposer>
      <Bloom mipmapBlur luminanceThreshold={0} intensity={5} />
    </EffectComposer>
    </>
  );
}

export default SpeakersScene;
