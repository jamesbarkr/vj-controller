import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Glitch,
  Noise,
  Scanline,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import {
  Clock,
  ExtrudeGeometry,
  Mesh,
  TextureLoader,
  Vector2,
} from "three";
import { SVGLoader } from "three/examples/jsm/Addons.js";

const MuonLogoSpinScene = () => {
  const muonLogoRef = useRef<Mesh>(null!);
  const [goWild, setGoWild] = useState(false);
  const data = useLoader(SVGLoader, "/src/assets/muonCassette.svg");
  const shapes = data.paths.flatMap((path) => SVGLoader.createShapes(path));
  const glitchTexture = useLoader(TextureLoader, "/src/assets/3.png");

  const clock = new Clock();

  const muonLogo = useMemo(() => {
    const geometry = new ExtrudeGeometry(shapes, {
      depth: 20,
    });
    geometry.center();

    const muonLogoMesh = (
      <mesh
        geometry={geometry}
        rotation-x={Math.PI}
        rotation-y={-Math.PI / 2}
        ref={muonLogoRef}
        scale={0.031}
      >
        <meshPhongMaterial color="#6666FF"/>
      </mesh>
    );

    return muonLogoMesh;
  }, [shapes]);

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    muonLogoRef.current.rotation.y =
      Math.PI * -0.49 + elapsedTime * Math.PI * 0.25;
  });

  useFrame(() => {
    if (muonLogoRef.current.rotation.y >= Math.PI / 2.1 && !goWild) {
      setGoWild(true);
      setTimeout(() => setGoWild(false), 100);
    }
  });

  return (
    <>
      {muonLogo}
      <spotLight castShadow color="magenta" position={[-1, 0, 5]} intensity={30} decay={1.3}  />
      <spotLight castShadow color="cyan" position={[1, 0, 5]} intensity={30} decay={1.3} />
      <EffectComposer>
        <ChromaticAberration
          radialModulation={false}
          modulationOffset={0.1}
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={new Vector2(0.005, 0.005)} // color offset
        />
        <Noise />
        <Scanline density={2.5} />
        <Glitch
          columns={0}
          perturbationMap={glitchTexture}
          delay={new Vector2(0.1, 3)} // min and max glitch delay
          duration={new Vector2(0.1, 0.3)} // min and max glitch duration
          strength={new Vector2(0.1, 0.5)} // min and max glitch strength
          mode={goWild ? GlitchMode.CONSTANT_WILD : GlitchMode.SPORADIC} // glitch mode
          active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
          ratio={0.25} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
        />
        <Bloom mipmapBlur luminanceThreshold={0} intensity={2} />
      </EffectComposer>
    </>
  );
};

export default MuonLogoSpinScene;
