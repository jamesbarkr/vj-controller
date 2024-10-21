import { useState } from 'react';
import { MeshReflectorMaterial, Fisheye } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three';

function FirstScene() {
  const [rotation, setRotation] = useState(0.5);

  const knotRef = useRef<Mesh>(null!);

  useFrame(() => {
    knotRef.current.rotation.x += 0.005;
  });

  const colorMap = useLoader(TextureLoader, 'src/assets/PavingStones092_4K-PNG/PavingStones092_4K-PNG_Color.png')

  return (
    <>
    <Fisheye zoom={0.9}>
        <mesh rotation={[0.1, 0.2, 0.2]} position={[1, -11, -30]} onPointerUp={(e) => setRotation(rotation + 0.1)}>

          <torusKnotGeometry args={[10, 3, 100, 16]}/>
          <meshStandardMaterial map={colorMap} />
        </mesh>
        <mesh rotation={[0.1, rotation, 0.2]} position={[1, 13, -30]}>
          <meshStandardMaterial map={colorMap} />
          <boxGeometry args={[15, 15, 15]} />
          <mesh position={[1, 1, -30]}>
          <meshStandardMaterial color="red" />
          <boxGeometry args={[15, 15, 15]} />
          </mesh>
          <mesh position={[1, 1, -60]}>
          <meshStandardMaterial color="red" />
          <boxGeometry args={[15, 15, 15]} />
          </mesh>
        </mesh>
        <mesh position={[1, -20, -10]} rotation={[-1, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[300, 30]}
            resolution={2048}
            mixBlur={1}
            mixStrength={180}
            roughness={0.1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#202020"
            metalness={0.1} 
            mirror={0}          
            />
        </mesh>
        <mesh position={[1, -20, -100]}>
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        <ambientLight intensity={0.3} color="white" />
        <directionalLight color="blue" position={[-50, -50, 5]} intensity={1} />
        <directionalLight color="red" position={[50, 50, 5]} />
        </Fisheye>
        </>
  );
}

export default FirstScene;
