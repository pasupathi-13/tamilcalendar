import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { chandrashtamam2026 } from '../data/chandrashtamam2026';
import './Chandrashtamam.css';

function Chandrashtamam() {
  const [selectedRasi, setSelectedRasi] = useState(0);
  
  const rasiList = useMemo(() => {
    return chandrashtamam2026?.chandrashtama_days_2026 || [];
  }, []);

  const currentRasi = rasiList[selectedRasi];

  // Client-Side Time Analysis Engine to mark current or active items
  const evaluatedMonthsData = useMemo(() => {
    if (!currentRasi?.data) return [];
    
    const now = new Date();
    
    // Helper helper function to parse string dates into accurate JS timestamps
    // format expected: "DD-MM-YYYY hh:mm A" -> e.g. "14-06-2026 04:15 PM"
    const parseCustomDateTime = (str) => {
      if (!str) return null;
      try {
        const [datePart, timePart, ampm] = str.split(' ');
        const [day, month, year] = datePart.split('-');
        let [hours, minutes] = timePart.split(':');
        
        let hr = parseInt(hours, 10);
        if (ampm?.toUpperCase() === 'PM' && hr < 12) hr += 12;
        if (ampm?.toUpperCase() === 'AM' && hr === 12) hr = 0;
        
        return new Date(year, month - 1, day, hr, parseInt(minutes, 10));
      } catch (e) {
        return null;
      }
    };

    return currentRasi.data.map((item) => {
      const startDate = parseCustomDateTime(item.starting);
      const endDate = parseCustomDateTime(item.ending);
      
      let timeStatus = 'upcoming'; // 'active' | 'upcoming' | 'past'
      if (startDate && endDate) {
        if (now >= startDate && now <= endDate) {
          timeStatus = 'active';
        } else if (now > endDate) {
          timeStatus = 'past';
        }
      }
      
      return {
        ...item,
        timeStatus
      };
    });
  }, [currentRasi]);

  if (rasiList.length === 0 || !currentRasi) {
    return <div className="chandrashtamam-container" role="status">Loading data...</div>;
  }

  // Dynamic Metadata and SEO Payload variables
  const rasiNameTamil = currentRasi.title || currentRasi.rasi;
  const currentYear = 2026;

  // Search Engine Graph Structuring for Astrological Data Reference
  const structuralAstrologySchema = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tamilcalendar-c0q6.onrender.com/chandrashtamam?rasi=${selectedRasi}`
    },
    "name": `${rasiNameTamil} சந்திராஷ்டமம் நாட்கள் ${currentYear}`,
    "description": `2026 ஆம் ஆண்டிற்கான ${rasiNameTamil} ராசி சந்திராஷ்டமம் தொடங்கும் மற்றும் முடியும் நேரங்கள் பட்டியல்.`,
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
    <main className="chandrashtamam-container">
      <Helmet>
        <html lang="ta" />
        <title>{`${rasiNameTamil} சந்திராஷ்டமம் நாட்கள் 2026 | Chandrashtamam Days`}</title>
        <meta 
          name="description" 
          content={`2026 தமிழ் நாட்காட்டி படி ${rasiNameTamil} ராசிக்கான முழுமையான மாதாந்திர சந்திராஷ்டமம் நாட்கள் மற்றும் துல்லியமான நேரங்களின் பட்டியல்.`} 
        />
        <meta 
          name="keywords" 
          content={`${rasiNameTamil} சந்திராஷ்டமம் 2026, மாதாந்திர சந்திராஷ்டமம் நாட்கள், இன்றைய சந்திராஷ்டமம், Tamil Calendar Chandrashtamam 2026, Chandrashtamam Dates`} 
        />
        <link rel="canonical" href="https://tamilcalendar-c0q6.onrender.com/chandrashtamam" />
        
        {/* Open Graph Meta Nodes */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${rasiNameTamil} சந்திராஷ்டமம் நாட்கள் 2026 | தமிழ் நாட்காட்டி`} />
        <meta property="og:description" content={`2026 ஆம் ஆண்டின் ${rasiNameTamil} ராசி மாதாந்திர சந்திராஷ்டமம் தொடக்க மற்றும் முடிவு நேரங்களின் துல்லியமான தொகுப்பு.`} />
        <meta property="og:url" content="https://tamilcalendar-c0q6.onrender.com/chandrashtamam" />

        {/* Dynamic Schema Engine Injection */}
        <script type="application/ld+json">
          {JSON.stringify(structuralAstrologySchema)}
        </script>
      </Helmet>

      <header className="chandrashtamam-header">
        <h1>🌙 சந்திராஷ்டமம் {currentYear} 🌙</h1>
        <p className="subtitle">தினசரி சந்திராஷ்டமம் – ராசி வாரியான துல்லியமான நேரங்கள்</p>
      </header>

      <section className="filter-wrapper" aria-label="ராசி தேர்வு வடிகட்டி">
        <label htmlFor="rasi-select-dropdown" className="select-label">உங்கள் ராசியைத் தேர்ந்தெடுக்கவும்:</label>
        <select 
          id="rasi-select-dropdown"
          value={selectedRasi} 
          onChange={(e) => setSelectedRasi(parseInt(e.target.value, 10))}
        >
          {rasiList.map((rasi, idx) => (
            <option key={idx} value={idx}>
              {rasi.rasi} – {rasi.title}
            </option>
          ))}
        </select>
      </section>

      <section className="rasi-content-wrapper" aria-label={`${rasiNameTamil} பலன்கள் விவரம்`}>
        <div className="rasi-heading">
          <h2>{rasiNameTamil}</h2>
        </div>

        <div className="months-list">
          {evaluatedMonthsData.map((item, idx) => {
            const isLive = item.timeStatus === 'active';
            const isPast = item.timeStatus === 'past';
            
            return (
              <article 
                key={idx} 
                className={`month-card ${isLive ? 'current-month-card' : ''} ${isPast ? 'past-month-card' : ''}`}
                data-status={item.timeStatus}
              >
                <div className="month-card-header">
                  <h3 className="month-name">{item.month}</h3>
                  {isLive && (
                    <span className="live-pill" role="status">
                      <span className="live-dot" aria-hidden="true"></span> நடப்பில் உள்ளது
                    </span>
                  )}
                </div>
                
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
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Chandrashtamam;