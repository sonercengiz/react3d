// src/components/FBXModel.js
import React, { useRef } from 'react';
import { useLoader, useFrame } from 'react-three-fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const FBXModel = ({ path, position, scale }) => {
  const fbxRef = useRef();

  // FBXLoader kullanarak modeli yükleme
  const fbx = useLoader(FBXLoader, path);

  // İsteğe bağlı olarak animasyon veya döngü eklemek için useFrame kullanabilir
  useFrame(() => {
    // Örneğin: fbxRef.current.rotation.y += 0.01;
  });

  return <primitive object={fbx} ref={fbxRef} position={position} scale={scale} />;
};

export default FBXModel;