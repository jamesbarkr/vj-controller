import { useLocalStorage } from "@mantine/hooks";
import { useThree } from "@react-three/fiber";
import {
  LOCAL_CAMERA_CONTROLS_KEY,
  LOCAL_VIZ_KEY,
  Visualization,
  VisualizationMap,
} from "../utils/constants";
import { CameraControls } from "@react-three/drei";

const SceneLoader = () => {
  const { gl } = useThree();
  const [enableCameraControls] = useLocalStorage({
    key: LOCAL_CAMERA_CONTROLS_KEY,
    defaultValue: true,
  });
  const [viz] = useLocalStorage<Visualization>({ key: LOCAL_VIZ_KEY });
  const { visualization } = VisualizationMap[viz];

  window.addEventListener("dblclick", () => {
    const fullscreenElement = document.fullscreenElement;

    const canvas = gl.domElement;

    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });

  return (
    <>
      {visualization}
      {enableCameraControls && <CameraControls />}
    </>
  );
};

export default SceneLoader;
