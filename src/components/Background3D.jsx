import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const VoxelField = ({ isDark }) => {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const ROWS = 40;
  const COLS = 40;
  const SPACING = 0.6;

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * 0.4;
    let i = 0;
    for (let x = 0; x < ROWS; x++) {
      for (let z = 0; z < COLS; z++) {
        const xPos = (x - ROWS / 2) * SPACING;
        const zPos = (z - COLS / 2) * SPACING;
        const yPos = 
          Math.sin(x / 4 + time) * Math.sin(z / 4 + time) * 1.5 + 
          Math.sin(x / 2 + time * 2) * 0.5;

        dummy.position.set(xPos, yPos - 4, zPos - 12);
        const scale = 1 + Math.max(0, yPos * 0.5);
        dummy.scale.set(1, scale, 1);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        i++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, ROWS * COLS]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial 
        // MATCHING YOUR CSS VARIABLES EXACTLY
        // Dark: #0f172a (bg-base), Light: #f8fafc (bg-base)
        color={isDark ? "#0f172a" : "#f8fafc"} 
        // Dark: #38bdf8 (accent), Light: #2563eb (accent)
        emissive={isDark ? "#38bdf8" : "#2563eb"} 
        emissiveIntensity={isDark ? 2.0 : 0.6} 
        roughness={0.2}
        metalness={0.8}
      />
    </instancedMesh>
  );
};

const Background3D = ({ isDark }) => {
  const bgColor = isDark ? '#0f172a' : '#f8fafc'; 
  
  return (
    <div className="fixed-canvas">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }} gl={{ antialias: false }}>
        <color attach="background" args={[bgColor]} />
        <ambientLight intensity={isDark ? 0.1 : 0.6} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.5 : 1} color="#60a5fa" />
        <VoxelField isDark={isDark} />
        <fog attach="fog" args={[bgColor, 5, 25]} />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={isDark ? 1.5 : 0.5} radius={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Background3D;