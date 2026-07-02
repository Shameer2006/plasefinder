'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';
import { auth } from './firebase';

import { getOrCreateUserProfile } from './userProfile';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Detect mobile/touch device
function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || window.matchMedia("(pointer: coarse)").matches;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    // Handle redirect result first (for mobile sign-in flow)
    // This must resolve before we rely on onAuthStateChanged
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect sign-in successful:", result.user.displayName);
        }
      })
      .catch((err) => {
        // Common: "auth/redirect-cancelled-by-user" — not a real error
        if (err.code !== 'auth/redirect-cancelled-by-user') {
          console.warn("Redirect result error:", err.code, err.message);
        }
      });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser && !currentUser.isAnonymous) {
        const profile = await getOrCreateUserProfile(currentUser);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginAnonymously = async () => {
    if (!auth) return;
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    }
  };

  const loginWithGoogle = async () => {
    if (!auth) return;
    try {
      const provider = new GoogleAuthProvider();
      
      if (isMobileDevice()) {
        // On mobile: redirect the entire page (no popup issues)
        await signInWithRedirect(auth, provider);
        // Page will redirect away — code below won't run
      } else {
        // On desktop: use popup (faster UX)
        await signInWithPopup(auth, provider);
      }
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        console.log("Sign-in popup was closed.");
        return;
      }
      console.error("Error signing in with Google:", error);
    }
  };

  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, loginAnonymously, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
