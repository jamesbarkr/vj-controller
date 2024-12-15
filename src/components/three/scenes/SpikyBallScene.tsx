import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { Color, Mesh, MeshPhongMaterial, SpotLight, VideoTexture } from "three";
import gsap from "gsap";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { transitionDuration } from "../../../utils/constants";

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
    intensity: 25,
  },
}

const cyanPinkColorPalette: LightColorPalette = {
  left: {
    color: "cyan",
    intensity: 15,
  },
  right: {
    color: "magenta",
    intensity: 15,
  },
}

function setupVideo() {
  return new Promise(resolve => {
      const selector = 'video';
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(() => {
          if (document.querySelector(selector)) {
              observer.disconnect();
              resolve(document.querySelector(selector));
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}

const SpikyBallScene = () => {
  const [material] = useState(new MeshPhongMaterial({transparent: true, opacity: 0}));
  const [texture, setTexture] = useState<VideoTexture | undefined>(undefined);
  const spikyBallRef = useRef<Mesh>(null!)
  const leftLightRef = useRef<SpotLight>(null!)
  const rightLightRef = useRef<SpotLight>(null!)
  const [animateScale, setAnimateScale] = useState(false)

  const colorPalette = blueVioletColorPalette;

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
    if (texture !== undefined) {
      gsap.to(material, {
        opacity: 1,
        duration: transitionDuration,
      });
    }
  }, [texture]);

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
    const videoElement = document.createElement('video');
    videoElement.className = "hidden";
    videoElement.src = "src/assets/orbs.mp4";
    videoElement.loop = true;
    videoElement.muted = true;
    document.body.appendChild(videoElement);

    setupVideo().then((videoElement) => {
      if (videoElement instanceof HTMLVideoElement) {
        videoElement.play().then(() => {
          const texture = new VideoTexture(videoElement);
          material.displacementMap = texture;
          material.color = new Color("white");
          material.displacementScale = 1.2;
          material.needsUpdate = true;
          setTexture(texture);
        });
      }
    });

    setAnimateScale(true);

    return () => {
      if(document.body.contains(videoElement)) {
        videoElement.remove();
      }
    }
  }, [material]);

  return (
    <>
      <mesh ref={spikyBallRef} material={material} castShadow receiveShadow>
        <sphereGeometry args={[1.5, 1000, 1000]}/>
      </mesh>
      <spotLight ref={leftLightRef} castShadow color={colorPalette.left.color} position={[-2, 0, 5]} intensity={colorPalette.left.intensity} />
      <spotLight ref={rightLightRef}  castShadow color={colorPalette.right.color} position={[2, 0, 5]} intensity={colorPalette.right.intensity} />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0} intensity={4} />
      </EffectComposer>
    </>
  );
};

export default SpikyBallScene;