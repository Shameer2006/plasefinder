'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  updateUsername,
  updateCountryCode,
  isUsernameTaken,
  getXpSnapshots,
  getGlobalEloRank,
  getLeague,
  LEAGUES,
  calculateLevel
} from '@/lib/userProfile';

// ── Country list for picker ──────────────────────────────────────────
const COUNTRIES = [
  { code: 'us', name: 'United States' }, { code: 'gb', name: 'United Kingdom' },
  { code: 'ca', name: 'Canada' }, { code: 'au', name: 'Australia' },
  { code: 'de', name: 'Germany' }, { code: 'fr', name: 'France' },
  { code: 'es', name: 'Spain' }, { code: 'it', name: 'Italy' },
  { code: 'br', name: 'Brazil' }, { code: 'mx', name: 'Mexico' },
  { code: 'jp', name: 'Japan' }, { code: 'kr', name: 'South Korea' },
  { code: 'in', name: 'India' }, { code: 'cn', name: 'China' },
  { code: 'ru', name: 'Russia' }, { code: 'za', name: 'South Africa' },
  { code: 'ng', name: 'Nigeria' }, { code: 'eg', name: 'Egypt' },
  { code: 'ar', name: 'Argentina' }, { code: 'co', name: 'Colombia' },
  { code: 'se', name: 'Sweden' }, { code: 'no', name: 'Norway' },
  { code: 'fi', name: 'Finland' }, { code: 'dk', name: 'Denmark' },
  { code: 'nl', name: 'Netherlands' }, { code: 'be', name: 'Belgium' },
  { code: 'pt', name: 'Portugal' }, { code: 'pl', name: 'Poland' },
  { code: 'tr', name: 'Turkey' }, { code: 'sa', name: 'Saudi Arabia' },
  { code: 'ae', name: 'UAE' }, { code: 'th', name: 'Thailand' },
  { code: 'ph', name: 'Philippines' }, { code: 'id', name: 'Indonesia' },
  { code: 'my', name: 'Malaysia' }, { code: 'vn', name: 'Vietnam' },
  { code: 'pk', name: 'Pakistan' }, { code: 'bd', name: 'Bangladesh' },
  { code: 'cl', name: 'Chile' }, { code: 'pe', name: 'Peru' },
  { code: 'nz', name: 'New Zealand' }, { code: 'ie', name: 'Ireland' },
  { code: 'ch', name: 'Switzerland' }, { code: 'at', name: 'Austria' },
  { code: 'cz', name: 'Czech Republic' }, { code: 'ro', name: 'Romania' },
  { code: 'ua', name: 'Ukraine' }, { code: 'gr', name: 'Greece' },
  { code: 'il', name: 'Israel' }, { code: 'ke', name: 'Kenya' },
  { code: 'gh', name: 'Ghana' }, { code: 'et', name: 'Ethiopia' },
  { code: 'tz', name: 'Tanzania' }, { code: 'ma', name: 'Morocco' },
  { code: 'bn', name: 'Brunei' }, { code: 'sg', name: 'Singapore' },
  { code: 'hr', name: 'Croatia' }, { code: 'rs', name: 'Serbia' },
  { code: 'hu', name: 'Hungary' }, { code: 'bg', name: 'Bulgaria' },
  { code: 'sk', name: 'Slovakia' }, { code: 'lt', name: 'Lithuania' },
  { code: 'lv', name: 'Latvia' }, { code: 'ee', name: 'Estonia' },
];

// ── Random name generator ────────────────────────────────────────────
const ADJECTIVES = [
  'Swift', 'Lost', 'Wild', 'Cosmic', 'Silent', 'Brave', 'Ancient', 'Frozen',
  'Golden', 'Clever', 'Mystic', 'Roaming', 'Hidden', 'Fierce', 'Daring',
  'Noble', 'Shadow', 'Bright', 'Iron', 'Storm'
];
const NOUNS = [
  'Explorer', 'Nomad', 'Voyager', 'Pioneer', 'Wanderer', 'Ranger', 'Scout',
  'Navigator', 'Traveler', 'Seeker', 'Drifter', 'Pathfinder', 'Adventurer',
  'Mapper', 'Pilgrim', 'Trailblazer', 'Rover', 'Wayfarer', 'Globetrotter', 'Trekker'
];

const generateRandomName = () => {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(Math.random() * 99) + 1;
  return `${adj}${noun}${num}`;
};

// ── Time ago helper ──────────────────────────────────────────────────
const timeAgo = (dateStr) => {
  if (!dateStr) return 'Unknown';
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now - then;
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
};

