// App.jsx — Orchestrateur principal de l'application
import { useState, useCallback, useRef } from 'react'
import { Scene } from './components/Scene.jsx'
import { HUD }   from './components/HUD.jsx'
import { Modal } from './components/Modal.jsx'

export default function App() {
  const [phase, setPhase] = useState('entry')    // 'entry' | 'exploring' | 'modal'
  const [locked, setLocked] = useState(false)
  const [nearArtwork, setNearArtwork] = useState(null)
  const [openArtwork, setOpenArtwork] = useState(null)

  // ── Entrée dans le musée ──────────────────────────────
  const handleEnter = useCallback(() => {
    setPhase('exploring')
    // Le PointerLock sera activé au clic sur le canvas
  }, [])

  // ── Pointer lock ──────────────────────────────────────
  const handleLockChange = useCallback((isLocked) => {
    setLocked(isLocked)
  }, [])

  // ── Proximité tableau ─────────────────────────────────
  const handleNearArtwork = useCallback((art) => {
    setNearArtwork(art)
  }, [])

  // ── Ouverture du panneau ──────────────────────────────
  const handleOpenArtwork = useCallback((art) => {
    setOpenArtwork(art)
    setPhase('modal')
    // Déverrouiller le pointeur quand la modale s'ouvre
    document.exitPointerLock?.()
  }, [])

  // ── Fermeture du panneau ──────────────────────────────
  const handleCloseModal = useCallback(() => {
    setOpenArtwork(null)
    setPhase('exploring')
  }, [])

  return (
    <>
      {/* ── Écran d'accueil ──────────────────────────── */}
      {phase === 'entry' && (
        <div className="entry-overlay">
          <div className="entry-overlay__eyebrow">Portfolio Interactif</div>
          <h1 className="entry-overlay__title">Musée<br />Virtuel</h1>
          <p className="entry-overlay__subtitle">Data Science · IA Générative · Développement</p>
          <div className="entry-overlay__divider" />
          <button className="entry-btn" onClick={handleEnter}>
            Entrer dans le musée
          </button>
          <p className="entry-overlay__hint">Cliquez pour déverrouiller le curseur à l'intérieur</p>
        </div>
      )}

      {/* ── Scène 3D ────────────────────────────────── */}
      {phase !== 'entry' && (
        <>
          <Scene
            locked={locked}
            onLockChange={handleLockChange}
            onNearArtwork={handleNearArtwork}
            nearArtwork={nearArtwork}
            onOpenArtwork={handleOpenArtwork}
          />
          <HUD nearArtwork={nearArtwork} locked={locked} />
        </>
      )}

      {/* ── Overlay d'invite (si déverrouillé sans modale) ─ */}
      {phase === 'exploring' && !locked && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(28,28,26,0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 20,
            cursor: 'pointer',
          }}
          onClick={() => {
            // Le clic activera le PointerLockControls automatiquement
          }}
        >
          <div style={{ textAlign: 'center', color: 'white' }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 300,
              fontStyle: 'italic',
              marginBottom: '0.75rem',
            }}>
              Cliquez pour continuer l'exploration
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}>
              Déplacez-vous avec Z Q S D · Regardez avec la souris
            </p>
          </div>
        </div>
      )}

      {/* ── Modale portfolio ─────────────────────────── */}
      {phase === 'modal' && openArtwork && (
        <Modal artwork={openArtwork} onClose={handleCloseModal} />
      )}
    </>
  )
}
