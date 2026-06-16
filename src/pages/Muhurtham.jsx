import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { muhurthamData } from '../data/muhurthamData';
import { muhurtham2027 } from '../data/muhurtham2027';
import './Muhurtham.css';

function Muhurtham() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [filterMonth, setFilterMonth] = useState('all');

  // Safely normalize data payloads depending on selected calendar window
  const currentYearData = useMemo(() => {
    if (selectedYear === '2026') {
      return {
        dates: muhurthamData?.wedding_dates_2026 || [],
        disclaimer: muhurthamData?.disclaimer || "Consult your astrologer to find the exact auspicious time aligned with your birth chart details.",
        type: '2026'
      };
    } else {
      return {
        dates: muhurtham2027?.tamil_muhurtham_dates_2027 || [],
        disclaimer: "Please Note: The wedding dates given based on the tamil calendar. Kindly consult with astrologer before finalizing your wedding date. Depending upon the individual's birth details, astrologer may predict a date which may not be available here. The date choosen by your astrologer will be the exact good day for you.",
        type: '2027'
      };
    }
  }, [selectedYear]);

  // Extract unique chronological months for selection filters
  const monthOptions = useMemo(() => {
    const order = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    
    if (currentYearData.type === '2026') {
      const monthSet = new Set();
      currentYearData.dates.forEach(item => {
        if (item?.gregorian?.month) monthSet.add(item.gregorian.month);
      });
      return ['all', ...Array.from(monthSet).sort((a, b) => order.indexOf(a) - order.indexOf(b))];
    } else {
      // 2027 data maps month values inside pre-grouped structural nodes
      const cleanMonths = currentYearData.dates.map(item => item.month_heading);
      return ['all', ...cleanMonths];
    }
  }, [currentYearData]);

  // Filter dataset dynamically based on selection state
  const filteredDates = useMemo(() => {
    if (filterMonth === 'all') return currentYearData.dates;
    if (currentYearData.type === '2026') {
      return currentYearData.dates.filter(item => item?.gregorian?.month === filterMonth);
    } else {
      return currentYearData.dates.filter(item => item?.month_heading === filterMonth);
    }
  }, [filterMonth, currentYearData]);

  // Helper parser utility to unify presentation displays seamlessly
  const formatDateEntry = (entry, type) => {
    if (type === '2026') {
      const g = entry?.gregorian || {};
      const t = entry?.tamil || {};
      const gregorianDisplay = `${g.date || ''} ${g.month || ''} ${g.year || ''}, ${g.day || ''} (${g.pirai === 'Valarpirai' ? 'வளர்பிறை' : 'தேய்பிறை'})`;
      const tamilDisplay = `${t.month || ''} ${t.date || ''}, ${t.year || ''} – ${t.day || ''} (${t.pirai || ''})`;
      return { gregorianDisplay, tamilDisplay };
    } else {
      const g = entry || {};
      const gregorianDisplay = `${g.english_date || ''} ${g.english_month || ''} ${g.year || ''}, ${g.day_english || ''} (${g.pirai_english === 'Valarpirai' ? 'வளர்பிறை' : 'தேய்பிறை'})`;
      const tamilDisplay = `${g.tamil_month || ''} ${g.tamil_date || ''}, ${g.tamil_year || ''} – ${g.day_tamil || ''} (${g.pirai_tamil || ''})`;
      return { gregorianDisplay, tamilDisplay };
    }
  };

  // Restructure items down to standard chronological dictionary trees
  const groupedByMonth = useMemo(() => {
    const order = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const groups = {};

    if (currentYearData.type === '2026') {
      filteredDates.forEach(entry => {
        const month = entry?.gregorian?.month;
        if (!month) return;
        if (!groups[month]) groups[month] = [];
        groups[month].push(entry);
      });
      
      const sortedGroups = {};
      Object.keys(groups).sort((a, b) => order.indexOf(a) - order.indexOf(b)).forEach(month => {
        sortedGroups[month] = groups[month];
      });
      return sortedGroups;
    } else {
      filteredDates.forEach(monthGroup => {
        if (!monthGroup?.month_heading) return;
        const monthName = monthGroup.month_heading.replace('Tamil Muhurtham Dates ', '');
        groups[monthName] = monthGroup.dates || [];
      });
      return groups;
    }
  }, [filteredDates, currentYearData.type]);

  // Search Engine Optimization Structured Schema Matrix
  const dynamicMuhurthamSchema = {
    "@context": "https://schema.org",
    "@type": "ItemCollection",
    "name": `${selectedYear} தமிழ் திருமண முகூர்த்த தேதிகள்`,
    "description": `${selectedYear} ஆம் ஆண்டின் சுப முகூர்த்த மற்றும் திருமண தேதிகளின் முழுமையான பட்டியல் நேரங்களுடன்.`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tamilcalendars.vercel.app/muhurtham?year=${selectedYear}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Tamil Calendar",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tamilcalendars.vercel.app/logo.png"
      }
    }
  };

  return (
    <main className="muhurtham-container">
      <Helmet>
        <html lang="ta" />
        <title>{`திருமண முகூர்த்த தேதிகள் ${selectedYear} | சுப முகூர்த்த நாட்கள் | Tamil Wedding Muhurtham`}</title>
        <meta 
          name="description" 
          content={`${selectedYear} தமிழ் நாட்காட்டி சுப முகூர்த்த தேதிகள் பட்டியல். வளர்பிறை முகூர்த்தங்கள், திருமண நன்னாள்கள் மற்றும் பஞ்சாங்கம் சார்ந்த துல்லிய விபரங்கள்.`} 
        />
        <meta 
          name="keywords" 
          content={`திருமண முகூர்த்த தேதிகள் ${selectedYear}, சுப முகூர்த்த நாட்கள், முகூர்த்த நேரம், காலண்டர் திருமண நாட்கள், Tamil Muhurtham Dates, Subha Muhurtham ${selectedYear}`} 
        />
        <link rel="canonical" href="https://tamilcalendars.vercel.app/muhurtham" />
        
        {/* Open Graph Context Configurations */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`திருமண முகூர்த்த தேதிகள் ${selectedYear} | தமிழ் நாட்காட்டி சுப நாட்கள்`} />
        <meta property="og:description" content={`${selectedYear} ஆம் ஆண்டிற்கான மாதாந்திர திருமண சுப முகூர்த்த தேதிகள் மற்றும் வளர்பிறை, தேய்பிறை விபரங்கள்.`} />
        <meta property="og:url" content="https://tamilcalendars.vercel.app/muhurtham" />

        {/* Dynamic Structural Engine Injection */}
        <script type="application/ld+json">
          {JSON.stringify(dynamicMuhurthamSchema)}
        </script>
      </Helmet>

      <header className="muhurtham-header">
        <h1>💍 திருமண முகூர்த்த தேதிகள் {selectedYear} 💍</h1>
        <p className="subtitle">திருமணத்திற்கு ஏற்ற நன்னாள்கள் – Wedding Muhurtham Dates {selectedYear}</p>
      </header>

      {/* Control Filters Block Panel */}
      <section className="muhurtham-controls" aria-label="நாட்காட்டி வடிகட்டி கட்டுப்பாடுகள்">
        <div className="filter-wrapper">
          <label htmlFor="muhurtham-year-select" className="filter-label">ஆண்டு / Select Year:</label>
          <select 
            id="muhurtham-year-select" 
            value={selectedYear} 
            onChange={(e) => { setSelectedYear(e.target.value); setFilterMonth('all'); }}
          >
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>

        {monthOptions.length > 2 && (
          <div className="filter-wrapper">
            <label htmlFor="muhurtham-month-select" className="filter-label">மாதம் / Select Month:</label>
            <select 
              id="muhurtham-month-select" 
              value={filterMonth} 
              onChange={(e) => setFilterMonth(e.target.value)}
            >
              {monthOptions.map(month => (
                <option key={month} value={month}>
                  {month === 'all' ? 'அனைத்து மாதங்களும்' : (currentYearData.type === '2026' ? month : month.replace('Tamil Muhurtham Dates ', ''))}
                </option>
              ))}
            </select>
          </div>
        )}
      </section>

      {/* Primary Content Target List */}
      <section className="muhurtham-results-wrapper" aria-label={`${selectedYear} முகூர்த்த நாட்களின் பட்டியல்`}>
        {Object.entries(groupedByMonth).map(([monthName, dates]) => (
          <div key={monthName} className="month-group">
            <h2 className="month-group-heading">{monthName}</h2>
            <div className="dates-list">
              {dates.map((item, idx) => {
                const { gregorianDisplay, tamilDisplay } = formatDateEntry(item, currentYearData.type);
                return (
                  <article key={idx} className="muhurtham-card" aria-label="முகூர்த்த நாள் விபரம்">
                    <div className="date-gregorian">
                      <span className="calendar-icon" aria-hidden="true">📅</span>
                      <p>{gregorianDisplay}</p>
                    </div>
                    <div className="date-tamil">
                      <span className="accent-dot" aria-hidden="true">🔸</span>
                      <p>{tamilDisplay}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}

        {filteredDates.length === 0 && (
          <div className="no-dates" role="alert">
            <p>இந்த மாதத்தில் திருமண முகூர்த்த தேதிகள் இல்லை.</p>
          </div>
        )}
      </section>

      <footer className="muhurtham-footer-info">
        <div className="disclaimer">
          <strong>⚠️ முக்கிய குறிப்பு:</strong> 
          <p>{currentYearData.disclaimer}</p>
        </div>
      </footer>
    </main>
  );
}

export default Muhurtham;