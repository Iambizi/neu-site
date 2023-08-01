'use client'
import React, { useState, FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import  WIP  from './components/WIP';
import styles from './page.module.css'


type ModelProps = {
  setHovered: (hovered: boolean) => void;
};

// const Model: FC<ModelProps> = ({ setHovered }) => {
//   const gltf = useGLTF('/WIP.glb', false);
//   return (
//     <primitive
//       object={gltf.scene}
//       position={[0, 0, 0]}
//       scale={0.25}
//       onPointerOver={() => setHovered(true)}
//       onPointerOut={() => setHovered(false)}
//       onTouchStart={() => setHovered(true)}
//       onTouchEnd={() => setHovered(false)}
//     />
//   );
// };

type MyEnvironmentProps = {
  path: string;
};

const MyEnvironment: FC<MyEnvironmentProps> = ({ path }) => {
  const { gl, scene } = useThree();
  const texture = useTexture(path);

  if (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.encoding = THREE.sRGBEncoding;
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = envMap;
    pmremGenerator.dispose();
  }

  return null;
};

const App: FC = () => {
  const [isHovered, setHovered] = useState(false);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#F0F8FA',
        padding: 0,
        margin: 0,
      }}>
      <Canvas style={{ display: 'block', margin: '0 auto' }} camera={{ position: [0, 0, 2], fov: 40 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <Model setHovered={setHovered} /> */}
        <WIP setHovered={setHovered} />
        <OrbitControls autoRotate autoRotateSpeed={isHovered ? 0.15 : 1} minDistance={1} maxDistance={5} target={[0, 0, 0]} />
        <Environment preset="dawn" background />
        {/* <MyEnvironment path="/HDRI/AdobeStock_Galaxy.jpeg" /> */}
      </Canvas>
      <div className="App-logo-container">
        <img src="./assets/3D_Asset.png" alt="Logo" className="App-logo-img" />
        {/* <img src={logo} alt="Logo" /> */}
      </div>
    </div>
  );
};

export default App;

