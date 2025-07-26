import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const ChillSphere = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial 
        color="#4facfe" 
        transparent 
        opacity={0.7}
        emissive="#00f5ff"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const FloatingCubes = () => {
  const cubes = [];
  
  for (let i = 0; i < 8; i++) {
    cubes.push(
      <Float key={i} floatIntensity={2} speed={1 + i * 0.1}>
        <mesh position={[
          Math.sin(i * Math.PI / 4) * 4,
          Math.cos(i * Math.PI / 3) * 2,
          Math.sin(i * Math.PI / 6) * 3
        ]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial 
            color={`hsl(${200 + i * 20}, 70%, 60%)`}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>
    );
  }
  
  return <>{cubes}</>;
};

const ChillText = () => {
  return (
    <Float floatIntensity={1} speed={2}>
      <Text
        fontSize={0.6}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        position={[0, 3, 0]}
      >
        vibeverse
      </Text>
      <Text
        fontSize={0.3}
        color="#87ceeb"
        anchorX="center"
        anchorY="middle"
        position={[0, 2.3, 0]}
      >
        ~ chill mode ~
      </Text>
    </Float>
  );
};

const SoftRings = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * 0.1;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} scale={3}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial 
          color="#ff9a9e" 
          transparent 
          opacity={0.6}
          emissive="#ff9a9e"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh ref={ring2Ref} scale={2.5}>
        <torusGeometry args={[1, 0.015, 16, 100]} />
        <meshStandardMaterial 
          color="#a8edea" 
          transparent 
          opacity={0.5}
          emissive="#a8edea"
          emissiveIntensity={0.1}
        />
      </mesh>
    </>
  );
};

const ChillLights = () => (
  <>
    <ambientLight intensity={0.4} color="#f0f8ff" />
    <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
    <pointLight position={[-5, 2, 5]} intensity={0.5} color="#87ceeb" />
    <pointLight position={[5, -2, -5]} intensity={0.5} color="#dda0dd" />
  </>
);

export default function App() {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <OrbitControls 
          enableZoom={true} 
          autoRotate 
          autoRotateSpeed={0.2}
          enableDamping
          dampingFactor={0.05}
        />
        <Stars radius={200} depth={50} count={5000} factor={4} saturation={0.5} fade />
        <ChillLights />
        <ChillSphere />
        <SoftRings />
        <FloatingCubes />
        <ChillText />
      </Canvas>
      
      <div className="absolute top-6 left-6 text-white font-light text-sm opacity-60">
        <div className="bg-black bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
          <div className="text-blue-300">✨ vibes: maximum chill</div>
          <div className="text-purple-300">🌙 mode: relaxed</div>
          <div className="text-pink-300">💫 energy: peaceful</div>
        </div>
      </div>
      
      <div className="absolute bottom-6 right-6 text-white font-light text-xs opacity-40">
        <div>drag to float around • scroll to drift closer</div>
      </div>
    </div>
  );
}