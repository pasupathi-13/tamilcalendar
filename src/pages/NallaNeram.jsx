import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { june2026Data } from '../data/june2026Data';
import './NallaNeram.css';

function NallaNeram() {
  const [sortedData, setSortedData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Defensive chronological date serialization
    const sorted = [...june2026Data].sort((a, b) => {
      const [da, ma, ya] = a.gregorian_date.split('-');
      const [db, mb, yb] = b.gregorian_date.split('-');
      return new Date(`${ya}-${ma}-${da}`) - new Date(`${yb}-${mb}-${db}`);
    });
    setSortedData(sorted);

    // Auto-select today's date context if matches data window
    const today = new Date();
    const todayYYYY = today.getFullYear();
    const todayMM = String(today.getMonth() + 1).padStart(2, '0');
    const todayDD = String(today.getDate()).padStart(2, '0');
    const todayStr = `${todayYYYY}-${todayMM}-${todayDD}`;

    const idx = sorted.findIndex(d => {
      const [dd, mm, yyyy] = d.gregorian_date.split('-');
      return `${yyyy}-${mm}-${dd}` === todayStr;
    });
    setCurrentIndex(idx !== -1 ? idx : 0);
  }, []);

  // Safe timing string parsing abstraction utility
  const getMorningEvening = (timeStr) => {
    if (!timeStr) return { morning: '—', evening: '—' };
    let cleaned = timeStr.replace(/\s*\([^)]*\)/g, '').trim();
    let parts = [];
    if (cleaned.includes(',')) {
      parts = cleaned.split(',').map(s => s.trim());
    } else if (cleaned.includes('/')) {
      parts = cleaned.split('/').map(s => s.trim());
    } else {
      parts = [cleaned];
    }
    return {
      morning: parts[0] || '—',
      evening: parts.length > 1 ? parts[1] : '—'
    };
  };

  // Compute values dynamically based on index selection
  const currentDay = sortedData[currentIndex];

  const dateCalculations = useMemo(() => {
    if (!currentDay) return null;
    const [dd, mm, yyyy] = currentDay.gregorian_date.split('-');
    const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
    
    return {
      weekday: dateObj.toLocaleDateString('ta-IN', { weekday: 'long' }),
      formattedDate: dateObj.toLocaleDateString('ta-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      seoIsoDate: `${yyyy}-${mm}-${dd}`,
      goodTime: getMorningEvening(currentDay.timings?.good_time),
      gowriGoodTime: getMorningEvening(currentDay.timings?.gowri_good_time)
    };
  }, [currentDay]);

  if (sortedData.length === 0 || !dateCalculations) {
    return (
      <div className="nalla-neram-container" role="status" aria-live="polite">
        <div className="loading-spinner-text">நல்ல நேரம் தரவுகள் ஏற்றப்படுகிறது...</div>
      </div>
    );
  }

  const handleDateSelect = (e) => setCurrentIndex(parseInt(e.target.value, 10));

  // Dynamic Google Search Engine structured schema compilation
  const panchangSchema = {
    "@context": "https://schema.org",
    "@type": "Panchang",
    "name": `இன்றைய நல்ல நேரம் மற்றும் பஞ்சாங்கம் - ${dateCalculations.formattedDate}`,
    "description": `தினசரி ராகு காலம், குளிகை, எமகண்டம், மற்றும் கௌரி நல்ல நேரம் விபரங்கள்.`,
    "datePublished": dateCalculations.seoIsoDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tamilcalendars.vercel.app/nalla-neram?date=${dateCalculations.seoIsoDate}`
    }
  };

  return (
    <main className="nalla-neram-container">
      <Helmet>
        <html lang="ta" />
        <title>{`இன்றைய நல்ல நேரம் | கௌரி நல்ல நேரம், ராகு காலம் ${dateCalculations.formattedDate}`}</title>
        <meta 
          name="description" 
          content={`துல்லியமான இன்றைய தமிழ் நல்ல நேரம் (${dateCalculations.formattedDate}), எமகண்டம், குளிகை நேரம், சூலம் திசை மற்றும் பரிகாரம் விபரங்கள்.`} 
        />
        <meta 
          name="keywords" 
          content="இன்றைய நல்ல நேரம், கௌரி நல்ல நேரம், ராகு காலம், எமகண்டம், குளிகை, இன்றைய சூலம், Daily Nalla Neram, Gowri Nalla Neram, Raahu Kaalam" 
        />
        <link rel="canonical" href="https://tamilcalendars.vercel.app/nalla-neram" />
        
        {/* Open Graph Context Configuration Elements */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`இன்றைய நல்ல நேரம் மற்றும் காலங்கள் - ${dateCalculations.formattedDate}`} />
        <meta property="og:description" content="தினசரி யோகங்கள், ராகு காலம், குளிகை மற்றும் சூலம் பரிகாரங்கள் விபரங்கள் உடனுக்குடன்." />
        
        {/* Dynamic Structural Search Architecture Injection */}
        <script type="application/ld+json">
          {JSON.stringify(panchangSchema)}
        </script>
      </Helmet>

      <header className="nalla-neram-header">
        <h1>✨ நல்ல நேரம் & காலங்கள் ✨</h1>
        <p className="subtitle">தினசரி யோகங்கள், ராகு காலம், குளிகை, சூலம் மற்றும் பரிகாரங்கள்</p>
      </header>

      {/* Accessible Action Filter Control Hub */}
      <section className="controls-panel-card" aria-label="தேதி தேர்வு கட்டுப்பாடுகள்">
        <div className="filter-wrapper-single">
          <label htmlFor="nalla-neram-date-picker" className="filter-label">தினசரி நாட்காட்டி / Select Date:</label>
          <select 
            id="nalla-neram-date-picker"
            value={currentIndex} 
            onChange={handleDateSelect}
          >
            {sortedData.map((day, idx) => {
              const [d, m, y] = day.gregorian_date.split('-');
              const dObj = new Date(`${y}-${m}-${d}`);
              const dateString = dObj.toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric'
              });
              return (
                <option key={idx} value={idx}>
                  {dateString} – {dObj.toLocaleDateString('ta-IN', { weekday: 'long' })}
                </option>
              );
            })}
          </select>
        </div>
      </section>

      {/* Main Astrological Reference Grid Card */}
      <article className="timings-card" aria-label={`${dateCalculations.formattedDate} பஞ்சாங்க விபரங்கள்`}>
        <header className="card-header">
          <h2>{dateCalculations.formattedDate}</h2>
          <span className="weekday-badge" role="text">{dateCalculations.weekday}</span>
        </header>

        <section className="timings-grid">
          {/* Good Time Data-Group Card */}
          <div className="timing-group auspicious-highlight">
            <div className="group-label">🌟 நல்ல நேரம் (Good Time)</div>
            <div className="timing-row-item">
              <span className="timing-label">காலை (Morning):</span>
              <span className="timing-value">{dateCalculations.goodTime.morning}</span>
            </div>
            <div className="timing-row-item">
              <span className="timing-label">மாலை (Evening):</span>
              <span className="timing-value">{dateCalculations.goodTime.evening}</span>
            </div>
          </div>

          {/* Gowri Good Time Data-Group Card */}
          <div className="timing-group gowri-highlight">
            <div className="group-label">✨ கௌரி நல்ல நேரம் (Gowri Good Time)</div>
            <div className="timing-row-item">
              <span className="timing-label">காலை (Morning):</span>
              <span className="timing-value">{dateCalculations.gowriGoodTime.morning}</span>
            </div>
            <div className="timing-row-item">
              <span className="timing-label">மாலை (Evening):</span>
              <span className="timing-value">{dateCalculations.gowriGoodTime.evening}</span>
            </div>
          </div>

          {/* Standard Panchang Reference List Fields */}
          <div className="timing-generic-card inauspicious">
            <span className="timing-label">☠️ இராகு காலம் (Raahu Kaalam)</span>
            <span className="timing-value">{currentDay.timings?.raahu_kaalam || '—'}</span>
          </div>
          
          <div className="timing-generic-card inauspicious">
            <span className="timing-label">🌪️ குளிகை (Kuligai)</span>
            <span className="timing-value">{currentDay.timings?.kuligai || '—'}</span>
          </div>
          
          <div className="timing-generic-card inauspicious">
            <span className="timing-label">🔥 எமகண்டம் (Emagandam)</span>
            <span className="timing-value">{currentDay.timings?.emagandam || '—'}</span>
          </div>
          
          <div className="timing-generic-card info-node">
            <span className="timing-label">🌅 சூரிய உதயம் (Sunrise)</span>
            <span className="timing-value">{currentDay.surya_udayam || '—'}</span>
          </div>
          
          <div className="timing-generic-card orientation-node">
            <span className="timing-label">🧭 சூலம் (Soolam)</span>
            <span className="timing-value">{currentDay.shulam || '—'}</span>
          </div>
          
          <div className="timing-generic-card remedy-node">
            <span className="timing-label">🙏 பரிகாரம் (Parihaaram)</span>
            <span className="timing-value">{currentDay.pariharam || '—'}</span>
          </div>
          
          <div className="timing-generic-card astral-node">
            <span className="timing-label">🌙 சந்திராஷ்டமம் (Chandrashtamam)</span>
            <span className="timing-value">
              {currentDay.chandrashtamam?.length ? currentDay.chandrashtamam.join(', ') : '—'}
            </span>
          </div>
        </section>
      </article>

      <footer className="footer-note-block">
        <p>* நல்ல நேரங்கள் – காலை மற்றும் மாலை நேரங்கள் குறிப்பவை.</p>
        <p>* இராகு காலம், குளிகை, எமகண்டம் ஆகியவை தினசரி வரும் துர்முகூர்த்த காலங்கள் ஆகும்.</p>
      </footer>
    </main>
  );
}

export default NallaNeram;