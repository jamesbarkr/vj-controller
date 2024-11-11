import { useLocalStorage } from "@mantine/hooks";
import { LOCAL_SCALE_KEY } from "../../utils/constants";

const Cube = () => {
  const [scale] = useLocalStorage({
    key: LOCAL_SCALE_KEY,
    defaultValue: 1,
  });

  return (
    <>
      <mesh>
        <ambientLight intensity={0.2} />
        <boxGeometry args={[2 * scale, 2 * scale, 2 * scale]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <directionalLight position={[0, 1, 0]} />
    </>
  );
};

export default Cube;
