import { useState } from 'react';
import { festivalsData } from '../data/festivalsData';
import './Festivals.css';

function Festivals() {
  const [selectedReligion, setSelectedReligion] = useState('all'); // 'all', 'hindu', 'christian', 'muslim'

  const getReligionName = (type) => {
    switch(type) {
      case 'hindu_festivals': return 'இந்து பண்டிகைகள்';
      case 'christian_festivals': return 'கிறிஸ்தவ பண்டிகைகள்';
      case 'muslim_festivals': return 'இஸ்லாமிய பண்டிகைகள்';
      default: return '';
    }
  };

  const getReligionClass = (type) => {
    switch(type) {
      case 'hindu_festivals': return 'hindu';
      case 'christian_festivals': return 'christian';
      case 'muslim_festivals': return 'muslim';
      default: return '';
    }
  };

  // Filter festivals based on selected religion
  const getFilteredFestivals = () => {
    if (selectedReligion === 'all') {
      return [
        ...festivalsData.hindu_festivals.map(f => ({ ...f, type: 'hindu_festivals' })),
        ...festivalsData.christian_festivals.map(f => ({ ...f, type: 'christian_festivals' })),
        ...festivalsData.muslim_festivals.map(f => ({ ...f, type: 'muslim_festivals' }))
      ];
    } else if (selectedReligion === 'hindu') {
      return festivalsData.hindu_festivals.map(f => ({ ...f, type: 'hindu_festivals' }));
    } else if (selectedReligion === 'christian') {
      return festivalsData.christian_festivals.map(f => ({ ...f, type: 'christian_festivals' }));
    } else if (selectedReligion === 'muslim') {
      return festivalsData.muslim_festivals.map(f => ({ ...f, type: 'muslim_festivals' }));
    }
    return [];
  };

  const filteredFestivals = getFilteredFestivals();

  // Sort by date
  filteredFestivals.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Group by month
  const groupByMonth = (festivals) => {
    const months = {
      '01': 'ஜனவரி', '02': 'பிப்ரவரி', '03': 'மார்ச்', '04': 'ஏப்ரல்',
      '05': 'மே', '06': 'ஜூன்', '07': 'ஜூலை', '08': 'ஆகஸ்ட்',
      '09': 'செப்டம்பர்', '10': 'அக்டோபர்', '11': 'நவம்பர்', '12': 'டிசம்பர்'
    };
    const grouped = {};
    festivals.forEach(festival => {
      const month = festival.date.split('-')[1];
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(festival);
    });
    return { grouped, months };
  };

  const { grouped, months } = groupByMonth(filteredFestivals);

  return (
    <div className="festivals-container">
      <h1>2026 பண்டிகைகள்</h1>
      
      {/* Religion filter buttons */}
      <div className="filter-buttons">
        <button 
          className={selectedReligion === 'all' ? 'active' : ''} 
          onClick={() => setSelectedReligion('all')}
        >
          அனைத்தும்
        </button>
        <button 
          className={selectedReligion === 'hindu' ? 'active' : ''} 
          onClick={() => setSelectedReligion('hindu')}
        >
          இந்து
        </button>
        <button 
          className={selectedReligion === 'christian' ? 'active' : ''} 
          onClick={() => setSelectedReligion('christian')}
        >
          கிறிஸ்தவ
        </button>
        <button 
          className={selectedReligion === 'muslim' ? 'active' : ''} 
          onClick={() => setSelectedReligion('muslim')}
        >
          இஸ்லாம்
        </button>
      </div>

      {/* Festivals list grouped by month */}
      {Object.keys(grouped).sort().map(monthKey => (
        <div key={monthKey} className="month-group">
          <h2>{months[monthKey]}</h2>
          <div className="festivals-list">
            {grouped[monthKey].map((festival, idx) => (
              <div key={idx} className={`festival-card ${getReligionClass(festival.type)}`}>
                <div className="festival-date">
                  {new Date(festival.date).toLocaleDateString('ta-IN', { day: 'numeric', month: 'short' })}
                </div>
                <div className="festival-details">
                  <div className="festival-name">{festival.name}</div>
                  <div className="festival-day">{festival.day}</div>
                </div>
                <div className="festival-type-badge">{getReligionName(festival.type)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filteredFestivals.length === 0 && (
        <div className="no-festivals">இந்த பிரிவில் பண்டிகைகள் இல்லை</div>
      )}
    </div>
  );
}

export default Festivals;