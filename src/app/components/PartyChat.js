'use client';
import { useState, useRef, useEffect } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/AuthContext';

export default function PartyChat({ gameId, matchData }) {
  const { userProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const messages = matchData?.chat || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !userProfile || !db) return;

    const newMsg = {
      uid: userProfile.uid,
      displayName: userProfile.displayName,
      text: message.trim(),
      timestamp: Date.now()
    };

    setMessage('');

    await updateDoc(doc(db, 'matches', gameId), {
      chat: arrayUnion(newMsg)
    });
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      zIndex: 50,
      width: '300px',
      display: 'flex',
      flexDirection: 'column',
      pointerEvents: 'auto'
    }}>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '10px 15px',
          borderRadius: '12px',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
          marginBottom: isOpen ? '10px' : '0'
        }}
      >
        <span>💬 Party Chat ({messages.length})</span>
        <span>{isOpen ? '▼' : '▲'}</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          background: 'rgba(0,0,0,0.8)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          flexDirection: 'column',
          height: '350px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          overflow: 'hidden'
        }}>
          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '10px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {messages.length === 0 ? (
              <div style={{ color: '#888', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                No messages yet.
              </div>
            ) : (
              messages.map((msg, i) => {
                const isMe = msg.uid === userProfile?.uid;
                return (
                  <div key={i} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start'
                  }}>
                    {!isMe && <span style={{ fontSize: '0.7rem', color: '#aaa', marginLeft: '5px' }}>{msg.displayName}</span>}
                    <div style={{
                      background: isMe ? '#2563eb' : 'rgba(255,255,255,0.1)',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '16px',
                      borderBottomRightRadius: isMe ? '4px' : '16px',
                      borderBottomLeftRadius: !isMe ? '4px' : '16px',
                      maxWidth: '85%',
                      wordBreak: 'break-word',
                      fontSize: '0.9rem'
                    }}>
                      {msg.text}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Emojis */}
          <div style={{ display: 'flex', gap: '10px', padding: '8px 10px', background: 'rgba(0,0,0,0.6)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {['😎', '🤣', '😂', '😝', '🤪'].map(emoji => (
              <button 
                key={emoji}
                type="button"
                onClick={() => setMessage(prev => prev + emoji)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', padding: '2px', transition: 'transform 0.1s' }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{ display: 'flex', padding: '10px', background: 'rgba(0,0,0,0.4)' }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
            <button type="submit" style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0 15px',
              marginLeft: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
