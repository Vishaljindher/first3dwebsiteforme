function Spacecraft() {
  return (
    <group rotation={[0, 0, 0]}>

      {/* Main body */}
      <mesh>

        <boxGeometry
          args={[1.5, 0.55, 0.55]}
        />

        <meshStandardMaterial
          color="#d8dce5"
          metalness={0.6}
          roughness={0.3}
        />

      </mesh>

      {/* Cockpit */}
      <mesh position={[0.85, 0, 0]}>

        <sphereGeometry
          args={[0.3, 24, 24]}
        />

        <meshStandardMaterial
          color="#5f8cff"
          metalness={0.4}
          roughness={0.2}
        />

      </mesh>

      {/* Top wing */}
      <mesh position={[0, 0.38, 0]}>

        <boxGeometry
          args={[0.75, 0.08, 0.7]}
        />

        <meshStandardMaterial
          color="#777d89"
          metalness={0.5}
        />

      </mesh>

      {/* Bottom wing */}
      <mesh position={[0, -0.38, 0]}>

        <boxGeometry
          args={[0.75, 0.08, 0.7]}
        />

        <meshStandardMaterial
          color="#777d89"
          metalness={0.5}
        />

      </mesh>

      {/* Engine */}
      <mesh position={[-0.82, 0, 0]}>

        <sphereGeometry
          args={[0.16, 16, 16]}
        />

        <meshBasicMaterial
          color="#ff8a3d"
        />

      </mesh>

    </group>
  );
}

export default Spacecraft;