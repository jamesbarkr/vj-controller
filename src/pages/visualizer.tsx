import { Canvas } from "@react-three/fiber";
import { useLocalStorage } from "@mantine/hooks";
import {
  Visualization,
  LOCAL_VIZ_KEY,
  CameraType,
  VisualizationMap,
  FrameworkType,
} from "../utils/constants";
import ThreeSceneLoader from "../components/three/ThreeSceneLoader";
import { Stage, Text } from "@pixi/react";

const Visualizer = () => {
  const [viz] = useLocalStorage<Visualization>({
    key: LOCAL_VIZ_KEY,
  });
  if (viz === undefined) {
    // TODO: we need a loading visualization here
    return <div>Loading</div>;
  }

  const { cameraType, cameraZoom, frameworkType } = VisualizationMap[viz];
  const usePixiFramework = frameworkType === FrameworkType.PIXI;

  let sceneLoader;
  if (usePixiFramework) {
    sceneLoader = (
      <Stage
        options={{
          background: 0x56789a,
        }}
      >
        <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} />
      </Stage>
    );
  } else {
    const camera = cameraType ?? CameraType.PERSPECTIVE;

    // If we ever use anything other than perspective and orthographic we'll need to change how we do this
    const useOrthographicCamera = camera === CameraType.ORTHOGRAPHIC;
    sceneLoader = (
      <Canvas
        orthographic={useOrthographicCamera}
        // if cameraZoom is undefined this will revert to a zoom of 1
        camera={{ zoom: cameraZoom ?? 1 }}
      >
        <ThreeSceneLoader />
      </Canvas>
    );
  }

  return <div className="w-screen h-screen">{sceneLoader}</div>;
};

export default Visualizer;
