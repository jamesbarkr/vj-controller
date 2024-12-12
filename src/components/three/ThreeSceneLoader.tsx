import { useLocalStorage } from "@mantine/hooks";
import { CameraControls } from "@react-three/drei";
import {
  LOCAL_CAMERA_CONTROLS_KEY,
  Visualization,
  LOCAL_VIZ_KEY,
  VisualizationMap,
  FrameworkType,
  CityState,
  LOCAL_CITY_STATE_KEY,
  transitionDuration,
  LOCAL_HIDE_VISUALS_KEY,
  orderedVizList,
} from "../../utils/constants";
import { getNextTransitionState } from "../../utils/transitions";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Light, Mesh, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

const ThreeSceneLoader = () => {
  const [nextViz, setNextViz] = useLocalStorage<Visualization>({ 
    key: LOCAL_VIZ_KEY,
    defaultValue: Visualization.BLACKOUT,
  });
  const [cityState, setCityState] = useLocalStorage<CityState>({
    key: LOCAL_CITY_STATE_KEY,
    defaultValue: CityState.ENTRY_WORMHOLE,
  });
  const [enableCameraControls] = useLocalStorage({
    key: LOCAL_CAMERA_CONTROLS_KEY,
    defaultValue: false,
  });
  const [hideVisuals, setHideVisuals] = useLocalStorage({
    key: LOCAL_HIDE_VISUALS_KEY,
    defaultValue: false,
  });

  const setNextTransitionState = () => {
    if (hideVisuals) {
      setHideVisuals(false)
    } else {
      const nextState = getNextTransitionState(viz, cityState);
      setNextViz(nextState.visualization)
      setCityState(nextState.cityState)
    }
  };
  window.addEventListener("click", () => {
    setNextTransitionState();
  });

  window.addEventListener("keydown", (event) => {
    if(event.key === "r" && !event.metaKey) {
      setNextViz(orderedVizList[0])
      setCityState(CityState.ENTRY_WORMHOLE)
    }
  }, false);

  const [viz, setViz] = useState(nextViz);
  const vizParentRef = useRef<Mesh>(null!);

  const { visualization, frameworkType } = VisualizationMap[viz];

  const isPixiViz = frameworkType === FrameworkType.PIXI;

  useFrame(({ camera }) => {
    // FIXME: reset the camera to default only when needed
    if (viz !== Visualization.CITY) {
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 5
        camera.lookAt(new Vector3(0, 0, -1))
    }
  })

  const animateSceneVisibility = (mesh: Mesh, isVisible: boolean) => {
    const lights = mesh.getObjectsByProperty("isLight", true);
    lights.forEach((light) => {
      if (light instanceof Light) {
        if (isVisible) {
          const intensity = light.intensity
          light.intensity = 0
          gsap.to(light, { intensity: intensity, duration: transitionDuration})
        } else {
          gsap.to(light, { intensity: 0, duration: transitionDuration})
        }
      }
    })
  };

  useEffect(() => {
    if (nextViz !== viz) {
      const visualization = vizParentRef.current;
      animateSceneVisibility(visualization, false)
      gsap.delayedCall(transitionDuration, (nextViz: Visualization) => {
        setViz(nextViz)
      }, [nextViz])
    }
  }, [nextViz, viz]);

  useEffect(() => {
      const visualization = vizParentRef.current;
      animateSceneVisibility(visualization, true)
  }, [viz]);

  return (
    <>
      {!isPixiViz &&
        <mesh visible={!hideVisuals} ref={vizParentRef} >
          {visualization}
        </mesh>
      }
      {enableCameraControls && <CameraControls />}
    </>
  );
};

export default ThreeSceneLoader;
