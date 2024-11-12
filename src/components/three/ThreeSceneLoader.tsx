import { useLocalStorage } from "@mantine/hooks";
import { CameraControls } from "@react-three/drei";
import {
  LOCAL_CAMERA_CONTROLS_KEY,
  Visualization,
  LOCAL_VIZ_KEY,
  VisualizationMap,
  FrameworkType,
} from "../../utils/constants";

const ThreeSceneLoader = () => {
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

  const isPixiViz = frameworkType === FrameworkType.PIXI;
  return (
    <>
      {!isPixiViz && visualization}
      {enableCameraControls && <CameraControls />}
    </>
  );
};

export default ThreeSceneLoader;
