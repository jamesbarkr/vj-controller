import { useFBX } from "@react-three/drei";

const SanFranScenesco = () => {
  const geometry = useFBX("/src/assets/sAN.fbx");

  return (
    <>
      <primitive object={geometry} />
    </>
  );
};

export default SanFranScenesco;
