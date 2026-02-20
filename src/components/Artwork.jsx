// Artwork.jsx — Tableau 3D avec cadre et œuvre abstraite sur canvas
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Génère une texture d'œuvre abstraite unique pour chaque tableau
function useArtTexture(baseColor, accentColor, artworkId) {
  return useMemo(() => {
    const W = 512, H = 368
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')

    // Fond
    ctx.fillStyle = '#F2EDE4'
    ctx.fillRect(0, 0, W, H)

    // Style selon l'œuvre
    const seed = artworkId.charCodeAt(0)

    if (artworkId === 'experience') {
      // Composition géométrique bleue — rappel de données/tech
      const grad = ctx.createLinearGradient(0, 0, W, H)
      grad.addColorStop(0, baseColor + '18')
      grad.addColorStop(1, accentColor + '10')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Grilles de points
      ctx.fillStyle = baseColor + '22'
      for (let x = 30; x < W; x += 28) {
        for (let y = 30; y < H; y += 28) {
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Blocs géométriques
      ctx.fillStyle = baseColor + 'CC'
      ctx.fillRect(60, 80, 140, 4)
      ctx.fillRect(60, 140, 90, 4)
      ctx.fillRect(60, 200, 180, 4)
      ctx.fillStyle = accentColor + '88'
      ctx.fillRect(280, 60, 4, 200)
      ctx.fillRect(330, 100, 4, 140)

      // Cercle principal
      ctx.beginPath()
      ctx.arc(360, 240, 70, 0, Math.PI * 2)
      ctx.strokeStyle = baseColor + 'AA'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(360, 240, 45, 0, Math.PI * 2)
      ctx.fillStyle = accentColor + '33'
      ctx.fill()

    } else if (artworkId === 'education') {
      // Formes organiques chaudes — livres/savoir
      const grad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W*0.6)
      grad.addColorStop(0, '#FFF8F0')
      grad.addColorStop(1, '#EDD8BE22')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Arcs concentriques
      for (let r = 30; r < 220; r += 30) {
        ctx.beginPath()
        ctx.arc(W/2, H/2 + 40, r, Math.PI, Math.PI * 2)
        ctx.strokeStyle = baseColor + Math.floor((1 - r/220) * 200).toString(16).padStart(2,'0')
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Trait diagonal
      ctx.strokeStyle = accentColor + 'AA'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(40, H - 40)
      ctx.lineTo(W - 40, 40)
      ctx.stroke()

      // Rectangles livres stylisés
      const books = [[50,180,30,80],[100,200,22,60],[140,190,28,70]]
      books.forEach(([x,y,w,h]) => {
        ctx.fillStyle = baseColor + '66'
        ctx.fillRect(x, y, w, h)
        ctx.strokeStyle = baseColor + 'CC'
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, w, h)
      })

    } else if (artworkId === 'projects') {
      // Lignes de code / circuit — vert tech
      ctx.fillStyle = '#F0F5F1'
      ctx.fillRect(0, 0, W, H)

      // Grille de circuit
      ctx.strokeStyle = accentColor + '22'
      ctx.lineWidth = 1
      for (let x = 0; x < W; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += 32) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // Tracé circuit stylisé
      ctx.strokeStyle = baseColor
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(80, 60)
      ctx.lineTo(200, 60); ctx.lineTo(200, 120)
      ctx.lineTo(320, 120); ctx.lineTo(320, 60)
      ctx.lineTo(420, 60); ctx.lineTo(420, 200)
      ctx.lineTo(280, 200); ctx.lineTo(280, 280)
      ctx.lineTo(120, 280); ctx.lineTo(120, 180)
      ctx.lineTo(80, 180); ctx.lineTo(80, 60)
      ctx.stroke()

      // Nœuds
      const nodes = [[200,60],[200,120],[320,120],[320,60],[420,200],[280,200],[280,280],[120,280],[120,180]]
      nodes.forEach(([nx, ny]) => {
        ctx.beginPath()
        ctx.arc(nx, ny, 5, 0, Math.PI * 2)
        ctx.fillStyle = accentColor
        ctx.fill()
        ctx.strokeStyle = baseColor
        ctx.lineWidth = 1.5
        ctx.stroke()
      })

    } else if (artworkId === 'contact') {
      // Formes fluides — connexion/communication
      const grad = ctx.createLinearGradient(0, 0, W, H)
      grad.addColorStop(0, '#F5F2FB')
      grad.addColorStop(1, '#EDE8F5')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Ondes concentriques
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath()
        ctx.arc(W/2, H/2, i * 40, 0, Math.PI * 2)
        ctx.strokeStyle = baseColor + Math.floor(180 / i).toString(16).padStart(2, '0')
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Lignes diagonales
      ctx.strokeStyle = accentColor + '55'
      ctx.lineWidth = 1.5
      for (let i = 0; i < 6; i++) {
        ctx.beginPath()
        ctx.moveTo(i * 80, 0)
        ctx.lineTo(i * 80 + H, H)
        ctx.stroke()
      }

      // Point central
      ctx.beginPath()
      ctx.arc(W/2, H/2, 12, 0, Math.PI * 2)
      ctx.fillStyle = baseColor
      ctx.fill()
      ctx.beginPath()
      ctx.arc(W/2, H/2, 6, 0, Math.PI * 2)
      ctx.fillStyle = accentColor
      ctx.fill()
    }

    // Grain photo léger
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * W, y = Math.random() * H
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.025})`
      ctx.fillRect(x, y, 1, 1)
    }

    return new THREE.CanvasTexture(canvas)
  }, [baseColor, accentColor, artworkId])
}

// ── Cartel (étiquette) sous le tableau
function Cartel({ title, position }) {
  return useMemo(() => {
    const W = 256, H = 90
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#F7F5F0'
    ctx.fillRect(0, 0, W, H)

    // Ligne dorée
    ctx.fillStyle = '#B8924A'
    ctx.fillRect(0, 0, W, 2)

    // Numéro artistique (déco)
    ctx.fillStyle = 'rgba(184,146,74,0.15)'
    ctx.font = 'bold 42px serif'
    ctx.fillText('I', 10, 70)

    // Titre
    ctx.fillStyle = '#1C1C1A'
    ctx.font = '600 14px "DM Sans", sans-serif'
    const lines = title.replace('\n', ' ').split(' ')
    ctx.fillText(lines.slice(0, 2).join(' '), 34, 38)
    if (lines.length > 2) ctx.fillText(lines.slice(2).join(' '), 34, 56)

    const tex = new THREE.CanvasTexture(canvas)
    return tex
  }, [title])
}

export function Artwork({ artwork, isNear, onClick }) {
  const { position, rotation, size, artColor, artAccent, id, title } = artwork
  const [fw, fh] = size
  const frameDepth = 0.08
  const frameThickness = 0.12

  const artTex = useArtTexture(artColor, artAccent, id)

  // Effet de légère lueur quand on s'approche
  const glowRef = useRef()
  useFrame(() => {
    if (!glowRef.current) return
    const target = isNear ? 0.35 : 0
    glowRef.current.intensity += (target - glowRef.current.intensity) * 0.08
  })

  const handleClick = (e) => {
    e.stopPropagation()
    onClick(artwork)
  }

  return (
    <group position={position} rotation={rotation}>

      {/* ── Cadre extérieur ──────────────── */}
      {/* Côtés du cadre */}
      {[
        // [x, y, z, sx, sy, sz]
        [0,  fh/2 + frameThickness/2, frameDepth/2, fw + frameThickness*2, frameThickness, frameDepth],
        [0, -fh/2 - frameThickness/2, frameDepth/2, fw + frameThickness*2, frameThickness, frameDepth],
        [-fw/2 - frameThickness/2, 0, frameDepth/2, frameThickness, fh, frameDepth],
        [ fw/2 + frameThickness/2, 0, frameDepth/2, frameThickness, fh, frameDepth],
      ].map(([x, y, z, sx, sy, sz], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[sx, sy, sz]} />
          <meshStandardMaterial color="#1A1918" roughness={0.3} metalness={0.1} />
        </mesh>
      ))}

      {/* ── Fond du tableau (toile) ──────── */}
      <mesh position={[0, 0, 0.01]} onClick={handleClick}>
        <planeGeometry args={[fw, fh]} />
        <meshStandardMaterial map={artTex} roughness={0.8} />
      </mesh>

      {/* ── Halo de proximité (highlight) ── */}
      <pointLight
        ref={glowRef}
        position={[0, 0, 0.5]}
        intensity={0}
        color="#FFF5D0"
        distance={3}
      />

      {/* ── Bouton interactif invisible (hitbox grande) ─ */}
      <mesh
        position={[0, 0, 0.05]}
        onClick={handleClick}
        visible={false}
      >
        <planeGeometry args={[fw + frameThickness * 2 + 0.5, fh + frameThickness * 2 + 0.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

    </group>
  )
}
