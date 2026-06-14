import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function OrbitalRing({ radius, color, opacity = 0.15, rotation = [0, 0, 0], segments = 128, speed = 0.1 }) {
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * speed;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
    }
    return pts;
  }, [radius, segments]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    return g;
  }, [points]);

  return (
    <line ref={ringRef} geometry={geometry} rotation={rotation}>
      <lineBasicMaterial color={color} transparent opacity={opacity} linewidth={1} />
    </line>
  );
}

function OrbitingNode({ orbitRadius, orbitSpeed, nodeSize = 0.04, color, trailLength = 60, phase = 0 }) {
  const groupRef = useRef();
  const trailRef = useRef();
  const trailPositions = useRef([]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const time = performance.now() * 0.001 * orbitSpeed + phase;
    const x = Math.cos(time) * orbitRadius;
    const y = Math.sin(time) * orbitRadius;

    groupRef.current.position.set(x, y, 0);

    trailPositions.current.push(new THREE.Vector3(x, y, 0));
    if (trailPositions.current.length > trailLength) {
      trailPositions.current.shift();
    }

    if (trailRef.current && trailPositions.current.length > 1) {
      const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPositions.current);
      trailRef.current.geometry.dispose();
      trailRef.current.geometry = trailGeo;
    }
  });

  const trailGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]);
    return g;
  }, []);

  return (
    <group>
      <mesh ref={groupRef}>
        <sphereGeometry args={[nodeSize, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0, 0, orbitRadius * 0.3]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[nodeSize * 2, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      <line ref={trailRef} geometry={trailGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </line>
    </group>
  );
}

function StarField({ count = 600 }) {
  const ref = useRef();

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      siz[i] = Math.random() * 2 + 0.5;
    }
    return { positions: pos, sizes: siz };
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015;
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
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#F0F4FF"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function DataStreamParticles({ count = 200 }) {
  const ref = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame(({ mouse }) => {
    if (!ref.current) return;
    const geo = ref.current.geometry;
    const pos = geo.attributes.position.array;

    mouseRef.current.x += (mouse.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouse.y - mouseRef.current.y) * 0.05;

    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3] + mouseRef.current.x * 0.002;
      pos[i * 3 + 1] += velocities[i * 3 + 1] + mouseRef.current.y * 0.002;
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(pos[i * 3]) > 6) pos[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 4) pos[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 2) pos[i * 3 + 2] *= -1;
    }
    geo.attributes.position.needsUpdate = true;
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
        size={0.02}
        color="#38D9F5"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CoreGlow() {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(performance.now() * 0.001) * 0.05);
      if (meshRef.current.material) {
        meshRef.current.material.opacity = 0.15 + Math.sin(performance.now() * 0.002) * 0.05;
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshBasicMaterial color="#1B6FE8" transparent opacity={0.15} />
    </mesh>
  );
}

export default function OrbitalSystem() {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.02;
      groupRef.current.rotation.y += delta * 0.03;
    }
  });

  const rings = useMemo(() => [
    { radius: 1.2, color: '#1B6FE8', opacity: 0.12, speed: 0.08 },
    { radius: 2.0, color: '#1B6FE8', opacity: 0.08, speed: 0.05, rotation: [0.3, 0.5, 0] },
    { radius: 2.8, color: '#38D9F5', opacity: 0.06, speed: 0.03, rotation: [0.5, 0.3, 0] },
    { radius: 3.6, color: '#1B6FE8', opacity: 0.04, speed: 0.02, rotation: [0.8, 0.1, 0] },
  ], []);

  const nodes = useMemo(() => [
    { orbitRadius: 1.2, orbitSpeed: 0.4, nodeSize: 0.04, color: '#38D9F5', phase: 0 },
    { orbitRadius: 1.2, orbitSpeed: 0.35, nodeSize: 0.03, color: '#1B6FE8', phase: Math.PI * 0.7 },
    { orbitRadius: 2.0, orbitSpeed: 0.25, nodeSize: 0.05, color: '#38D9F5', phase: Math.PI * 0.3 },
    { orbitRadius: 2.0, orbitSpeed: 0.2, nodeSize: 0.035, color: '#1B6FE8', phase: Math.PI * 1.2 },
    { orbitRadius: 2.8, orbitSpeed: 0.15, nodeSize: 0.045, color: '#38D9F5', phase: Math.PI * 0.5 },
    { orbitRadius: 2.8, orbitSpeed: 0.12, nodeSize: 0.03, color: '#1B6FE8', phase: Math.PI * 1.5 },
    { orbitRadius: 3.6, orbitSpeed: 0.08, nodeSize: 0.04, color: '#38D9F5', phase: 0 },
  ], []);

  return (
    <group ref={groupRef}>
      <CoreGlow />
      {rings.map((ring, i) => (
        <OrbitalRing key={i} {...ring} />
      ))}
      {nodes.map((node, i) => (
        <OrbitingNode key={i} {...node} />
      ))}
      <StarField count={500} />
      <DataStreamParticles count={150} />
    </group>
  );
}