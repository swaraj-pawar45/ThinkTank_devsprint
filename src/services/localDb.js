// ==========================================
// LOCAL STORAGE DATABASE SERVICE
// Replaces Firebase for local development
// ==========================================

export const localDbService = {
  async signup(userData) {
    const users = JSON.parse(localStorage.getItem('annadata_users') || '[]');
    const existing = users.find(u => u.email === userData.email);
    if (existing) return { success: false, error: 'Email already in use. Please sign in.' };
    
    const newUser = { uid: Date.now().toString(), ...userData };
    users.push(newUser);
    localStorage.setItem('annadata_users', JSON.stringify(users));
    
    return { success: true, user: newUser };
  },

  async login(email, password) {
    const users = JSON.parse(localStorage.getItem('annadata_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Invalid credentials. Check email and password.' };
    
    return { 
      success: true, 
      user: { 
        uid: user.uid, 
        email: user.email, 
        name: user.name, 
        role: user.role, 
        area: user.area 
      } 
    };
  },

  async logout() {
    // Handled by Context
  },

  async addFoodSurplus(payload) {
    const feed = JSON.parse(localStorage.getItem('annadata_feed') || '[]');
    const newEntry = { 
      id: Date.now().toString(), 
      ...payload, 
      status: 'New', 
      createdAt: new Date().toISOString() 
    };
    feed.push(newEntry);
    localStorage.setItem('annadata_feed', JSON.stringify(feed));
    return { success: true, id: newEntry.id };
  },

  async getFoodFeed() {
    return JSON.parse(localStorage.getItem('annadata_feed') || '[]');
  },

  async acceptSurplus(surplusId, ngoId) {
    const feed = JSON.parse(localStorage.getItem('annadata_feed') || '[]');
    const index = feed.findIndex(f => f.id === surplusId);
    if (index > -1) {
      feed[index].status = 'Matched';
      localStorage.setItem('annadata_feed', JSON.stringify(feed));
    }

    const deliveries = JSON.parse(localStorage.getItem('annadata_deliveries') || '[]');
    deliveries.push({ 
      id: Date.now().toString(), 
      surplusId, 
      ngoId, 
      status: 'In Transit', 
      createdAt: new Date().toISOString() 
    });
    localStorage.setItem('annadata_deliveries', JSON.stringify(deliveries));
    
    return { success: true };
  },

  async getDeliveries() {
    return JSON.parse(localStorage.getItem('annadata_deliveries') || '[]');
  }
};
