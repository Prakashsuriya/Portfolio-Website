import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

// 3D Sphere Component
function AnimatedSphere() {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.4}
      />
    </Sphere>
  );
}

// Loading fallback component
function SceneLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-32 h-32 border-4 border-cyber-blue/20 border-t-cyber-blue rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-cyber-blue text-sm font-medium">
            Loading 3D Scene...
          </div>
        </div>
      </div>
    </div>
  );
}

// Main 3D Scene Component
export default function ThreeDScene() {
  return (
    <Suspense fallback={<SceneLoader />}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSphere />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </Suspense>
  );
}
