// ============================================
// ANNADATA CONNECT — Firebase Service Layer
// Replaces Google Apps Script entirely.
// No CORS issues. Works directly in the browser.
// ============================================

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';

// ─── PASTE YOUR FIREBASE CONFIG HERE ───────────────────────────────────────
// 1. Go to https://console.firebase.google.com/
// 2. Create a project → Add Web App → Copy config
// 3. Enable Authentication → Email/Password
// 4. Enable Firestore Database → Start in Test Mode
// ──────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = !!firebaseConfig.apiKey;

let app, auth, db;
if (isFirebaseConfigured) {
  try {
    app  = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db   = getFirestore(app);
  } catch (err) {
    console.error("Firebase Error:", err);
  }
}

// ─── AUTH SERVICE ─────────────────────────────────────────────────────────

export const firebaseService = {

  /**
   * Sign up a new user with email + password.
   * Creates a full profile document in Firestore under /users/{uid}
   */
  async signup({ email, password, name, role, area }) {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = credential.user.uid;

      const userProfile = { uid, email, name, role, area, createdAt: serverTimestamp() };

      // Write to /users/{uid} for global lookup
      await setDoc(doc(db, 'users', uid), userProfile);

      // Also write to the role-specific collection for dashboard queries
      if (role === 'donor')      await setDoc(doc(db, 'donors',     uid), userProfile);
      if (role === 'ngo')        await setDoc(doc(db, 'ngos',        uid), userProfile);
      if (role === 'volunteer')  await setDoc(doc(db, 'volunteers',  uid), userProfile);
      if (role === 'government') await setDoc(doc(db, 'admins',      uid), userProfile);

      return { success: true, user: { uid, email, name, role, area } };
    } catch (err) {
      console.error('Firebase signup error:', err.code, err.message);
      return { success: false, error: _friendlyError(err.code) };
    }
  },

  /**
   * Log in an existing user.
   * Fetches their full profile from Firestore to get name/role/area.
   */
  async login(email, password) {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const uid = credential.user.uid;

      const snap = await getDoc(doc(db, 'users', uid));
      if (!snap.exists()) return { success: false, error: 'User profile not found.' };

      const profile = snap.data();
      return { success: true, user: { uid, email: profile.email, name: profile.name, role: profile.role, area: profile.area } };
    } catch (err) {
      console.error('Firebase login error:', err.code, err.message);
      return { success: false, error: _friendlyError(err.code) };
    }
  },

  /** Sign out the current user */
  async logout() {
    await signOut(auth);
  },

  /** Listen to auth state changes (for session persistence) */
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  },

  // ─── DATA OPERATIONS ───────────────────────────────────────────────────

  /** Add a food surplus listing */
  async addFoodSurplus(payload) {
    try {
      const ref = await addDoc(collection(db, 'foodFeed'), {
        ...payload,
        status: 'New',
        createdAt: serverTimestamp()
      });
      return { success: true, id: ref.id };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  /** Fetch all food feed entries */
  async getFoodFeed() {
    const snap = await getDocs(collection(db, 'foodFeed'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  /** Mark a surplus as matched and create a delivery */
  async acceptSurplus(surplusId, ngoId) {
    try {
      await updateDoc(doc(db, 'foodFeed', surplusId), { status: 'Matched' });
      await addDoc(collection(db, 'deliveries'), {
        surplusId, ngoId, status: 'In Transit', createdAt: serverTimestamp()
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  /** Fetch all deliveries */
  async getDeliveries() {
    const snap = await getDocs(collection(db, 'deliveries'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────

function _friendlyError(code) {
  const map = {
    'auth/email-already-in-use':    'This email is already registered. Try logging in.',
    'auth/user-not-found':          'No account found. Please sign up first.',
    'auth/wrong-password':          'Incorrect password. Please try again.',
    'auth/invalid-email':           'Invalid email address.',
    'auth/invalid-credential':      'Invalid credentials. Check email and password.',
    'auth/weak-password':           'Password must be at least 6 characters.',
    'auth/too-many-requests':       'Too many failed attempts. Try again later.',
    'auth/network-request-failed':  'Network error. Check your connection.',
  };
  return map[code] || `Authentication error: ${code}`;
}
