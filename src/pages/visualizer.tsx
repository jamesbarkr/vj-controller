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
import PixiSceneLoader from "../components/pixi/PixiSceneLoader";

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

  const camera = cameraType ?? CameraType.PERSPECTIVE;

  // If we ever use anything other than perspective and orthographic we'll need to change how we do this
  const useOrthographicCamera = camera === CameraType.ORTHOGRAPHIC;

  window.addEventListener("keydown", ( event) => {
    if (event.key === "f") {
      const fullscreenElement = document.fullscreenElement;

      const body = document.querySelector("body");

      if (!fullscreenElement && body) {
        if (body.requestFullscreen) {
          body.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  }, false);

  return (
    <div className="w-screen h-screen bg-black">
      {usePixiFramework && <PixiSceneLoader />}
      <Canvas
        hidden={usePixiFramework}
        orthographic={useOrthographicCamera}
        // if cameraZoom is undefined this will revert to a zoom of 1
        camera={{ zoom: cameraZoom ?? 1 }}
      >
        <ThreeSceneLoader />
      </Canvas>
    </div>
  );
};

export default Visualizer;
