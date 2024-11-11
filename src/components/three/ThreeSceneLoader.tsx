import { useLocalStorage } from "@mantine/hooks";
import { useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import {
  LOCAL_CAMERA_CONTROLS_KEY,
  Visualization,
  LOCAL_VIZ_KEY,
  VisualizationMap,
  FrameworkType,
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

  const { visualization, frameworkType } = VisualizationMap[viz];

  if (frameworkType === FrameworkType.PIXI) {
    throw new Error(
      "Pixi visualizations cannot use the Three framework type. Update the VisualizationMap in the utils file.",
    );
  }

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
