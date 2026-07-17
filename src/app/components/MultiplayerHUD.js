import DuelHealthBar from './DuelHealthBar';

export default function MultiplayerHUD({ matchData, timeLeft, isMobile, sortedPlayers, userProfile }) {
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
      width: matchData.gameType === 'ranked_duel' ? (isMobile ? '95vw' : '800px') : 'auto'
    }}>
      {matchData.gameType === 'ranked_duel' && (
        <div style={{ width: '100%', marginBottom: '10px' }}>
          <DuelHealthBar players={matchData.players} health={matchData.health} isMobile={isMobile} />
        </div>
      )}

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', width: '100%', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', fontWeight: '800', opacity: 0.5 }}>R{matchData.round}/{matchData.options?.rounds || 5}</div>
        {timeLeft !== null && (
          <div style={{ 
            fontSize: isMobile ? '1.1rem' : '1.5rem', 
            fontWeight: '900', 
            color: timeLeft <= 10 ? '#ef4444' : '#fbbf24',
            textShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}>
            {timeLeft}s
          </div>
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
