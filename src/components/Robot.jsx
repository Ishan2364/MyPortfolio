import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const Robot = () => {
  const headGroupRef = useRef(null);
  const bodyRef = useRef(null);
  
  // Pivot Groups (The "Shoulders")
  const leftShoulderRef = useRef(null);
  const rightShoulderRef = useRef(null);
  
  const mouthRef = useRef(null);
  const eyelidsRef = useRef(null); 

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
    roughness: 0.2,
    metalness: 0.8,
  }), []);

  const glowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d8b4fe',
    emissive: '#c084fc', 
    emissiveIntensity: 4, 
    toneMapped: false, 
  }), []);

  const eyelidMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#000000', // Must match screen color exactly
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

  // --- ANIMATION LOOP ---
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const smoothFactor = 15 * delta; 

    // 1. IDLE BODY MOVEMENT
    if (bodyRef.current && headGroupRef.current) {
      const bobOffset = Math.sin(t * 2) * 0.05;
      
      // Body Bobs
      bodyRef.current.position.y = THREE.MathUtils.lerp(bodyRef.current.position.y, -0.6 + bobOffset, smoothFactor);
      
      // Head Follows
      headGroupRef.current.position.y = THREE.MathUtils.lerp(headGroupRef.current.position.y, 0.6 + bobOffset, smoothFactor);
      headGroupRef.current.rotation.z = Math.sin(t * 1.5) * 0.02; // Tiny head sway

      // Shoulders Follow Body
      if (leftShoulderRef.current && rightShoulderRef.current) {
          const shoulderY = -0.3 + bobOffset;
          leftShoulderRef.current.position.y = THREE.MathUtils.lerp(leftShoulderRef.current.position.y, shoulderY, smoothFactor);
          rightShoulderRef.current.position.y = THREE.MathUtils.lerp(rightShoulderRef.current.position.y, shoulderY, smoothFactor);
      }
    }

    // 2. RIGHT ARM WAVE (From Shoulder Pivot)
    if (rightShoulderRef.current) {
        if (hovered) {
            // WAVE: Rotate shoulder UP (Z) and oscillate (Z)
            const wave = Math.sin(t * 12) * 0.3; // Fast wave
            const targetRotZ = 2.5 + wave; // Arm raised high
            
            rightShoulderRef.current.rotation.z = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.z, targetRotZ, smoothFactor * 0.5);
        } else {
            // IDLE: Arm down
            rightShoulderRef.current.rotation.z = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.z, -0.1, smoothFactor * 0.5);
        }
    }

    // 3. SMILE LOGIC
    if (mouthRef.current) {
        const targetScale = hovered ? 1 : 0;
        const s = THREE.MathUtils.lerp(mouthRef.current.scale.x, targetScale, smoothFactor);
        mouthRef.current.scale.set(s, s, s);
    }

    // 4. EYE SHAPE LOGIC
    if (eyelidsRef.current) {
        // Default Y = -0.15 (Hidden inside/below the eye)
        // Smile Y  = -0.02 (Covers bottom 30% of eye)
        // Blink Y  =  0.05 (Covers full eye)
        
        let targetY = -0.15; // Hidden by default
        
        if (blinking) targetY = 0.06;
        else if (hovered) targetY = -0.02;

        eyelidsRef.current.position.y = THREE.MathUtils.lerp(eyelidsRef.current.position.y, targetY, smoothFactor * 2);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)}
        scale={1.7} 
      >
        
        {/* --- HEAD GROUP --- */}
        <group ref={headGroupRef} position={[0, 0.6, 0]}>
            {/* White Shell */}
            <mesh scale={[1.15, 0.85, 0.95]}>
                <sphereGeometry args={[0.6, 64, 64]} />
                <primitive object={plasticMaterial} attach="material" />
            </mesh>
            
            {/* Black Screen */}
            <mesh position={[0, 0, 0.16]} scale={[1.15, 0.8, 0.8]}>
                <sphereGeometry args={[0.55, 64, 64]} />
                <primitive object={screenMaterial} attach="material" />
            </mesh>

            {/* FACE FEATURES */}
            <group position={[0, 0, 0.7]} rotation={[0, 0, 0]}>
                
                {/* EYES (Full Ovals) */}
                <group name="eyes">
                    <mesh position={[-0.18, 0.05, 0]} scale={[1, 1.4, 0.1]}>
                        <sphereGeometry args={[0.08, 32, 32]} />
                        <primitive object={glowMaterial} attach="material" />
                    </mesh>
                    <mesh position={[0.18, 0.05, 0]} scale={[1, 1.4, 0.1]}>
                        <sphereGeometry args={[0.08, 32, 32]} />
                        <primitive object={glowMaterial} attach="material" />
                    </mesh>
                </group>

                {/* EYELIDS (The Cutter) */}
                {/* These sit slightly in front of eyes (Z=0.05) to block them */}
                <group ref={eyelidsRef} position={[0, -0.15, 0.05]}>
                    <mesh position={[-0.18, 0, 0]} scale={[1.1, 1.4, 0.1]}>
                        <sphereGeometry args={[0.085, 32, 32]} />
                        <primitive object={eyelidMaterial} attach="material" />
                    </mesh>
                    <mesh position={[0.18, 0, 0]} scale={[1.1, 1.4, 0.1]}>
                        <sphereGeometry args={[0.085, 32, 32]} />
                        <primitive object={eyelidMaterial} attach="material" />
                    </mesh>
                </group>

                {/* MOUTH */}
                <group ref={mouthRef} position={[0, -0.1, 0]} scale={[0,0,0]}>
                    {/* Rotated PI on Z makes a U shape. Rotated slightly X (-0.2) to match face curve */}
                    <mesh rotation={[-0.2, 0, Math.PI]}>
                        {/* arc = Math.PI creates perfect semi-circle */}
                        <torusGeometry args={[0.12, 0.025, 16, 32, Math.PI]} /> 
                        <primitive object={glowMaterial} attach="material" />
                    </mesh>
                </group>

            </group>
        </group>
        
        {/* --- BODY --- */}
        <mesh ref={bodyRef} position={[0, -0.6, 0]} scale={[1, 1.5, 1]}>
            <sphereGeometry args={[0.55, 64, 64]} />
            <primitive object={plasticMaterial} attach="material" />
        </mesh>

        {/* --- ARMS (Using Shoulder Pivot Logic) --- */}
        
        {/* Left Shoulder (Pivot Point) */}
        <group ref={leftShoulderRef} position={[-0.65, -0.3, 0]}>
            {/* Actual Arm Mesh (Shifted down so pivot is at top) */}
            <mesh position={[0, -0.25, 0]}>
                <capsuleGeometry args={[0.09, 0.5, 4, 16]} />
                <primitive object={plasticMaterial} attach="material" />
            </mesh>
        </group>

        {/* Right Shoulder (Pivot Point) */}
        <group ref={rightShoulderRef} position={[0.65, -0.3, 0]}>
            {/* Actual Arm Mesh */}
            <mesh position={[0, -0.25, 0]}>
                <capsuleGeometry args={[0.09, 0.5, 4, 16]} />
                <primitive object={plasticMaterial} attach="material" />
            </mesh>
        </group>

      </group>
    </Float>
  );
};

export default Robot;