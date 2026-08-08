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
  if (years > 0) return `${years}y ago`;
  if (months > 0) return `${months}m ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
};

// ── SVG Line Chart Component ─────────────────────────────────────────
const LineChart = ({ data, dataKey, color = '#10b981', isMobile }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{
        textAlign: 'center', padding: '2.5rem', color: '#6b7280',
        fontSize: isMobile ? '0.85rem' : '0.95rem', fontWeight: 600
      }}>
        No performance history available yet. Play a game to record stats!
      </div>
    );
  }

  const width = isMobile ? 300 : 720;
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

  const yLabels = [minVal, minVal + range * 0.5, maxVal].map(v => Math.round(v));
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
      {[0, 0.5, 1].map((f, i) => {
        const y = padT + chartH - f * chartH;
        return (
          <line key={i} x1={padL} y1={y} x2={padL + chartW} y2={y}
            stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        );
      })}
      {yLabels.map((v, i) => {
        const y = padT + chartH - (i / 2) * chartH;
        return (
          <text key={i} x={padL - 8} y={y + 4} fill="#6b7280"
            fontSize={isMobile ? '9' : '11'} textAnchor="end" fontWeight="600">{v}</text>
        );
      })}
      {xLabels.map((l) => {
        const x = padL + (l.idx / Math.max(data.length - 1, 1)) * chartW;
        return (
          <text key={l.idx} x={x} y={height - 8} fill="#6b7280"
            fontSize={isMobile ? '8' : '10'} textAnchor="middle" fontWeight="600">
            {formatDate(l.ts)}
          </text>
        );
      })}
      <path d={pathD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={`${pathD} L ${points[points.length - 1].x} ${padT + chartH} L ${points[0].x} ${padT + chartH} Z`}
        fill={`${color}15`}
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={isMobile ? 3 : 4}
          fill={color} stroke="#0b0f19" strokeWidth="2" />
      ))}
    </svg>
  );
};

// ── Main Redesigned ProfileModal Component ───────────────────────────
export default function ProfileModal({ userProfile, user, onClose, onProfileUpdate, onLogout }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [animIn, setAnimIn] = useState(false);

  // Settings State
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState('');
  const [nameSaving, setNameSaving] = useState(false);
  const [flagSearch, setFlagSearch] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // XP & ELO Data
  const [xpSnapshots, setXpSnapshots] = useState([]);
  const [xpDays, setXpDays] = useState(30);
  const [xpChartMode, setXpChartMode] = useState('xp');
  const [xpLoading, setXpLoading] = useState(false);

  const [globalRank, setGlobalRank] = useState(null);
  const [eloSnapshots, setEloSnapshots] = useState([]);
  const [eloLoading, setEloLoading] = useState(false);

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
    if (activeTab === 'overview' || activeTab === 'elo') loadXpSnapshots();
  }, [activeTab, loadXpSnapshots]);

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
      if (userProfile?.uid) {
        try {
          const taken = await isUsernameTaken(trimmed);
          if (taken && trimmed.toLowerCase() !== (userProfile.username || '').toLowerCase()) {
            setNameError('Username is already taken');
            setNameSaving(false);
            return;
          }
        } catch (e) {
          // Ignore availability check errors on local mode
        }
        await updateUsername(userProfile.uid, trimmed);
      }
      onProfileUpdate({ ...userProfile, username: trimmed, displayName: trimmed });
      setEditingName(false);
      setNewName('');
    } catch (e) {
      console.warn('Network issue saving name, updating locally:', e);
      onProfileUpdate({ ...userProfile, username: trimmed, displayName: trimmed });
      setEditingName(false);
      setNewName('');
    } finally {
      setNameSaving(false);
    }
  };

  const handleSelectFlag = async (code) => {
    try {
      await updateCountryCode(userProfile?.uid, code);
    } catch (e) {
      console.warn('Network issue saving flag, updating locally:', e);
    }
    onProfileUpdate({ ...userProfile, countryCode: code });
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const TABS = [
    {
      id: 'overview', label: 'Overview & Stats',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
    },
    {
      id: 'history', label: 'Match History',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    },
    {
      id: 'elo', label: 'Ranks & Leagues',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
    },
    {
      id: 'settings', label: 'Settings',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    },
    {
      id: 'friends', label: 'Friends',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    },
  ];

  const displayName = userProfile?.username || userProfile?.displayName || 'Explorer';
  const totalXp = userProfile?.totalXp || 0;
  const userLevel = calculateLevel(totalXp);
  
  // Level Progress Calculation
  const currentLevelMinXp = Math.pow(userLevel - 1, 2) * 100;
  const nextLevelMinXp = Math.pow(userLevel, 2) * 100;
  const xpInCurrentLevel = totalXp - currentLevelMinXp;
  const xpNeededForLevel = nextLevelMinXp - currentLevelMinXp;
  const levelProgressPct = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / (xpNeededForLevel || 1)) * 100)));

  const currentLeague = getLeague(userProfile?.elo || 0);
  const wins = userProfile?.duels_wins || 0;
  const losses = userProfile?.duels_losses || 0;
  const winRate = wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;

  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(flagSearch.toLowerCase()) ||
    c.code.toLowerCase().includes(flagSearch.toLowerCase())
  );

  const cardStyle = {
    background: 'rgba(18, 24, 38, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: '1.25rem',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)'
  };

  const filterBtn = (active) => ({
    background: active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
    color: active ? '#34d399' : '#9ca3af',
    border: active ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '6px 14px',
    fontSize: '0.8rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), rgba(8, 12, 22, 0.96)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      overflowY: 'auto',
      opacity: animIn ? 1 : 0,
      transition: 'opacity 0.3s ease',
      fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
      color: '#e5e7eb'
    }}>
      <style>{`
        @keyframes profilePopIn {
          0% { transform: scale(0.95) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes profileFadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        maxWidth: '980px',
        margin: '0 auto',
        padding: isMobile ? '1rem' : '2rem',
        animation: 'profilePopIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      }}>

        {/* ── Hero Profile Header Card ───────────────────────────────── */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          padding: isMobile ? '1.5rem 1.25rem' : '1.75rem 2rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.92) 45%, rgba(56, 189, 248, 0.12) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '24px',
          marginBottom: '1.25rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
        }}>
          {/* Top Right Action Buttons (Log Out & Close) */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
            marginBottom: '1rem'
          }}>
            <button
              onClick={() => { onLogout && onLogout(); onClose(); }}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                padding: '8px 14px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Log Out
            </button>

            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease'
              }}
              aria-label="Close profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* User Profile Information */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {/* Glowing Gradient Avatar Circle */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '2rem',
                  color: 'white',
                  border: '3px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)'
                }}>
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    displayName[0].toUpperCase()
                  )}
                </div>
                <span style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-4px',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  color: '#0f172a',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  padding: '2px 8px',
                  borderRadius: '10px',
                  border: '2px solid #0f172a',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                }}>
                  LVL {userLevel}
                </span>
              </div>

              <div>
                {!editingName ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h1 style={{
                      fontSize: isMobile ? '1.5rem' : '1.9rem',
                      fontWeight: 900, color: 'white', margin: 0,
                      letterSpacing: '-0.02em'
                    }}>
                      {displayName}
                    </h1>

                    <button
                      onClick={() => {
                        setEditingName(true);
                        setNewName(userProfile?.username || displayName || '');
                        setActiveTab('settings');
                      }}
                      title="Edit Username"
                      style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        color: '#34d399',
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    </button>

                    {userProfile?.countryCode && (
                      <img
                        src={`https://flagcdn.com/w40/${userProfile.countryCode.toLowerCase()}.png`}
                        alt="flag"
                        style={{ width: '28px', height: '19px', borderRadius: '4px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.2)' }}
                      />
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => { setNewName(e.target.value); setNameError(''); }}
                      maxLength={20}
                      placeholder="Enter username..."
                      style={{
                        padding: '6px 12px', background: 'rgba(0,0,0,0.5)',
                        border: nameError ? '1px solid #ef4444' : '1px solid #10b981',
                        borderRadius: '8px', color: 'white', fontSize: '1rem',
                        fontWeight: 800, outline: 'none', width: '160px'
                      }}
                    />
                    <button
                      onClick={() => setNewName(generateRandomName())}
                      style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 800, fontSize: '0.8rem' }}
                    >
                      🎲
                    </button>
                    <button
                      onClick={handleSaveName}
                      disabled={nameSaving}
                      style={{ padding: '6px 12px', background: '#10b981', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 800, fontSize: '0.8rem' }}
                    >
                      {nameSaving ? '...' : 'Save'}
                    </button>
                    <button
                      onClick={() => { setEditingName(false); setNameError(''); }}
                      style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: '#9ca3af', cursor: 'pointer', fontWeight: 800, fontSize: '0.8rem' }}
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {nameError && (
                  <div style={{ color: '#f87171', fontSize: '0.78rem', fontWeight: 700, marginTop: '4px' }}>{nameError}</div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px', fontSize: '0.82rem', color: '#9ca3af', fontWeight: 600, flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: '#38bdf8',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontWeight: 800,
                    fontSize: '0.75rem'
                  }}>
                    {currentLeague.name} Rank
                  </span>
                  <span>Joined {timeAgo(userProfile?.createdAt)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingName(true);
                setNewName(userProfile?.username || displayName || '');
                setActiveTab('settings');
              }}
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34d399',
                padding: '10px 16px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Edit Name
            </button>
          </div>

          {/* XP Level Progress Bar */}
          <div style={{ marginTop: '1.25rem', background: 'rgba(0,0,0,0.35)', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800, color: '#9ca3af', marginBottom: '6px' }}>
              <span>LEVEL PROGRESSION</span>
              <span style={{ color: '#34d399' }}>{totalXp} / {nextLevelMinXp} XP ({levelProgressPct}%)</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${levelProgressPct}%`, height: '100%', background: 'linear-gradient(90deg, #10b981 0%, #38bdf8 100%)', borderRadius: '10px', transition: 'width 0.4s ease', boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)' }} />
            </div>
          </div>
        </div>

        {/* ── Tab Navigation Bar ───────────────────────────────── */}
        <div style={{
          display: 'flex',
          gap: '6px',
          marginBottom: '1.25rem',
          overflowX: 'auto',
          padding: '6px',
          background: 'rgba(18, 24, 38, 0.7)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: isMobile ? '1 0 auto' : 1,
                  padding: isMobile ? '8px 12px' : '10px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : 'transparent',
                  color: isActive ? 'white' : '#9ca3af',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: isMobile ? '0.78rem' : '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: isActive ? '0 4px 14px rgba(16, 185, 129, 0.3)' : 'none'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Tab Contents ──────────────────────────────────────── */}
        <div style={{ animation: 'profileFadeIn 0.3s ease forwards' }}>

          {/* ════════════ OVERVIEW TAB ════════════ */}
          {activeTab === 'overview' && (
            <div>
              {/* 4 Stat Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '1.25rem' }}>
                
                <div style={{ ...cardStyle, marginBottom: 0, display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase' }}>Total XP</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white' }}>{totalXp}</div>
                  </div>
                </div>

                <div style={{ ...cardStyle, marginBottom: 0, display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', flexShrink: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase' }}>ELO Rating</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white' }}>{userProfile?.elo || 1000}</div>
                  </div>
                </div>

                <div style={{ ...cardStyle, marginBottom: 0, display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316', flexShrink: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase' }}>Daily Streak</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white' }}>{userProfile?.dailyChallengeStreak || 0} Days</div>
                  </div>
                </div>

                <div style={{ ...cardStyle, marginBottom: 0, display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', flexShrink: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase' }}>Win Rate</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white' }}>{winRate}%</div>
                  </div>
                </div>

              </div>

              {/* Endless High Scores Card */}
              <div style={cardStyle}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                  ENDLESS MODE RECORDS
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', padding: '14px', borderRadius: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>Longest Endless Streak</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f97316', marginTop: '2px' }}>{userProfile?.bestEndlessStreak || 0} 🔥</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', padding: '14px', borderRadius: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>Highest Endless Score</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fbbf24', marginTop: '2px' }}>{userProfile?.bestEndlessScore || 0} pts</div>
                  </div>
                </div>
              </div>

              {/* XP Progression Graph */}
              <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'white' }}>XP Progression</h3>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[{ label: '7D', val: 7 }, { label: '30D', val: 30 }, { label: 'ALL', val: null }].map(f => (
                      <button key={f.label} onClick={() => setXpDays(f.val)} style={filterBtn(xpDays === f.val)}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {xpLoading ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem', color: '#9ca3af', fontWeight: 600 }}>Loading graph data...</div>
                ) : (
                  <LineChart data={xpSnapshots} dataKey="xp" color="#10b981" isMobile={isMobile} />
                )}
              </div>
            </div>
          )}

          {/* ════════════ MATCH HISTORY TAB ════════════ */}
          {activeTab === 'history' && (
            <div>
              {historyLoading ? (
                <div style={{ ...cardStyle, textAlign: 'center', padding: '3rem', color: '#9ca3af', fontWeight: 600 }}>Loading history logs...</div>
              ) : gameHistory.length === 0 ? (
                <div style={{ ...cardStyle, textAlign: 'center', padding: '3rem', color: '#9ca3af', fontWeight: 600 }}>No match history recorded yet! Play a match to see your logs.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {gameHistory.map((game, i) => {
                    const typeColors = { ranked: '#fbbf24', unranked: '#60a5fa', solo: '#a78bfa' };
                    const gameType = (game.type || 'solo').toLowerCase();
                    return (
                      <div key={i} style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', background: `${typeColors[gameType] || '#6b7280'}22`, color: typeColors[gameType] || '#6b7280', border: `1px solid ${typeColors[gameType] || '#6b7280'}44` }}>
                            {gameType}
                          </span>
                          <span style={{ color: '#d1d5db', fontSize: '0.88rem', fontWeight: 600 }}>
                            {game.date ? new Date(game.date).toLocaleDateString() : 'Unknown date'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ color: 'white', fontWeight: 800, fontSize: '1rem' }}>{game.score != null ? `${game.score} pts` : '—'}</span>
                          {game.result && (
                            <span style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, background: game.result === 'win' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: game.result === 'win' ? '#34d399' : '#fca5a5' }}>
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

          {/* ════════════ LEAGUES & ELO TAB ════════════ */}
          {activeTab === 'elo' && (
            <div>
              <div style={cardStyle}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', fontWeight: 800, color: 'white' }}>Competitive Leagues</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '12px' : '24px', flexWrap: 'wrap' }}>
                  {LEAGUES.map(league => {
                    const isCurrent = currentLeague.name === league.name;
                    return (
                      <div key={league.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: `${league.color}22`, border: isCurrent ? `3px solid #fbbf24` : `2px solid ${league.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', boxShadow: isCurrent ? '0 0 20px rgba(251, 191, 36, 0.4)' : 'none' }}>
                          {league.emoji}
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isCurrent ? '#fbbf24' : league.color }}>{league.name}</span>
                        <span style={{ fontSize: '0.65rem', color: '#9ca3af', fontWeight: 600 }}>{league.minElo}–{league.maxElo === Infinity ? '∞' : league.maxElo}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', fontWeight: 800, color: 'white' }}>Ranked Statistics</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {[
                    { label: 'YOUR ELO', value: userProfile?.elo || 1000, gold: true },
                    { label: 'GLOBAL RANK', value: globalRank != null ? `#${globalRank}` : '...', gold: true },
                    { label: 'DUELS WON', value: wins, gold: false },
                    { label: 'DUELS LOST', value: losses, gold: false },
                    { label: 'WIN RATE', value: `${winRate}%`, gold: true },
                  ].map(stat => (
                    <div key={stat.label} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '12px 16px', minWidth: '130px', flex: '1 1 auto', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>{stat.label}</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 900, color: stat.gold ? '#fbbf24' : 'white' }}>{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', fontWeight: 800, color: 'white' }}>ELO History Graph</h3>
                {eloLoading ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af', fontWeight: 600 }}>Loading chart...</div>
                ) : (
                  <LineChart data={eloSnapshots} dataKey="elo" color="#fbbf24" isMobile={isMobile} />
                )}
              </div>
            </div>
          )}

          {/* ════════════ SETTINGS TAB ════════════ */}
          {activeTab === 'settings' && (
            <div>
              <div style={cardStyle}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  ACCOUNT & USERNAME
                </h3>

                <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', padding: '14px', borderRadius: '14px' }}>
                  {!editingName ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>Current Username</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'white', marginTop: '2px' }}>{displayName}</div>
                      </div>
                      <button
                        onClick={() => { setEditingName(true); setNewName(userProfile?.username || ''); }}
                        style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', padding: '8px 16px', borderRadius: '10px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
                      >
                        Change Username
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>Enter New Username</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => { setNewName(e.target.value); setNameError(''); }}
                          maxLength={20}
                          placeholder="Enter username..."
                          style={{ flex: 1, padding: '10px 14px', background: 'rgba(255,255,255,0.06)', border: nameError ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: 'white', fontSize: '0.95rem', outline: 'none', fontWeight: 700 }}
                        />
                        <button
                          onClick={() => setNewName(generateRandomName())}
                          style={{ padding: '0 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}
                        >
                          🎲 Random
                        </button>
                      </div>
                      {nameError && <div style={{ color: '#f87171', fontSize: '0.8rem', fontWeight: 600 }}>{nameError}</div>}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={handleSaveName} disabled={nameSaving} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 16px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}>
                          {nameSaving ? 'Saving...' : 'Save Name'}
                        </button>
                        <button onClick={() => { setEditingName(false); setNameError(''); }} style={{ background: 'rgba(255,255,255,0.08)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '8px 16px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Flag Selection Card */}
              <div style={cardStyle}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                  NATIONAL FLAG
                </h3>

                <input
                  type="text"
                  placeholder="Search countries..."
                  value={flagSearch}
                  onChange={(e) => setFlagSearch(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', marginBottom: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', color: 'white', fontSize: '0.88rem', outline: 'none', fontWeight: 600 }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '75px' : '95px'}, 1fr))`, gap: '8px', maxHeight: '250px', overflowY: 'auto', padding: '4px' }}>
                  {filteredCountries.map(c => {
                    const isSelected = userProfile?.countryCode?.toLowerCase() === c.code.toLowerCase();
                    return (
                      <button
                        key={c.code}
                        onClick={() => handleSelectFlag(c.code)}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          gap: '4px', padding: '8px 4px', borderRadius: '10px',
                          background: isSelected ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.04)',
                          border: isSelected ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.08)',
                          cursor: 'pointer', transition: 'all 0.15s', color: 'white'
                        }}
                      >
                        <img src={`https://flagcdn.com/w40/${c.code}.png`} alt={c.name} style={{ width: '30px', height: '20px', borderRadius: '3px', objectFit: 'cover' }} />
                        <span style={{ fontSize: '0.65rem', color: '#d1d5db', textAlign: 'center', lineHeight: 1.2, fontWeight: 600 }}>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ════════════ FRIENDS TAB ════════════ */}
          {activeTab === 'friends' && (
            <div style={{ ...cardStyle, textAlign: 'center', padding: '3.5rem 1.5rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', margin: '0 auto 1rem auto' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '1.2rem', fontWeight: 900 }}>Invite & Play With Friends</h3>
              <p style={{ color: '#9ca3af', margin: '0 0 1.5rem 0', fontSize: '0.9rem', fontWeight: 600 }}>Share your invite link to challenge your friends to party lobbies and duels.</p>
              <button onClick={copyInviteLink} style={{ background: copiedLink ? 'rgba(16, 185, 129, 0.2)' : 'linear-gradient(135deg, #3b82f6, #2563eb)', border: copiedLink ? '1px solid rgba(16, 185, 129, 0.5)' : 'none', color: 'white', padding: '10px 20px', borderRadius: '12px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}>
                {copiedLink ? '✓ Link Copied!' : 'Copy Game Link'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
