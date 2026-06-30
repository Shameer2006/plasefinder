'use client';
import { useEffect } from 'react';

export default function LevelUpOverlay({ data, onClose }) {
  // Prevent scrolling while overlay is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div style={{ 
      position: 'fixed', inset: 0, zIndex: 10000, 
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
      background: 'rgba(10, 10, 26, 0.95)', backdropFilter: 'blur(15px)' 
    }}>
      {/* Background animated stars/confetti using pure CSS could go here */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(100vh) scale(0.5) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20vh) scale(1.5) rotate(360deg); opacity: 0; }
        }
        @keyframes pop-in {
          0% { transform: scale(0.1); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Floating particles background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}vw`,
          animation: `float-up ${Math.random() * 3 + 2}s linear infinite`,
          animationDelay: `-${Math.random() * 5}s`,
          fontSize: `${Math.random() * 2 + 1}rem`,
          opacity: 0.6,
          zIndex: 1
        }}>
          ✨
        </div>
      ))}

      {/* Main Content */}
      <div style={{ animation: 'pop-in 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', zIndex: 10, textAlign: 'center' }}>
        
        {/* Illustration Graphic */}
        <div style={{ position: 'relative', width: '250px', height: '250px', margin: '0 auto 2rem' }}>
          {/* Sunburst background */}
          <div style={{ 
            position: 'absolute', inset: -50, background: 'conic-gradient(from 0deg, transparent, rgba(251, 191, 36, 0.4), transparent 40deg)', 
            animation: 'spin-slow 10s linear infinite', borderRadius: '50%' 
          }} />
          
          <div style={{
            position: 'relative', width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 60px rgba(245, 158, 11, 0.6), inset 0 0 30px rgba(255,255,255,0.6)',
            border: '8px solid #fef3c7'
          }}>
            <span style={{ fontSize: '7rem', textShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>🏆</span>
          </div>
        </div>
        
        <h1 className="gradient-text glow-text" style={{ fontSize: '4.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fbbf24, #f59e0b)' }}>
          LEVEL UP!
        </h1>
        
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.5rem 3rem', borderRadius: '24px', marginBottom: '3rem', display: 'inline-block', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
          <p style={{ fontSize: '2rem', color: 'white', margin: 0 }}>
            You reached Level <strong style={{ color: '#fbbf24', fontSize: '2.5rem' }}>{data?.newLevel || 2}</strong>
          </p>
        </div>
        
        <div>
          <button className="btn" onClick={onClose} style={{ 
            fontSize: '1.5rem', padding: '18px 48px', 
            background: 'linear-gradient(135deg, #fbbf24, #d97706)', 
            color: '#111', fontWeight: 'bold', border: 'none',
            boxShadow: '0 10px 25px rgba(245, 158, 11, 0.5)'
          }}>
            Awesome!
          </button>
        </div>
      </div>
    </div>
  );
}
