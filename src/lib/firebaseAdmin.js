import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

/**
 * Server-side Firebase Admin SDK initialization.
 * Uses service account key from environment variable or Application Default Credentials.
 */
function initFirebaseAdmin() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKey) {
    try {
      const serviceAccount = JSON.parse(serviceAccountKey);
      return initializeApp({
        credential: cert(serviceAccount),
      });
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', e.message);
    }
  }

  // Fallback: use project ID from environment (Application Default Credentials)
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (projectId) {
    return initializeApp({ projectId });
  }

  // Last resort: initialize without config (works with GOOGLE_APPLICATION_CREDENTIALS env var)
  try {
    return initializeApp();
  } catch (err) {
    console.warn('Firebase Admin initializeApp fallback skipped:', err?.message || err);
    return null;
  }
}

let adminApp = null;
let adminDb = null;
let adminAuth = null;

try {
  adminApp = initFirebaseAdmin();
  if (adminApp) {
    adminDb = getFirestore(adminApp);
    adminAuth = getAuth(adminApp);
  }
} catch (e) {
  console.warn('Firebase Admin SDK initialization skipped:', e?.message || e);
}

export { adminApp, adminDb, adminAuth };
