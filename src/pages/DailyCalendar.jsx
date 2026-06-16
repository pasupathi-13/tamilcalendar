import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { june2026Data } from '../data/june2026Data';
import './DailyCalendar.css';

function DailyCalendar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (!june2026Data || june2026Data.length === 0) {
      console.error('No data loaded');
      return;
    }
    // Sort chronologically by gregorian_date (DD-MM-YYYY)
    const sorted = [...june2026Data].sort((a, b) => {
      const [da, ma, ya] = a.gregorian_date.split('-');
      const [db, mb, yb] = b.gregorian_date.split('-');
      return new Date(`${ya}-${ma}-${da}`) - new Date(`${yb}-${mb}-${db}`);
    });
    setSortedData(sorted);

    // Dynamic, timezone-safe calculation string match matching India Standard Time
    const today = new Date();
    const yyyyStr = today.getFullYear();
    const mmStr = String(today.getMonth() + 1).padStart(2, '0');
    const ddStr = String(today.getDate()).padStart(2, '0');
    const matchTodayString = `${yyyyStr}-${mmStr}-${ddStr}`;

    const idx = sorted.findIndex(d => {
      const [dd, mm, yyyy] = d.gregorian_date.split('-');
      return `${yyyy}-${mm}-${dd}` === matchTodayString;
    });
    setCurrentIndex(idx !== -1 ? idx : 0);
  }, []);

  // Compute values for currently active viewing object safely
  const currentDay = sortedData[currentIndex];

  const parsedDateInfo = useMemo(() => {
    if (!currentDay) return null;
    const [dd, mm, yyyy] = currentDay.gregorian_date.split('-');
    const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
    return {
      weekday: dateObj.toLocaleDateString('ta-IN', { weekday: 'long' }),
      formattedDate: dateObj.toLocaleDateString('ta-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      isoString: `${yyyy}-${mm}-${dd}`
    };
  }, [currentDay]);

  if (sortedData.length === 0 || !currentDay) {
    return <div className="container" role="status">Loading calendar data...</div>;
  }

  const handleDateSelect = (e) => setCurrentIndex(parseInt(e.target.value, 10));
  const handlePrev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const handleNext = () => currentIndex < sortedData.length - 1 && setCurrentIndex(currentIndex + 1);
  
  const handleToday = () => {
    const today = new Date();
    const yyyyStr = today.getFullYear();
    const mmStr = String(today.getMonth() + 1).padStart(2, '0');
    const ddStr = String(today.getDate()).padStart(2, '0');
    const matchTodayString = `${yyyyStr}-${mmStr}-${ddStr}`;

    const idx = sortedData.findIndex(d => {
      const [dd, mm, yyyy] = d.gregorian_date.split('-');
      return `${yyyy}-${mm}-${dd}` === matchTodayString;
    });
    if (idx !== -1) setCurrentIndex(idx);
    else alert('Today\'s date is not available in the current dataset.');
  };

  const rasiOrder = [
    "மேஷம்", "ரிஷபம்", "மிதுனம்", "கடகம்",
    "சிம்மம்", "கன்னி", "துலாம்", "விருச்சிகம்",
    "தனுசு", "மகரம்", "கும்பம்", "மீனம்"
  ];

  // Rich Search Engine Schema Context Generation corresponding strictly to selected view node
  const dynamicPanchangamSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tamilcalendar-c0q6.onrender.com/daily?date=${parsedDateInfo.isoString}`
    },
    "headline": `${parsedDateInfo.formattedDate} தினசரி நாட்காட்டி பஞ்சாங்கம் மற்றும் ராசி பலன்`,
    "description": `இன்றைய பஞ்சாங்கம் விபரங்கள்: திதி: ${currentDay.thithi}, நட்சத்திரம்: ${currentDay.nakshatram}, நல்ல நேரம்: ${currentDay.timings?.good_time}, ராகு காலம்: ${currentDay.timings?.raahu_kaalam}.`,
    "datePublished": parsedDateInfo.isoString,
    "dateModified": parsedDateInfo.isoString,
    "author": {
      "@type": "Organization",
      "name": "Tamil Calendar"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Tamil Calendar",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tamilcalendar-c0q6.onrender.com/logo.png"
      }
    }
  };

  return (
    <main className="container daily-calendar">
      <Helmet>
        <html lang="ta" />
        <title>{`${parsedDateInfo.formattedDate} நாட்காட்டி | இன்றைய நல்ல நேரம், ராகு காலம், பஞ்சாங்கம்`}</title>
        <meta 
          name="description" 
          content={`இன்றைய தமிழ் நாட்காட்டி பஞ்சாங்கம் விபரங்கள் (${parsedDateInfo.formattedDate}). திதி: ${currentDay.thithi}, நட்சத்திரம்: ${currentDay.nakshatram}, நல்ல நேரம்: ${currentDay.timings?.good_time}, ராகு காலம்: ${currentDay.timings?.raahu_kaalam}, சந்திராஷ்டமம்: ${currentDay.chandrashtamam?.join(', ') || 'இல்லை'}.`} 
        />
        <meta 
          name="keywords" 
          content={`${parsedDateInfo.formattedDate} நாட்காட்டி, இன்றைய நல்ல நேரம், ராகு காலம், இன்றைய பஞ்சாங்கம், இன்றைய ராசி பலன், Today Tamil Calendar, Panchangam Today, Rasipalan`} 
        />
        <link rel="canonical" href="https://tamilcalendar-c0q6.onrender.com/daily" />
        
        {/* Open Graph Meta Blocks */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${parsedDateInfo.formattedDate} தமிழ் நாட்காட்டி | தினசரி பஞ்சாங்கம்`} />
        <meta property="og:description" content={`இன்றைய நல்ல நேரம், இராகு காலம், திதி, நட்சத்திர விபரங்கள் மற்றும் 12 ராசிகளின் தினசரி ராசி பலன்கள்.`} />
        <meta property="og:url" content="https://tamilcalendar-c0q6.onrender.com/daily" />

        {/* Dynamic Schema Engine Injection */}
        <script type="application/ld+json">
          {JSON.stringify(dynamicPanchangamSchema)}
        </script>
      </Helmet>

      <header className="calendar-header">
        <h1>
          <span className="header-date">{parsedDateInfo.formattedDate}</span> 
          <span className="header-divider"> – </span> 
          <span className="header-month">{currentDay.tamil_month}</span>
          <span className="header-day">, {parsedDateInfo.weekday}</span>
        </h1>

        <div className="date-dropdown-single">
          <label htmlFor="calendar-date-select" className="visually-hidden">தேதியை தேர்ந்தெடுக்கவும்:</label>
          <select id="calendar-date-select" value={currentIndex} onChange={handleDateSelect}>
            {sortedData.map((day, idx) => {
              const [d, m, y] = day.gregorian_date.split('-');
              const dObj = new Date(`${y}-${m}-${d}`);
              const dateString = dObj.toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric'
              });
              return <option key={idx} value={idx}>{dateString}</option>;
            })}
          </select>
        </div>

        <nav className="date-controls" aria-label="நாட்காட்டி கட்டுப்பாடுகள்">
          <button onClick={handlePrev} disabled={currentIndex === 0} aria-label="முந்தைய நாள்">← முந்தைய நாள்</button>
          <button onClick={handleToday} aria-label="இன்றைய தேதிக்கு செல்ல">இன்று</button>
          <button onClick={handleNext} disabled={currentIndex === sortedData.length - 1} aria-label="அடுத்த நாள்">அடுத்த நாள் →</button>
        </nav>
      </header>

      {/* ✅ FIXED: Raasi Palan Display Block (Moved up to original position) */}
      <section className="rasi-section" aria-label="ராசி பலன்கள் பட்டியல்">
        <h2>✨ இன்றைய ராசி பலன் (Daily Raasi Palan)</h2>
        <div className="rasi-grid">
          {rasiOrder.map(rasi => (
            <article key={rasi} className="rasi-card">
              <h3 className="rasi-name">{rasi}</h3>
              <p className="rasi-prediction">
                {currentDay.rasipalan?.[rasi] || "இன்றைய பலன் விபரங்கள் இல்லை."}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Panchangam Dynamic Key-Value Metrics Grid */}
      <section className="panchangam-grid-wrapper" aria-label="பஞ்சாங்கம் விபரங்கள்">
        <h2 className="visually-hidden">இன்றைய பஞ்சாங்கம் விபரங்கள்</h2>
        <div className="panchangam-grid">
          <article className="info-card"><strong>திதி (Tithi)</strong><p>{currentDay.thithi}</p></article>
          <article className="info-card"><strong>நட்சத்திரம் (Nakshatram)</strong><p>{currentDay.nakshatram}</p></article>
          <article className="info-card"><strong>யோகம் (Yogam)</strong><p>{currentDay.yogam}</p></article>
          <article className="info-card"><strong>நல்ல நேரம் (Nalla Neram)</strong><p>{currentDay.timings?.good_time}</p></article>
          <article className="info-card"><strong>கௌரி நல்ல நேரம் (Gowri Nalla Neram)</strong><p>{currentDay.timings?.gowri_good_time}</p></article>
          <article className="info-card"><strong>இராகு காலம் (Raahu Kaalam)</strong><p>{currentDay.timings?.raahu_kaalam}</p></article>
          <article className="info-card"><strong>குளிகை (Kuligai)</strong><p>{currentDay.timings?.kuligai}</p></article>
          <article className="info-card"><strong>எமகண்டம் (Emagandam)</strong><p>{currentDay.timings?.emagandam}</p></article>
          <article className="info-card"><strong>சூரிய உதயம் (Sunrise)</strong><p>{currentDay.surya_udayam}</p></article>
          <article className="info-card"><strong>சூலம் (Soolam)</strong><p>{currentDay.shulam}</p></article>
          <article className="info-card"><strong>பரிகாரம் (Parihaaram)</strong><p>{currentDay.pariharam}</p></article>
          <article className="info-card highlight-card"><strong>சந்திராஷ்டமம் (Chandrashtamam)</strong><p>{currentDay.chandrashtamam?.join(', ') || '—'}</p></article>
        </div>
      </section>
    </main>
  );
}

export default DailyCalendar;