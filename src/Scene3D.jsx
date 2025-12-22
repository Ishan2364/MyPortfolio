import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot, MeshTransmissionMaterial, Float, Environment, Icosahedron, Octahedron, Sphere, Wireframe } from '@react-three/drei';

// --- COMPONENT 1: HERO GLASS KNOT (High-End Architecture) ---
const GlassShape = () => {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if(meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <TorusKnot ref={meshRef} args={[1, 0.35, 100, 16]}>
        <MeshTransmissionMaterial 
          backside={false} samples={4} thickness={0.2} roughness={0} 
          chromaticAberration={0.3} anisotropy={0.3} distortion={0.3} 
          distortionScale={0.3} temporalDistortion={0.5} color="#a5b4fc"
        />
      </TorusKnot>
    </Float>
  );
};

export const Hero3D = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 5]} intensity={2} />
    <Environment preset="city" />
    <GlassShape />
  </Canvas>
);


// --- COMPONENT 2: SKILL GEOMETRY (Floating Primitives) ---
const RotatingShapes = () => {
  const g1 = useRef();
  const g2 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if(g1.current) { g1.current.rotation.y = t * 0.5; g1.current.rotation.z = t * 0.3; }
    if(g2.current) { g2.current.rotation.x = -t * 0.4; g2.current.rotation.y = t * 0.2; }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Icosahedron ref={g1} args={[1, 0]} position={[-1.5, 0, 0]}>
          <meshStandardMaterial color="#2563eb" wireframe />
        </Icosahedron>
      </Float>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Octahedron ref={g2} args={[1, 0]} position={[1.5, 0.5, 0]}>
          <meshStandardMaterial color="#06b6d4" wireframe />
        </Octahedron>
      </Float>
    </group>
  );
};

export const Skills3D = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
    <ambientLight intensity={0.5} />
    <RotatingShapes />
  </Canvas>
);


// --- COMPONENT 3: CONTACT GLOBE (Wireframe Earth) ---
const WireframeGlobe = () => {
  const ref = useRef();
  useFrame((state) => {
    if(ref.current) ref.current.rotation.y += 0.005;
  });

  return (
    <Sphere ref={ref} args={[1.5, 32, 32]}>
      <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.2} />
    </Sphere>
  );
};

export const Contact3D = () => (
  <Canvas camera={{ position: [0, 0, 4] }}>
    <WireframeGlobe />
  </Canvas>
);


// --- COMPONENT 4: FOOTER ORB (Pulsing Core) ---
const PulsingOrb = () => {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scale = 1 + Math.sin(t * 2) * 0.2;
    if(ref.current) ref.current.scale.set(scale, scale, scale);
  });
  return (
    <Sphere ref={ref} args={[1, 16, 16]}>
      <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} toneMapped={false} />
    </Sphere>
  );
};

export const Footer3D = () => (
  <Canvas camera={{ position: [0, 0, 3] }}>
    <PulsingOrb />
  </Canvas>
);