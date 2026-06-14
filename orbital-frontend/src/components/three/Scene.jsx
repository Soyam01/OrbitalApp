import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLenis } from '../layout/LenisProvider';

export default function Scene({ children, className = '', ...props }) {
  return (
    <div className={`fixed inset-0 z-0 pointer-events-none ${className}`} {...props}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {children}
      </Canvas>
    </div>
  );
}

export function ScrollScene({ children, scrollSpeed = 0.5, ...props }) {
  const groupRef = useRef();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const unsubscribe = lenis.on('scroll', ({ scroll, limit }) => {
      if (groupRef.current) {
        const progress = scroll / limit;
        groupRef.current.position.y = -progress * 3 * scrollSpeed;
        groupRef.current.rotation.y = progress * Math.PI * 0.5;
      }
    });

    return () => unsubscribe();
  }, [lenis, scrollSpeed]);

  return (
    <group ref={groupRef} {...props}>
      {children}
    </group>
  );
}