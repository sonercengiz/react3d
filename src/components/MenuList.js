import React, { useState, useCallback, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useThree, useFrame } from "@react-three/fiber";
// import { useDrag } from "@use-gesture/react";
import { useDrag } from '@react-three/drei';
import { Leva, useControls } from "leva";
import { TextureLoader } from "three";
import { Html } from "@react-three/drei";

const DraggableMesh = () => {
  const [position, setPosition] = useState([0, 0, 0]);
  const bind = useDrag(({ offset }) => setPosition(offset));

  return (
    <mesh position={position} {...bind()}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="orange" />
    </mesh>
  );
};

const ImageItem = ({ id, url }) => {
  //   const [{ isDragging }, dragRef] = useDrag(() => ({
  //     type: "image",
  //     item: { id, url },
  //     collect: (monitor) => ({
  //       isDragging: !!monitor.isDragging(),
  //     }),
  //   }));

  return (
    <>
    <DraggableMesh />
    </>
    // <Html>
    //   <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
    //    <img src={url} alt={`Tablo ${id}`} width="100" />
    //   </div>
    // </Html>
  );
};

const ImageList = ({ images }) => {
  return (
    <>
      {images.map((image) => (
        <ImageItem key={image.id} id={image.id} url={image.url} />
      ))}
    </>
  );
};

const DraggableResizableImage = ({
  id,
  initialPosition = [0, 0, 0],
  imageUrl,
}) => {
  const meshRef = useRef();
  const { size, viewport } = useThree();
  const aspectRatio = size.width / viewport.width;

  // Sürükleme işlevselliği için useDrag hook'u
  const [position, setPosition] = React.useState(initialPosition);
  const bind = useDrag(
    ({ offset: [x, y] }) => {
      const newPosition = [x / aspectRatio, -y / aspectRatio, 0];
      setPosition(newPosition);
    },
    { initial: () => [position[0] * aspectRatio, -position[1] * aspectRatio] }
  );

  // Leva ile boyutlandırma kontrolleri
  const { scaleX, scaleY } = useControls("Controls", {
    scaleX: { value: 1, min: 0.1, max: 5, step: 0.1 },
    scaleY: { value: 1, min: 0.1, max: 5, step: 0.1 },
  });

  // Her frame'de tablonun konumunu ve boyutunu güncelle
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...position);
      meshRef.current.scale.set(scaleX, scaleY, 1);
    }
  });

  const texture = new TextureLoader().load(imageUrl);

  return (
    <mesh ref={meshRef} {...bind()}>
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshStandardMaterial attach="material" map={texture} />
      <Leva />
    </mesh>
  );
};

const MenuList = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const yourImagesArray = [
    {
      id: "image1",
      url: "https://www.mayfairgallery.com/media/the-classical-what-it-is-and-why-it-always-endures-1.jpg",
    },
    {
      id: "image2",
      url: "https://cdn.britannica.com/81/95781-050-24BA4F88/Toilette-Bride-canvas-oil-Ancient-Dress-collection-1777.jpg",
    },
    {
      id: "image3",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQioelT_FCwTy8Ii-VobvxD6jg6bMPPjbZ9vw&usqp=CAU",
    },
  ];

  const handleDrop = useCallback((item) => {
    setSelectedImage(item);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      {props.children}
      {selectedImage && (
        <DraggableResizableImage
          id={selectedImage.id}
          imageUrl={selectedImage.url}
        />
      )}
      <ImageList images={yourImagesArray} onDrop={handleDrop} />
    </DndProvider>
  );
};

export default MenuList;
