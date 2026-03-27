import React, { useEffect } from 'react';
import { useStore } from '../../store/useStore';

const ServerSimulator = () => {
  const { incrementImpact, foodFeed, donors, set } = useStore();

  useEffect(() => {
    // 1. SIMULATE LIVE IMPACT INCREMENTS (Every 2-5 seconds)
    const impactInterval = setInterval(() => {
      const increment = Math.floor(Math.random() * 5) + 1;
      useStore.getState().incrementImpact(increment);
    }, 3500);

    // 2. SIMULATE NEW DONATIONS ARRIVING (Every 30-60 seconds)
    const donationInterval = setInterval(() => {
      const randomDonor = useStore.getState().donors[Math.floor(Math.random() * 2)];
      const types = ["Cooked Meals", "Raw Grains", "Vegetables"];
      const qtys = ["40 Servings", "150kg", "80kg"];
      
      const newD = {
        id: `F${Date.now()}`,
        donorId: randomDonor.id,
        donorName: randomDonor.name,
        type: types[Math.floor(Math.random() * 3)],
        qty: qtys[Math.floor(Math.random() * 3)],
        dist: (Math.random() * 5).toFixed(1) + "km",
        status: "New",
        createdAt: new Date().toISOString()
      };

      useStore.setState(state => ({
        foodFeed: [newD, ...state.foodFeed].slice(0, 10) // Keep last 10
      }));
    }, 45000);

    return () => {
      clearInterval(impactInterval);
      clearInterval(donationInterval);
    };
  }, []);

  return null; // Side-effect only component
};

export default ServerSimulator;
