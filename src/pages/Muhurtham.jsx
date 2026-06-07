import { useState, useMemo } from 'react';
import { muhurthamData } from '../data/muhurthamData';
import { muhurtham2027 } from '../data/muhurtham2027';
import './Muhurtham.css';

function Muhurtham() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [filterMonth, setFilterMonth] = useState('all');

  // Get the data based on selected year
  const currentYearData = useMemo(() => {
    if (selectedYear === '2026') {
      return {
        dates: muhurthamData.wedding_dates_2026,
        disclaimer: muhurthamData.disclaimer,
        type: '2026'
      };
    } else {
      return {
        dates: muhurtham2027.tamil_muhurtham_dates_2027,
        disclaimer: "Please Note: The wedding dates given based on the tamil calendar. Kindly consult with astrologer before finalizing your wedding date. Depending upon the individual's birth details, astrologer may predict a date which may not be available here. The date choosen by your astrologer will be the exact good day for you.",
        type: '2027'
      };
    }
  }, [selectedYear]);

  // Extract unique months for filter (for 2026 it's from gregorian.month, for 2027 from month_heading)
  const monthOptions = useMemo(() => {
    if (currentYearData.type === '2026') {
      const monthSet = new Set();
      currentYearData.dates.forEach(item => {
        monthSet.add(item.gregorian.month);
      });
      const order = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      return ['all', ...Array.from(monthSet).sort((a,b) => order.indexOf(a) - order.indexOf(b))];
    } else {
      return ['all', ...currentYearData.dates.map(item => item.month_heading)];
    }
  }, [currentYearData]);

  // Filter by month
  const filteredDates = useMemo(() => {
    if (filterMonth === 'all') return currentYearData.dates;
    if (currentYearData.type === '2026') {
      return currentYearData.dates.filter(item => item.gregorian.month === filterMonth);
    } else {
      return currentYearData.dates.filter(item => item.month_heading === filterMonth);
    }
  }, [filterMonth, currentYearData]);

  // Helper to format a single date entry (2026 format or 2027 format)
  const formatDateEntry = (entry, type) => {
    if (type === '2026') {
      const g = entry.gregorian;
      const t = entry.tamil;
      const gregorianDisplay = `${g.date} ${g.month} ${g.year}, ${g.day} (${g.pirai === 'Valarpirai' ? 'வளர்பிறை' : 'தேய்பிறை'})`;
      const tamilDisplay = `${t.month} ${t.date}, ${t.year} – ${t.day} (${t.pirai})`;
      return { gregorianDisplay, tamilDisplay };
    } else {
      // 2027 format: entry has english_date, english_month, etc.
      const g = entry;
      const gregorianDisplay = `${g.english_date} ${g.english_month} ${g.year}, ${g.day_english} (${g.pirai_english === 'Valarpirai' ? 'வளர்பிறை' : 'தேய்பிறை'})`;
      const tamilDisplay = `${g.tamil_month} ${g.tamil_date}, ${g.tamil_year} – ${g.day_tamil} (${g.pirai_tamil})`;
      return { gregorianDisplay, tamilDisplay };
    }
  };

  // Group 2026 data by month (since it's not pre‑grouped)
  const groupedByMonth = useMemo(() => {
    if (currentYearData.type === '2026') {
      const groups = {};
      filteredDates.forEach(entry => {
        const month = entry.gregorian.month;
        if (!groups[month]) groups[month] = [];
        groups[month].push(entry);
      });
      // sort months chronologically
      const order = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      const sortedGroups = {};
      Object.keys(groups).sort((a,b) => order.indexOf(a) - order.indexOf(b)).forEach(month => {
        sortedGroups[month] = groups[month];
      });
      return sortedGroups;
    } else {
      // 2027 data is already grouped by month_heading
      const groups = {};
      filteredDates.forEach(monthGroup => {
        const monthName = monthGroup.month_heading.replace('Tamil Muhurtham Dates ', '');
        groups[monthName] = monthGroup.dates;
      });
      return groups;
    }
  }, [filteredDates, currentYearData.type]);

  return (
    <div className="muhurtham-container">
      <h1>💍 திருமண முகூர்த்த தேதிகள் {selectedYear} 💍</h1>
      <p className="subtitle">திருமணத்திற்கு ஏற்ற நன்னாள்கள் – Wedding Muhurtham Dates {selectedYear}</p>

      {/* Year selector */}
      <div className="filter-wrapper">
        <select value={selectedYear} onChange={(e) => { setSelectedYear(e.target.value); setFilterMonth('all'); }}>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>

      {/* Month filter (only if there is more than one month) */}
      {monthOptions.length > 2 && (
        <div className="filter-wrapper">
          <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
            {monthOptions.map(month => (
              <option key={month} value={month}>
                {month === 'all' ? 'அனைத்து மாதங்களும்' : (currentYearData.type === '2026' ? month : month.replace('Tamil Muhurtham Dates ', ''))}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display grouped dates */}
      {Object.entries(groupedByMonth).map(([monthName, dates]) => (
        <div key={monthName} className="month-group">
          <h2>{monthName}</h2>
          <div className="dates-list">
            {dates.map((item, idx) => {
              const { gregorianDisplay, tamilDisplay } = formatDateEntry(item, currentYearData.type);
              return (
                <div key={idx} className="muhurtham-card">
                  <div className="date-gregorian">{gregorianDisplay}</div>
                  <div className="date-tamil">{tamilDisplay}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {filteredDates.length === 0 && (
        <div className="no-dates">இந்த மாதத்தில் திருமண முகூர்த்த தேதிகள் இல்லை.</div>
      )}

      <div className="disclaimer">
        <strong>⚠️ முக்கிய குறிப்பு:</strong> {currentYearData.disclaimer}
      </div>
    </div>
  );
}

export default Muhurtham;