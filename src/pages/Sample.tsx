import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import BACK from "assets/back.jpg";
import DESK from "assets/desk.jpg";
import FRONT from "assets/front.jpg";

import styles from "styles/pages/Sample.module.css";
import { TextureLoader } from "three";

const Sample = () => {
  const frontMap = useLoader(TextureLoader, FRONT);
  const backMap = useLoader(TextureLoader, BACK);
  return (
    <div
      className={styles.canvas}
      style={{
        background: `url(${DESK}) no-repeat center center/cover`,
      }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 70 }}>
        <OrbitControls autoRotate={true} autoRotateSpeed={10} />
        <pointLight position={[0, 0, 10]} />
        <pointLight position={[0, 0, -10]} />
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[9, 5, 0.05]} />
          <meshBasicMaterial map={frontMap} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[8.9999, 4.9999, 0.05]} />
          <meshBasicMaterial map={backMap} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Sample;
