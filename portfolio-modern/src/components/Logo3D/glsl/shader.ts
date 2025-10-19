import * as THREE from 'three'
import vertexShader from './shader.vert'
import fragmentShader from './shader.frag'

interface ShaderUniformValues {
  shouldIntersect: boolean
  mousePosition: THREE.Vector3
  viewportSize: number
  pointTexture: THREE.Texture
  pointSize: number
  noiseTimeFactor: number
  noiseRadius: number
  meshColor: THREE.Vector3
  noiseFactor: number
  noisePositionFactor: number
}

const shaderUniformValues: ShaderUniformValues = {
  shouldIntersect: false,
  mousePosition: new THREE.Vector3(0, 0, 0),
  viewportSize: typeof window !== 'undefined' ? Math.min(window.innerHeight, window.innerWidth) : 1000,
  pointTexture: new THREE.TextureLoader().load('/models/particle.png'),
  pointSize: 0.1,
  meshColor: new THREE.Vector3(255, 255, 255),
  noiseTimeFactor: 0,
  noiseRadius: 5.0,
  noiseFactor: 5.0,
  noisePositionFactor: 2.0,
}

type ShaderUniforms = { [Key in keyof ShaderUniformValues]: { value: ShaderUniformValues[Key] } }

const shader = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: Object.fromEntries(Object.entries(shaderUniformValues).map(([key, value]) => [key, { value }])),
}) as Omit<THREE.ShaderMaterial, 'uniforms'> & { uniforms: ShaderUniforms }

export default shader
