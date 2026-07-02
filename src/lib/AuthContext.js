'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';
import { auth } from './firebase';

import { getOrCreateUserProfile } from './userProfile';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    // Handle any pending redirect result (from fallback redirect sign-in)
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect sign-in successful:", result.user.displayName);
        }
      })
      .catch((err) => {
        if (err.code !== 'auth/redirect-cancelled-by-user') {
          console.warn("Redirect result error:", err.code);
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
    const provider = new GoogleAuthProvider();

    try {
      // Always try popup first — it works on most mobile browsers too
      // and properly maintains auth state (unlike redirect which has bugs in Firebase v9+)
      await signInWithPopup(auth, provider);
    } catch (error) {
      // If popup was blocked by the browser, fall back to redirect
      if (error.code === 'auth/popup-blocked') {
        console.log("Popup blocked, falling back to redirect...");
        try {
          await signInWithRedirect(auth, provider);
        } catch (redirectError) {
          console.error("Redirect sign-in also failed:", redirectError);
        }
        return;
      }

      // User closed the popup — not an error
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        console.log("Sign-in popup was closed by user.");
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
