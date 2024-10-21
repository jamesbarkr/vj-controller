import { Canvas } from "@react-three/fiber";
import { useLocalStorage } from "@mantine/hooks";
import {
  LOCAL_CAMERA_CONTROLS_KEY,
  LOCAL_VIZ_KEY,
  VisualizationMap,
} from "../utils/constants";
import { CameraControls } from "@react-three/drei";

const Visualizer = () => {
  const [enableCameraControls] = useLocalStorage({
    key: LOCAL_CAMERA_CONTROLS_KEY,
    defaultValue: true,
  });
  const [viz] = useLocalStorage({ key: LOCAL_VIZ_KEY });
  const vizElement = VisualizationMap[viz];

  return (
    <div className="w-screen h-screen">
      <Canvas>
        {vizElement}
        {enableCameraControls && <CameraControls />}
      </Canvas>
    </div>
  );
};

export default Visualizer;