// ── SVG Line Chart Component ─────────────────────────────────────────
const LineChart = ({ data, dataKey, color = '#22C55E', isMobile }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{
        textAlign: 'center', padding: '2rem', color: '#6b7280',
        fontSize: isMobile ? '0.9rem' : '1rem'
      }}>
        Play some games to see your progress!
      </div>
    );
  }

  const width = isMobile ? 300 : 700;
  const height = isMobile ? 160 : 220;
  const padL = 50, padR = 20, padT = 20, padB = 40;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const values = data.map(d => d[dataKey] || 0);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => {
    const x = padL + (i / Math.max(data.length - 1, 1)) * chartW;
    const y = padT + chartH - ((values[i] - minVal) / range) * chartH;
    return { x, y, val: values[i], ts: d.timestamp };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Y-axis labels
  const yLabels = [minVal, minVal + range * 0.5, maxVal].map(v => Math.round(v));

  // X-axis labels (show up to 5)
  const xStep = Math.max(1, Math.floor(data.length / (isMobile ? 3 : 5)));
  const xLabels = [];
  for (let i = 0; i < data.length; i += xStep) {
    xLabels.push({ idx: i, ts: data[i].timestamp });
  }

  const formatDate = (ts) => {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }}>
      {/* Grid lines */}
      {[0, 0.5, 1].map((f, i) => {
        const y = padT + chartH - f * chartH;
        return (
          <line key={i} x1={padL} y1={y} x2={padL + chartW} y2={y}
            stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        );
      })}
      {/* Y-axis labels */}
      {yLabels.map((v, i) => {
        const y = padT + chartH - (i / 2) * chartH;
        return (
          <text key={i} x={padL - 8} y={y + 4} fill="#6b7280"
            fontSize={isMobile ? '9' : '11'} textAnchor="end">{v}</text>
        );
      })}
      {/* X-axis labels */}
      {xLabels.map((l) => {
        const x = padL + (l.idx / Math.max(data.length - 1, 1)) * chartW;
        return (
          <text key={l.idx} x={x} y={height - 8} fill="#6b7280"
            fontSize={isMobile ? '8' : '10'} textAnchor="middle">
            {formatDate(l.ts)}
          </text>
        );
      })}
      {/* Line */}
      <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Area fill */}
      <path
        d={`${pathD} L ${points[points.length - 1].x} ${padT + chartH} L ${points[0].x} ${padT + chartH} Z`}
        fill={`${color}15`}
      />
      {/* Dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={isMobile ? 3 : 4}
          fill={color} stroke="rgba(10,10,26,1)" strokeWidth="2" />
      ))}
    </svg>
  );
};

// ── Main ProfileModal Component ──────────────────────────────────────
export default function ProfileModal({ userProfile, user, onClose, onProfileUpdate, onLogout }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [animIn, setAnimIn] = useState(false);

  // Profile tab state
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState('');
  const [nameSaving, setNameSaving] = useState(false);
  const [editingFlag, setEditingFlag] = useState(false);
  const [flagSearch, setFlagSearch] = useState('');

  // XP chart state
  const [xpSnapshots, setXpSnapshots] = useState([]);
  const [xpDays, setXpDays] = useState(30);
  const [xpChartMode, setXpChartMode] = useState('xp'); // 'xp' | 'rank'
  const [xpLoading, setXpLoading] = useState(false);

  // ELO tab state
  const [globalRank, setGlobalRank] = useState(null);
  const [eloSnapshots, setEloSnapshots] = useState([]);
  const [eloLoading, setEloLoading] = useState(false);

  // History tab state
  const [gameHistory, setGameHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => setAnimIn(true));
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  // Load XP snapshots when profile tab is active or filter changes
  const loadXpSnapshots = useCallback(async () => {
    if (!userProfile?.uid) return;
    setXpLoading(true);
    try {
      const data = await getXpSnapshots(userProfile.uid, xpDays);
      setXpSnapshots(data);
    } catch (e) {
      console.error('Failed to load XP snapshots:', e);
    } finally {
      setXpLoading(false);
    }
  }, [userProfile?.uid, xpDays]);

  useEffect(() => {
    if (activeTab === 'profile') loadXpSnapshots();
  }, [activeTab, loadXpSnapshots]);

  // Load ELO data when ELO tab is active
  useEffect(() => {
    if (activeTab !== 'elo' || !userProfile) return;
    const loadEloData = async () => {
      setEloLoading(true);
      try {
        const [rank, snaps] = await Promise.all([
          getGlobalEloRank(userProfile.elo || 1000),
          getXpSnapshots(userProfile.uid, null)
        ]);
        setGlobalRank(rank);
        setEloSnapshots(snaps);
      } catch (e) {
        console.error('Failed to load ELO data:', e);
      } finally {
        setEloLoading(false);
      }
    };
    loadEloData();
  }, [activeTab, userProfile]);

  // Load game history when History tab is active
  useEffect(() => {
    if (activeTab !== 'history' || !userProfile?.uid) return;
    const loadHistory = async () => {
      setHistoryLoading(true);
      try {
        const res = await fetch(`/api/gameHistory?uid=${userProfile.uid}`);
        if (res.ok) {
          const data = await res.json();
          setGameHistory(data.games || data || []);
        }
      } catch (e) {
        console.error('Failed to load game history:', e);
      } finally {
        setHistoryLoading(false);
      }
    };
    loadHistory();
  }, [activeTab, userProfile?.uid]);

  // ── Handlers ─────────────────────────────────────────────────────
  const handleSaveName = async () => {
    const trimmed = newName.trim();
    if (!trimmed || trimmed.length < 3) {
      setNameError('Name must be at least 3 characters');
      return;
    }
    if (trimmed.length > 20) {
      setNameError('Name must be 20 characters or less');
      return;
    }
    setNameSaving(true);
    setNameError('');
    try {
      const taken = await isUsernameTaken(trimmed);
      if (taken && trimmed.toLowerCase() !== (userProfile.username || '').toLowerCase()) {
        setNameError('Username is already taken');
        setNameSaving(false);
        return;
      }
      await updateUsername(userProfile.uid, trimmed);
      onProfileUpdate({ ...userProfile, username: trimmed });
      setEditingName(false);
      setNewName('');
    } catch (e) {
      setNameError('Failed to update name');
    } finally {
      setNameSaving(false);
    }
  };

  const handleSelectFlag = async (code) => {
    try {
      await updateCountryCode(userProfile.uid, code);
      onProfileUpdate({ ...userProfile, countryCode: code });
      setEditingFlag(false);
    } catch (e) {
      console.error('Failed to update flag:', e);
    }
  };

  // ── Tab definitions ──────────────────────────────────────────────
  const TABS = [
    { id: 'profile', label: 'Profile', emoji: '👤' },
    { id: 'history', label: 'History', emoji: '📖' },
    { id: 'elo', label: 'ELO', emoji: '🏆' },
    { id: 'friends', label: 'Friends', emoji: '👥' },
    { id: 'moderation', label: 'Moderation', emoji: '🛡️' },
  ];

  const displayName = userProfile?.username || userProfile?.displayName || 'Explorer';
  const currentLeague = getLeague(userProfile?.elo || 0);
  const wins = userProfile?.duels_wins || 0;
  const losses = userProfile?.duels_losses || 0;
  const winRate = wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;

  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(flagSearch.toLowerCase()) ||
    c.code.toLowerCase().includes(flagSearch.toLowerCase())
  );

  // ── Styles ───────────────────────────────────────────────────────
  const glassCard = {
    background: 'rgba(26, 26, 46, 0.85)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: isMobile ? '1rem' : '1.5rem',
    marginBottom: '1rem',
  };

  const greenBtn = {
    background: 'linear-gradient(135deg, #22C55E, #16A34A)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: isMobile ? '10px 20px' : '12px 24px',
    fontWeight: 'bold',
    fontSize: isMobile ? '0.85rem' : '0.95rem',
    cursor: 'pointer',
    transition: 'transform 0.15s, box-shadow 0.15s',
  };

  const filterBtn = (active) => ({
    background: active ? 'rgba(34, 197, 94, 0.25)' : 'rgba(255,255,255,0.06)',
    color: active ? '#22C55E' : '#9CA3AF',
    border: active ? '1px solid #22C55E' : '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '6px 14px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(10, 10, 26, 0.97)',
      overflowY: 'auto',
      opacity: animIn ? 1 : 0,
      transition: 'opacity 0.3s ease',
    }}>
      <style>{`
        @keyframes profilePopIn {
          0% { transform: scale(0.9) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes profileFadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: isMobile ? '1rem' : '2rem',
        animation: 'profilePopIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      }}>
        {/* ── Header ────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '1.5rem', position: 'relative',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: 'bold', color: 'white', margin: 0,
            }}>
              {displayName}
            </h1>
            {userProfile?.countryCode && (
              <img
                src={`https://flagcdn.com/w40/${userProfile.countryCode.toLowerCase()}.png`}
                alt="flag"
                style={{ width: '32px', height: '22px', borderRadius: '4px', objectFit: 'cover' }}
              />
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => { onLogout && onLogout(); onClose(); }}
              style={{
                height: '40px', padding: '0 16px', borderRadius: '20px',
                background: '#b91c1c', border: 'none', color: 'white',
                fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                flexShrink: 0,
              }}
              aria-label="Log out"
            >
              Log Out
            </button>
            <button
              onClick={onClose}
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: '#DC2626', border: 'none', color: 'white',
                fontSize: '1.2rem', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
              aria-label="Close profile"
            >
              X
            </button>
          </div>
        </div>

        {/* ── Tab Bar ───────────────────────────────────────────── */}
        <div style={{
          display: 'flex', gap: isMobile ? '4px' : '8px',
          marginBottom: '1.5rem', overflowX: 'auto',
          padding: '4px',
          background: 'rgba(26, 26, 46, 0.6)',
          borderRadius: '14px',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: isMobile ? '1 0 auto' : 1,
                  padding: isMobile ? '8px 10px' : '10px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive
                    ? 'linear-gradient(135deg, #22C55E, #16A34A)'
                    : 'transparent',
                  color: isActive ? 'white' : '#6b7280',
                  fontWeight: isActive ? 'bold' : '500',
                  fontSize: isMobile ? '0.7rem' : '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>{tab.emoji}</span>
                {(!isMobile || isActive) && <span>{tab.label}</span>}
              </button>
            );
          })}
        </div>

        {/* ── Tab Content ───────────────────────────────────────── */}
        <div style={{ animation: 'profileFadeIn 0.3s ease forwards' }}>

          {/* ════════════ PROFILE TAB ════════════ */}
          {activeTab === 'profile' && (
            <div>
              {/* Stats card */}
              <div style={glassCard}>
                <div style={{
                  display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '0.6rem' : '2rem',
                  fontSize: isMobile ? '0.95rem' : '1.05rem',
                  color: '#d1d5db',
                }}>
                  <span>🕐 Joined {timeAgo(userProfile?.createdAt)}</span>
                  <span>⭐ {userProfile?.totalXp || 0} XP</span>
                  <span>🎮 {userProfile?.gamesPlayed || 0} games played</span>
                </div>
              </div>

              {/* Change Name */}
              <div style={{ ...glassCard }}>
                {!editingName ? (
                  <button
                    onClick={() => {
                      setEditingName(true);
                      setNewName(userProfile?.username || '');
                    }}
                    style={greenBtn}
                  >
                    CHANGE NAME
                  </button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: '600' }}>
                      Choose a new username
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => { setNewName(e.target.value); setNameError(''); }}
                        maxLength={20}
                        placeholder="Enter username..."
                        style={{
                          flex: 1, padding: '10px 14px',
                          background: 'rgba(0,0,0,0.4)',
                          border: nameError ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '10px', color: 'white',
                          fontSize: '1rem', outline: 'none',
                        }}
                      />
                      <button
                        onClick={() => setNewName(generateRandomName())}
                        title="Randomize name"
                        style={{
                          width: '42px', height: '42px', borderRadius: '10px',
                          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                          color: 'white', fontSize: '1.2rem', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        🎲
                      </button>
                    </div>
                    {nameError && (
                      <div style={{ color: '#EF4444', fontSize: '0.8rem' }}>{nameError}</div>
                    )}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={handleSaveName}
                        disabled={nameSaving}
                        style={{ ...greenBtn, opacity: nameSaving ? 0.6 : 1 }}
                      >
                        {nameSaving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => { setEditingName(false); setNameError(''); }}
                        style={{
                          ...greenBtn,
                          background: 'rgba(255,255,255,0.08)',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Change Flag */}
              <div style={glassCard}>
                {!editingFlag ? (
                  <button onClick={() => setEditingFlag(true)} style={greenBtn}>
                    CHANGE FLAG
                    {userProfile?.countryCode && (
                      <img
                        src={`https://flagcdn.com/w40/${userProfile.countryCode.toLowerCase()}.png`}
                        alt=""
                        style={{ width: '20px', height: '14px', marginLeft: '8px', borderRadius: '2px', verticalAlign: 'middle' }}
                      />
                    )}
                  </button>
                ) : (
                  <div>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      marginBottom: '12px',
                    }}>
                      <span style={{ color: '#9ca3af', fontWeight: '600', fontSize: '0.9rem' }}>
                        Select your country
                      </span>
                      <button
                        onClick={() => setEditingFlag(false)}
                        style={{
                          background: 'none', border: 'none', color: '#9ca3af',
                          fontSize: '1.1rem', cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={flagSearch}
                      onChange={(e) => setFlagSearch(e.target.value)}
                      style={{
                        width: '100%', padding: '8px 12px', marginBottom: '12px',
                        background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '8px', color: 'white', fontSize: '0.9rem',
                        outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '70px' : '90px'}, 1fr))`,
                      gap: '8px', maxHeight: '260px', overflowY: 'auto',
                      padding: '4px',
                    }}>
                      {filteredCountries.map(c => {
                        const isSelected = userProfile?.countryCode === c.code;
                        return (
                          <button
                            key={c.code}
                            onClick={() => handleSelectFlag(c.code)}
                            style={{
                              display: 'flex', flexDirection: 'column', alignItems: 'center',
                              gap: '4px', padding: '8px 4px', borderRadius: '10px',
                              background: isSelected ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.04)',
                              border: isSelected ? '2px solid #22C55E' : '1px solid rgba(255,255,255,0.08)',
                              cursor: 'pointer', transition: 'all 0.15s',
                              color: 'white',
                            }}
                          >
                            <img
                              src={`https://flagcdn.com/w40/${c.code}.png`}
                              alt={c.name}
                              style={{ width: '32px', height: '22px', borderRadius: '3px', objectFit: 'cover' }}
                            />
                            <span style={{ fontSize: '0.65rem', color: '#d1d5db', textAlign: 'center', lineHeight: 1.2 }}>
                              {c.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* XP Over Time */}
              <div style={glassCard}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  flexWrap: 'wrap', gap: '8px', marginBottom: '1rem',
                }}>
                  <h3 style={{ margin: 0, fontSize: isMobile ? '1rem' : '1.15rem', color: 'white' }}>
                    XP Over Time (All Time)
                  </h3>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[{ label: '7D', val: 7 }, { label: '30D', val: 30 }, { label: 'ALL', val: null }].map(f => (
                      <button
                        key={f.label}
                        onClick={() => setXpDays(f.val)}
                        style={filterBtn(xpDays === f.val)}
                      >
                        {f.label}
                      </button>
                    ))}
                    <button style={filterBtn(false)} disabled>CUSTOM</button>
                  </div>
                </div>

                <div style={{
                  display: 'flex', gap: '4px', marginBottom: '1rem',
                }}>
                  {['xp', 'rank'].map(mode => (
                    <button
                      key={mode}
                      onClick={() => setXpChartMode(mode)}
                      style={{
                        ...filterBtn(xpChartMode === mode),
                        textTransform: 'uppercase',
                      }}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {xpLoading ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                    Loading chart data...
                  </div>
                ) : (
                  <LineChart
                    data={xpSnapshots}
                    dataKey={xpChartMode === 'xp' ? 'xp' : 'elo'}
                    color="#22C55E"
                    isMobile={isMobile}
                  />
                )}
              </div>
            </div>
          )}

          {/* ════════════ HISTORY TAB ════════════ */}
          {activeTab === 'history' && (
            <div>
              {historyLoading ? (
                <div style={{ ...glassCard, textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                  Loading game history...
                </div>
              ) : gameHistory.length === 0 ? (
                <div style={{ ...glassCard, textAlign: 'center', padding: '3rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>📭</div>
                  <div style={{ color: '#9ca3af', fontSize: '1.1rem' }}>No games played yet!</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {gameHistory.map((game, i) => {
                    const typeColors = {
                      ranked: '#FBBF24',
                      unranked: '#60A5FA',
                      solo: '#A78BFA',
                    };
                    const gameType = (game.type || 'solo').toLowerCase();
                    return (
                      <div key={i} style={{
                        ...glassCard,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        flexWrap: 'wrap', gap: '8px',
                        marginBottom: 0,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem',
                            fontWeight: 'bold', textTransform: 'uppercase',
                            background: `${typeColors[gameType] || '#6b7280'}22`,
                            color: typeColors[gameType] || '#6b7280',
                            border: `1px solid ${typeColors[gameType] || '#6b7280'}44`,
                          }}>
                            {gameType}
                          </span>
                          <span style={{ color: '#d1d5db', fontSize: '0.9rem' }}>
                            {game.date ? new Date(game.date).toLocaleDateString() : 'Unknown date'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                            {game.score != null ? `${game.score} pts` : '—'}
                          </span>
                          {game.result && (
                            <span style={{
                              padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem',
                              fontWeight: 'bold',
                              background: game.result === 'win' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                              color: game.result === 'win' ? '#22C55E' : '#EF4444',
                            }}>
                              {game.result.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ════════════ ELO TAB ════════════ */}
          {activeTab === 'elo' && (
            <div>
              {/* Leagues */}
              <div style={glassCard}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: isMobile ? '1rem' : '1.15rem', color: 'white' }}>
                  Leagues
                </h3>
                <div style={{
                  display: 'flex', justifyContent: 'center',
                  gap: isMobile ? '12px' : '24px', flexWrap: 'wrap',
                }}>
                  {LEAGUES.map(league => {
                    const isCurrent = currentLeague.name === league.name;
                    return (
                      <div key={league.name} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                      }}>
                        <div style={{
                          width: '60px', height: '60px', borderRadius: '50%',
                          background: `${league.color}22`,
                          border: isCurrent ? `3px solid #FBBF24` : `2px solid ${league.color}44`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1.8rem',
                          boxShadow: isCurrent ? '0 0 20px rgba(251, 191, 36, 0.4)' : 'none',
                          transition: 'all 0.3s ease',
                        }}>
                          {league.emoji}
                        </div>
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 'bold',
                          color: isCurrent ? '#FBBF24' : league.color,
                        }}>
                          {league.name}
                        </span>
                        <span style={{ fontSize: '0.6rem', color: '#6b7280' }}>
                          {league.minElo}–{league.maxElo === Infinity ? '∞' : league.maxElo}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Statistics */}
              <div style={glassCard}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: isMobile ? '1rem' : '1.15rem', color: 'white' }}>
                  Statistics
                </h3>
                <div style={{
                  display: 'flex', gap: '10px', flexWrap: 'wrap',
                  justifyContent: 'center',
                }}>
                  {[
                    { label: 'YOUR ELO', value: userProfile?.elo || 1000, gold: true },
                    { label: 'YOUR GLOBAL RANK', value: globalRank != null ? `#${globalRank}` : '...', gold: true },
                    { label: 'DUELS WON', value: wins, gold: false },
                    { label: 'DUELS LOST', value: losses, gold: false },
                    { label: 'WIN RATE', value: `${winRate}%`, gold: true },
                  ].map((stat) => (
                    <div key={stat.label} style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      padding: isMobile ? '12px 14px' : '14px 20px',
                      minWidth: isMobile ? '130px' : '140px',
                      flex: '1 1 auto',
                      textAlign: 'center',
                    }}>
                      <div style={{
                        fontSize: '0.7rem', color: '#6b7280', fontWeight: '600',
                        textTransform: 'uppercase', letterSpacing: '0.5px',
                        marginBottom: '6px',
                      }}>
                        {stat.label}
                      </div>
                      <div style={{
                        fontSize: isMobile ? '1.3rem' : '1.6rem',
                        fontWeight: 'bold',
                        color: stat.gold ? '#FBBF24' : 'white',
                      }}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ELO Progression Chart */}
              <div style={glassCard}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: isMobile ? '1rem' : '1.15rem', color: 'white' }}>
                  ELO Progression
                </h3>
                {eloLoading ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                    Loading chart data...
                  </div>
                ) : (
                  <LineChart
                    data={eloSnapshots}
                    dataKey="elo"
                    color="#FBBF24"
                    isMobile={isMobile}
                  />
                )}
              </div>
            </div>
          )}

          {/* ════════════ FRIENDS TAB ════════════ */}
          {activeTab === 'friends' && (
            <div style={{
              ...glassCard, textAlign: 'center',
              padding: isMobile ? '3rem 1.5rem' : '4rem 2rem',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔜</div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '1.3rem' }}>
                Coming Soon!
              </h3>
              <p style={{ color: '#6b7280', margin: 0, fontSize: '0.95rem' }}>
                Friend system is under development.
              </p>
            </div>
          )}

          {/* ════════════ MODERATION TAB ════════════ */}
          {activeTab === 'moderation' && (
            <div style={{
              ...glassCard, textAlign: 'center',
              padding: isMobile ? '3rem 1.5rem' : '4rem 2rem',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '1.3rem' }}>
                Coming Soon!
              </h3>
              <p style={{ color: '#6b7280', margin: 0, fontSize: '0.95rem' }}>
                Moderation tools are under development.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
