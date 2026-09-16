import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
} from "@react-three/drei";

import Bike from "./Bike";

export default function Scene() {
  const isMobile = window.innerWidth <= 600;

  return (
    <div className="scene-container">
      <Canvas
        camera={{
          position: isMobile
            ? [0, 0.5, 6.4]
            : [0, 0.5, 5],

          fov: isMobile ? 38 : 35,
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.25} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <directionalLight
          position={[-5, 2, -4]}
          intensity={3}
          color="#8f0d16"
        />

        <Bike />

        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.6}
          scale={10}
          blur={2.5}
          far={5}
        />

<Environment
  files="/environments/studio_small_03_1k.exr"
  background={false}
/>
      </Canvas>
    </div>
  );
}