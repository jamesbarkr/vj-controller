import { useLocalStorage } from "@mantine/hooks";
import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { LOCAL_SCALE_KEY } from "../../../utils/constants";

const SpinningCube = () => {
  const [scale] = useLocalStorage({
    key: LOCAL_SCALE_KEY,
    defaultValue: 1,
  });

  const cubeRef = useRef<Mesh>(null!);

  useFrame(() => {
    cubeRef.current.rotation.x += 0.005;
    cubeRef.current.rotation.y += 0.005;
  });

  return (
    <>
      <mesh ref={cubeRef} castShadow>
        <ambientLight intensity={0.2} />
        <boxGeometry args={[2 * scale, 2 * scale, 2 * scale]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh rotation={[-1, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={"white"} />
      </mesh>
      <directionalLight castShadow position={[0, 1, 0]} />
    </>
  );
};

export default SpinningCube;
