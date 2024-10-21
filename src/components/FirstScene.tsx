import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

function FirstScene() {
  const [rotation, setRotation] = useState(0.5);

  const knotRef = useRef<Mesh>(null!);

  useFrame(() => {
    knotRef.current.rotation.x += 0.005;
  });

  return (
    <>
      <mesh
        ref={knotRef}
        rotation={[0.1, 0.2, 0.2]}
        position={[1, -11, -30]}
        onPointerUp={() => setRotation(rotation + 0.1)}
      >
        <meshPhongMaterial />
        <torusKnotGeometry args={[10, 3, 100, 16]} />
      </mesh>
      <mesh rotation={[0.1, rotation, 0.2]} position={[1, 13, -30]}>
        <meshStandardMaterial color="red" transparent />
        <boxGeometry args={[15, 15, 15]} />
      </mesh>
      <mesh position={[1, -20, -10]} rotation={[-1, 0, 0]}>
        <planeGeometry args={[50, 50]} />
      </mesh>
      <ambientLight intensity={0.1} />
      <directionalLight
        color="white"
        position={[0, 0, 5]}
        castShadow
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>
    </>
  );
}

export default FirstScene;