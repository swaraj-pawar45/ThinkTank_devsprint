// ==========================================
// CENTRAL API SERVICE (LOCAL DB)
// ==========================================
import { localDbService } from './localDb';

export const apiService = {
  // 1. AUTH: Login
  async login(email, password) {
    return localDbService.login(email, password);
  },

  // 2. AUTH: Signup
  async signup(userData) {
    return localDbService.signup(userData);
  },

  // 3. DATA READ: Routes queries to LocalStorage
  async fetchData(action) {
    try {
      if (action === 'get_feed') return await localDbService.getFoodFeed();
      if (action === 'get_deliveries') return await localDbService.getDeliveries();
      return null;
    } catch (err) {
      console.error("Local DB read error:", err);
      return null;
    }
  },

  // 4. DATA WRITE: Routes mutations to LocalStorage
  async postData(action, payload) {
    try {
      if (action === 'add_surplus') return await localDbService.addFoodSurplus(payload);
      if (action === 'accept_surplus') return await localDbService.acceptSurplus(payload.id, "N201");
      return { success: true };
    } catch (err) {
      console.error("Local DB write error:", err);
      return { success: false, error: err.toString() };
    }
  }
};
