import { Canvas } from "@react-three/fiber";
import { useLocalStorage } from "@mantine/hooks";
import {
  Visualization,
  LOCAL_VIZ_KEY,
  VisualizationMap,
  FrameworkType,
} from "../utils/constants";
import ThreeSceneLoader from "../components/three/ThreeSceneLoader";
import PixiSceneLoader from "../components/pixi/PixiSceneLoader";
import { useEffect } from "react";
import useQlc from "../hooks/useQlc";

const Visualizer = () => {
  useQlc();
  const [viz] = useLocalStorage<Visualization>({
    key: LOCAL_VIZ_KEY,
    defaultValue: Visualization.BLACKOUT,
  });

  const { frameworkType } = VisualizationMap[viz];
  const usePixiFramework = frameworkType === FrameworkType.PIXI;

  const handleRequestFullscreen = (event: KeyboardEvent) => {
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
  };

  useEffect(() => {
    window.addEventListener("keydown", handleRequestFullscreen, false);

    return () => {
      window.removeEventListener("keydown", handleRequestFullscreen);
    };
  }, []);

  if (viz === undefined) {
    // TODO: we need a loading visualization here
    return <div>Loading</div>;
  }

  return (
    <div className="w-screen h-screen bg-black">
      {usePixiFramework && <PixiSceneLoader />}
      <Canvas
        hidden={usePixiFramework}
      >
        <ThreeSceneLoader />
      </Canvas>
    </div>
  );
};

export default Visualizer;
