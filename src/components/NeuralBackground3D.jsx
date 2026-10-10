import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Generates a soft radial glow texture for circular star & nebula particles
 * (eliminates harsh square WebGL points).
 */
function createStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.25, 'rgba(200, 245, 255, 0.75)');
  gradient.addColorStop(0.6, 'rgba(138, 43, 226, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

/**
 * 3D Animated Milky Way Spiral Galaxy (Low-Opacity, Smooth 60FPS)
 */
function MilkyWayGalaxy({ mouseRef }) {
  const galaxyGroupRef = useRef();
  const galaxyPointsRef = useRef();
  const dustPointsRef = useRef();
  const starTexture = useMemo(() => createStarTexture(), []);

  // 1. Primary Milky Way Spiral Arms (9,500 stars)
  const { positions, colors } = useMemo(() => {
    const count = 9500;
    const branches = 5; // 5 classic Milky Way spiral arms
    const radius = 10.5;
    const spin = 1.35;
    const randomness = 0.55;
    const randomnessPower = 2.8;

    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const coreColor = new THREE.Color('#FFF4E0'); // Warm bright galactic core
    const midColor = new THREE.Color('#00F5FF');  // Neural cyan spiral arms
    const outerColor = new THREE.Color('#8A2BE2'); // Deep cosmic violet outer halo
    const accentColor = new THREE.Color('#FF007F'); // Subtle magenta star clusters

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Bias slightly toward center for a realistic galactic bulge
      const r = Math.pow(Math.random(), 1.35) * radius;
      const spinAngle = r * spin;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        (0.4 + r * 0.25);
      const randomY =
        Math.pow(Math.random(), randomnessPower + 0.6) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        (0.25 + r * 0.08); // Thin galactic disc
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        (0.4 + r * 0.25);

      pos[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      pos[i3 + 1] = randomY;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // Smooth color interpolation from core -> spiral arms -> outer rim
      const ratio = r / radius;
      const mixedColor = coreColor.clone();
      if (ratio < 0.35) {
        mixedColor.lerp(midColor, ratio / 0.35);
      } else {
        mixedColor.copy(midColor).lerp(outerColor, (ratio - 0.35) / 0.65);
      }
      if (i % 17 === 0) {
        mixedColor.lerp(accentColor, 0.45);
      }

      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }

    return { positions: pos, colors: col };
  }, []);

  // 2. Soft Nebula Dust Cloud along the Milky Way plane (1,200 larger soft particles)
  const { dustPositions, dustColors } = useMemo(() => {
    const count = 1200;
    const branches = 5;
    const radius = 9.0;
    const spin = 1.35;

    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const c1 = new THREE.Color('#00F5FF');
    const c2 = new THREE.Color('#7B2CBF');
    const c3 = new THREE.Color('#4361EE');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * radius;
      const spinAngle = r * spin;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;

      pos[i3] =
        Math.cos(branchAngle + spinAngle) * r + (Math.random() - 0.5) * 1.6;
      pos[i3 + 1] = (Math.random() - 0.5) * 0.65;
      pos[i3 + 2] =
        Math.sin(branchAngle + spinAngle) * r + (Math.random() - 0.5) * 1.6;

      const c = i % 3 === 0 ? c1 : i % 2 === 0 ? c2 : c3;
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    return { dustPositions: pos, dustColors: col };
  }, []);

  useFrame((_, delta) => {
    // Slow, majestic galactic rotation
    if (galaxyPointsRef.current) {
      galaxyPointsRef.current.rotation.y += delta * 0.055;
    }
    if (dustPointsRef.current) {
      dustPointsRef.current.rotation.y += delta * 0.04;
    }

    // Smooth 3D tilt parallax reacting to cursor & scroll
    if (galaxyGroupRef.current) {
      const targetRotX = 0.58 + mouseRef.current.y * 0.14;
      const targetRotZ = -0.24 + mouseRef.current.x * 0.14;

      galaxyGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        galaxyGroupRef.current.rotation.x,
        targetRotX,
        0.03
      );
      galaxyGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        galaxyGroupRef.current.rotation.z,
        targetRotZ,
        0.03
      );
    }
  });

  return (
    <group
      ref={galaxyGroupRef}
      position={[0.4, 0.1, -1.5]}
      rotation={[0.58, 0.1, -0.24]}
    >
      {/* Galactic Core Soft Halo */}
      <mesh>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial
          color="#00F5FF"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Milky Way Spiral Star Particles (Low-Opacity, Crisp Circular Glow) */}
      <points ref={galaxyPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.095}
          map={starTexture}
          vertexColors
          transparent
          opacity={0.44}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Soft Cosmic Nebula Dust along the Spiral Arms */}
      <points ref={dustPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustPositions.length / 3}
            array={dustPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={dustColors.length / 3}
            array={dustColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.38}
          map={starTexture}
          vertexColors
          transparent
          opacity={0.09}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function NeuralBackground3D() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020205]">
      {/* Subtle Deep-Space Milky Way Nebula Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[420px] -rotate-12 rounded-full opacity-20 blur-[150px]"
        style={{
          background:
            'linear-gradient(90deg, #00F5FF 0%, #8A2BE2 50%, #FF007F 100%)'
        }}
      />

      {/* 3D Animated Milky Way Spiral Galaxy Canvas */}
      <Canvas
        camera={{ position: [0, 2.4, 7.2], fov: 52 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#020205', 6, 18]} />
        <MilkyWayGalaxy mouseRef={mouseRef} />
      </Canvas>

      {/* Low-Opacity Vignette Overlay so Foreground Content Stays Crystal Clear */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(2, 2, 5, 0.15) 0%, rgba(2, 2, 5, 0.68) 100%)'
        }}
      />
    </div>
  );
}
