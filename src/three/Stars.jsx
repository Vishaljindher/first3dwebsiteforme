import { useMemo } from "react";

function Stars() {
  const positions = useMemo(() => {
    const count = 1000;
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      array[i] = (Math.random() - 0.5) * 30;
    }

    return array;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.035}
        color="white"
        sizeAttenuation
      />
    </points>
  );
}

export default Stars;