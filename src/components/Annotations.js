import { useState } from "react";
import { useThree } from "@react-three/fiber";
import {
  Html,
  useProgress,
} from "@react-three/drei";
import TWEEN from "@tweenjs/tween.js";

const annotations = [
  {
    title: "Bathroom Sink",
    // description: "<p>Bathroom Sink is good for washing your hands</p>",
    camPos: {
      x: 6.61,
      y: 4.89,
      z: 1.37,
    },
    lookAt: {
      x: 7.37,
      y: 4.27,
      z: 0.36,
    },
  },
  {
    title: "Bath",
    camPos: {
      x: 10.13,
      y: -1.11,
      z: 1.98,
    },
    lookAt: {
      x: 10.70,
      y: -1.11,
      z: 0.2,
    },
  },
  {
    title: "Sky Light",
    camPos: {
      x: 13.05,
      y: 4.35,
      z: 5.06,
    },
    lookAt: {
      x: 11,
      y: 2.7,
      z: 3.42,
    },
  },
];

function Annotations({ controls }) {
  const { camera } = useThree();
  const [selected, setSelected] = useState(-1);

  return (
    <>
      {annotations.map((a, i) => {
        return (
          <Html key={i} position={[a.lookAt.x, a.lookAt.y, a.lookAt.z]}>
            <svg
              height="34"
              width="34"
              transform="translate(-16 -16)"
              style={{ cursor: "pointer" }}
            >
              <circle
                cx="17"
                cy="17"
                r="16"
                stroke="white"
                strokeWidth="2"
                fill="rgba(0,0,0,.66)"
                onPointerDown={() => {
                  setSelected(i);
                  // change target
                  new TWEEN.Tween(controls.current.target)
                    .to(
                      {
                        x: a.lookAt.x,
                        y: a.lookAt.y,
                        z: a.lookAt.z,
                      },
                      1000
                    )
                    .easing(TWEEN.Easing.Cubic.Out)
                    .start();

                  // change camera position
                  new TWEEN.Tween(camera.position)
                    .to(
                      {
                        x: a.camPos.x,
                        y: a.camPos.y,
                        z: a.camPos.z,
                      },
                      1000
                    )
                    .easing(TWEEN.Easing.Cubic.Out)
                    .start();
                }}
              />
              <text
                x="12"
                y="22"
                fill="white"
                fontSize={17}
                fontFamily="monospace"
                style={{ pointerEvents: "none" }}
              >
                {i + 1}
              </text>
            </svg>
            {a.description && i === selected && (
              <div
                id={"desc_" + i}
                className="annotationDescription"
                dangerouslySetInnerHTML={{ __html: a.description }}
              />
            )}
          </Html>
        );
      })}
    </>
  );
}



const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default Annotations;
