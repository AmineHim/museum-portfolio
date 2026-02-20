// PlayerControls.jsx — Déplacement FPS + détection de proximité
import { useEffect, useRef, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'
import { ARTWORKS, PROXIMITY_THRESHOLD } from '../data/artworks.js'

const MOVE_SPEED = 6      // unités/seconde
const BOUNDS = {          // limites de la salle
  xMin: -10.5, xMax: 10.5,
  zMin: -10.5, zMax: 10,
}
const PLAYER_HEIGHT = 1.8

// État global des touches (évite les rerenders)
const keys = {}

export function PlayerControls({ locked, onLockChange, onNearArtwork, onInteract }) {
  const { camera, gl } = useThree()
  const controlsRef = useRef()

  // Vecteurs réutilisables (évite les allocations en boucle)
  const frontVec = useRef(new THREE.Vector3())
  const sideVec  = useRef(new THREE.Vector3())
  const moveDir  = useRef(new THREE.Vector3())

  // ── Écouteurs clavier ─────────────────────────────────
  useEffect(() => {
    const down = (e) => { keys[e.code] = true }
    const up   = (e) => { delete keys[e.code] }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup',   up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup',   up)
    }
  }, [])

  // Touche [E] → interaction
  useEffect(() => {
    const handler = (e) => {
      if ((e.code === 'KeyE' || e.code === 'Space') && locked) {
        onInteract?.()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [locked, onInteract])

  // ── Événements PointerLock ────────────────────────────
  const handleLock   = useCallback(() => onLockChange(true),  [onLockChange])
  const handleUnlock = useCallback(() => onLockChange(false), [onLockChange])

  // ── Position initiale ─────────────────────────────────
  useEffect(() => {
    camera.position.set(0, PLAYER_HEIGHT, 8)
    camera.lookAt(0, PLAYER_HEIGHT, -1)
  }, [camera])

  // ── Boucle de mouvement ───────────────────────────────
  useFrame((_, delta) => {
    if (!controlsRef.current?.isLocked) return

    const fwd  = keys['KeyW'] || keys['KeyZ'] || keys['ArrowUp']
    const bwd  = keys['KeyS'] || keys['ArrowDown']
    const left = keys['KeyA'] || keys['KeyQ'] || keys['ArrowLeft']
    const rgt  = keys['KeyD'] || keys['ArrowRight']

    if (!fwd && !bwd && !left && !rgt) {
      // Pas de touche enfoncée → mise à jour proximité quand même
      checkProximity()
      return
    }

    frontVec.current.set(0, 0, (bwd ? 1 : 0) - (fwd ? 1 : 0))
    sideVec.current .set((left ? 1 : 0) - (rgt ? 1 : 0), 0, 0)

    moveDir.current
      .subVectors(frontVec.current, sideVec.current)
      .normalize()
      .multiplyScalar(MOVE_SPEED * delta)
      .applyEuler(camera.rotation)

    moveDir.current.y = 0

    camera.position.add(moveDir.current)

    // Collision murs
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, BOUNDS.xMin, BOUNDS.xMax)
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, BOUNDS.zMin, BOUNDS.zMax)
    camera.position.y = PLAYER_HEIGHT

    checkProximity()
  })

  // ── Détection de proximité ────────────────────────────
  const nearArtworkRef = useRef(null)

  function checkProximity() {
    let nearest = null
    let minDist = Infinity

    ARTWORKS.forEach((art) => {
      const [ax, ay, az] = art.position
      const d = camera.position.distanceTo(new THREE.Vector3(ax, ay, az))
      if (d < PROXIMITY_THRESHOLD && d < minDist) {
        minDist = d
        nearest = art
      }
    })

    if (nearest?.id !== nearArtworkRef.current?.id) {
      nearArtworkRef.current = nearest
      onNearArtwork(nearest)
    }
  }

  return (
    <PointerLockControls
      ref={controlsRef}
      onLock={handleLock}
      onUnlock={handleUnlock}
    />
  )
}
