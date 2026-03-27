// ==========================================
// CENTRAL API SERVICE (FIREBASE)
// ==========================================
import { firebaseService, isFirebaseConfigured } from './firebase';

export const apiService = {
  // 1. AUTH: Login
  async login(email, password) {
    if (isFirebaseConfigured) return firebaseService.login(email, password);
    
    // DEV FALLBACK: If Firebase isn't set up yet, simulate login
    console.warn("Using Local Simulator: Mocking Login");
    return { success: true, user: { name: "Demo User", role: "donor", email, area: "Bengaluru" } };
  },

  // 2. AUTH: Signup
  async signup(userData) {
    if (isFirebaseConfigured) return firebaseService.signup(userData);
    
    // DEV FALLBACK: Simulate account creation
    console.warn("Using Local Simulator: Mocking Signup");
    return { success: true, user: userData };
  },

  // 3. DATA READ: Routes queries to Firestore
  async fetchData(action) {
    if (!isFirebaseConfigured) return null; // Let Zustand handle local state
    
    try {
      if (action === 'get_feed') return await firebaseService.getFoodFeed();
      if (action === 'get_deliveries') return await firebaseService.getDeliveries();
      return null;
    } catch (err) {
      console.error("Firestore read error:", err);
      return null;
    }
  },

  // 4. DATA WRITE: Routes mutations to Firestore
  async postData(action, payload) {
    if (!isFirebaseConfigured) return { success: true, item: payload };
    
    try {
      if (action === 'add_surplus') return await firebaseService.addFoodSurplus(payload);
      if (action === 'accept_surplus') return await firebaseService.acceptSurplus(payload.id, "N201");
      return { success: true };
    } catch (err) {
      console.error("Firestore write error:", err);
      return { success: false, error: err.toString() };
    }
  }
};
