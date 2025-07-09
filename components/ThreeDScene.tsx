"use client";

import { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Lightweight animated sphere component
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

  // Memoize shaders to prevent recreation
  const shaders = useMemo(
    () => ({
      vertexShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;
      uniform float time;
      
      void main() {
        vPosition = position;
        vNormal = normal;
        
        vec3 pos = position;
        float noise = sin(pos.x * 2.0 + time) * sin(pos.y * 2.0 + time) * 0.01;
        pos += normal * noise;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
      fragmentShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;
      uniform float time;
      
      void main() {
        vec3 color1 = vec3(0.2, 0.6, 1.0);
        vec3 color2 = vec3(0.8, 0.2, 1.0);
        
        float mixValue = sin(vPosition.x + time * 0.5) * cos(vPosition.y + time * 0.5) * 0.5 + 0.5;
        vec3 finalColor = mix(color1, color2, mixValue);
        
        float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
        fresnel = pow(1.0 - fresnel, 1.5);
        
        gl_FragColor = vec4(finalColor * (0.8 + fresnel * 0.3), 0.9);
      }
    `,
    }),
    [],
  );

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={shaders.vertexShader}
        fragmentShader={shaders.fragmentShader}
        uniforms={{
          time: { value: 0 },
        }}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Simple loading component
function SceneLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-pulse text-cyber-blue text-sm">Loading...</div>
    </div>
  );
}

// Lightweight scene wrapper
export default function ThreeDScene() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<SceneLoader />}>
        <div className="w-full h-full bg-gradient-to-br from-cyber-blue/5 to-cyber-purple/5 rounded-lg flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full animate-pulse opacity-60"></div>
        </div>
      </Suspense>
    </div>
  );
}
