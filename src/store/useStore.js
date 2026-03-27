import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

const initialDeliveries = [
  { id: 'DX-902', taskId: 'F001', volunteerName: "Rahul S.", task: "45 Meals Pickup", dest: "Umeed Trust Center", status: "In Transit" }
];

export const useStore = create(
  persist(
    (set, get) => ({
      // ENTITIES (Simulating Database Tables)
      donors: initialDonors,
      ngos: initialNGOs,
      foodFeed: initialFoodFeed,
      deliveries: initialDeliveries,
      volunteers: [
        { id: 'V1', name: "Rahul S.", points: 1240, rating: 4.8, status: 'assigned' },
        { id: 'V2', name: "Priya M.", points: 850, rating: 4.9, status: 'idle' }
      ],
      impactStats: {
        totalMeals: 8245132,
        districts: 247,
        leakageReduced: 19.4
      },

      // ACTIONS (Simulating API Endpoints)
      
      // Donor: Post Surplus
      addFoodSurplus: (newSurplus) => {
        const item = {
          id: `F00${get().foodFeed.length + 1}`,
          ...newSurplus,
          status: 'New',
          createdAt: new Date().toISOString()
        };
        set(state => ({ foodFeed: [item, ...state.foodFeed] }));
        return item;
      },

      // NGO: Accept Food (Matches to delivery)
      acceptSurplus: (surplusId, ngoId) => {
        const item = get().foodFeed.find(f => f.id === surplusId);
        if (!item) return;

        set(state => ({
          foodFeed: state.foodFeed.map(f => f.id === surplusId ? { ...f, status: 'Matched' } : f),
          deliveries: [
            {
              id: `DX-${Math.floor(Math.random() * 900) + 100}`,
              taskId: surplusId,
              volunteerName: "Assigning...",
              task: `${item.qty} ${item.type} Pickup`,
              dest: get().ngos.find(n => n.id === ngoId)?.name || "NGO Center",
              status: 'Assigned'
            },
            ...state.deliveries
          ]
        }));
      },

      // Volunteer: Complete Task
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

      // Government: Flag Anomaly
      flagAnomaly: (shopId, reason) => {
        console.log(`Flagged ${shopId} for ${reason}`);
      },

      // Real-time ticker simulation
      incrementImpact: (amount) => {
        set(state => ({
          impactStats: { ...state.impactStats, totalMeals: state.impactStats.totalMeals + amount }
        }));
      }
    }),
    {
      name: 'annadata-storage', // name of the item in the storage (must be unique)
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
