import { useLocalStorage } from "@mantine/hooks";
import { useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import {
  LOCAL_CAMERA_CONTROLS_KEY,
  Visualization,
  LOCAL_VIZ_KEY,
  VisualizationMap,
} from "../../utils/constants";

const ThreeSceneLoader = () => {
  const { gl } = useThree();
  const [enableCameraControls] = useLocalStorage({
    key: LOCAL_CAMERA_CONTROLS_KEY,
    defaultValue: true,
  });
  const [viz] = useLocalStorage<Visualization>({ key: LOCAL_VIZ_KEY });
  if (viz === undefined) {
    // TODO: we need a loading visualization here
    return null;
  }

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

export default ThreeSceneLoader;
