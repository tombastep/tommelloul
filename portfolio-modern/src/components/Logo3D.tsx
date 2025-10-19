'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useRef, Suspense, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Simple particle system component (inside Canvas)
function ParticleSystem() {
  const meshRef = useRef<THREE.Points>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load GLTF model with error handling
  let gltf;
  try {
    gltf = useGLTF('/models/logo.glb');
  } catch (error) {
    console.error('Error loading GLB model:', error);
    return null;
  }
  
  // Extract positions from model - only once
  const positions = useMemo(() => {
    if (!gltf.scene) return null;
    
    const posArray: number[] = [];
    let meshCount = 0;
    
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        meshCount++;
        const mesh = child as THREE.Mesh;
        const pos = mesh.geometry.attributes.position;
        if (pos && pos.array) {
          for (let i = 0; i < pos.array.length; i++) {
            posArray.push(pos.array[i]);
          }
        }
      }
    });
    
    console.log('Found', meshCount, 'meshes');
    console.log('Extracted positions:', posArray.length);
    console.log('First few positions:', posArray.slice(0, 9));
    
    if (posArray.length === 0) {
      console.warn('No positions found in GLB model');
      return null;
    }
    
    return new Float32Array(posArray);
  }, [gltf]);
  
  // Mark as loaded when positions are ready
  useEffect(() => {
    if (positions) {
      setIsLoaded(true);
    }
  }, [positions]);
  
  // Animation frame
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  // Create geometry - only once when positions are ready
  const geometry = useMemo(() => {
    if (!positions) return null;
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.computeBoundingBox();
    console.log('Geometry created with', positions.length / 3, 'points');
    console.log('Bounding box:', geo.boundingBox);
    return geo;
  }, [positions]);

  if (!geometry || !isLoaded) {
    // Fallback: create a simple particle system
    const fallbackGeometry = useMemo(() => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(3000); // 1000 points
      for (let i = 0; i < 1000; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      console.log('Using fallback particle system');
      return geo;
    }, []);

    return (
      <points 
        ref={meshRef} 
        position={[0, 0, 0]} 
        rotation={[0, 0, 0]}
        geometry={fallbackGeometry}
      >
        <pointsMaterial
          color="#000000"
          size={5.0}
          transparent
          opacity={0.8}
          sizeAttenuation={false}
        />
      </points>
    );
  }

  return (
    <points 
      ref={meshRef} 
      position={[0, -554.8, 0]} 
      rotation={[-Math.PI * 0.5, 0, 0]}
      geometry={geometry}
    >
      <pointsMaterial
        color="#000000"
        size={10.0}
        transparent
        opacity={0.9}
        sizeAttenuation={false}
      />
    </points>
  );
}

// Main component
export default function Logo3D() {
  const [isWebGLSupported, setIsWebGLSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setIsWebGLSupported(!!gl);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading 3D Logo...</div>
      </div>
    );
  }

  if (!isWebGLSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">WebGL not supported</div>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 10, 50], fov: 18 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl, camera }) => {
        console.log('Canvas created, camera position:', camera.position);
        // Handle WebGL context loss
        gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault();
          console.warn('WebGL context lost, attempting to restore...');
        });
        gl.domElement.addEventListener('webglcontextrestored', () => {
          console.log('WebGL context restored');
        });
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={2} />
        <directionalLight position={[10, -565, 10]} intensity={3} />
        <ParticleSystem />
        <OrbitControls
          autoRotate
          autoRotateSpeed={2.0}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI * 0.8}
          minPolarAngle={Math.PI * 0.2}
        />
      </Suspense>
    </Canvas>
  );
}