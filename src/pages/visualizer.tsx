import { Canvas } from "@react-three/fiber";
import FirstScene from "../components/FirstScene";

const Visualizer = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <FirstScene/>
      </Canvas>
    </div>
  );
};

export default Visualizer;
