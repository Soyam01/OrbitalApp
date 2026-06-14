import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GridPlane() {
  const ref = useRef();

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.position.z = camera.position.z;
    }
  });

  return (
    <gridHelper
      ref={ref}
      args={[20, 40, '#132544', '#0A1A30']}
      position={[0, -4, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function DataNodes({ count = 30 }) {
  const ref = useRef();

  const positions = (() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return arr;
  })();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      const pos = ref.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += Math.sin(performance.now() * 0.001 + i) * 0.001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#1B6FE8"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function CommandCenterScene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <GridPlane />
      <DataNodes />
    </>
  );
}