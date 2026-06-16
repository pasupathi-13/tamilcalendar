import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { festivalsData } from '../data/festivalsData';
import './Festivals.css';

function Festivals() {
  const [selectedReligion, setSelectedReligion] = useState('all');

  const getReligionName = (type) => {
    switch(type) {
      case 'hindu_festivals': return 'இந்து பண்டிகைகள்';
      case 'christian_festivals': return 'கிறிஸ்தவ பண்டிகைகள்';
      case 'muslim_festivals': return 'இஸ்லாமிய பண்டிகைகள்';
      default: return '';
    }
  };

  const getReligionClass = (type) => {
    switch(type) {
      case 'hindu_festivals': return 'hindu';
      case 'christian_festivals': return 'christian';
      case 'muslim_festivals': return 'muslim';
      default: return '';
    }
  };

  // Memoized compilation of raw festival data based on selected filters
  const filteredAndGroupedData = useMemo(() => {
    let rawList = [];
    if (selectedReligion === 'all') {
      rawList = [
        ...festivalsData.hindu_festivals.map(f => ({ ...f, type: 'hindu_festivals' })),
        ...festivalsData.christian_festivals.map(f => ({ ...f, type: 'christian_festivals' })),
        ...festivalsData.muslim_festivals.map(f => ({ ...f, type: 'muslim_festivals' }))
      ];
    } else {
      const key = `${selectedReligion}_festivals`;
      if (festivalsData[key]) {
        rawList = festivalsData[key].map(f => ({ ...f, type: key }));
      }
    }

    // Chronological date sort execution
    rawList.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Dynamic grouping construction
    const monthsMap = {
      '01': 'ஜனவரி', '02': 'பிப்ரவரி', '03': 'மார்ச்', '04': 'ஏப்ரல்',
      '05': 'மே', '06': 'ஜூன்', '07': 'ஜூலை', '08': 'ஆகஸ்ட்',
      '09': 'செப்டம்பர்', '10': 'அக்டோபர்', '11': 'நவம்பர்', '12': 'டிசம்பர்'
    };
    
    const grouped = {};
    rawList.forEach(festival => {
      const month = festival.date.split('-')[1];
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(festival);
    });

    return {
      flatList: rawList,
      groupedByMonth: grouped,
      monthsNames: monthsMap
    };
  }, [selectedReligion]);

  // Dynamic SEO text changes dependent on current active component tab state
  const seoContent = useMemo(() => {
    switch(selectedReligion) {
      case 'hindu':
        return {
          title: "இந்து பண்டிகைகள் 2026 | Hindu Festivals Calendar 2026",
          desc: "2026 ஆம் ஆண்டின் முழுமையான இந்து பண்டிகைகள் மற்றும் விரத நாட்கள் விபரங்கள். பொங்கல், தீபாவளி, சிவராத்திரி, கார்த்திகை தீபம் மற்றும் சுப நாட்கள்.",
          keys: "இந்து பண்டிகைகள் 2026, Hindu Festivals 2026, தமிழ் விரத நாட்கள், Pongal 2026, Diwali 2026 date"
        };
      case 'christian':
        return {
          title: "கிறிஸ்தவ பண்டிகைகள் 2026 | Christian Holidays Calendar 2026",
          desc: "2026 ஆம் ஆண்டின் முக்கிய கிறிஸ்தவ திருநாட்கள் மற்றும் விடுமுறை விபரங்கள். பெரிய வெள்ளி, ஈஸ்டர், கிறிஸ்துமஸ் தின தேதிகள்.",
          keys: "கிறிஸ்தவ பண்டிகைகள் 2026, Christian Festivals 2026, Good Friday 2026, Easter 2026 date, Christmas 2026"
        };
      case 'muslim':
        return {
          title: "இஸ்லாமிய பண்டிகைகள் 2026 | Islamic Festivals Calendar 2026",
          desc: "2026 ஆம் ஆண்டின் புனித இஸ்லாமிய திருநாட்கள் மற்றும் ரம்ஜான், பக்ரீத், மிலாடி நபி பண்டிகை தேதிகளின் துல்லியமான பட்டியல்.",
          keys: "இஸ்லாமிய பண்டிகைகள் 2026, Islamic Festivals 2026, ரம்ஜான் 2026, Bakrid 2026 date, Muharram 2026"
        };
      default:
        return {
          title: "தமிழ்நாடு பண்டிகைகள் 2026 | Tamil Calendar Festivals 2026",
          desc: "2026 ஆம் ஆண்டின் முழுமையான தமிழ் நாட்காட்டி பண்டிகைகள் பட்டியல். இந்து, கிறிஸ்தவ மற்றும் இஸ்லாமிய திருவிழாக்களின் துல்லியமான தேதிகள் மற்றும் கிழமைகள்.",
          keys: "2026 பண்டிகைகள், தமிழ்நாட்டின் பண்டிகைகள் 2026, Tamil Calendar Festivals 2026, Festivals of Tamil Nadu, Calendar Religious Days"
        };
    }
  }, [selectedReligion]);

  // 🌟 Schema configuration for dynamic item placements
  const structuralSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": seoContent.title,
      "description": seoContent.desc,
      "numberOfItems": filteredAndGroupedData.flatList.length,
      "itemListElement": filteredAndGroupedData.flatList.slice(0, 15).map((festival, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Event",
          "name": festival.name,
          "startDate": festival.date,
          "location": {
            "@type": "Place",
            "name": "Tamil Nadu, India",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "TN",
              "addressCountry": "IN"
            }
          }
        }
      }))
    };
  }, [filteredAndGroupedData, seoContent]);

  return (
    <main className="festivals-container">
      <Helmet>
        <html lang="ta" />
        <title>{seoContent.title}</title>
        <meta name="description" content={seoContent.desc} />
        <meta name="keywords" content={seoContent.keys} />
        <link rel="canonical" href={`https://tamilcalendar-c0q6.onrender.com/festivals?type=${selectedReligion}`} />
        
        {/* Open Graph Meta Platforms tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoContent.title} />
        <meta property="og:description" content={seoContent.desc} />
        <meta property="og:url" content="https://tamilcalendar-c0q6.onrender.com/festivals" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuralSchema)}
        </script>
      </Helmet>

      <header className="festivals-header">
        <h1>2026 பண்டிகைகள் மற்றும் திருநாட்கள்</h1>
        <p className="subtitle">Tamil Nadu Festivals & Religious Days 2026</p>
      </header>

      {/* Filter Navigation Menu Container */}
      <nav className="filter-buttons" aria-label="மத வாரியான வடிகட்டி">
        <button 
          className={selectedReligion === 'all' ? 'active' : ''} 
          onClick={() => setSelectedReligion('all')}
        >
          அனைத்தும்
        </button>
        <button 
          className={selectedReligion === 'hindu' ? 'active' : ''} 
          onClick={() => setSelectedReligion('hindu')}
        >
          இந்து
        </button>
        <button 
          className={selectedReligion === 'christian' ? 'active' : ''} 
          onClick={() => setSelectedReligion('christian')}
        >
          கிறிஸ்தவ
        </button>
        <button 
          className={selectedReligion === 'muslim' ? 'active' : ''} 
          onClick={() => setSelectedReligion('muslim')}
        >
          இஸ்லாம்
        </button>
      </nav>

      {/* Chronological List Grid Layout */}
      {Object.keys(filteredAndGroupedData.groupedByMonth).sort().map(monthKey => (
        <section key={monthKey} className="month-group">
          <h2>{filteredAndGroupedData.monthsNames[monthKey]}</h2>
          <ul className="festivals-list">
            {filteredAndGroupedData.groupedByMonth[monthKey].map((festival, idx) => (
              <li key={idx} className={`festival-card ${getReligionClass(festival.type)}`}>
                <div className="festival-date">
                  <time dateTime={festival.date}>
                    {new Date(festival.date).toLocaleDateString('ta-IN', { day: 'numeric', month: 'short' })}
                  </time>
                </div>
                <div className="festival-details">
                  <h3 className="festival-name">{festival.name}</h3>
                  <div className="festival-day">{festival.day}</div>
                </div>
                <span className="festival-type-badge">{getReligionName(festival.type)}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {filteredAndGroupedData.flatList.length === 0 && (
        <div className="no-festivals" role="status">இந்த பிரிவில் பண்டிகைகள் இல்லை</div>
      )}
    </main>
  );
}

export default Festivals;