import { Canvas } from "@react-three/fiber";
import SceneLoader from "../components/SceneLoader";
import { useLocalStorage } from "@mantine/hooks";
import {
  Visualization,
  LOCAL_VIZ_KEY,
  CameraType,
  VisualizationMap,
} from "../utils/constants";

const Visualizer = () => {
  const [viz] = useLocalStorage<Visualization>({ key: LOCAL_VIZ_KEY });
  const { cameraType, cameraZoom } = VisualizationMap[viz];

  // If we ever use anything other than perspective and orthographic we'll need to change how we do this
  const useOrthographicCamera = cameraType === CameraType.ORTHOGRAPHIC;

  return (
    <div className="w-screen h-screen">
      <Canvas
        orthographic={useOrthographicCamera}
        // if cameraZoom is undefined this will revert to a zoom of 1
        camera={{ zoom: cameraZoom ?? 1 }}
      >
        <SceneLoader />
      </Canvas>
    </div>
  );
};

export default Visualizer;
