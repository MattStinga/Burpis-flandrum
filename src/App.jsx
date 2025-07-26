import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const ColorShiftSphere = () => {
  const meshRef = useRef();
  const [color, setColor] = useState(new THREE.Color('hotpink'));

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const hue = (time * 10) % 360;
    setColor(new THREE.Color(`hsl(${hue}, 100%, 60%)`));
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} scale={2}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
};

const PortalText = () => (
  <Float floatIntensity={4} speed={2}>
    <Text
      fontSize={0.5}
      color="white"
      anchorX="center"
      anchorY="middle"
      position={[0, 2.5, 0]}
    >
      VIBEVERSE
    </Text>
  </Float>
);

const Lights = () => (
  <>
    <ambientLight intensity={0.3} />
    <directionalLight position={[5, 10, 7]} intensity={0.7} />
    <pointLight position={[-10, -10, -10]} intensity={1} color={'aqua'} />
  </>
);

export default function App() {
  return (
    <div className="h-screen w-screen bg-black">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <OrbitControls enableZoom={false} />
        <Lights />
        <ColorShiftSphere />
        <PortalText />
      </Canvas>
    </div>
  );
}