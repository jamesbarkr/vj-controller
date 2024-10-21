import { useLocalStorage } from "@mantine/hooks";
import { LOCAL_SCALE_KEY } from "../utils/constants";

const Cube = () => {
  const [scale] = useLocalStorage({
    key: LOCAL_SCALE_KEY,
    defaultValue: 1,
  });

  return (
    <mesh>
      <ambientLight intensity={0.2} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <boxGeometry args={[2 * scale, 2 * scale, 2 * scale]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Cube;
