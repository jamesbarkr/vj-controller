import { Canvas } from "@react-three/fiber";
import SceneLoader from "../components/SceneLoader";

const Visualizer = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <SceneLoader />
      </Canvas>
    </div>
  );
};

export default Visualizer;
