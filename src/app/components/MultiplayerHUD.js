export default function MultiplayerHUD({ matchData, timeLeft, isMobile, sortedPlayers, userProfile, onQuit }) {
  return (
    <div className="hud-center" style={{ 
      background: 'rgba(0,0,0,0.8)',
      padding: isMobile ? '6px 12px' : '10px 20px',
      borderRadius: '20px',
      zIndex: 10,
      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      maxWidth: isMobile ? '95vw' : '100%',
      width: 'auto'
    }}>
      <div style={{ display: 'flex', gap: isMobile ? '8px' : '15px', alignItems: 'center', width: '100%', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', fontWeight: '800', opacity: 0.5 }}>R{matchData.round}/{matchData.options?.rounds || 5}</div>
        {matchData.options?.timeLimit === 0 ? (
          <div style={{ 
            fontSize: isMobile ? '1.1rem' : '1.4rem', 
            fontWeight: '900', 
            color: '#38bdf8',
            textShadow: '0 0 10px rgba(56, 189, 248, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', fontWeight: '700', textTransform: 'uppercase', opacity: 0.8, color: '#9ca3af' }}>No Limit</span>
            <span>∞</span>
          </div>
        ) : (
          timeLeft !== null && (
            <div style={{ 
              fontSize: isMobile ? '1.1rem' : '1.5rem', 
              fontWeight: '900', 
              color: timeLeft <= 10 ? '#ef4444' : '#fbbf24',
              textShadow: '0 0 10px rgba(0,0,0,0.5)'
            }}>
              {timeLeft}s
            </div>
          )
        )}
        {onQuit && (
          <button
            type="button"
            className="btn btn-game-quit"
            onClick={onQuit}
            aria-label="Quit match"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              padding: isMobile ? '4px 8px' : '6px 12px',
              fontSize: isMobile ? '0.75rem' : '0.85rem'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "12" : "14"} height={isMobile ? "12" : "14"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span>Quit</span>
          </button>
        )}
      </div>
      <div style={{ display: 'flex', gap: isMobile ? '0.8rem' : '1.5rem', overflowX: 'auto', maxWidth: isMobile ? '55vw' : '60vw' }}>
        {sortedPlayers.slice(0, 3).map((player) => (
          <div key={player.uid} style={{ textAlign: 'center', minWidth: isMobile ? '60px' : '80px' }}>
            <div style={{ fontSize: isMobile ? '0.75rem' : '0.8rem', color: '#ccc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {player.uid === userProfile.uid ? 'You' : player.displayName}
            </div>
            <div style={{ fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: 'bold', color: player.uid === userProfile.uid ? 'var(--primary-color)' : 'white' }}>
              {player.score}
            </div>
          </div>
        ))}
        {sortedPlayers.length > 3 && (
          <div style={{ textAlign: 'center', minWidth: '40px', display: 'flex', alignItems: 'center', color: '#ccc', fontSize: isMobile ? '0.8rem' : '1rem' }}>
            +{sortedPlayers.length - 3}
          </div>
        )}
      </div>
    </div>
  );
}
