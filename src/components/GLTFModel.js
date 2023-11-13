// src/components/FBXModel.js
import React from 'react';
import { useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three'

const FBXModel = ({ path, position, scale }) => {

  // GLTFLoader kullanarak modeli yükleme
  const gltfRef = useLoader(GLTFLoader, path);

  // İsteğe bağlı olarak animasyon veya döngü eklemek için useFrame kullanabilir
  useFrame(() => {
    // Örneğin: fbxRef.current.rotation.y += 0.01;
  });

  return <primitive object={gltfRef} position={position} scale={scale} />;
};

export default FBXModel;