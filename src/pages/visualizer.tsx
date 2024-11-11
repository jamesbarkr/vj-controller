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

  // const width = 800;
  // const height = 600;
  let sceneLoader;
  if (usePixiFramework) {
    return null;
    // sceneLoader = (
    //   <Stage
    //     options={{
    //       backgroundColor: 0x56789a,
    //       resolution: window.devicePixelRatio,
    //       width: width,
    //       height: height,
    //     }}
    //     style={{ width: width, height: height }}
    //   >
    //     <Text text="Hello, world!" />
    //   </Stage>
    // );
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
