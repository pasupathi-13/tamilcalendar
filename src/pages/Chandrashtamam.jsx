import { useState } from 'react';
import { chandrashtamam2026 } from '../data/chandrashtamam2026';
import './Chandrashtamam.css';

function Chandrashtamam() {
  const [selectedRasi, setSelectedRasi] = useState(0);
  const rasiList = chandrashtamam2026.chandrashtama_days_2026;
  const currentRasi = rasiList[selectedRasi];

  return (
    <div className="chandrashtamam-container">
      <h1>🌙 சந்திராஷ்டமம் 2026 🌙</h1>
      <p className="subtitle">தினசரி சந்திராஷ்டமம் – ராசி வாரியாக</p>

      <div className="filter-wrapper">
        <select value={selectedRasi} onChange={(e) => setSelectedRasi(parseInt(e.target.value))}>
          {rasiList.map((rasi, idx) => (
            <option key={idx} value={idx}>
              {rasi.rasi} – {rasi.title}
            </option>
          ))}
        </select>
      </div>

      <div className="rasi-heading">
        <h2>{currentRasi.title}</h2>
      </div>

      <div className="months-list">
        {currentRasi.data.map((item, idx) => (
          <div key={idx} className="month-card">
            <div className="month-name">{item.month}</div>
            <div className="datetime-details">
              <div className="start-time">
                <span className="label">தொடக்கம்:</span>
                <span className="value">{item.starting}</span>
              </div>
              <div className="end-time">
                <span className="label">முடிவு:</span>
                <span className="value">{item.ending}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chandrashtamam;