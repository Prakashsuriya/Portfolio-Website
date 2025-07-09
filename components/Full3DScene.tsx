"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float time;
    
    void main() {
      vPosition = position;
      vNormal = normal;
      
      vec3 pos = position;
      float noise = sin(pos.x * 4.0 + time) * sin(pos.y * 4.0 + time) * 0.02;
      pos += normal * noise;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float time;
    
    void main() {
      vec3 color1 = vec3(0.2, 0.6, 1.0);
      vec3 color2 = vec3(0.8, 0.2, 1.0);
      vec3 color3 = vec3(1.0, 0.3, 0.6);
      
      float mixValue = sin(vPosition.x + time) * cos(vPosition.y + time) * 0.5 + 0.5;
      vec3 finalColor = mix(mix(color1, color2, mixValue), color3, sin(time * 0.5) * 0.5 + 0.5);
      
      float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
      fresnel = pow(1.0 - fresnel, 2.0);
      
      gl_FragColor = vec4(finalColor * (0.8 + fresnel * 0.4), 0.9);
    }
  `;

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
        }}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </Sphere>
  );
}

export default function Full3DScene() {
  return (
    <div className="w-full h-full">
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-full">
            <div className="animate-pulse text-cyber-blue">Loading 3D...</div>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 3], fov: 75 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <AnimatedSphere />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
