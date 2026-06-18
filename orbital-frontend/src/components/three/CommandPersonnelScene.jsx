import { useRef, useMemo, useState, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

import avatarLeft from '/assets/crew/avatar-left.png';
import avatarCenter from '/assets/crew/avatar-center.png';
import avatarRight from '/assets/crew/avatar-right.png';

const AVATAR_POSITIONS = {
  left: { x: -2.6, y: 0.15, z: 0 },
  center: { x: 0, y: 0.15, z: 0.3 },
  right: { x: 2.6, y: 0.15, z: 0 },
};

const AVATAR_DATA = {
  left: {
    role: 'SYSTEM ARCHITECT',
    capabilities: ['Backend Engineering', 'Infrastructure Systems', 'Security Protocols', 'Performance Architecture'],
    texture: avatarLeft,
    color: '#1B6FE8',
    accentColor: '#38D9F5',
    scale: 1,
  },
  center: {
    role: 'COMMAND DIRECTOR',
    capabilities: ['Strategic Leadership', 'Mission Coordination', 'Client Relations', 'Growth Strategy'],
    texture: avatarCenter,
    color: '#38D9F5',
    accentColor: '#1B6FE8',
    scale: 1.18,
  },
  right: {
    role: 'AI OPERATIONS',
    capabilities: ['AI Automation', 'Agent Systems', 'Workflow Intelligence', 'Future Technologies'],
    texture: avatarRight,
    color: '#1B6FE8',
    accentColor: '#38D9F5',
    scale: 1,
  },
};

function BackgroundGrid() {
  const ref = useRef();

  const gridGeo = useMemo(() => {
    const size = 14;
    const divisions = 28;
    const halfSize = size / 2;
    const step = size / divisions;
    const vertices = [];

    for (let i = 0; i <= divisions; i++) {
      const pos = -halfSize + i * step;
      vertices.push(pos, -1.8, -halfSize);
      vertices.push(pos, -1.8, halfSize);
      vertices.push(-halfSize, -1.8, pos);
      vertices.push(halfSize, -1.8, pos);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, []);

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.position.z = camera.position.z;
    }
  });

  return (
    <lineSegments ref={ref} geometry={gridGeo}>
      <lineBasicMaterial
        color="#1B6FE8"
        transparent
        opacity={0.03}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function SignalPulse({ color, hovered, scale }) {
  const groupRef = useRef();
  const rings = useMemo(() => [0, 1, 2], []);

  const ringGeos = useMemo(() => {
    return rings.map(() => {
      const pts = [];
      const segments = 64;
      const radius = 0.7;
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
      }
      return new THREE.BufferGeometry().setFromPoints(pts);
    });
  }, [rings]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const speedMul = hovered ? 2.2 : 1;
    groupRef.current.children.forEach((child, i) => {
      const basePhase = (performance.now() * 0.0008 + i * 2.1) % (Math.PI * 2);
      const expand = 0.85 + Math.sin(basePhase) * 0.35;
      child.scale.setScalar(expand);
      child.material.opacity = hovered
        ? 0.15 * (1 - Math.abs(Math.sin(basePhase)))
        : 0.06 * (1 - Math.abs(Math.sin(basePhase)));
    });
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {ringGeos.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial
            color={new THREE.Color(color)}
            transparent
            opacity={0.06}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  );
}

function RadialGlow({ color, hovered, scale }) {
  const meshRef = useRef();
  const glowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.04)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const pulse = 0.07 + Math.sin(performance.now() * 0.002) * 0.03;
    meshRef.current.material.opacity = hovered ? pulse * 2.5 : pulse;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -0.15]} scale={[scale * 2.2, scale * 2.2, 1]}>
      <planeGeometry args={[2.5, 3.2]} />
      <meshBasicMaterial
        map={glowTexture}
        color={new THREE.Color(color)}
        transparent
        opacity={0.07}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function CurvedAvatarPlane({ texturePath, scale }) {
  const meshRef = useRef();
  const texture = useTexture(texturePath);
  const flickerRef = useRef(0);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1.2, 1.8, 32, 32);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * Math.PI * 0.7) * 0.18 + Math.cos(y * 1.2) * 0.06;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    flickerRef.current += delta;
    const flicker = 0.88 + Math.sin(flickerRef.current * 7.3) * 0.04 + Math.sin(flickerRef.current * 13.7) * 0.03 + Math.sin(flickerRef.current * 3.1) * 0.02;
    meshRef.current.material.opacity = flicker;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={[scale, scale, scale]}>
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.88}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function GlowPlane({ color, scale }) {
  const meshRef = useRef();

  const glowGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1.5, 2.1, 32, 32);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * Math.PI * 0.7) * 0.18 + Math.cos(y * 1.2) * 0.06;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.material.opacity = 0.04 + Math.sin(performance.now() * 0.0015) * 0.02;
  });

  return (
    <mesh ref={meshRef} geometry={glowGeo} position={[0, 0, -0.05]} scale={[scale, scale, scale]}>
      <meshBasicMaterial
        color={new THREE.Color(color)}
        transparent
        opacity={0.04}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function HUDRings({ color, hovered, scale }) {
  const groupRef = useRef();
  const rings = useMemo(() => [
    { radius: 0.75, speed: 0.4, opacity: 0.12, rotation: [0, 0, 0] },
    { radius: 0.85, speed: -0.3, opacity: 0.09, rotation: [0.3, 0.2, 0] },
    { radius: 0.95, speed: 0.25, opacity: 0.06, rotation: [0.5, 0.1, 0] },
    { radius: 1.05, speed: -0.2, opacity: 0.04, rotation: [0.7, 0.3, 0] },
    { radius: 1.15, speed: 0.15, opacity: 0.03, rotation: [0.9, 0.4, 0] },
  ], []);

  const ringGeometries = useMemo(() => {
    return rings.map(({ radius }) => {
      const pts = [];
      const segments = 96;
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
      }
      return new THREE.BufferGeometry().setFromPoints(pts);
    });
  }, [rings]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const speedMultiplier = hovered ? 2.5 : 1;
    groupRef.current.children.forEach((child, i) => {
      if (rings[i]) {
        child.rotation.z += delta * rings[i].speed * speedMultiplier;
      }
    });
    const target = hovered ? 1.3 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(target, target, target),
      0.08
    );
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {ringGeometries.map((geo, i) => (
        <line key={i} geometry={geo} rotation={rings[i].rotation}>
          <lineBasicMaterial
            color={new THREE.Color(color)}
            transparent
            opacity={rings[i].opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  );
}

function ScanLine({ color, hovered, scale }) {
  const lineRef = useRef();
  const glowRef = useRef();
  const secondLineRef = useRef();

  useFrame((_, delta) => {
    if (!lineRef.current) return;
    const speed = hovered ? 2.5 : 1.2;
    lineRef.current.position.y += delta * speed * 0.8;
    if (lineRef.current.position.y > 1.2) lineRef.current.position.y = -1.2;
    if (glowRef.current) {
      glowRef.current.position.y = lineRef.current.position.y;
      glowRef.current.material.opacity = hovered ? 0.35 : 0.12;
    }
    if (secondLineRef.current) {
      secondLineRef.current.position.y = -lineRef.current.position.y;
      secondLineRef.current.material.opacity = hovered ? 0.12 : 0.04;
    }
  });

  const lineGeo = useMemo(() => {
    const pts = [new THREE.Vector3(-0.7, 0, 0), new THREE.Vector3(0.7, 0, 0)];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  const glowGeo = useMemo(() => {
    return new THREE.PlaneGeometry(1.5, 0.03);
  }, []);

  return (
    <group scale={[scale, scale, scale]}>
      <line ref={lineRef} geometry={lineGeo}>
        <lineBasicMaterial
          color={new THREE.Color(color)}
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </line>
      <line ref={secondLineRef} geometry={lineGeo}>
        <lineBasicMaterial
          color={new THREE.Color(color)}
          transparent
          opacity={0.04}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </line>
      <mesh ref={glowRef} geometry={glowGeo}>
        <meshBasicMaterial
          color={new THREE.Color(color)}
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function FloatingParticles({ color, hovered, count = 80 }) {
  const ref = useRef();
  const velocitiesRef = useRef();

  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2.4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    velocitiesRef.current = vel;
    return { positions: pos };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const geo = ref.current.geometry;
    const pos = geo.attributes.position.array;
    const vel = velocitiesRef.current;
    const speed = hovered ? 2.8 : 1;

    for (let i = 0; i < count; i++) {
      pos[i * 3] += vel[i * 3] * speed;
      pos[i * 3 + 1] += vel[i * 3 + 1] * speed;
      pos[i * 3 + 2] += vel[i * 3 + 2] * speed;

      if (Math.abs(pos[i * 3]) > 1.2) pos[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 1.5) pos[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 0.4) pos[i * 3 + 2] *= -1;
    }
    geo.attributes.position.needsUpdate = true;
    ref.current.material.opacity = hovered ? 0.55 : 0.22;
    ref.current.material.size = hovered ? 0.025 : 0.018;
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
        size={0.018}
        color={new THREE.Color(color)}
        transparent
        opacity={0.22}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function RadarSweep({ color, hovered, scale }) {
  const groupRef = useRef();

  const arcGeo = useMemo(() => {
    const pts = [];
    const segments = 64;
    const radius = 0.65;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 0.5;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
    }
    pts.unshift(new THREE.Vector3(0, 0, 0));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const speed = hovered ? 4 : 1.5;
    groupRef.current.rotation.z += delta * speed;
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <line geometry={arcGeo}>
        <lineBasicMaterial
          color={new THREE.Color(color)}
          transparent
          opacity={0.2}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </line>
    </group>
  );
}

function EnergyBeam({ startX, endX, color, hovered }) {
  const lineRef = useRef();
  const points = useMemo(() => {
    const pts = [];
    const segments = 40;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = startX + (endX - startX) * t;
      const y = 0.15 + Math.sin(t * Math.PI) * 0.6;
      const z = 0.15 + Math.sin(t * Math.PI) * 0.2;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [startX, endX]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  useFrame(() => {
    if (!lineRef.current) return;
    const pulse = 0.2 + Math.sin(performance.now() * 0.003) * 0.1;
    lineRef.current.material.opacity = hovered ? pulse * 2 : pulse;
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={new THREE.Color(color)}
        transparent
        opacity={0.2}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
}

function EnergyBeamParticles({ startX, endX, color, hovered }) {
  const ref = useRef();
  const count = 20;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const x = startX + (endX - startX) * t;
      const y = 0.15 + Math.sin(t * Math.PI) * 0.6;
      const z = 0.15 + Math.sin(t * Math.PI) * 0.2;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      vel[i] = (Math.random() - 0.5) * 0.015;
    }
    return { positions: pos, velocities: vel };
  }, [startX, endX, count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const geo = ref.current.geometry;
    const pos = geo.attributes.position.array;
    const speed = hovered ? 2.5 : 1;

    for (let i = 0; i < count; i++) {
      const t = (pos[i * 3] - startX) / (endX - startX);
      let newT = t + velocities[i] * delta * speed;
      if (newT > 1) newT = 0;
      if (newT < 0) newT = 1;
      pos[i * 3] = startX + (endX - startX) * newT;
      pos[i * 3 + 1] = 0.15 + Math.sin(newT * Math.PI) * 0.6;
      pos[i * 3 + 2] = 0.15 + Math.sin(newT * Math.PI) * 0.2;
    }
    geo.attributes.position.needsUpdate = true;
    ref.current.material.opacity = hovered ? 0.5 : 0.18;
    ref.current.material.size = hovered ? 0.04 : 0.025;
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
        size={0.025}
        color={new THREE.Color(color)}
        transparent
        opacity={0.18}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function DataStreamRings({ color, hovered, scale }) {
  const groupRef = useRef();
  const count = 3;

  const ringData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      radius: 0.55 + i * 0.15,
      speed: 0.3 + i * 0.2,
      offset: (i / count) * Math.PI * 2,
      segments: 48,
    }));
  }, [count]);

  const geometries = useMemo(() => {
    return ringData.map(({ radius }) => {
      const pts = [];
      for (let j = 0; j <= 48; j++) {
        const angle = (j / 48) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
      }
      return new THREE.BufferGeometry().setFromPoints(pts);
    });
  }, [ringData]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const speedMul = hovered ? 2.5 : 1;
    groupRef.current.children.forEach((child, i) => {
      if (ringData[i]) {
        child.rotation.y += delta * ringData[i].speed * speedMul;
      }
    });
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {geometries.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial
            color={new THREE.Color(color)}
            transparent
            opacity={0.06}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  );
}

function HolographicAvatar({ position, data, hovered }) {
  const groupRef = useRef();
  const floatRef = useRef({ offset: Math.random() * Math.PI * 2 });

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    floatRef.current.offset += delta * 0.4;
    const floatY = Math.sin(floatRef.current.offset) * 0.08;
    const floatX = Math.cos(floatRef.current.offset * 0.7) * 0.04;
    groupRef.current.position.y = position.y + floatY;
    groupRef.current.position.x = position.x + floatX;
    const targetRotY = hovered ? 0.4 : 0.08;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.1;
  });

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <RadialGlow color={data.color} hovered={hovered} scale={data.scale} />
      <GlowPlane color={data.color} scale={data.scale} />
      <CurvedAvatarPlane texturePath={data.texture} scale={data.scale} />
      <HUDRings color={data.accentColor} hovered={hovered} scale={data.scale} />
      <DataStreamRings color={data.color} hovered={hovered} scale={data.scale} />
      <SignalPulse color={data.accentColor} hovered={hovered} scale={data.scale} />
      <ScanLine color={data.accentColor} hovered={hovered} scale={data.scale} />
      <RadarSweep color={data.accentColor} hovered={hovered} scale={data.scale} />
      <FloatingParticles color={data.accentColor} hovered={hovered} count={80} />
    </group>
  );
}

function CommandCenterScene({ hoveredAvatar, mouseRef }) {
  const groupRef = useRef();
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame(({ mouse }) => {
    if (!groupRef.current) return;
    mouseRef.current = { x: mouse.x, y: mouse.y };
    targetRot.current.x = mouse.y * 0.08;
    targetRot.current.y = mouse.x * 0.12;
    groupRef.current.rotation.x += (targetRot.current.x - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.y += (targetRot.current.y - groupRef.current.rotation.y) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 1, 2]} intensity={0.5} color="#1B6FE8" />
      <pointLight position={[-2, 0, 1.5]} intensity={0.3} color="#38D9F5" />
      <pointLight position={[2, 0, 1.5]} intensity={0.3} color="#38D9F5" />

      <BackgroundGrid />

      {Object.entries(AVATAR_POSITIONS).map(([key, position]) => (
        <HolographicAvatar
          key={key}
          position={position}
          data={AVATAR_DATA[key]}
          hovered={hoveredAvatar === key}
        />
      ))}

      <EnergyBeam
        startX={AVATAR_POSITIONS.left.x}
        endX={AVATAR_POSITIONS.center.x}
        color="#1B6FE8"
        hovered={hoveredAvatar === 'left' || hoveredAvatar === 'center'}
      />
      <EnergyBeamParticles
        startX={AVATAR_POSITIONS.left.x}
        endX={AVATAR_POSITIONS.center.x}
        color="#1B6FE8"
        hovered={hoveredAvatar === 'left' || hoveredAvatar === 'center'}
      />
      <EnergyBeam
        startX={AVATAR_POSITIONS.center.x}
        endX={AVATAR_POSITIONS.right.x}
        color="#38D9F5"
        hovered={hoveredAvatar === 'center' || hoveredAvatar === 'right'}
      />
      <EnergyBeamParticles
        startX={AVATAR_POSITIONS.center.x}
        endX={AVATAR_POSITIONS.right.x}
        color="#38D9F5"
        hovered={hoveredAvatar === 'center' || hoveredAvatar === 'right'}
      />
    </group>
  );
}

function CommandPersonnelCanvas({ hoveredAvatar, onHoverZone }) {
  const canvasRef = useRef();

  const handleMouseMove = useCallback((e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const third = rect.width / 3;

    if (localX < third) {
      onHoverZone('left');
    } else if (localX < third * 2) {
      onHoverZone('center');
    } else {
      onHoverZone('right');
    }
  }, [onHoverZone]);

  const handleMouseLeave = useCallback(() => {
    onHoverZone(null);
  }, [onHoverZone]);

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.3, 5.5], fov: 50, near: 0.1, far: 30 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <CommandCenterScene hoveredAvatar={hoveredAvatar} mouseRef={{ current: { x: 0, y: 0 } }} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function CommandPersonnel() {
  const [hoveredAvatar, setHoveredAvatar] = useState(null);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef();
  const roleRefs = useRef({});
  const capsRefs = useRef({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.cp-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      tl.fromTo(
        '.cp-role',
        { opacity: 0, scale: 0.8, filter: 'blur(8px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.15,
          ease: 'back.out(1.5)',
        },
        '-=0.4'
      );

      tl.fromTo(
        '.cp-subtitle',
        { opacity: 0, letterSpacing: '0.3em' },
        {
          opacity: 1,
          letterSpacing: '0.15em',
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.5'
      );

      tl.fromTo(
        '.cp-cap',
        { opacity: 0, x: -6 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    Object.entries(roleRefs.current).forEach(([key, el]) => {
      if (!el) return;
      if (key === hoveredAvatar) {
        gsap.to(el, {
          y: -8,
          scale: key === 'center' ? 1.08 : 1.05,
          color: '#38D9F5',
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        gsap.to(el, {
          y: 0,
          scale: 1,
          color: '',
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    });

    Object.entries(capsRefs.current).forEach(([key, list]) => {
      if (!list) return;
      if (key === hoveredAvatar) {
        gsap.to(list.children, {
          opacity: 1,
          x: 0,
          color: '#B0C4DE',
          duration: 0.3,
          stagger: 0.04,
          ease: 'power2.out',
        });
      } else {
        gsap.to(list.children, {
          opacity: 0.35,
          x: 0,
          color: '',
          duration: 0.3,
          stagger: 0.02,
          ease: 'power2.in',
        });
      }
    });
  }, [hoveredAvatar, mounted]);

  const handleHoverZone = useCallback((zone) => {
    setHoveredAvatar(zone);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 px-6 md:px-10 lg:px-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight/10 to-transparent pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(27,111,232,0.3) 2px, rgba(27,111,232,0.3) 2.5px)',
            backgroundSize: '100% 4px',
          }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto relative">
        <div className="cp-header mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-electric-cyan/40" />
            <span className="text-[11px] font-mono text-electric-cyan/60 tracking-[0.15em] uppercase">
              Crew Manifest
            </span>
          </div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-soft-white">
            Command Personnel
          </h2>
          <p className="cp-subtitle text-[13px] font-mono text-electric-cyan/40 tracking-[0.15em] uppercase mt-3">
            Three Minds. One Mission. Infinite Possibilities.
          </p>
        </div>

        <div className="relative h-[420px] md:h-[500px]">
          <CommandPersonnelCanvas
            hoveredAvatar={hoveredAvatar}
            onHoverZone={handleHoverZone}
          />

          <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none">
            <div className="flex justify-between w-full max-w-[640px] px-4">
              {Object.entries(AVATAR_DATA).map(([key, { role, capabilities }]) => (
                <div
                  key={key}
                  className="flex flex-col items-center"
                  style={{ width: '33.33%' }}
                >
                  <p
                    ref={(el) => { roleRefs.current[key] = el; }}
                    className="cp-role text-[11px] md:text-[12px] font-mono font-bold text-electric-cyan/80 tracking-[0.2em] uppercase text-center mb-2"
                  >
                    {role}
                  </p>
                  <ul
                    ref={(el) => { capsRefs.current[key] = el; }}
                    className="space-y-1"
                  >
                    {capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="cp-cap text-[10px] font-mono text-text-muted/40 tracking-[0.05em] text-center"
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}