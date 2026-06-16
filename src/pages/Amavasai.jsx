// src/pages/Amavasai.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { amavasai2026 } from '../data/lunar2026';
import './LunarPages.css';  // reuse same CSS as ChandraDarisanam

const Amavasai = () => {
  // Group data by month (already grouped, but we keep as is)
  const groupedData = amavasai2026.data;

  return (
    <div className="festivals-container">
      <Helmet>
        <title>Amavasai 2026 Dates | New Moon Days | Tamil Calendar</title>
        <meta name="description" content="List of all Amavasai (New Moon) dates in 2026. Important for ancestor rituals and spiritual practices." />
      </Helmet>

      <div className="festivals-header">
        <h1>🌑 Amavasai 2026</h1>
        <div className="subhead">New Moon Days • Pitru Tarpanam • Spiritual Significance</div>
      </div>

      <div className="lunar-grid">
        {groupedData.map((item, idx) => (
          <div className="lunar-card" key={idx}>
            <div className="lunar-date">{item.date}</div>
            <div className="lunar-details">
              <div className="lunar-month">{item.month}</div>
              <div className="lunar-day">{item.day}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="info-note">
        🌑 Amavasya is the no-moon day. It is ideal for performing tarpanam (offerings to ancestors) and meditation.
      </div>
    </div>
  );
};

export default Amavasai;