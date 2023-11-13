import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { Vector2, MathUtils } from "three";
import { useEffect } from "react";
import { useStore } from "../hooks/useStore";

const Teleport = () => {
  const pivotY = useRef();
  const pivotX = useRef();
  const offset = useRef();
  const circleRef = useRef();
  const circleEffectRef = useRef();
  const date = useRef(0);
  const dragVector = useMemo(() => new Vector2(), []);
  const { orbitmode, setOrbitmode, autoRotate, setAutoRotate, to } = useStore(
    (state) => state
  );

  useEffect(() => {
    const onPointerMove = (e) => {
      dragVector.set(e.movementX, e.movementY);

      if (e.buttons) {
        if (orbitmode) {
          setAutoRotate(false);
          pivotX.current.rotation.x -= e.movementY / 1000;
          pivotY.current.rotation.y -= ((dragVector.x / 5) * Math.PI) / 180;
        } else {
          pivotX.current.rotation.x += ((dragVector.y / 10) * Math.PI) / 180;
          pivotY.current.rotation.y += ((dragVector.x / 10) * Math.PI) / 180;
        }
      }
    };
    document.addEventListener("pointermove", onPointerMove);
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
    };
  });
  useFrame((_, delta) => {
    // console.log(orbitmode)
    // if (orbitmode) {
    //   offset.current.position.z = MathUtils.lerp(offset.current.position.z, 4, delta * 2)
    //   autoRotate && (pivotY.current.rotation.y += delta / 2)
    // } else {
    //   offset.current.position.z = MathUtils.lerp(offset.current.position.z, 0, delta * 2)
    // }

    pivotY.current.position.lerp(to, delta * 2); // varış hızı
    // circleEffectRef.current.material.opacity > 0.02
    //   ? (circleEffectRef.current.material.opacity -= delta * 0.5)
    //   : (circleEffectRef.current.visible = false)
  });

  return (
    <>
      <group ref={pivotY}>
        <group ref={pivotX}>
          <group ref={offset}>
            <PerspectiveCamera makeDefault />
          </group>
        </group>
      </group>
      <mesh
        visible={false}
        rotation-x={-Math.PI / 2}
        position={[0, -0.1, 0]}
        onPointerMove={({ point }) => {
          circleRef.current.position.z = point.z;
          circleRef.current.position.x = point.x;
        }}
        onPointerDown={() => {
          date.current = Date.now();
        }}
        onPointerUp={({ point }) => {
          if (Date.now() - date.current < 200) {
            // a quick click
            setOrbitmode(false);
            to.set(point.x, 1, point.z);
            circleEffectRef.current.position.copy(circleRef.current.position);
            circleEffectRef.current.material.opacity = 0.99;
            circleEffectRef.current.visible = true;
          }
        }}
      >
        <planeGeometry args={[19.4, 19.4]} />
        {/* <meshPhongMaterial color="green" /> */}
      </mesh>
      <mesh ref={circleRef} rotation-x={-Math.PI / 2} position-y={0.011}>
        <ringGeometry args={[0.3, 0.4]} />
        <meshBasicMaterial color={0x000000} transparent opacity={0.25} />
      </mesh>
      <mesh ref={circleEffectRef} rotation-x={-Math.PI / 2} position-y={0.01}>
        <ringGeometry args={[0, 0.3]} />
        <meshBasicMaterial color={0x000000} transparent />
      </mesh>
    </>
  );
};

export default Teleport;
