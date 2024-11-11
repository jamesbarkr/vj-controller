import { useLocalStorage } from "@mantine/hooks";
import {
  Visualization,
  LOCAL_VIZ_KEY,
  VisualizationMap,
  FrameworkType,
} from "../../utils/constants";
import { Stage } from "@pixi/react";

const PixiSceneLoader = () => {
  const [viz] = useLocalStorage<Visualization>({ key: LOCAL_VIZ_KEY });
  if (viz === undefined) {
    // TODO: we need a loading visualization here
    return null;
  }

  const { visualization, frameworkType } = VisualizationMap[viz];

  if (frameworkType === FrameworkType.THREE) {
    throw new Error(
      "Three visualizations cannot use the Pixi framework type. Update the VisualizationMap in the utils file.",
    );
  }

  return (
    <Stage
      // NOTE: width and height are only the initial values; resizeTo handles the rest
      width={window.innerWidth}
      height={window.innerHeight}
      options={{
        background: 0x000000,
        resizeTo: window,
      }}
    >
      {visualization}
    </Stage>
  );
};

export default PixiSceneLoader;
