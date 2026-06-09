import { useState, useEffect } from 'react';
import LiveClock from '../components/LiveClock';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
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

  const englishDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const features = [
    {
      id: 1,
      titleTa: "தினசரி நாட்காட்டி",
      excerptTa: "திதி, நட்சத்திரம், யோகம், கரணம் – முழு பஞ்சாங்கம்",
      icon: "🕉️",
      link: "/daily",
      readMoreTa: "தினசரி பஞ்சாங்கம் →"
    },
    {
      id: 2,
      titleTa: "நல்ல நேரம்",
      excerptTa: "நல்ல நேரம், ராகு காலம், கௌரி நேரம் மற்றும் பல.",
      icon: "⏳",
      link: "/nalla-neram",
      readMoreTa: "நல்ல நேரங்களை காண்க →"
    },
    {
      id: 3,
      titleTa: "முகூர்த்த தேதிகள்",
      excerptTa: "திருமணம் மற்றும் விசேஷ நிகழ்வுகளுக்கான முகூர்த்தங்கள் (2026 & 2027).",
      icon: "🔱",
      link: "/muhurtham",
      readMoreTa: "திருமண நாட்களை காண்க →"
    },
    {
      id: 4,
      titleTa: "திருவிழாக்கள் 2026",
      excerptTa: "பொங்கல், தீபாவளி, கார்த்திகை உள்ளிட்ட அனைத்து தமிழ்த் திருவிழாக்கள்.",
      icon: "🪔",
      link: "/festivals",
      readMoreTa: "திருவிழாக்களை காண்க →"
    },
    {
      id: 5,
      titleTa: "அரசு விடுமுறைகள்",
      excerptTa: "2026 ஆம் ஆண்டிற்கான தமிழ்நாடு பொது விடுமுறைகள்.",
      icon: "📜",
      link: "/holidays",
      readMoreTa: "விடுமுறை பட்டியலை காண்க →"
    },
    {
      id: 6,
      titleTa: "சந்திராஷ்டமம் 2026",
      excerptTa: "ஒவ்வொரு ராசிக்கும் சந்திராஷ்டமம் துவக்கம் மற்றும் முடிவு நேரங்கள்.",
      icon: "🌙",
      link: "/chandrashtamam",
      readMoreTa: "சந்திராஷ்டமத்தை காண்க →"
    },
    {
      id: 7,
      titleTa: "மாதாந்திர நாட்காட்டி",
      excerptTa: "மாத வாரியான நாட்காட்டி, விசேஷ நாட்கள் மற்றும் நிகழ்வுகள்.",
      icon: "📆",
      link: "/monthly",
      readMoreTa: "மாதங்களை பார்க்க →"
    },
    {
      id: 8,
      titleTa: "ராசி பலன்",
      excerptTa: "கிரக நிலைகளின் அடிப்படையில் தினசரி ராசி கணிப்புகள் (தினசரி நாட்காட்டி பக்கத்தில் கிடைக்கும்).",
      icon: "🔮",
      link: "/daily",                 // Now links to Daily Calendar page
      readMoreTa: "ராசி பலனை காண்க →"
    }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-tamil-date">{getTamilDate(currentDate)}</div>
          <div className="hero-english-date">{englishDate}</div>
          <LiveClock />
        </div>
      </div>

      <div className="blog-grid-section">
        <div className="blog-grid">
          {features.map((feature) => (
            <div key={feature.id} className="blog-card">
              <div className="blog-icon">{feature.icon}</div>
              <h3 className="blog-title">{feature.titleTa}</h3>
              <p className="blog-excerpt">{feature.excerptTa}</p>
              <Link to={feature.link} className="blog-read-more">
                {feature.readMoreTa}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;