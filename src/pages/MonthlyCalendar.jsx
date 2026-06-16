import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './MonthlyCalendar.css';

// Fixed localization mapping configuration arrays
const TAMIL_MONTH_NAMES = {
  January: 'ஜனவரி',
  February: 'பிப்ரவரி',
  March: 'மார்ச்',
  April: 'ஏப்ரல்',
  May: 'மே',
  June: 'ஜூன்',
  July: 'ஜூலை',
  August: 'ஆகஸ்ட்',
  September: 'செப்டம்பர்',
  October: 'அக்டோபர்',
  November: 'நவம்பர்',
  December: 'டிசம்பர்'
};

const MONTHS_LIST = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function MonthlyCalendar() {
  const [monthData, setMonthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedImages, setFailedImages] = useState({});

  useEffect(() => {
    setMonthData(MONTHS_LIST);
    setLoading(false);
  }, []);

  const handleImageError = (month) => {
    console.error(`Failed to load calendar image asset for: ${month}`);
    setFailedImages((prev) => ({ ...prev, [month]: true }));
  };

  if (loading) {
    return (
      <div className="monthly-container" role="status" aria-live="polite">
        <div className="calendar-loading-text">மாதாந்திர நாட்காட்டி தரவு ஏற்றப்படுகிறது...</div>
      </div>
    );
  }

  const currentYear = 2026;

  // Search Engine Structural Graph payload describing the calendar catalog matrix
  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://tamilcalendars.vercel.app/monthly"
    },
    "name": `தமிழ் மாதாந்திர நாட்காட்டி ${currentYear} | Monthly Tamil Calendar`,
    "description": `${currentYear} ஆம் ஆண்டின் 12 மாதங்களுக்கான முழுமையான தமிழ் நாட்காட்டி பக்கங்களின் தொகுப்பு.`,
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
    <main className="monthly-container">
      <Helmet>
        <html lang="ta" />
        <title>{`மாதாந்திர நாட்காட்டி ${currentYear} | தமிழ் மாதங்கள் காலண்டர் | Monthly Tamil Calendar`}</title>
        <meta 
          name="description" 
          content={`${currentYear} தமிழ் நாட்காட்டி மாதாந்திர பக்கங்கள். ஜனவரி முதல் டிசம்பர் வரை உள்ள அனைத்து மாதங்களின் முழு நாட்காட்டி புகைப்பட தொகுப்பு மற்றும் விபரங்கள்.`} 
        />
        <meta 
          name="keywords" 
          content={`மாதாந்திர நாட்காட்டி ${currentYear}, தமிழ் காலண்டர் மாதங்கள், ஜனவரி 2026 காலண்டர், ஜூன் 2026 நாட்காட்டி, Monthly Tamil Calendar 2026, Tamil Calendar Sheets`} 
        />
        <link rel="canonical" href="https://tamilcalendars.vercel.app/monthly" />
        
        {/* Open Graph Context Nodes */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`மாதாந்திர நாட்காட்டி ${currentYear} | தமிழ் மாதங்கள் காலண்டர்`} />
        <meta property="og:description" content={`2026 ஆம் ஆண்டின் 12 மாதங்களுக்கான முழுமையான தமிழ் நாட்காட்டி புகைப்படங்களின் தெளிவான தொகுப்பு.`} />
        <meta property="og:url" content="https://tamilcalendars.vercel.app/monthly" />

        {/* Structural Schema Graph Injection */}
        <script type="application/ld+json">
          {JSON.stringify(imageGallerySchema)}
        </script>
      </Helmet>

      <header className="monthly-calendar-header">
        <h1>📆 மாதாந்திர நாட்காட்டி {currentYear}</h1>
        <p className="subtitle">Month‑wise Tamil Calendar Reference Sheets</p>
      </header>

      <section className="months-grid-layout" aria-label={`${currentYear} மாதங்களின் நாட்காட்டி தாள்கள்`}>
        {monthData.map((month, idx) => {
          const tamilName = TAMIL_MONTH_NAMES[month];
          const hasImageFailed = failedImages[month];
          const imagePath = `/images/months/${month.toLowerCase()}.png`;

          return (
            <article key={idx} className="month-sheet-card">
              <header className="month-sheet-title">
                <h2>{tamilName} - {month} {currentYear}</h2>
              </header>
              
              <div className="month-image-wrapper">
                {!hasImageFailed ? (
                  <img
                    src={imagePath}
                    alt={`${tamilName} - ${month} ${currentYear} காலண்டர் தாள்`}
                    className="month-image"
                    loading={idx > 0 ? "lazy" : "eager"}
                    decoding={idx > 0 ? "async" : "sync"}
                    onError={() => handleImageError(month)}
                  />
                ) : (
                  <div className="image-fallback" role="alert">
                    <span className="fallback-icon" aria-hidden="true">🖼️</span>
                    <p className="fallback-text">{tamilName} ({month}) நாட்காட்டி படம் கிடைக்கவில்லை</p>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default MonthlyCalendar;