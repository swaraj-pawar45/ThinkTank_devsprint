import React, { useState, useMemo } from 'react';
import { MapPin, Truck, Navigation } from 'lucide-react';
import './LiveMapFilter.css';

const LiveMapFilter = ({ foodFeed, deliveries, role }) => {
    const [filter, setFilter] = useState('All'); // 'All', 'New', 'Matched', 'In Transit'

    // Compute active items based on filter with persistent random coordinates purely for abstract visualization
    const displayItems = useMemo(() => {
        const regions = [
            { name: 'Indiranagar Hub', center: { lat: 30, lng: 30 }, radius: 15 },
            { name: 'Koramangala Cluster', center: { lat: 70, lng: 30 }, radius: 15 },
            { name: 'Whitefield Node', center: { lat: 30, lng: 70 }, radius: 15 },
            { name: 'Electronic City', center: { lat: 70, lng: 70 }, radius: 15 }
        ];

        return foodFeed.map((feed, idx) => {
            const delivery = deliveries.find(d => d.taskId === feed.id);
            let displayStatus = feed.status;
            if (delivery) displayStatus = delivery.status;

            // Assign to a region based on ID hash
            const regionIdx = feed.id.charCodeAt(feed.id.length - 1) % regions.length;
            const region = regions[regionIdx];

            return {
                ...feed,
                displayStatus,
                regionName: region.name,
                // Offset within region using character code hashes
                lat: region.center.lat + (feed.id.charCodeAt(feed.id.length - 1) % 20 - 10),
                lng: region.center.lng + (feed.id.charCodeAt(0) % 20 - 10),
                humidity: 45 + (feed.id.charCodeAt(0) % 10),
                temp: 22 + (feed.id.charCodeAt(0) % 5)
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
               {/* Regional Labels */}
               <div className="region-label" style={{ top: '25%', left: '25%' }}>Indiranagar Ward</div>
               <div className="region-label" style={{ top: '65%', left: '25%' }}>Koramangala Zone</div>
               <div className="region-label" style={{ top: '25%', left: '65%' }}>Whitefield Hub</div>
               <div className="region-label" style={{ top: '65%', left: '65%' }}>E-City Terminal</div>

               {filteredItems.map(item => (
                   <div 
                     key={item.id} 
                     className={`map-marker ${item.status.toLowerCase()} ${item.displayStatus.toLowerCase().replace(' ', '-')}`} 
                     style={{ top: `${item.lat}%`, left: `${item.lng}%`}}
                   >
                       {item.displayStatus === 'In Transit' ? <Truck size={14} /> : <MapPin size={14} />}
                       <div className="marker-tooltip">
                           <div className="tooltip-header">
                              <strong>{item.qty} {item.type}</strong>
                              <span className="badge">{item.displayStatus}</span>
                           </div>
                           <div className="tooltip-details">
                              <span>Origin: {item.donorName}</span>
                              <span>Region: {item.regionName}</span>
                              <div className="telemetry-row">
                                 <span>🌡️ {item.temp}°C</span>
                                 <span>💧 {item.humidity}%</span>
                                 <span>📍 {item.dist}</span>
                              </div>
                           </div>
                           <button className="btn-mini-track">View Real-time Node Trace</button>
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
