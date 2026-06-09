import { useState, useEffect } from 'react';
import './LiveClock.css';

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTamilDate = (date) => {
    const tamilMonthStarts = [
      { month: "சித்திரை", start: new Date(2026, 3, 14) },
      { month: "வைகாசி", start: new Date(2026, 4, 15) },
      { month: "ஆனி", start: new Date(2026, 5, 15) },
      { month: "ஆடி", start: new Date(2026, 6, 17) },
      { month: "ஆவணி", start: new Date(2026, 7, 17) },
      { month: "புரட்டாசி", start: new Date(2026, 8, 17) },
      { month: "ஐப்பசி", start: new Date(2026, 9, 17) },
      { month: "கார்த்திகை", start: new Date(2026, 10, 16) },
      { month: "மார்கழி", start: new Date(2026, 11, 16) },
      { month: "தை", start: new Date(2027, 0, 14) },
      { month: "மாசி", start: new Date(2027, 1, 13) },
      { month: "பங்குனி", start: new Date(2027, 2, 15) }
    ];
    let tamilMonth = tamilMonthStarts[0];
    for (let i = 0; i < tamilMonthStarts.length; i++) {
      if (tamilMonthStarts[i].start <= date) tamilMonth = tamilMonthStarts[i];
      else break;
    }
    const dayDiff = Math.floor((date - tamilMonth.start) / (1000 * 3600 * 24)) + 1;
    const weekdays = ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"];
    const weekday = weekdays[date.getDay()];
    const tamilYear = "பராபவ";
    return `${tamilMonth.month} ${dayDiff}, ${weekday} – ${tamilYear}`;
  };

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hourDeg = (hours * 30) + (minutes * 0.5);
  const minuteDeg = (minutes * 6) + (seconds * 0.1);
  const secondDeg = seconds * 6;
  const clockNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className="clock-with-images">
      {/* Left image: Vinayagar (only on desktop) */}
      <div className="clock-side-image left">
        <img src="/images/vinayagar.png" alt="Vinayagar" className="deity-img" />
      </div>

      {/* Center clock */}
      <div className="clock-center">
        <div className="analog-clock-face">
          {[...Array(60)].map((_, i) => (
            <div key={i} className="tick" style={{ transform: `rotate(${i * 6}deg)` }}>
              <div className={`tick-line ${i % 5 === 0 ? 'major' : 'minor'}`} />
            </div>
          ))}
          {clockNumbers.map((num, i) => {
            const angle = i * 30;
            return (
              <div key={num} className="number-pos" style={{ transform: `rotate(${angle}deg)` }}>
                <span className="clock-number" style={{ transform: `rotate(${-angle}deg)` }}>{num}</span>
              </div>
            );
          })}
          <div className="text-inside">Tamil Calendar</div>
          <div className="hand hour-hand" style={{ transform: `rotate(${hourDeg}deg)` }} />
          <div className="hand minute-hand" style={{ transform: `rotate(${minuteDeg}deg)` }} />
          <div className="hand second-hand" style={{ transform: `rotate(${secondDeg}deg)` }} />
          <div className="center-pin" />
        </div>
        <div className="digital-info">
          <div className="digital-time">
            {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
          </div>
          <div className="tamil-date-below">{getTamilDate(time)}</div>
        </div>
      </div>

      {/* Right image: Murugan (only on desktop) */}
      <div className="clock-side-image right">
        <img src="/images/murugan.png" alt="Murugan" className="deity-img" />
      </div>
    </div>
  );
};

export default LiveClock; 