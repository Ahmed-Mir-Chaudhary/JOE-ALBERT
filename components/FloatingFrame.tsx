
import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useCursor, Image } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingFrameProps {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export const FloatingFrame: React.FC<FloatingFrameProps> = ({ url, position, rotation = [0, 0, 0], scale = [1, 1, 1] }) => {
  const meshRef = useRef<THREE.Group>(null!);
  const [hovered, setHover] = useState(false);

  useCursor(hovered);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    // Gentle floating
    // meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.1;

    // Interactive tilting with dampening
    const targetRotX = rotation[0] - y * 0.1;
    const targetRotY = rotation[1] + x * 0.1;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.05);
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Main Image */}
      <Image
        url={url}
        transparent
        opacity={0.9}
        scale={[2, 3]}
        toneMapped={false}
      />

      {/* Gold Frame Border */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[2.1, 3.1, 0.05]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Backing Board */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[2.08, 3.08, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Glass Reflection Simulation (Subtle) */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2, 3]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.1}
          roughness={0}
          metalness={0.9}
          clearcoat={1}
          color="white"
        />
      </mesh>
    </group>
  );
};
