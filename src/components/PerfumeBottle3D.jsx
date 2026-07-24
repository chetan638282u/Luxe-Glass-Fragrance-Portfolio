import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Bottle({ activeColor = "#ebc166" }) {
  const bottleRef = useRef();
  const liquidRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Soft floating animation
    if (bottleRef.current) {
      bottleRef.current.position.y = Math.sin(t * 1.5) * 0.15;
      bottleRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <group ref={bottleRef} position={[0, -0.5, 0]}>
      {/* 1. PEDESTAL (Obsidian Slab) */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[3, 0.3, 3]} />
        <meshStandardMaterial 
          color="#0a0907" 
          roughness={0.1} 
          metalness={0.9} 
        />
      </mesh>

      {/* 2. PERFUME LIQUID (Inner body) */}
      <mesh ref={liquidRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 1.6, 32]} />
        <meshStandardMaterial
          color={activeColor}
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* 3. GLASS BOTTLE BODY (Outer shell with refractive transmission) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 1.8, 8, 1, false]} />
        {/* We use MeshPhysicalMaterial to simulate luxury glass */}
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.03}
          metalness={0.1}
          transmission={0.9} // Glass transparency
          ior={1.52} // Index of refraction for glass
          thickness={0.15} // Thickness of the glass wall
          transparent
          opacity={0.3}
          clearcoat={1.0}
          clearcoatRoughness={0.03}
        />
      </mesh>

      {/* 4. NECK COLLAR (Gold) */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.2, 32]} />
        <meshStandardMaterial 
          color="#c9a24b" 
          roughness={0.15} 
          metalness={0.9} 
        />
      </mesh>

      {/* 5. METALLIC GOLD CAP */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.5, 32]} />
        <meshStandardMaterial 
          color="#c9a24b" 
          roughness={0.1} 
          metalness={0.9} 
        />
      </mesh>

      {/* 6. Gold Logo Plaque on Front */}
      <mesh position={[0, -0.1, 0.71]}>
        <boxGeometry args={[0.5, 0.3, 0.02]} />
        <meshStandardMaterial 
          color="#c9a24b" 
          roughness={0.15} 
          metalness={0.9} 
        />
      </mesh>
    </group>
  );
}

export default function PerfumeBottle3D({ activeColor = "#ebc166" }) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={50} />
        
        {/* Editorial lighting setup */}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#eae1d7" />
        <pointLight position={[-5, 5, -5]} intensity={0.8} color="#ebc166" />
        <directionalLight position={[0, 10, 0]} intensity={1.0} color="#ffffff" />
        <spotLight 
          position={[0, 5, 3]} 
          angle={0.3} 
          penumbra={1} 
          intensity={2.0} 
          castShadow 
          color="#ebc166"
        />

        <Bottle activeColor={activeColor} />
        
        <OrbitControls 
          enableZoom={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.8} 
        />
      </Canvas>
      
      {/* Editorial floating highlight rings */}
      <div className="absolute inset-0 pointer-events-none border border-primary/5 rounded-full scale-[0.8] animate-pulse duration-10000"></div>
      <div className="absolute inset-0 pointer-events-none border border-primary/10 rounded-full scale-[0.9] rotate-45"></div>
    </div>
  );
}
