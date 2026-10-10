import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Generates a soft radial glow texture for circular star & nebula particles
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
 * Responsive 3D Animated Milky Way Spiral Galaxy
 * Automatically adapts scale, camera distance, and touch/scroll parallax for mobile & desktop.
 */
function MilkyWayGalaxy({ pointerRef, isMobile }) {
  const galaxyGroupRef = useRef();
  const galaxyPointsRef = useRef();
  const dustPointsRef = useRef();
  const { size, camera } = useThree();
  const starTexture = useMemo(() => createStarTexture(), []);

  // Dynamically adjust camera position for portrait mobile screens vs desktop widescreen
  useEffect(() => {
    const mobilePortrait = size.width < 768;
    camera.position.set(0, mobilePortrait ? 3.0 : 2.4, mobilePortrait ? 9.4 : 7.2);
    camera.updateProjectionMatrix();
  }, [size.width, camera]);

  // 1. Primary Milky Way Spiral Arms (Adaptive particle count for 60fps mobile GPU)
  const { positions, colors } = useMemo(() => {
    const count = isMobile ? 5000 : 9000;
    const branches = 5;
    const radius = 10.5;
    const spin = 1.35;
    const randomness = 0.55;
    const randomnessPower = 2.8;

    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const coreColor = new THREE.Color('#FFF4E0');
    const midColor = new THREE.Color('#00F5FF');
    const outerColor = new THREE.Color('#8A2BE2');
    const accentColor = new THREE.Color('#FF007F');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
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
        (0.25 + r * 0.08);
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        (0.4 + r * 0.25);

      pos[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      pos[i3 + 1] = randomY;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

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
  }, [isMobile]);

  // 2. Soft Nebula Dust Cloud along the Milky Way plane
  const { dustPositions, dustColors } = useMemo(() => {
    const count = isMobile ? 650 : 1200;
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
  }, [isMobile]);

  useFrame((_, delta) => {
    if (galaxyPointsRef.current) {
      galaxyPointsRef.current.rotation.y += delta * 0.055;
    }
    if (dustPointsRef.current) {
      dustPointsRef.current.rotation.y += delta * 0.04;
    }

    if (galaxyGroupRef.current) {
      const targetRotX = 0.62 + pointerRef.current.y * 0.14;
      const targetRotZ = (size.width < 768 ? -0.38 : -0.24) + pointerRef.current.x * 0.14;

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

  // Scale galaxy down slightly on narrow mobile screens so the entire spiral disc fits in portrait view
  const responsiveScale = size.width < 480 ? 0.65 : size.width < 768 ? 0.78 : 1;

  return (
    <group
      ref={galaxyGroupRef}
      scale={responsiveScale}
      position={[size.width < 768 ? 0 : 0.35, 0.1, -1.5]}
      rotation={[0.62, 0.1, size.width < 768 ? -0.38 : -0.24]}
    >
      {/* Galactic Core Soft Halo */}
      <mesh>
        <sphereGeometry args={[1.1, 24, 24]} />
        <meshBasicMaterial
          color="#00F5FF"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Milky Way Spiral Star Particles */}
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
          size={isMobile ? 0.12 : 0.095}
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
          size={isMobile ? 0.42 : 0.38}
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
  const pointerRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleMouseMove = (e) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    // Mobile Touch & Scroll Parallax so the 3D Galaxy responds on smartphones
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        pointerRef.current = {
          x: (touch.clientX / window.innerWidth) * 2 - 1,
          y: -(touch.clientY / window.innerHeight) * 2 + 1
        };
      }
    };

    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const scrollRatio = (window.scrollY / maxScroll) * 2 - 1;
      pointerRef.current.y = scrollRatio * 0.65;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] z-0 pointer-events-none overflow-hidden bg-[#020205]">
      {/* Subtle Deep-Space Milky Way Nebula Glow (Responsive size for mobile & desktop) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] lg:w-[900px] h-[260px] sm:h-[380px] -rotate-12 rounded-full opacity-20 blur-[110px] sm:blur-[150px]"
        style={{
          background:
            'linear-gradient(90deg, #00F5FF 0%, #8A2BE2 50%, #FF007F 100%)'
        }}
      />

      {/* 3D Animated Milky Way Spiral Galaxy Canvas */}
      <Canvas
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        camera={{ position: [0, 2.4, 7.2], fov: 52 }}
        dpr={[1, 1.5]}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#020205', 6, 19]} />
        <MilkyWayGalaxy pointerRef={pointerRef} isMobile={isMobile} />
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
