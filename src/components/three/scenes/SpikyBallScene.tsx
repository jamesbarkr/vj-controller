import { useGSAP } from "@gsap/react";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Color, Mesh, MeshPhongMaterial, SpotLight, VideoTexture } from "three";
import gsap from "gsap";

type LightOptions = {
  color: string;
  intensity: number
}
type LightColorPalette = {
  left: LightOptions;
  right: LightOptions
}

const blueVioletColorPalette: LightColorPalette = {
  left: {
    color: "#8800ff",
    intensity: 25,
  },
  right: {
    color: "blue",
    intensity: 5,
  },
}

const cyanPinkColorPalette: LightColorPalette = {
  left: {
    color: "cyan",
    intensity: 8,
  },
  right: {
    color: "magenta",
    intensity: 8,
  },
}

const SpikyBallScene = () => {
  const { gl } = useThree();
  const [material] = useState(new MeshPhongMaterial())
  const spikyBallRef = useRef<Mesh>(null!)
  const leftLightRef = useRef<SpotLight>(null!)
  const rightLightRef = useRef<SpotLight>(null!)
  const [animateScale, setAnimateScale] = useState(false)

  const colorPalette = cyanPinkColorPalette;

  const randomScaleWithinThreshold = () => {
    const min = 0.8
    const max = 1.2
    return min + (max - min) * Math.random()
  }

  useGSAP(() => {
    if (animateScale) {
      setAnimateScale(false);
      gsap.to(spikyBallRef.current!.scale, {
        x: randomScaleWithinThreshold(),
        y: randomScaleWithinThreshold(),
        duration: 0.2,
        onComplete: () => {
          setAnimateScale(true)
        },
      });
    }
  }, [animateScale]);

  useGSAP(() => {
    gsap.to(leftLightRef.current.position, {
      x: leftLightRef.current.position.x + 4,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });
    gsap.to(rightLightRef.current.position, {
      x: rightLightRef.current.position.x - 4,
      duration: 1,
      repeat: -1,
      yoyo: true
    });
  }, []);

  useEffect(() => {
    const videoElement = document.createElement('video')
    videoElement.className = "hidden"
    videoElement.src = "src/assets/orbs.mp4"
    videoElement.loop = true
    document.body.appendChild(videoElement)
    videoElement.load()
    videoElement.play()

    const texture = new VideoTexture(videoElement)
    material.displacementMap = texture
    material.color = new Color("white")
    material.displacementScale = 1.2
    material.needsUpdate = true

    setAnimateScale(true)

    return () => {
      document.body.removeChild(videoElement)
    }
  }, []);

  useEffect(() => {
    gl.shadowMap.enabled = true
    return () => {
      gl.shadowMap.enabled = false
    }
  }, [gl.shadowMap]);

  return (
    <>
      <mesh  ref={spikyBallRef} material={material} castShadow receiveShadow>
        <sphereGeometry args={[1.5, 1000, 1000]}/>
      </mesh>
      <spotLight ref={leftLightRef} castShadow color={colorPalette.left.color} position={[-2, 0, 5]} intensity={colorPalette.left.intensity} />
      <spotLight ref={rightLightRef}  castShadow color={colorPalette.right.color} position={[2, 0, 5]} intensity={colorPalette.right.intensity} />
    </>
  );
};

export default SpikyBallScene;