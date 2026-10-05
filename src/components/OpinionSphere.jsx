import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#6c8cff" />
    </mesh>
  );
}

function OpinionSphere() {
  return (
    <section className="sphere-section">

      <div className="sphere-heading">
        <p>INTERACTIVE WORLD</p>
        <h2>Explore Opinions</h2>
      </div>

      <div className="sphere-container">

        <Canvas camera={{ position: [0, 0, 6] }}>

          <ambientLight intensity={1} />

          <directionalLight
            position={[3, 3, 3]}
            intensity={2}
          />

          <Sphere />

          <OrbitControls />

        </Canvas>

      </div>

    </section>
  );
}

export default OpinionSphere;