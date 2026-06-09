import { useState, useEffect } from 'react';
import './MonthlyCalendar.css';

// Tamil names for months
const tamilMonthNames = {
  January: 'ஜனவரி',
  February: 'பிப்ரவரி',
  March: 'மார்ச்',
  April: 'ஏப்ரல்',
  May: 'மே',
  June: 'ஜூன்',
  July: 'ஜூலை',
  August: 'ஆகஸ்ட்',
  September: 'செப்டம்பர்',
  October: 'அக்டோபர்',
  November: 'நவம்பர்',
  December: 'டிசம்பர்'
};

const getMonthImage = (monthName) => {
  const imageMap = {
    January: 'january',
    February: 'february',
    March: 'march',
    April: 'april',
    May: 'may',
    June: 'june',
    July: 'july',
    August: 'august',
    September: 'september',
    October: 'october',
    November: 'november',
    December: 'december'
  };
  const fileName = imageMap[monthName];
  if (!fileName) return null;
  return `/images/months/${fileName}.png`;
};

function MonthlyCalendar() {
  const [monthData, setMonthData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only month names needed (no days/events)
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    setMonthData(months);
    setLoading(false);
  }, []);

  if (loading) return <div className="container">Loading monthly calendar...</div>;

  return (
    <div className="monthly-container">
      <h1>📆 மாதாந்திர நாட்காட்டி 2026</h1>
      <p className="subtitle">Month‑wise Tamil calendar</p>

      {monthData.map((month, idx) => {
        const imagePath = getMonthImage(month);
        const tamilName = tamilMonthNames[month];
        return (
          <div key={idx} className="month-card">
            {/* Heading (Tamil + English) ABOVE the image */}
            <h2>{tamilName} - {month} 2026</h2>
            {imagePath && (
              <div className="month-image-wrapper">
                <img
                  src={imagePath}
                  alt={`${month} illustration`}
                  className="month-image"
                  onError={(e) => {
                    console.error(`Failed to load image: ${imagePath}`);
                    e.target.style.display = 'none';
                    const parent = e.target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'image-fallback';
                      fallback.innerText = `🖼️ ${month} image not found`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MonthlyCalendar;