import React, { useState, useMemo } from 'react';
import { MapPin, Truck, Navigation } from 'lucide-react';
import './LiveMapFilter.css';

const LiveMapFilter = ({ foodFeed, deliveries, role }) => {
    const [filter, setFilter] = useState('All'); // 'All', 'New', 'Matched', 'In Transit'

    // Compute active items based on filter with persistent random coordinates purely for abstract visualization
    const displayItems = useMemo(() => {
        return foodFeed.map(feed => {
            const delivery = deliveries.find(d => d.taskId === feed.id);
            let displayStatus = feed.status;
            if (delivery) displayStatus = delivery.status;

            return {
                ...feed,
                displayStatus,
                // Assign persistent random hash-based coordinates so pins don't jump around on re-renders
                lat: (feed.id.charCodeAt(feed.id.length - 1) * 3) % 70 + 15, // 15% to 85%
                lng: (feed.id.charCodeAt(0) * 7) % 70 + 15
            }
        });
    }, [foodFeed, deliveries]);

    const filteredItems = displayItems.filter(item => {
        if (filter === 'All') return true;
        if (filter === 'Cooked Meals') return item.type.toLowerCase().includes('cook') || item.type.toLowerCase().includes('meal');
        if (filter === 'Raw Ingredients') return item.type.toLowerCase().includes('raw') || item.type.toLowerCase().includes('grain');
        if (filter === 'Bulk Load') return parseInt(item.qty) >= 50 || item.qty.toLowerCase().includes('kg');
        if (filter === 'Small Drops') return parseInt(item.qty) < 20 && !item.qty.toLowerCase().includes('kg');
        if (filter === 'High-Value Donors') return item.donorName.toLowerCase().match(/(hotel|plaza|itc|taj|bazaar)/);
        if (filter === 'Local (< 2km)') return parseFloat(item.dist) <= 2;
        if (filter === 'Matched (Waiting)') return item.status === 'Matched' && item.displayStatus !== 'In Transit';
        return item.displayStatus === filter || item.status === filter;
    });

    return (
        <div className="live-map-container card fade-up">
            <div className="map-header">
               <div style={{ display:'flex', alignItems:'center', gap: '8px' }}>
                  <Navigation size={20} className="text-saffron" />
                  <h3 style={{ margin: 0 }}>Live Logistics Radar</h3>
               </div>
               <div className="map-filters">
                   <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All Events</button>
                   <button className={filter === 'New' ? 'active' : ''} onClick={() => setFilter('New')}>Unclaimed</button>
                   <button className={filter === 'Critical' ? 'active' : ''} onClick={() => setFilter('Critical')}>Urgent / Critical</button>
                   <button className={filter === 'High-Value Donors' ? 'active' : ''} onClick={() => setFilter('High-Value Donors')}>Corporate Donors</button>
                   <button className={filter === 'Local (< 2km)' ? 'active' : ''} onClick={() => setFilter('Local (< 2km)')}>Local (&lt; 2km)</button>
                   <button className={filter === 'Matched (Waiting)' ? 'active' : ''} onClick={() => setFilter('Matched (Waiting)')}>Awaiting Pickup</button>
                   <button className={filter === 'In Transit' ? 'active' : ''} onClick={() => setFilter('In Transit')}>In Transit</button>
                   <button className={filter === 'Cooked Meals' ? 'active' : ''} onClick={() => setFilter('Cooked Meals')}>Cooked Meals</button>
                   <button className={filter === 'Raw Ingredients' ? 'active' : ''} onClick={() => setFilter('Raw Ingredients')}>Raw Ingredients</button>
                   <button className={filter === 'Bulk Load' ? 'active' : ''} onClick={() => setFilter('Bulk Load')}>Bulk Loads (&gt;50)</button>
                   <button className={filter === 'Small Drops' ? 'active' : ''} onClick={() => setFilter('Small Drops')}>Small Drops (&lt;20)</button>
               </div>
            </div>
            
            <div className="map-plane">
               {filteredItems.map(item => (
                   <div 
                     key={item.id} 
                     className={`map-marker ${item.status.toLowerCase()} ${item.displayStatus.toLowerCase().replace(' ', '-')}`} 
                     style={{ top: `${item.lat}%`, left: `${item.lng}%`}}
                   >
                       {item.displayStatus === 'In Transit' ? <Truck size={14} /> : <MapPin size={14} />}
                       <div className="marker-tooltip">
                           <strong>{item.qty} {item.type}</strong>
                           <span style={{ fontSize: '12px', opacity: 0.8 }}>From: {item.donorName}</span>
                           <span className="badge">{item.displayStatus}</span>
                       </div>
                   </div>
               ))}
               <div className="map-radar-wrapper">
                 <div className="map-radar-sweep"></div>
               </div>
            </div>
        </div>
    );
};

export default LiveMapFilter;
