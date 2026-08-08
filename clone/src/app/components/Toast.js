'use client';
import { useState, useEffect, useCallback, createContext, useContext } from 'react';

const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div style={{
        position: 'fixed', top: '1rem', right: '1rem', zIndex: 99999,
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
        maxWidth: '400px', width: 'calc(100% - 2rem)',
        pointerEvents: 'none',
      }}>
        {toasts.map(t => (
          <div
            key={t.id}
            onClick={() => removeToast(t.id)}
            style={{
              pointerEvents: 'auto',
              padding: '0.8rem 1.2rem',
              borderRadius: '12px',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              animation: 'toastIn 0.3s ease',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              display: 'flex', alignItems: 'center', gap: '8px',
              background: t.type === 'success' ? 'rgba(16, 185, 129, 0.9)'
                : t.type === 'error' ? 'rgba(239, 68, 68, 0.9)'
                : t.type === 'warning' ? 'rgba(245, 158, 11, 0.9)'
                : 'rgba(59, 130, 246, 0.9)',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>
              {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : t.type === 'warning' ? '⚠' : 'ℹ'}
            </span>
            {t.message}
          </div>
        ))}
      </div>
      <style>{`@keyframes toastIn { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </ToastContext.Provider>
  );
}
