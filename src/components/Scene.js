import { Canvas } from "react-three-fiber";
import { Stats, OrbitControls } from "@react-three/drei";

// import Interior from './Interior';
import HouseWater from "./HouseWater";
import Lights from "./Lights";
import Annotations from "./Annotations";
import Tween from "./Tween";
import { useRef } from "react";
import Teleport from "./Teleport";
import { Luksev } from "./Luksev";
import MenuList from "./MenuList";

const Scene = () => {
  const ref = useRef();

  return (
    <Canvas camera={{ position: [3, 3, 3] }} shadows>
      <MenuList>
        <Teleport />
        {/* <OrbitControls ref={ref} /> */}
        <Lights />
        <MenuList />

        {/* <HouseWater /> */}
        <Luksev />
        {/* <Annotations controls={ref} /> */}
        {/* <Tween /> */}

        <Stats />
      </MenuList>
    </Canvas>
  );
};

export default Scene;
