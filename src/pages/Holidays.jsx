import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { holidaysData } from '../data/holidaysData';
import './Holidays.css';

function Holidays() {
  const [filterMonth, setFilterMonth] = useState('all');

  // Month translation mapping for cleaner dynamic tags if needed
  const monthTranslations = {
    January: 'ஜனவரி', February: 'பிப்ரவரி', March: 'மார்ச்', April: 'ஏப்ரல்',
    May: 'மே', June: 'ஜூன்', July: 'ஜூலை', August: 'ஆகஸ்ட்',
    September: 'செப்டம்பர்', October: 'அக்டோபர்', November: 'நவம்பர்', December: 'டிசம்பர்'
  };

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
    const monthOrder = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const sortedGroups = {};
    Object.keys(groups).sort((a,b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)).forEach(month => {
      sortedGroups[month] = groups[month];
    });
    return sortedGroups;
  }, [filteredHolidays]);

  // 🌟 Dynamic Structured Data Schema generation for Google Rich Snippets
  const holidaysSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Tamil Nadu Government Holidays List 2026",
      "description": "Official list of public and bank holidays declared by the Government of Tamil Nadu for the year 2026.",
      "numberOfItems": holidaysData.holidays.length,
      "itemListElement": holidaysData.holidays.map((holiday, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": `${holiday.name_en} (${holiday.name_ta})`,
        "date": holiday.date
      }))
    };
  }, []);

  return (
    <main className="holidays-container">
      <Helmet>
        <html lang="ta" />
        <title>Tamil Nadu Government Holidays 2026 | Public & Bank Holidays List</title>
        <meta 
          name="description" 
          content="Official Tamil Nadu Government Holidays List 2026. View month-wise public holidays, bank holidays, and long weekends in Tamil Nadu with precise English and Tamil details." 
        />
        <meta 
          name="keywords" 
          content="Tamil Nadu Government Holidays 2026, TN Government Holidays 2026, 2026 அரசு விடுமுறை நாட்கள், Tamil Calendar Holidays 2026, Public Holidays Tamil Nadu" 
        />
        <link rel="canonical" href="https://tamilcalendar-c0q6.onrender.com/holidays" />
        
        {/* Open Graph Tags for Social Optimization */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Tamil Nadu Government Holidays 2026 | Full List" />
        <meta property="og:description" content="Check the complete list of public and bank holidays released by the TN Govt for 2026 with accurate festival dates." />
        <meta property="og:url" content="https://tamilcalendar-c0q6.onrender.com/holidays" />
        
        {/* JSON-LD Schema Injection */}
        <script type="application/ld+json">
          {JSON.stringify(holidaysSchema)}
        </script>
      </Helmet>

      <header className="holidays-header">
        <h1>தமிழ்நாடு அரசு விடுமுறை நாட்கள் 2026</h1>
        <p className="subtitle">Tamil Nadu Government Holidays 2026</p>
      </header>

      {/* Month Filter Dropdown with proper label accessibility */}
      <div className="filter-wrapper">
        <label htmlFor="month-select" className="visually-hidden">மாதங்களை தேர்வு செய்யவும்:</label>
        <select 
          id="month-select" 
          value={filterMonth} 
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          {months.map(month => (
            <option key={month} value={month}>
              {month === 'all' ? 'அனைத்து மாதங்களும் (All Months)' : `${monthTranslations[month] || month} (${month})`}
            </option>
          ))}
        </select>
      </div>

      {/* Holidays list grouped by month */}
      {Object.entries(groupedByMonth).map(([month, holidays]) => (
        <section key={month} className="month-group">
          <h2>{monthTranslations[month] || month} - {month}</h2>
          <ul className="holidays-list">
            {holidays.map((holiday, idx) => {
              const dateObj = new Date(holiday.date);
              const formattedDate = dateObj.toLocaleDateString('ta-IN', { 
                day: 'numeric', 
                month: 'long',
                year: 'numeric'
              });
              return (
                <li key={idx} className="holiday-card">
                  <div className="holiday-date">
                    <time dateTime={holiday.date}>{formattedDate}</time> – <span>{holiday.day}</span>
                  </div>
                  <h3 className="holiday-name-ta">{holiday.name_ta}</h3>
                  <div className="holiday-name-en">{holiday.name_en}</div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {filteredHolidays.length === 0 && (
        <div className="no-holidays" role="status">இந்த மாதத்தில் விடுமுறை நாட்கள் இல்லை.</div>
      )}
    </main>
  );
}

export default Holidays;