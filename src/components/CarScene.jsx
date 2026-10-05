import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Car from "./Car";

// ===============================
// CONFIG  (sirf yahin change karna)
// ===============================
const SPEED = 7; // road / trees / buildings ki speed

// Naya scene add karna ho? Bas yahan ek line daal do.
// Scroll ke hisaab se scenes automatic barabar hisson me bant jayenge.
// type: "trees" | "mountains" | "city"
const SCENES = [
  { type: "trees", leaf: "#214c32" },   // forest
  { type: "mountains" },
  { type: "city" },
  { type: "trees", leaf: "#102d36" },   // night
];

const ROAD = { y: -1, width: 8, pieceLength: 16, pieces: 5, color: "#292c35" };
const CAMERA = { position: [0, 2.5, 12], fov: 42 };

// ===============================
// REUSABLE SCROLLER
// children ko z-axis pe aage badhata hai aur loop karta hai
// ===============================
function Scroller({ speed = SPEED, limit = 5, loopLength, children }) {
  const group = useRef();

  useFrame((_, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.1); // tab switch ke baad jump nahi hoga

    group.current.children.forEach((child) => {
      child.position.z += dt * speed;
      if (child.position.z > limit) child.position.z -= loopLength;
    });
  });

  return <group ref={group}>{children}</group>;
}

// ===============================
// ROAD
// ===============================
function Road() {
  const { y, width, pieceLength: len, pieces, color } = ROAD;
  const edge = width / 2 - 0.3;

  const items = useMemo(
    () => Array.from({ length: pieces }, (_, i) => -i * len),
    [pieces, len]
  );

  return (
    <Scroller loopLength={pieces * len}>
      {items.map((z, i) => (
        <group key={i} position={[0, y, z]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width, len]} />
            <meshStandardMaterial color={color} />
          </mesh>

          {[-edge, edge].map((x) => (
            <mesh
              key={x}
              position={[x, 0.01, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[0.08, len]} />
              <meshBasicMaterial color="white" />
            </mesh>
          ))}

          {[-len / 3, 0, len / 3].map((dz, j) => (
            <mesh
              key={j}
              position={[0, 0.02, dz]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[0.12, 2.2]} />
              <meshBasicMaterial color="white" />
            </mesh>
          ))}
        </group>
      ))}
    </Scroller>
  );
}

// ===============================
// TREES
// ===============================
function Trees({ leaf = "#214c32", count = 18, spacing = 5 }) {
  const trees = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: i % 2 === 0 ? -5 : 5,
        z: -(i * spacing),
        scale: 0.7 + Math.random() * 0.6,
      })),
    [count, spacing]
  );

  return (
    <Scroller loopLength={count * spacing}>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, -0.2, t.z]} scale={t.scale}>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.12, 0.15, 1.4, 8]} />
            <meshStandardMaterial color="#493527" />
          </mesh>
          <mesh position={[0, 1.8, 0]}>
            <coneGeometry args={[0.9, 2.5, 8]} />
            <meshStandardMaterial color={leaf} />
          </mesh>
        </group>
      ))}
    </Scroller>
  );
}

// ===============================
// CITY
// ===============================
function City({ count = 14, spacing = 7 }) {
  const buildings = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: i % 2 === 0 ? -5 : 5,
        z: -(i * spacing),
        height: 2 + Math.random() * 4,
        width: 1.4 + Math.random() * 1.2,
      })),
    [count, spacing]
  );

  return (
    <Scroller loopLength={count * spacing}>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.height / 2 - 1, b.z]}>
          <boxGeometry args={[b.width, b.height, 2]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#283142" : "#353b4a"} />
        </mesh>
      ))}
    </Scroller>
  );
}

// ===============================
// MOUNTAINS
// ===============================
function Mountains() {
  return (
    <Scroller speed={2} limit={10} loopLength={40}>
      {[-10, -5, 0, 5, 10].map((x, i) => (
        <mesh key={i} position={[x, 1, -20 - i * 2]}>
          <coneGeometry args={[5, 8, 4]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#293b55" : "#354c68"} />
        </mesh>
      ))}
    </Scroller>
  );
}

// ===============================
// WORLD – SCENES config se khud decide karta hai
// ===============================
const WORLD_BY_TYPE = {
  trees: Trees,
  mountains: Mountains,
  city: City,
};

function World({ index }) {
  const { type, ...props } = SCENES[index] ?? SCENES[0];
  const Component = WORLD_BY_TYPE[type] ?? Trees;
  return <Component key={index} {...props} />;
}

// ===============================
// MAIN 3D SCENE
// ===============================
function Scene({ index }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={CAMERA.position} fov={CAMERA.fov} />

      <ambientLight intensity={1.3} />
      <directionalLight position={[5, 8, 5]} intensity={3} />
      <pointLight position={[0, 2, 3]} intensity={2} />

      <Road />
      <World index={index} />

      <Suspense fallback={null}>
        <Car />
      </Suspense>

      <Environment preset="night" />
    </>
  );
}

// ===============================
// SCROLL -> SCENE INDEX
// ===============================
function useScrollScene(total) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setIndex(Math.min(total - 1, Math.floor(progress * total)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [total]);

  return index;
}

// ===============================
// COMPONENT
// ===============================
export default function CarScene() {
  const index = useScrollScene(SCENES.length);

  return (
    <div className="car-scene-wrapper">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Scene index={index} />
      </Canvas>
    </div>
  );
}