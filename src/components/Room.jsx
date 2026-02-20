// Room.jsx — Géométrie 3D de la salle du musée
import { useMemo } from 'react'
import * as THREE from 'three'

// Petite lumière de spot décorative au-dessus de chaque tableau
function SpotLight({ position, targetPosition }) {
  return (
    <spotLight
      position={position}
      target-position={targetPosition}
      intensity={30}
      angle={0.35}
      penumbra={0.5}
      castShadow
      color="#FFF5E0"
    />
  )
}

// Texture de plancher procédurale (bois clair)
function useFloorTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')

    // Base couleur bois clair / parquet
    ctx.fillStyle = '#C8B89A'
    ctx.fillRect(0, 0, 512, 512)

    // Lames de parquet
    const plankWidth = 512 / 4
    const plankHeight = 60
    for (let row = 0; row * plankHeight < 512; row++) {
      const offset = row % 2 === 0 ? 0 : plankWidth / 2
      for (let col = -1; col * plankWidth < 512; col++) {
        const x = col * plankWidth + offset
        const y = row * plankHeight

        // Variation de teinte subtile
        const shade = Math.random() * 15 - 7
        const r = Math.floor(200 + shade)
        const g = Math.floor(184 + shade)
        const b = Math.floor(154 + shade)
        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.fillRect(x + 1, y + 1, plankWidth - 2, plankHeight - 2)

        // Joint entre lames
        ctx.fillStyle = '#A89070'
        ctx.fillRect(x, y, plankWidth, 1)
        ctx.fillRect(x, y, 1, plankHeight)
      }
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(4, 3)
    return tex
  }, [])
}

// Texture légèrement granuleuse pour les murs
function useWallTexture(tint = '#F2EFE8') {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = tint
    ctx.fillRect(0, 0, 256, 256)

    // Grain subtil
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * 256
      const y = Math.random() * 256
      const alpha = Math.random() * 0.04
      ctx.fillStyle = `rgba(100,90,70,${alpha})`
      ctx.fillRect(x, y, 1, 1)
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(3, 2)
    return tex
  }, [tint])
}

export function Room() {
  const ROOM = { w: 24, h: 7, d: 22 }
  const floorTex = useFloorTexture()
  const wallTex = useWallTexture()
  const ceilTex = useWallTexture('#FAFAF7')

  return (
    <group>
      {/* ── Éclairage ambiant ─────────────────────── */}
      <ambientLight intensity={0.9} color="#FFF8F0" />
      <hemisphereLight
        skyColor="#FFFFFF"
        groundColor="#D4C4A0"
        intensity={0.6}
      />

      {/* Spots sur chaque tableau */}
      <SpotLight position={[-11, 6.5, -1.5]} targetPosition={[-11.5, 2, -1.5]} />
      <SpotLight position={[-3,  6.5, -11]} targetPosition={[-3, 2, -11.5]} />
      <SpotLight position={[3,   6.5, -11]} targetPosition={[3, 2, -11.5]} />
      <SpotLight position={[11,  6.5, -1.5]} targetPosition={[11.5, 2, -1.5]} />

      {/* ── SOL ──────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM.w, ROOM.d]} />
        <meshStandardMaterial map={floorTex} roughness={0.8} />
      </mesh>

      {/* ── PLAFOND ──────────────────────────────── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM.h, 0]} receiveShadow>
        <planeGeometry args={[ROOM.w, ROOM.d]} />
        <meshStandardMaterial map={ceilTex} roughness={0.95} />
      </mesh>

      {/* ── MUR GAUCHE ───────────────────────────── */}
      <mesh position={[-ROOM.w / 2, ROOM.h / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[ROOM.d, ROOM.h]} />
        <meshStandardMaterial map={wallTex} roughness={0.9} />
      </mesh>

      {/* ── MUR DROIT ────────────────────────────── */}
      <mesh position={[ROOM.w / 2, ROOM.h / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[ROOM.d, ROOM.h]} />
        <meshStandardMaterial map={wallTex} roughness={0.9} />
      </mesh>

      {/* ── MUR DU FOND ──────────────────────────── */}
      <mesh position={[0, ROOM.h / 2, -ROOM.d / 2]} receiveShadow>
        <planeGeometry args={[ROOM.w, ROOM.h]} />
        <meshStandardMaterial map={wallTex} roughness={0.9} />
      </mesh>

      {/* ── MUR DERRIÈRE LE JOUEUR ───────────────── */}
      <mesh position={[0, ROOM.h / 2, ROOM.d / 2]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[ROOM.w, ROOM.h]} />
        <meshStandardMaterial map={wallTex} roughness={0.9} />
      </mesh>

      {/* ── MOULURE BAS-DE-MUR (plinthe) ─────────── */}
      {[
        { pos: [0, 0.08, ROOM.d / 2 - 0.05],  rot: [0, 0, 0],            args: [ROOM.w, 0.15, 0.08] },
        { pos: [0, 0.08, -ROOM.d / 2 + 0.05], rot: [0, 0, 0],            args: [ROOM.w, 0.15, 0.08] },
        { pos: [-ROOM.w / 2 + 0.05, 0.08, 0], rot: [0, Math.PI / 2, 0],  args: [ROOM.d, 0.15, 0.08] },
        { pos: [ROOM.w / 2 - 0.05, 0.08, 0],  rot: [0, Math.PI / 2, 0],  args: [ROOM.d, 0.15, 0.08] },
      ].map((p, i) => (
        <mesh key={i} position={p.pos} rotation={p.rot}>
          <boxGeometry args={p.args} />
          <meshStandardMaterial color="#E8E4DC" roughness={0.6} />
        </mesh>
      ))}

      {/* ── Éclairage général plafond ─────────────── */}
      <pointLight position={[0, 6, 2]}  intensity={8} color="#FFF5E8" distance={18} />
      <pointLight position={[0, 6, -6]} intensity={6} color="#FFF5E8" distance={18} />
    </group>
  )
}
