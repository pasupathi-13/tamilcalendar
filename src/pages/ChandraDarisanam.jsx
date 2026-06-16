import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import './ChandraDarisanam.css';

const chandraDataset = [
  { date: "2026-01-20", day: "Tuesday", moonriseStart: "05:50 PM", moonriseEnd: "07:16 PM", duration: "1 Hour 25 Mins", tithi: "Pratipada", special: "" },
  { date: "2026-02-18", day: "Wednesday", moonriseStart: "06:13 PM", moonriseEnd: "07:05 PM", duration: "0 Hours 52 Mins", tithi: "Pratipada", special: "" },
  { date: "2026-03-20", day: "Friday", moonriseStart: "06:32 PM", moonriseEnd: "07:59 PM", duration: "1 Hour 26 Mins", tithi: "Pratipada", special: "" },
  { date: "2026-04-18", day: "Saturday", moonriseStart: "06:49 PM", moonriseEnd: "07:56 PM", duration: "1 Hour 08 Mins", tithi: "Pratipada", special: "" },
  { date: "2026-05-17", day: "Sunday", moonriseStart: "07:06 PM", moonriseEnd: "07:58 PM", duration: "0 Hours 52 Mins", tithi: "Pratipada", special: "Adhika (Extra Month)" },
  { date: "2026-06-16", day: "Tuesday", moonriseStart: "07:21 PM", moonriseEnd: "08:54 PM", duration: "1 Hour 33 Mins", tithi: "Pratipada", special: "" },
  { date: "2026-07-15", day: "Wednesday", moonriseStart: "07:21 PM", moonriseEnd: "08:19 PM", duration: "0 Hours 58 Mins", tithi: "Pratipada", special: "" },
  { date: "2026-08-14", day: "Friday", moonriseStart: "07:02 PM", moonriseEnd: "08:01 PM", duration: "0 Hours 59 Mins", tithi: "Pratipada", special: "" },
  { date: "2026-09-13", day: "Sunday", moonriseStart: "06:29 PM", moonriseEnd: "07:31 PM", duration: "1 Hour 02 Mins", tithi: "Pratipada", special: "" },
  { date: "2026-10-12", day: "Monday", moonriseStart: "05:55 PM", moonriseEnd: "06:36 PM", duration: "0 Hours 41 Mins", tithi: "Pratipada", special: "" },
  { date: "2026-11-11", day: "Wednesday", moonriseStart: "05:29 PM", moonriseEnd: "06:38 PM", duration: "1 Hour 09 Mins", tithi: "Pratipada", special: "" },
  { date: "2026-12-10", day: "Thursday", moonriseStart: "05:25 PM", moonriseEnd: "06:16 PM", duration: "0 Hours 51 Mins", tithi: "Pratipada", special: "" }
];

const formatDateShort = (dateStr) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getMonthYearKey = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const getSortableMonth = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const ChandraDarisanam = () => {
  const groupedData = useMemo(() => {
    const groups = new Map();
    chandraDataset.forEach(entry => {
      const monthTitle = getMonthYearKey(entry.date);
      const sortKey = getSortableMonth(entry.date);
      if (!groups.has(monthTitle)) {
        groups.set(monthTitle, { items: [], sortKey });
      }
      groups.get(monthTitle).items.push(entry);
    });
    return Array.from(groups.entries())
      .sort((a, b) => a[1].sortKey.localeCompare(b[1].sortKey))
      .map(([monthTitle, { items }]) => ({
        monthTitle,
        items: items.sort((a, b) => new Date(a.date) - new Date(b.date))
      }));
  }, []);

  return (
    <div className="festivals-container">
      <Helmet>
        <title>Chandra Darisanam 2026 | சந்திர தரிசனம் | Tamil Calendar</title>
        <meta name="description" content="Chandra Darisanam 2026 dates and moonrise timings. Auspicious crescent moon sighting dates for all months in 2026." />
        <link rel="canonical" href="https://tamilcalendars.vercel.app/chandra-darisanam" />
      </Helmet>

      <div className="festivals-header">
        <h1>🌙 Chandra Darisanam 2026 ✨</h1>
        <div className="subhead">
          Auspicious Crescent Moon Sighting · Vikrama Samvata 2082–2083
        </div>
      </div>

      <div id="chandraContent">
        {groupedData.length === 0 ? (
          <div className="no-festivals">✨ No data available ✨</div>
        ) : (
          groupedData.map(({ monthTitle, items }) => (
            <div className="month-group" key={monthTitle}>
              <h2>🌖 {monthTitle}</h2>
              <ul className="festivals-list">
                {items.map((item, idx) => {
                  const formattedDate = formatDateShort(item.date);
                  const badgeText = item.tithi ? `🌙 ${item.tithi}` : "🌒 First Crescent";
                  const moonTimeRange = `${item.moonriseStart} – ${item.moonriseEnd}`;
                  return (
                    <li className="festival-card" key={idx}>
                      <div className="festival-date">{formattedDate}</div>
                      <div className="festival-details">
                        <div className="festival-name">
                          🌙 Chandra Darisanam {item.special && `( ${item.special} )`}
                        </div>
                        <div className="festival-day">
                          <span>📅 {item.day}</span>
                          <span className="moon-time">
                            🌙 Moonrise: {moonTimeRange} · ⏱️ {item.duration}
                          </span>
                        </div>
                      </div>
                      <div className="festival-type-badge">{badgeText}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>

      <div className="info-note">
        🌙 Chandra Darshan occurs just after Amavasya (New Moon) — sighting the sacred crescent brings blessings.<br />
        📅 Dates are based on Vikrama Samvata 2082–2083. Times are in IST (local India).
      </div>
    </div>
  );
};

export default ChandraDarisanam;