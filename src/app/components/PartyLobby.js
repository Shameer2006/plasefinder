'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useGameStore } from '@/lib/store';

export default function PartyLobby({ gameId }) {
  const { userProfile } = useAuth();
  const { setGameState } = useGameStore();
  const [matchData, setMatchData] = useState(null);
  
  // Options state
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  useEffect(() => {
    fetch('/countries.json')
      .then(res => res.json())
      .then(data => {
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        const list = data.map(code => ({
          code,
          name: regionNames.of(code) || code
        })).sort((a, b) => a.name.localeCompare(b.name));
        setCountries(list);
      });
  }, []);

  useEffect(() => {
    if (!db || !gameId) return;

    const unsub = onSnapshot(doc(db, 'matches', gameId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMatchData(data);

        if (data.status === 'playing') {
          setGameState(`MULTIPLAYER_${gameId}`);
        }
      } else {
        // Document deleted or doesn't exist
        setGameState('MENU');
      }
    });

    return () => unsub();
  }, [gameId, setGameState]);

  if (!matchData || !userProfile) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '2rem' }}>Loading Lobby...</div>;
  }

  const isHost = matchData.players[userProfile.uid]?.host;
  const playersList = Object.entries(matchData.players).map(([uid, data]) => ({ uid, ...data }));
  
  const defaultOptions = { rounds: 5, difficulty: 'Medium', country: 'WORLDWIDE' };
  const options = { ...defaultOptions, ...(matchData.options || {}) };

  const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()));

  const updateOption = async (key, value) => {
    if (!isHost) return;
    await updateDoc(doc(db, 'matches', gameId), {
      [`options.${key}`]: value
    });
  };

  const handleStartGame = async () => {
    if (!isHost) return;
    
    // Pass options to location manager
    import('@/lib/locationManager').then(({ fetchRandomLocation }) => {
      fetchRandomLocation(options).then(({ location, options: locationOptions }) => {
        updateDoc(doc(db, 'matches', gameId), {
          location: location,
          locationOptions: locationOptions, // Store the multiple choice options here
          status: 'playing',
          round: 1
        });
      });
    });
  };

  const handleLeave = () => {
    setGameState('MENU');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem' }}>
      <div className="glass-panel party-lobby-panel">
        
        {/* Left Side: Lobby Info & Players */}
        <div style={{ flex: 1 }}>
          <h2 className="gradient-text glow-text responsive-title" style={{ marginBottom: '0.5rem' }}>Party Lobby</h2>
          <div className="responsive-text" style={{ marginBottom: '2rem', color: '#ccc' }}>
            Game Code: <strong style={{ fontSize: '1.8rem', color: 'white', letterSpacing: '2px', background: 'rgba(0,0,0,0.5)', padding: '5px 15px', borderRadius: '8px', marginLeft: '10px' }}>{matchData.code}</strong>
          </div>

          <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', maxHeight: '300px', overflowY: 'auto' }}>
            <h3 style={{ marginBottom: '1rem', color: '#93c5fd' }}>Players ({playersList.length})</h3>
            {playersList.map((player) => (
              <div key={player.uid} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span>
                  {player.host && <span style={{ color: '#fbbf24', marginRight: '5px' }}>★</span>}
                  {player.displayName} {player.uid === userProfile.uid ? '(You)' : ''}
                </span>
                <span style={{ color: '#ccc' }}>Elo: {player.elo || 1000}</span>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn" onClick={handleLeave} style={{ background: '#7f1d1d' }}>Leave</button>
            
            {isHost ? (
              <button className="btn" onClick={handleStartGame} style={{ background: '#059669', flex: 1 }}>
                Start Game
              </button>
            ) : (
              <div style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ccc', flex: 1, textAlign: 'center' }}>
                Waiting for host...
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Game Settings */}
        <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ color: '#93c5fd', margin: 0 }}>Game Settings</h3>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Rounds: {options.rounds}</label>
            <input 
              type="range" 
              min="1" max="20" 
              value={options.rounds}
              disabled={!isHost}
              onChange={(e) => updateOption('rounds', parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Difficulty</label>
            <select 
              value={options.difficulty}
              disabled={!isHost}
              onChange={(e) => updateOption('difficulty', e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <option value="Easy" style={{ color: 'black' }}>Easy (Multiple Choice)</option>
              <option value="Medium" style={{ color: 'black' }}>Medium (Alternating)</option>
              <option value="Hard" style={{ color: 'black' }}>Hard (Map Pinning)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Map</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                value={showCountryDropdown ? countrySearch : (options.country === 'WORLDWIDE' ? '🌍 Worldwide' : countries.find(c => c.code === options.country)?.name || '')}
                onFocus={() => { if (isHost) { setShowCountryDropdown(true); setCountrySearch(''); } }}
                onBlur={() => setTimeout(() => setShowCountryDropdown(false), 200)}
                onChange={(e) => setCountrySearch(e.target.value)}
                disabled={!isHost}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', outline: 'none' }}
                placeholder="Search map..."
              />
              {showCountryDropdown && isHost && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#1e293b', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', maxHeight: '200px', overflowY: 'auto', zIndex: 50, marginTop: '5px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                  <div 
                    style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    onMouseDown={() => { updateOption('country', 'WORLDWIDE'); setShowCountryDropdown(false); }}
                  >
                    🌍 Worldwide
                  </div>
                  {filteredCountries.map(c => (
                    <div 
                      key={c.code}
                      style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                      onMouseDown={() => { updateOption('country', c.code); setShowCountryDropdown(false); }}
                    >
                      {c.name}
                    </div>
                  ))}
                  {filteredCountries.length === 0 && (
                    <div style={{ padding: '10px', color: '#ccc', fontStyle: 'italic' }}>
                      No countries found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {!isHost && (
            <div style={{ marginTop: 'auto', fontSize: '0.9rem', color: '#aaa', fontStyle: 'italic' }}>
              Only the Host can change settings.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
