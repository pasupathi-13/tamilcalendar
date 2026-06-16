import React from 'react';
import { Helmet } from 'react-helmet-async';
import { pournami2026 } from '../data/lunar2026';
import './LunarPages.css';

const Pournami = () => {
  const groupedData = pournami2026.data;

  return (
    <div className="festivals-container">
      <Helmet>
        <title>Pournami 2026 Dates | Full Moon Days | Tamil Calendar</title>
        <meta name="description" content="Complete list of Pournami (Full Moon) dates in 2026. Auspicious for fasting, festivals, and special prayers." />
        <link rel="canonical" href="https://tamilcalendar.vercel.app/pournami" />
      </Helmet>

      <div className="festivals-header">
        <h1>🌕 Pournami 2026</h1>
        <div className="subhead">Full Moon Days • Fasting • Festivals • Spiritual Practices</div>
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
        🌕 Pournami is considered highly auspicious for Satyanarayana Puja, fasting, and charitable acts.
      </div>
    </div>
  );
};

export default Pournami;