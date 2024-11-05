import {
  ChromaticAberration,
  EffectComposer,
  Glitch,
  Noise,
  Scanline,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  Clock,
  DoubleSide,
  ExtrudeGeometry,
  Mesh,
  TextureLoader,
  Vector2,
} from "three";
import { SVGLoader } from "three/examples/jsm/Addons.js";

const MuonLogoSpinScene = () => {
  const muonLogoRef = useRef<Mesh>(null!);
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
        ref={muonLogoRef}
        position={[0, 0, -180]}
      >
        <meshNormalMaterial side={DoubleSide} />
      </mesh>
    );

    return muonLogoMesh;
  }, [shapes]);

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    muonLogoRef.current.rotation.y = elapsedTime * Math.PI * 0.25;
  });

  return (
    <>
      <color attach={"background"} args={["black"]} />
      <EffectComposer>
        <ChromaticAberration
          radialModulation={false}
          modulationOffset={0.1}
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={new Vector2(0.004, 0.004)} // color offset
        />
        <Noise />
        <Scanline density={1.5} />
        <Glitch
          columns={0}
          perturbationMap={glitchTexture}
          delay={new Vector2(0.1, 3)} // min and max glitch delay
          duration={new Vector2(0.1, 0.3)} // min and max glitch duration
          strength={new Vector2(0.1, 0.5)} // min and max glitch strength
          mode={GlitchMode.SPORADIC} // glitch mode
          active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
          ratio={0.75} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
        />
      </EffectComposer>
      {muonLogo}
    </>
  );
};

export default MuonLogoSpinScene;
