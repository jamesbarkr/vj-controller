import { Canvas } from "@react-three/fiber";
import { useLocalStorage } from "@mantine/hooks";
import { LOCAL_VIZ_KEY, VisualizationMap } from "../utils/constants";

const Visualizer = () => {
  const [viz] = useLocalStorage({ key: LOCAL_VIZ_KEY });
  const vizElement = VisualizationMap[viz];

  return (
    <div className="w-screen h-screen">
      <Canvas>{vizElement}</Canvas>
    </div>
  );
};

export default Visualizer;
