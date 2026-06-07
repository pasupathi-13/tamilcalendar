import { useState, useMemo } from 'react';
import { holidaysData } from '../data/holidaysData';
import './Holidays.css';

function Holidays() {
  const [filterMonth, setFilterMonth] = useState('all');

  // Get unique months from holidays
  const months = useMemo(() => {
    const monthSet = new Set();
    holidaysData.holidays.forEach(holiday => {
      const month = new Date(holiday.date).toLocaleString('default', { month: 'long' });
      monthSet.add(month);
    });
    const monthOrder = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return ['all', ...Array.from(monthSet).sort((a,b) => monthOrder.indexOf(a) - monthOrder.indexOf(b))];
  }, []);

  // Filter holidays by month
  const filteredHolidays = useMemo(() => {
    if (filterMonth === 'all') return holidaysData.holidays;
    return holidaysData.holidays.filter(holiday => {
      const month = new Date(holiday.date).toLocaleString('default', { month: 'long' });
      return month === filterMonth;
    });
  }, [filterMonth]);

  // Group by month for display
  const groupedByMonth = useMemo(() => {
    const groups = {};
    filteredHolidays.forEach(holiday => {
      const dateObj = new Date(holiday.date);
      const month = dateObj.toLocaleString('default', { month: 'long' });
      if (!groups[month]) groups[month] = [];
      groups[month].push(holiday);
    });
    // Sort months chronologically
    const monthOrder = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const sortedGroups = {};
    Object.keys(groups).sort((a,b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)).forEach(month => {
      sortedGroups[month] = groups[month];
    });
    return sortedGroups;
  }, [filteredHolidays]);

  return (
    <div className="holidays-container">
      <h1>🏛️ தமிழ்நாடு அரசு விடுமுறை நாட்கள் 2026 🏛️</h1>
      <p className="subtitle">Tamil Nadu Government Holidays 2026</p>

      {/* Month filter */}
      <div className="filter-wrapper">
        <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
          {months.map(month => (
            <option key={month} value={month}>
              {month === 'all' ? 'அனைத்து மாதங்களும்' : month}
            </option>
          ))}
        </select>
      </div>

      {/* Holidays list grouped by month */}
      {Object.entries(groupedByMonth).map(([month, holidays]) => (
        <div key={month} className="month-group">
          <h2>{month}</h2>
          <div className="holidays-list">
            {holidays.map((holiday, idx) => {
              const dateObj = new Date(holiday.date);
              const formattedDate = dateObj.toLocaleDateString('ta-IN', { 
                day: 'numeric', 
                month: 'long',
                year: 'numeric'
              });
              return (
                <div key={idx} className="holiday-card">
                  <div className="holiday-date">{formattedDate} – {holiday.day}</div>
                  <div className="holiday-name-ta">{holiday.name_ta}</div>
                  <div className="holiday-name-en">{holiday.name_en}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {filteredHolidays.length === 0 && (
        <div className="no-holidays">இந்த மாதத்தில் விடுமுறை நாட்கள் இல்லை.</div>
      )}
    </div>
  );
}

export default Holidays;