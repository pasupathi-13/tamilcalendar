import { useState, useEffect } from 'react';
import { june2026Data } from '../data/june2026Data';
import './NallaNeram.css';

function NallaNeram() {
  const [sortedData, setSortedData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const sorted = [...june2026Data].sort((a, b) => {
      const [da, ma, ya] = a.gregorian_date.split('-');
      const [db, mb, yb] = b.gregorian_date.split('-');
      return new Date(`${ya}-${ma}-${da}`) - new Date(`${yb}-${mb}-${db}`);
    });
    setSortedData(sorted);

    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    const idx = sorted.findIndex(d => {
      const [dd, mm, yyyy] = d.gregorian_date.split('-');
      return `${yyyy}-${mm}-${dd}` === todayStr;
    });
    setCurrentIndex(idx !== -1 ? idx : 0);
  }, []);

  if (sortedData.length === 0) return <div className="nalla-neram-container">Loading Nalla Neram data...</div>;

  const currentDay = sortedData[currentIndex];
  const [dd, mm, yyyy] = currentDay.gregorian_date.split('-');
  const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
  const weekday = dateObj.toLocaleDateString('ta-IN', { weekday: 'long' });
  const formattedDate = dateObj.toLocaleDateString('ta-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleDateSelect = (e) => setCurrentIndex(parseInt(e.target.value, 10));

  // Extract morning and evening times from a string like "7.30-8.30 (something), 4.30-5.30 (something)"
  const getMorningEvening = (timeStr) => {
    if (!timeStr) return { morning: '—', evening: '—' };
    // Remove anything inside parentheses (including parentheses) and extra spaces
    let cleaned = timeStr.replace(/\s*\([^)]*\)/g, '').trim();
    // Split by comma or slash
    let parts = [];
    if (cleaned.includes(',')) {
      parts = cleaned.split(',').map(s => s.trim());
    } else if (cleaned.includes('/')) {
      parts = cleaned.split('/').map(s => s.trim());
    } else {
      parts = [cleaned];
    }
    const morning = parts[0] || '—';
    const evening = parts.length > 1 ? parts[1] : '—';
    return { morning, evening };
  };

  const goodTime = getMorningEvening(currentDay.timings?.good_time);
  const gowriGoodTime = getMorningEvening(currentDay.timings?.gowri_good_time);

  return (
    <div className="nalla-neram-container">
      <h1>✨ நல்ல நேரம் & காலங்கள் ✨</h1>
      <p className="subtitle">தினசரி யோகங்கள், ராகு காலம், குளிகை, சூலம் மற்றும் பரிகாரங்கள்</p>

      <div className="date-dropdown-single">
        <select value={currentIndex} onChange={handleDateSelect}>
          {sortedData.map((day, idx) => {
            const [d, m, y] = day.gregorian_date.split('-');
            const dateObj = new Date(`${y}-${m}-${d}`);
            const dateString = dateObj.toLocaleDateString('en-GB', {
              day: 'numeric', month: 'long', year: 'numeric'
            });
            return (
              <option key={idx} value={idx}>
                {dateString} – {dateObj.toLocaleDateString('ta-IN', { weekday: 'long' })}
              </option>
            );
          })}
        </select>
      </div>

      <div className="timings-card">
        <div className="card-header">
          <h2>{formattedDate}</h2>
          <span className="weekday-badge">{weekday}</span>
        </div>

        <div className="timings-grid">
          {/* Good Time */}
          <div className="timing-group">
            <div className="group-label">🌟 நல்ல நேரம் (Good Time)</div>
            <div className="timing-item">
              <span className="timing-label">காலை:</span>
              <span className="timing-value">{goodTime.morning}</span>
            </div>
            <div className="timing-item">
              <span className="timing-label">மாலை:</span>
              <span className="timing-value">{goodTime.evening}</span>
            </div>
          </div>

          {/* Gowri Good Time */}
          <div className="timing-group">
            <div className="group-label">✨ கௌரி நல்ல நேரம் (Gowri Good Time)</div>
            <div className="timing-item">
              <span className="timing-label">காலை:</span>
              <span className="timing-value">{gowriGoodTime.morning}</span>
            </div>
            <div className="timing-item">
              <span className="timing-label">மாலை:</span>
              <span className="timing-value">{gowriGoodTime.evening}</span>
            </div>
          </div>

          {/* Other timings unchanged */}
          <div className="timing-item">
            <span className="timing-label">☠️ இராகு காலம் (Raahu Kaalam)</span>
            <span className="timing-value">{currentDay.timings?.raahu_kaalam || '—'}</span>
          </div>
          <div className="timing-item">
            <span className="timing-label">🌪️ குளிகை (Kuligai)</span>
            <span className="timing-value">{currentDay.timings?.kuligai || '—'}</span>
          </div>
          <div className="timing-item">
            <span className="timing-label">🔥 எமகண்டம் (Emagandam)</span>
            <span className="timing-value">{currentDay.timings?.emagandam || '—'}</span>
          </div>
          <div className="timing-item">
            <span className="timing-label">🌅 சூரிய உதயம் (Sunrise)</span>
            <span className="timing-value">{currentDay.surya_udayam || '—'}</span>
          </div>
          <div className="timing-item">
            <span className="timing-label">🧭 சூலம் (Soolam)</span>
            <span className="timing-value">{currentDay.shulam || '—'}</span>
          </div>
          <div className="timing-item">
            <span className="timing-label">🙏 பரிகாரம் (Parihaaram)</span>
            <span className="timing-value">{currentDay.pariharam || '—'}</span>
          </div>
          <div className="timing-item">
            <span className="timing-label">🌙 சந்திராஷ்டமம் (Chandrashtamam)</span>
            <span className="timing-value">
              {currentDay.chandrashtamam?.length ? currentDay.chandrashtamam.join(', ') : '—'}
            </span>
          </div>
        </div>
      </div>

      <div className="footer-note">
        * நல்ல நேரங்கள் – காலை மற்றும் மாலை நேரங்கள்<br />
        * இராகு காலம், குளிகை, எமகண்டம் ஆகியவை தினசரி வரும் துர்முகூர்த்தங்கள்
      </div>
    </div>
  );
}

export default NallaNeram;