
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingFrameProps {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export const FloatingFrame: React.FC<FloatingFrameProps> = ({ url, position, rotation = [0, 0, 0], scale = [1, 1, 1] }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, url);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer; // Normalized pointer: -1 to +1

    // Sophisticated floating animation logic
    const floatOffset = Math.sin(t * 0.4 + position[0]) * 0.3;
    const driftRotation = Math.cos(t * 0.25) * 0.08;

    // Pronounced Interactive Parallax
    // depthFactor ensures frames at different depths move at different speeds for a true 3D feel.
    // Frames closer to the camera (higher Z) move more aggressively.
    const depthFactor = 1.2 + (position[2] * 0.4); 
    
    const targetX = position[0] + x * 1.4 * depthFactor;
    const targetY = position[1] + floatOffset + y * 1.4 * depthFactor;
    const targetZ = position[2] + (Math.abs(x) + Math.abs(y)) * 0.8;

    // Smoothly interpolate to target position with a cinematic damping
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.04);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.04);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.04);

    // Highly responsive rotation tilt based on mouse movement
    const targetRotY = rotation[1] + driftRotation + x * 0.3;
    const targetRotX = rotation[0] - y * 0.3;
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.06);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.06);
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[2.2, 3.2]} />
      {/* Frame border mesh with subtle depth */}
      <mesh position={[0, 0, -0.015]}>
        <planeGeometry args={[2.35, 3.35]} />
        <meshBasicMaterial color="white" />
      </mesh>
      {/* Subtle drop shadow plane for extra depth perception */}
      <mesh position={[0.1, -0.1, -0.03]} scale={[1.05, 1.05, 1]}>
        <planeGeometry args={[2.2, 3.2]} />
        <meshBasicMaterial color="black" transparent opacity={0.15} />
      </mesh>
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent opacity={0.98} />
    </mesh>
  );
};
