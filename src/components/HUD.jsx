// HUD.jsx — Interface 2D superposée à la scène 3D
export function HUD({ nearArtwork, locked }) {
  if (!locked) return null

  return (
    <div className="hud">
      {/* Viseur central */}
      <div className="hud__crosshair" />

      {/* Prompt de proximité */}
      {nearArtwork && (
        <div className="hud__prompt" key={nearArtwork.id}>
          <div className="hud__prompt-artwork">{nearArtwork.label}</div>
          <div className="hud__prompt-action">
            <span className="hud__prompt-key">E</span>
            Appuyer pour voir
            <span style={{ opacity: 0.5 }}>ou clic</span>
          </div>
        </div>
      )}

      {/* Contrôles */}
      <div className="hud__controls">
        <div className="hud__control-item">
          <span className="hud__control-key">Z</span>
          <span className="hud__control-key">Q</span>
          <span className="hud__control-key">S</span>
          <span className="hud__control-key">D</span>
          <span>Se déplacer</span>
        </div>
        <div className="hud__control-item" style={{ opacity: 0.4 }}>·</div>
        <div className="hud__control-item">
          <span>Souris</span>
          <span>Regarder</span>
        </div>
      </div>

      {/* Hint ESC */}
      <div className="hud__esc-hint">Échap · Déverrouiller</div>
    </div>
  )
}
