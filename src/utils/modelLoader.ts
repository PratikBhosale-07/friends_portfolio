// Utility to load and manage 3D models

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import * as THREE from 'three'

/**
 * Setup Draco loader for compressed GLTF files
 */
export function setupDracoLoader() {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  return dracoLoader
}

/**
 * Load GLTF model with Draco compression support
 */
export function useGLTFModel(path: string) {
  const gltfLoader = new GLTFLoader()
  const dracoLoader = setupDracoLoader()
  gltfLoader.setDRACOLoader(dracoLoader)

  return useLoader(GLTFLoader, path)
}

/**
 * Optimize loaded model
 */
export function optimizeModel(scene: THREE.Object3D) {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Enable shadow casting/receiving
      child.castShadow = true
      child.receiveShadow = true

      // Optimize material
      if (child.material) {
        const material = child.material as THREE.MeshStandardMaterial
        material.needsUpdate = true
        
        // Enable frustum culling
        child.frustumCulled = true
      }
    }
  })

  return scene
}

/**
 * Calculate model bounds for proper scaling
 */
export function getModelBounds(scene: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(scene)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())

  return { box, size, center }
}

/**
 * Center and scale model to fit in viewport
 */
export function centerAndScaleModel(
  scene: THREE.Object3D,
  targetSize: number = 2
) {
  const { size, center } = getModelBounds(scene)
  
  // Center model
  scene.position.sub(center)
  
  // Scale to fit
  const maxDimension = Math.max(size.x, size.y, size.z)
  const scale = targetSize / maxDimension
  scene.scale.setScalar(scale)

  return scene
}

/**
 * Preload multiple models
 */
export async function preloadModels(paths: string[]) {
  const loader = new GLTFLoader()
  const dracoLoader = setupDracoLoader()
  loader.setDRACOLoader(dracoLoader)

  const promises = paths.map((path) => {
    return new Promise((resolve, reject) => {
      loader.load(
        path,
        (gltf) => resolve(gltf),
        undefined,
        (error) => reject(error)
      )
    })
  })

  return Promise.all(promises)
}

/**
 * Dispose model to free memory
 */
export function disposeModel(scene: THREE.Object3D) {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose()

      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose())
      } else {
        child.material.dispose()
      }
    }
  })
}

/**
 * Create Level of Detail (LOD) for performance
 */
export function createLOD(
  highPoly: THREE.Object3D,
  mediumPoly: THREE.Object3D,
  lowPoly: THREE.Object3D
) {
  const lod = new THREE.LOD()

  lod.addLevel(highPoly, 0)    // Show high poly when close
  lod.addLevel(mediumPoly, 50) // Medium at medium distance
  lod.addLevel(lowPoly, 100)   // Low poly when far

  return lod
}

/**
 * Animation mixer helper
 */
export function setupAnimations(gltf: any) {
  if (!gltf.animations || gltf.animations.length === 0) {
    return null
  }

  const mixer = new THREE.AnimationMixer(gltf.scene)
  const actions = gltf.animations.map((clip: THREE.AnimationClip) => {
    return mixer.clipAction(clip)
  })

  return { mixer, actions }
}

/**
 * Export configurations for different model types
 */
export const MODEL_CONFIGS = {
  character: {
    scale: 1,
    position: [0, -1, 0],
    rotation: [0, 0, 0],
  },
  object: {
    scale: 1.5,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  environment: {
    scale: 2,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
}
