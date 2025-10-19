import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { GroupProps, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import shader from '@/components/Logo3D/glsl/shader'

const intersectionPlane = new THREE.Plane()

function combineBuffer(geometry: THREE.BufferGeometry, bufferName: string) {
  const buffer = geometry.attributes[bufferName] as THREE.BufferAttribute
  const combined = new Float32Array(buffer.array.length)
  combined.set(buffer.array, 0)

  return new THREE.BufferAttribute(combined, 3)
}

interface ObjectProps extends GroupProps {
  isInteractive: boolean
  containerElement?: HTMLDivElement | null
}

export default function Object({ isInteractive, containerElement, ...groupProps }: ObjectProps) {
  const [boundingRect, setBoundingRect] = useState<DOMRect>()

  const { events } = useThree()

  const observer = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    if (containerElement) {
      observer.current = new ResizeObserver((entries) => {
        setBoundingRect(containerElement?.getBoundingClientRect())
      })
      observer.current.observe(containerElement)

      return () => {
        observer.current?.unobserve(containerElement)
      }
    }
  }, [containerElement])

  const gltf = useGLTF('/models/logo.glb') as any
  const { geometry } = gltf.nodes.mesh as THREE.Mesh

  const bufferGeometry = new THREE.BufferGeometry()
  const positions = combineBuffer(geometry, 'position')
  bufferGeometry.setAttribute('position', positions)

  useFrame(({ camera, raycaster, clock, pointer, size }) => {
    if (isInteractive) {
      intersectionPlane.normal.copy(camera.position)
      intersectionPlane.normal.y = 0
      intersectionPlane.normal.normalize()

      shader.uniforms.shouldIntersect.value = true
      shader.uniforms.noiseTimeFactor.value = clock.getElapsedTime() * 0.5
      shader.uniforms.viewportSize.value = Math.min(size.width, size.height) * window.devicePixelRatio

      raycaster.setFromCamera(pointer, camera)
      raycaster.ray.intersectPlane(intersectionPlane, shader.uniforms.mousePosition.value)

      camera.updateProjectionMatrix()
      return
    }

    shader.uniforms.shouldIntersect.value = false
  })

  return (
    <group {...groupProps} dispose={null}>
      <points geometry={bufferGeometry} material={shader} worldToLocal={() => shader.uniforms.mousePosition.value} />
    </group>
  )
}
