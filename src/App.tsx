import "./App.css";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div className="canvas-container">
      <Canvas>
        <mesh>
          <ambientLight intensity={100} />
          <directionalLight color="blue" position={[0, 0, 5]} />
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
