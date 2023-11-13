import React from 'react';
import { useFrame } from 'react-three-fiber';

const Wall = ({ position, meshRef }) => {
  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh position={position} ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 0.1]} />
      <meshStandardMaterial attach="material" color="gray" />
    </mesh>
  );
};

export default Wall;