import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, Float } from '@react-three/drei';
import * as THREE from 'three';

const Robot = () => {
  const headGroupRef = useRef(null);
  const bodyRef = useRef(null);
  const armLeftRef = useRef(null);
  const armRightRef = useRef(null);
  const mouthRef = useRef(null);

  const [hovered, setHover] = useState(false);
  const [blinking, setBlinking] = useState(false);

  // --- MATERIALS ---
  const plasticMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    roughness: 0.2,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  }), []);

  const screenMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#000000',
    roughness: 0.1,
    metalness: 0.8,
  }), []);

  const glowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#d8b4fe',
    toneMapped: false, 
  }), []);

  // --- BLINK LOGIC ---
  useEffect(() => {
    let timeout;
    const triggerBlink = () => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 150); 
        timeout = setTimeout(triggerBlink, Math.random() * 4000 + 2000);
    };
    triggerBlink();
    return () => clearTimeout(timeout);
  }, []);

  // --- ANIMATION LOOP (Lag Fixed) ---
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    // FIX 1: High speed factor (40) makes it snap instantly to the cursor
    const smoothFactor = 40 * delta; 

    // 1. HEAD TRACKING
    if (headGroupRef.current) {
        // Look Left/Right
        const targetRotY = state.pointer.x * 0.5; 
        // Look Up/Down
        const targetRotX = -state.pointer.y * 0.3;

        // Apply rotation quickly
        headGroupRef.current.rotation.y = THREE.MathUtils.lerp(headGroupRef.current.rotation.y, targetRotY, smoothFactor);
        headGroupRef.current.rotation.x = THREE.MathUtils.lerp(headGroupRef.current.rotation.x, targetRotX, smoothFactor);
        
        // Idle sway (Constant)
        headGroupRef.current.rotation.z = Math.sin(t * 1.5) * 0.03;
    }

    // 2. IDLE FLOATING
    if (bodyRef.current) {
      const bobOffset = Math.sin(t * 2) * 0.05;
      bodyRef.current.position.y = THREE.MathUtils.lerp(bodyRef.current.position.y, -0.5 + bobOffset, smoothFactor);
      
      if (headGroupRef.current) {
         headGroupRef.current.position.y = THREE.MathUtils.lerp(headGroupRef.current.position.y, 0.7 + bobOffset, smoothFactor);
      }
      
      const armY = -0.2 - bobOffset;
      if (armLeftRef.current) armLeftRef.current.position.y = THREE.MathUtils.lerp(armLeftRef.current.position.y, armY, smoothFactor);
      if (armRightRef.current) armRightRef.current.position.y = THREE.MathUtils.lerp(armRightRef.current.position.y, armY, smoothFactor);
    }

    // 3. SMILE ANIMATION
    if (mouthRef.current) {
        const targetScale = hovered ? 1 : 0;
        const s = THREE.MathUtils.lerp(mouthRef.current.scale.x, targetScale, smoothFactor * 0.5); // Slower smile looks friendlier
        mouthRef.current.scale.set(s, s, s);
    }

    // 4. BLINKING
    const eyes = headGroupRef.current?.getObjectByName("eyes");
    if (eyes) {
        const targetEyeY = blinking ? 0.05 : 1;
        eyes.scale.y = THREE.MathUtils.lerp(eyes.scale.y, targetEyeY, smoothFactor * 2);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)}
        scale={1.7} // Locked size
      >
        
        {/* HEAD */}
        <group ref={headGroupRef} position={[0, 0.7, 0]}>
          <Sphere args={[0.6, 64, 64]} scale={[1.15, 0.85, 0.95]}>
            <primitive object={plasticMaterial} attach="material" />
          </Sphere>
          
          <Sphere args={[0.55, 64, 64]} position={[0, 0, 0.16]} scale={[1.15, 0.8, 0.8]}>
             <primitive object={screenMaterial} attach="material" />
          </Sphere>

          <group position={[0, 0, 0.7]} rotation={[0, 0, 0]}>
              <group name="eyes">
                <Sphere args={[0.07, 32, 32]} position={[-0.18, 0.05, 0]} scale={[1.2, 1.5, 0.1]}>
                    <primitive object={glowMaterial} attach="material" />
                </Sphere>
                <Sphere args={[0.07, 32, 32]} position={[0.18, 0.05, 0]} scale={[1.2, 1.5, 0.1]}>
                    <primitive object={glowMaterial} attach="material" />
                </Sphere>
              </group>

              <group ref={mouthRef} position={[0, -0.1, 0]} scale={[0,0,0]}>
                 <Torus args={[0.12, 0.03, 16, 32, Math.PI]} rotation={[0, 0, Math.PI]}>
                    <primitive object={glowMaterial} attach="material" />
                 </Torus>
              </group>
          </group>
        </group>
        
        {/* Neck */}
        <cylinderGeometry args={[0.1, 0.1, 0.2, 32]} position={[0, 0.1, 0]} />
        <meshStandardMaterial color="#222" metalness={0.8} />

        {/* Body */}
        <Sphere ref={bodyRef} args={[0.55, 64, 64]} position={[0, -0.5, 0]} scale={[1, 1.6, 1]}>
          <primitive object={plasticMaterial} attach="material" />
        </Sphere>

        {/* Arms */}
        <group>
          <Sphere ref={armLeftRef} args={[0.12, 32, 32]} position={[-0.7, -0.2, 0]} scale={[0.8, 2.8, 0.8]} rotation={[0, 0, 0.2]}>
             <primitive object={plasticMaterial} attach="material" />
          </Sphere>
          <Sphere ref={armRightRef} args={[0.12, 32, 32]} position={[0.7, -0.2, 0]} scale={[0.8, 2.8, 0.8]} rotation={[0, 0, -0.2]}>
             <primitive object={plasticMaterial} attach="material" />
          </Sphere>
        </group>

      </group>
    </Float>
  );
};

export default Robot;