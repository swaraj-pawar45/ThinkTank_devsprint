import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiService } from '../services/api';

// MOCK DATABASE INITIAL SEED
const initialDonors = [
  { id: 'D101', name: "Hotel Royal Plaza", rating: 4.8, type: "Hotel", area: "Indiranagar" },
  { id: 'D102', name: "Big Bazaar", rating: 4.4, type: "Retail", area: "Whitefield" }
];

const initialNGOs = [
  { id: 'N201', name: "Umeed Trust", capacity: 500, activeVolunteers: 24, area: "Central Bengaluru" },
  { id: 'N202', name: "Annapoorna Foundation", capacity: 800, activeVolunteers: 18, area: "Koramangala" }
];

const initialFoodFeed = [
  { id: 'F001', donorId: 'D101', donorName: "Hotel Royal Plaza", type: "Cooked Meals", qty: "45 Servings", dist: "1.2km", status: "New", createdAt: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 'F002', donorId: 'D102', donorName: "Big Bazaar", type: "Raw Grains", qty: "120kg", dist: "3.5km", status: "Critical", createdAt: new Date(Date.now() - 2 * 60000).toISOString() }
];

export const useStore = create(
  persist(
    (set, get) => ({
      // ENTITIES (Simulating Database Tables)
      donors: initialDonors,
      ngos: initialNGOs,
      foodFeed: initialFoodFeed,
      deliveries: [],
      volunteers: [
        { id: 'V1', name: "Rahul S.", points: 1240, rating: 4.8, status: 'assigned' },
        { id: 'V2', name: "Priya M.", points: 850, rating: 4.9, status: 'idle' }
      ],
      impactStats: {
        totalMeals: 8245132,
        districts: 247,
        leakageReduced: 19.4
      },

      // CENTRAL SYNC ACTION (Integrates GAS)
      syncWithDatabase: async () => {
        // Fetch all tables from App Scripts
        const remoteFeed = await apiService.fetchData('get_feed');
        const remoteDeliveries = await apiService.fetchData('get_deliveries');
        
        if (remoteFeed) set({ foodFeed: remoteFeed });
        if (remoteDeliveries) set({ deliveries: remoteDeliveries });
      },

      // ACTIONS (Modified for API Integration)
      
      addFoodSurplus: async (newSurplus) => {
        const item = {
          id: `F00${get().foodFeed.length + 1}`,
          ...newSurplus,
          status: newSurplus.status || 'New',
          createdAt: new Date().toISOString()
        };
        
        // Push to App Scripts
        const res = await apiService.postData('add_surplus', item);
        
        if (res.success) {
          set(state => ({ foodFeed: [item, ...state.foodFeed] }));
        }
        return item;
      },

      acceptSurplus: async (surplusId, ngoId) => {
        const item = get().foodFeed.find(f => f.id === surplusId);
        if (!item) return;

        // Push update to App Scripts
        const res = await apiService.postData('accept_surplus', { id: surplusId, status: 'Matched' });
        
        if (res.success) {
          set(state => ({
            foodFeed: state.foodFeed.map(f => f.id === surplusId ? { ...f, status: 'Matched' } : f),
            deliveries: [
              {
                id: `DX-${Math.floor(Math.random() * 900) + 100}`,
                taskId: surplusId,
                volunteerName: "Rahul S.", // Auto-assigned for demo
                task: `${item.qty} ${item.type}`,
                dest: get().ngos.find(n => n.id === ngoId)?.name || "NGO Center",
                status: 'In Transit'
              },
              ...state.deliveries
            ]
          }));
        }
      },

      completeTask: (deliveryId, volunteerId) => {
        const delivery = get().deliveries.find(d => d.id === deliveryId);
        set(state => ({
          deliveries: state.deliveries.filter(d => d.id !== deliveryId),
          volunteers: state.volunteers.map(v => v.id === volunteerId ? { ...v, points: v.points + 50, status: 'idle' } : v),
          impactStats: { 
            ...state.impactStats, 
            totalMeals: state.impactStats.totalMeals + (delivery?.task?.includes('Meals') ? parseInt(delivery.task) : 50) 
          }
        }));
      },

      incrementImpact: (amount) => {
        set(state => ({
          impactStats: { ...state.impactStats, totalMeals: state.impactStats.totalMeals + amount }
        }));
      }
    }),
    {
      name: 'annadata-persistence',
      getStorage: () => localStorage,
    }
  )
);
