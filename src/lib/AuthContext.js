'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';
import { auth } from './firebase';

import { getOrCreateUserProfile } from './userProfile';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function getInitialGuestProfile() {
  if (typeof window === 'undefined') {
    return {
      uid: 'guest',
      username: 'Guest Explorer',
      displayName: 'Guest Explorer',
      countryCode: 'IN',
      totalXp: 0,
      createdAt: new Date().toISOString(),
      onboardingComplete: true
    };
  }
  const localXp = parseInt(localStorage.getItem('placefinder_total_xp') || '0', 10) || 0;
  const localUsername = localStorage.getItem('placefinder_username') || 'Guest Explorer';
  const localCountry = localStorage.getItem('placefinder_country') || 'IN';
  let guestId = localStorage.getItem('placefinder_guest_id');
  if (!guestId) {
    guestId = `guest_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
    try {
      localStorage.setItem('placefinder_guest_id', guestId);
    } catch (e) {}
  }
  return {
    uid: guestId || 'guest',
    username: localUsername,
    displayName: localUsername,
    countryCode: localCountry,
    totalXp: localXp,
    createdAt: new Date().toISOString(),
    onboardingComplete: true
  };
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(getInitialGuestProfile);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth) {
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
        try {
          const profile = await getOrCreateUserProfile(currentUser);
          setUserProfile(profile);
        } catch (err) {
          console.warn("Error fetching user profile:", err);
        }
      } else {
        setUserProfile(getInitialGuestProfile());
      }
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
    <AuthContext.Provider value={{ user, userProfile, setUserProfile, loading, loginAnonymously, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
