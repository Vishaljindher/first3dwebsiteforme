import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Stars from "../three/Stars";
import Spacecraft from "../three/Spacecraft";

function SpaceScene() {
  return (
    <section
      id="journey"
      className="space-scene"
    >

      <div className="scene-text">

        <p className="scene-label">
          CHAPTER 01 — THE BEGINNING
        </p>

        <h2>
          Every journey starts
          with a single step.
        </h2>

        <p>
          Far away from everything familiar,
          a small spacecraft begins its journey
          into the unknown.
        </p>

      </div>

      <div className="scene-container">

        <Canvas
          camera={{
            position: [0, 0, 7],
            fov: 50,
          }}
        >

          {/* Space lighting */}
          <ambientLight intensity={0.35} />

          <pointLight
            position={[3, 3, 3]}
            intensity={2}
          />

          {/* Star field */}
          <Stars />

          {/* Spacecraft */}
          <Spacecraft />

          {/* Mouse camera control */}
          <OrbitControls
            enablePan={false}
            minDistance={4}
            maxDistance={10}
          />

        </Canvas>

      </div>

    </section>
  );
}

export default SpaceScene;