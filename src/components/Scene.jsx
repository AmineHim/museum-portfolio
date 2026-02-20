// Scene.jsx — Composition de la scène 3D complète
import { Canvas } from '@react-three/fiber'
import { Room } from './Room.jsx'
import { Artwork } from './Artwork.jsx'
import { PlayerControls } from './PlayerControls.jsx'
import { ARTWORKS } from '../data/artworks.js'

export function Scene({ locked, onLockChange, onNearArtwork, nearArtwork, onOpenArtwork }) {
  return (
    <Canvas
      shadows
      camera={{ fov: 75, near: 0.1, far: 100 }}
      style={{ width: '100%', height: '100%' }}
      // Désactiver la gestion par défaut du pointer lock via le clic
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Fond de scène (visible si on regarde le plafond) */}
      <color attach="background" args={['#EEE9E0']} />

      {/* Brouillard léger pour la profondeur atmosphérique */}
      <fog attach="fog" args={['#EEE9E0', 18, 30]} />

      {/* Salle */}
      <Room />

      {/* Tableaux */}
      {ARTWORKS.map((art) => (
        <Artwork
          key={art.id}
          artwork={art}
          isNear={nearArtwork?.id === art.id}
          onClick={onOpenArtwork}
        />
      ))}

      {/* Contrôles joueur */}
      <PlayerControls
        locked={locked}
        onLockChange={onLockChange}
        onNearArtwork={onNearArtwork}
        onInteract={() => nearArtwork && onOpenArtwork(nearArtwork)}
      />
    </Canvas>
  )
}
