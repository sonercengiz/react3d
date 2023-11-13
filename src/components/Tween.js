import TWEEN from "@tweenjs/tween.js";
import { useFrame } from "@react-three/fiber";

const Tween = () => {
  useFrame(() => {
    TWEEN.update();
  });
};

export default Tween;
