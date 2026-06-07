import { useState, useEffect } from 'react';
import { june2026Data } from '../data/june2026Data';
import './DailyCalendar.css';

function DailyCalendar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // Sort data by gregorian date (dd-mm-yyyy)
    const sorted = [...june2026Data].sort((a, b) => {
      const [da, ma, ya] = a.gregorian_date.split('-');
      const [db, mb, yb] = b.gregorian_date.split('-');
      return new Date(`${ya}-${ma}-${da}`) - new Date(`${yb}-${mb}-${db}`);
    });
    setSortedData(sorted);

    // Find today's index (if within June 2026)
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    const idx = sorted.findIndex(d => {
      const [dd, mm, yyyy] = d.gregorian_date.split('-');
      return `${yyyy}-${mm}-${dd}` === todayStr;
    });
    setCurrentIndex(idx !== -1 ? idx : 0);
  }, []);

  if (sortedData.length === 0) {
    return <div className="container">Loading calendar data...</div>;
  }

  const currentDay = sortedData[currentIndex];
  const [dd, mm, yyyy] = currentDay.gregorian_date.split('-');
  const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
  const weekday = dateObj.toLocaleDateString('ta-IN', { weekday: 'long' });
  const formattedDate = dateObj.toLocaleDateString('ta-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  // Single dropdown change handler
  const handleDateSelect = (e) => {
    setCurrentIndex(parseInt(e.target.value, 10));
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (currentIndex < sortedData.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const handleToday = () => {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    const idx = sortedData.findIndex(d => {
      const [dd, mm, yyyy] = d.gregorian_date.split('-');
      return `${yyyy}-${mm}-${dd}` === todayStr;
    });
    if (idx !== -1) setCurrentIndex(idx);
    else alert('Today\'s date is not available in the current dataset.');
  };

  const rasiOrder = [
    "மேஷம்", "ரிஷபம்", "மிதுனம்", "கடகம்",
    "சிம்மம்", "கன்னி", "துலாம்", "விருச்சிகம்",
    "தனுசு", "மகரம்", "கும்பம்", "மீனம்"
  ];

  return (
    <div className="container daily-calendar">
      <div className="calendar-header">
        <h2>{formattedDate} – {currentDay.tamil_month}, {weekday}</h2>

        {/* Single date dropdown - mobile friendly */}
        <div className="date-dropdown-single">
          <select value={currentIndex} onChange={handleDateSelect}>
            {sortedData.map((day, idx) => {
              const [d, m, y] = day.gregorian_date.split('-');
              const dateObj = new Date(`${y}-${m}-${d}`);
              const dateString = dateObj.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              });
              return (
                <option key={idx} value={idx}>
                  {dateString}
                </option>
              );
            })}
          </select>
        </div>

        <div className="date-controls">
          <button onClick={handlePrev}>← முந்தைய நாள்</button>
          <button onClick={handleToday}>இன்று</button>
          <button onClick={handleNext}>அடுத்த நாள் →</button>
        </div>
      </div>

      {/* Raasi Palan Section */}
      <div className="rasi-section">
        <h3>✨ இன்றைய ராசி பலன் (Raasi Palan)</h3>
        <div className="rasi-grid">
          {rasiOrder.map(rasi => (
            <div key={rasi} className="rasi-card">
              <span className="rasi-name">{rasi}</span>
              <span className="rasi-prediction">
                {currentDay.rasipalan[rasi] || "—"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Panchangam Details */}
      <div className="panchangam-grid">
        <div className="info-card">
          <strong>திதி (Tithi)</strong><br />{currentDay.thithi}
        </div>
        <div className="info-card">
          <strong>நட்சத்திரம் (Nakshatram)</strong><br />{currentDay.nakshatram}
        </div>
        <div className="info-card">
          <strong>நல்ல நேரம் (Nalla Neram)</strong><br />{currentDay.timings.good_time}
        </div>
        <div className="info-card">
          <strong>கௌரி நல்ல நேரம் (Gowri Nalla Neram)</strong><br />{currentDay.timings.gowri_good_time}
        </div>
        <div className="info-card">
          <strong>இராகு காலம் (Raahu Kaalam)</strong><br />{currentDay.timings.raahu_kaalam}
        </div>
        <div className="info-card">
          <strong>குளிகை (Kuligai)</strong><br />{currentDay.timings.kuligai}
        </div>
        <div className="info-card">
          <strong>எமகண்டம் (Emagandam)</strong><br />{currentDay.timings.emagandam}
        </div>
        <div className="info-card">
          <strong>சூரிய உதயம் (Sunrise)</strong><br />{currentDay.timings.sunrise}
        </div>
        <div className="info-card">
          <strong>சூலம் (Soolam)</strong><br />{currentDay.shoolam}
        </div>
        <div className="info-card">
          <strong>பரிகாரம் (Parihaaram)</strong><br />{currentDay.parihaaram}
        </div>
        <div className="info-card">
          <strong>சந்திராஷ்டமம் (Chandrashtamam)</strong><br />
          {currentDay.chandrashtamam.join(', ')}
        </div>
      </div>

      {currentDay.special_day && (
        <div className="special-badge">✨ {currentDay.special_day}</div>
      )}
      {currentDay.daily_quote && (
        <div className="daily-quote">“{currentDay.daily_quote}”</div>
      )}
    </div>
  );
}

export default DailyCalendar;