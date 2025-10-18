'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

// Shader material for particle system
function ParticleSystem() {
  const meshRef = useRef<THREE.Points>(null);
  const [uniforms, setUniforms] = useState({
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    mouse: { value: new THREE.Vector2(0, 0) },
    viewport: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    pointTexture: { value: null },
    meshColor: { value: new THREE.Color(0x000000) },
  });

  // Vertex shader
  const vertexShader = `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform vec2 viewport;
    uniform sampler2D pointTexture;
    uniform vec3 meshColor;
    
    varying vec2 vUv;
    varying vec3 vColor;
    
    void main() {
      vUv = uv;
      vColor = meshColor;
      
      vec3 pos = position;
      
      // Add some subtle animation
      pos.y += sin(time * 0.5 + pos.x * 0.1) * 0.1;
      pos.x += cos(time * 0.3 + pos.z * 0.1) * 0.05;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = 2.0;
    }
  `;

  // Fragment shader
  const fragmentShader = `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform vec2 viewport;
    uniform sampler2D pointTexture;
    uniform vec3 meshColor;
    
    varying vec2 vUv;
    varying vec3 vColor;
    
    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      if (dist > 0.5) discard;
      
      float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
      alpha *= 0.8;
      
      gl_FragColor = vec4(vColor, alpha);
    }
  `;

  // Load the GLB model
  const { scene } = useGLTF('/models/logo.glb');

  // Extract position data from the model
  useEffect(() => {
    if (scene) {
      const positions: number[] = [];
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const geometry = child.geometry;
          if (geometry.attributes.position) {
            const positionArray = geometry.attributes.position.array;
            for (let i = 0; i < positionArray.length; i += 3) {
              positions.push(positionArray[i], positionArray[i + 1], positionArray[i + 2]);
            }
          }
        }
      });

      if (positions.length > 0 && meshRef.current) {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        meshRef.current.geometry = geometry;
      }
    }
  }, [scene]);

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      uniforms.time.value = state.clock.elapsedTime;
      
      // Update mouse position
      uniforms.mouse.value.set(
        (state.mouse.x * state.viewport.width) / 2,
        (state.mouse.y * state.viewport.height) / 2
      );
      
      // Update resolution
      uniforms.resolution.value.set(state.viewport.width, state.viewport.height);
      uniforms.viewport.value.set(state.viewport.width, state.viewport.height);
    }
  });

  // Handle mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    const rect = event.target as HTMLElement;
    const x = (event.clientX - rect.offsetLeft) / rect.offsetWidth;
    const y = (event.clientY - rect.offsetTop) / rect.offsetHeight;
    uniforms.mouse.value.set(x * 2 - 1, -(y * 2 - 1));
  };

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      return () => canvas.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <points ref={meshRef}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Fallback component for mobile or when WebGL is not available
function LogoFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
        <span className="text-white text-2xl font-bold">TM</span>
      </div>
    </div>
  );
}

export default function Logo3D() {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setIsWebGLSupported(!!gl);
  }, []);

  if (!isWebGLSupported) {
    return <LogoFallback />;
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <PerformanceMonitor>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <ParticleSystem />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            enableDamping
            dampingFactor={0.05}
          />
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
