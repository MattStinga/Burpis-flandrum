import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const PulsingCore = () => {
  const meshRef = useRef();
  const [scale, setScale] = useState(1);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const pulse = Math.sin(time * 3) * 0.3 + 1;
    setScale(pulse);
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.7;
      meshRef.current.rotation.z = time * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} scale={scale * 0.8}>
      <octahedronGeometry args={[1, 2]} />
      <meshStandardMaterial 
        color="cyan" 
        emissive="blue" 
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const ColorShiftSphere = () => {
  const meshRef = useRef();
  const [color, setColor] = useState(new THREE.Color('hotpink'));

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const hue = (time * 30) % 360;
    setColor(new THREE.Color(`hsl(${hue}, 100%, 60%)`));
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.8;
      meshRef.current.rotation.x = time * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.5}>
      <icosahedronGeometry args={[1, 3]} />
      <meshStandardMaterial 
        color={color} 
        wireframe 
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

const FloatingRings = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.5;
      ring1Ref.current.rotation.z = time * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * 0.7;
      ring2Ref.current.rotation.x = time * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.9;
      ring3Ref.current.rotation.y = time * 0.4;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} scale={4}>
        <torusGeometry args={[1, 0.05, 8, 32]} />
        <meshStandardMaterial color="magenta" emissive="magenta" emissiveIntensity={0.4} />
      </mesh>
      <mesh ref={ring2Ref} scale={3.5}>
        <torusGeometry args={[1, 0.03, 8, 32]} />
        <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={0.4} />
      </mesh>
      <mesh ref={ring3Ref} scale={5}>
        <torusGeometry args={[1, 0.02, 8, 32]} />
        <meshStandardMaterial color="lime" emissive="lime" emissiveIntensity={0.4} />
      </mesh>
    </>
  );
};

const GlitchText = () => {
  const textRef = useRef();
  const [glitch, setGlitch] = useState(false);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (Math.random() < 0.02) {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }
    
    if (textRef.current) {
      textRef.current.position.x = glitch ? (Math.random() - 0.5) * 0.2 : 0;
    }
  });

  return (
    <Float floatIntensity={6} speed={3}>
      <Text
        ref={textRef}
        fontSize={0.8}
        color={glitch ? "red" : "white"}
        anchorX="center"
        anchorY="middle"
        position={[0, 3.5, 0]}
        font="/fonts/helvetiker_bold.typeface.json"
      >
        {glitch ? "V1B3V3R53" : "VIBEVERSE"}
      </Text>
    </Float>
  );
};

const ParticleField = () => {
  const particlesRef = useRef();
  const particleCount = 200;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
  }

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} />
    </points>
  );
};

const CameraShake = () => {
  const { camera } = useThree();
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    camera.position.x += Math.sin(time * 10) * 0.01;
    camera.position.y += Math.cos(time * 15) * 0.01;
  });
  
  return null;
};

const Lights = () => (
  <>
    <ambientLight intensity={0.2} />
    <directionalLight position={[5, 10, 7]} intensity={0.8} color="white" />
    <pointLight position={[-10, -10, -10]} intensity={2} color="aqua" />
    <pointLight position={[10, 10, 10]} intensity={2} color="magenta" />
    <pointLight position={[0, -10, 5]} intensity={1.5} color="yellow" />
    <spotLight
      position={[0, 10, 0]}
      angle={0.3}
      penumbra={1}
      intensity={2}
      color="white"
      target-position={[0, 0, 0]}
    />
  </>
);

export default function App() {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
        <Sparkles count={100} scale={10} size={6} speed={0.4} />
        <Lights />
        <ParticleField />
        <FloatingRings />
        <ColorShiftSphere />
        <PulsingCore />
        <GlitchText />
        <CameraShake />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white font-mono text-sm opacity-70">
        <div className="bg-black bg-opacity-50 p-2 rounded">
          <div className="text-green-400">STATUS: ONLINE</div>
          <div className="text-cyan-400">DIMENSION: ACTIVE</div>
          <div className="text-magenta-400">VIBE: MAXIMUM</div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 text-white font-mono text-xs opacity-50">
        <div>DRAG TO EXPLORE • SCROLL TO ZOOM</div>
      </div>
    </div>
  );
}