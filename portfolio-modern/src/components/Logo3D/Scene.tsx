import { Canvas, ThreeEvent } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Preload } from '@react-three/drei'
import { HTMLAttributes, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'

const Object = dynamic(() => import('./Object'), { ssr: false })

interface SceneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onPointerOver' | 'onPointerOut'> {
  onPointerOver: (event: ThreeEvent<PointerEvent>) => void
  onPointerOut: (event: ThreeEvent<PointerEvent>) => void
  rotationSpeed: number
  isInteractive: boolean
}

export function Scene({
  isInteractive,
  className,
  onPointerOver,
  onPointerOut,
  rotationSpeed,
  ...containerProps
}: SceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className='w-full h-full max-w-min-screen max-h-min-screen' {...containerProps} ref={containerRef}>
      <Canvas resize={{ debounce: 0 }}>
        <Suspense fallback={null}>
          <directionalLight intensity={0.25} />
          <ambientLight intensity={0.75} />
          <Object
            scale={1}
            position-y={0}
            containerElement={containerRef.current}
            isInteractive={isInteractive}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
          />
          <Preload all />
          <OrbitControls
            autoRotate
            autoRotateSpeed={rotationSpeed}
            enablePan={false}
            enableZoom={false}
            enableRotate={isInteractive}
            maxPolarAngle={Math.PI * 0.6}
            minPolarAngle={Math.PI * 0.4}
            dampingFactor={isInteractive ? 0.1 : 1}
          />
          <PerspectiveCamera fov={20} near={0.1} far={1000} position={[0, -50, 5]} aspect={1} makeDefault />
        </Suspense>
      </Canvas>
    </div>
  )
}
