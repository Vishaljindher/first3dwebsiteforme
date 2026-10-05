import { forwardRef, useLayoutEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ===============================
// CONFIG  (sirf yahin change karna, logic mat chhedna)
// ===============================
export const CAR_CONFIG = {
  modelPath: "/models/car.glb", // koi bhi .glb daalo, auto-fit ho jayega
  targetSize: 4,                // car ki longest side itni badi dikhegi
  bottomY: -0.15,               // car ke neeche ka point (world Y) – road ke hisaab se
  rotationY: Math.PI,           // car ka facing direction
  offset: [0, 0, 0],            // extra x, y, z nudge (optional)
};

const Car = forwardRef(function Car(props, forwardedRef) {
  const { modelPath, targetSize, bottomY, rotationY, offset } = {
    ...CAR_CONFIG,
    ...props,
  };

  const { scene } = useGLTF(modelPath);

  // clone: same model dobara use ho to bhi alag instance rahe
  const model = useMemo(() => scene.clone(true), [scene]);

  const innerRef = useRef();
  const groupRef = forwardedRef || innerRef;

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // 1) Reset – taaki effect kitni bhi baar chale (StrictMode, hot reload)
    //    result same rahe, position/scale jama na ho
    group.scale.setScalar(1);
    group.position.set(0, 0, 0);
    group.rotation.set(0, rotationY, 0);
    group.updateWorldMatrix(true, true);

    // 2) Size normalize
    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    group.scale.setScalar(targetSize / maxDim);
    group.updateWorldMatrix(true, true);

    // 3) Center + road pe baithao
    const fitted = new THREE.Box3().setFromObject(group);
    const center = fitted.getCenter(new THREE.Vector3());

    group.position.set(
      -center.x + offset[0],
      bottomY - fitted.min.y + offset[1],
      -center.z + offset[2]
    );
  }, [model, groupRef, targetSize, bottomY, rotationY, offset]);

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
});

useGLTF.preload(CAR_CONFIG.modelPath);

export default Car;