import { adminAuth, adminDb } from '@/lib/firebaseAdmin';

/**
 * Verify a Firebase ID token from the Authorization header and return the user doc.
 * Returns { user, uid } or throws an error.
 */
export async function verifyAuthAndGetUser(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }

  const idToken = authHeader.split('Bearer ')[1];
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  const uid = decodedToken.uid;

  // Get user document from Firestore
  const userDoc = await adminDb.collection('users').doc(uid).get();
  if (!userDoc.exists) {
    throw new Error('User not found');
  }

  return {
    uid,
    user: { id: uid, ...userDoc.data() }
  };
}
