import { Canvas } from "@react-three/fiber";

const Visualizer = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <mesh>
          <ambientLight intensity={0.2} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Visualizer;
