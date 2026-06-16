import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import LiveClock from '../components/LiveClock';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getTamilDateDetails = (date) => {
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
      if (tamilMonthStarts[i].start <= date) {
        tamilMonth = tamilMonthStarts[i];
      } else {
        break;
      }
    }

    const dayDiff = Math.floor((date - tamilMonth.start) / (1000 * 3600 * 24)) + 1;
    const weekdays = ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"];
    const weekday = weekdays[date.getDay()];
    const tamilYear = "பராபவ";

    return {
      fullString: `${tamilMonth.month} ${dayDiff}, ${weekday} – ${tamilYear}`,
      month: tamilMonth.month,
      day: dayDiff,
      year: tamilYear
    };
  };

  const tamilDateInfo = useMemo(() => getTamilDateDetails(currentDate), [currentDate]);

  const englishDate = useMemo(() => {
    return currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [currentDate]);

  const features = [
    {
      id: 1,
      titleTa: "தினசரி நாட்காட்டி",
      excerptTa: "திதி, நட்சத்திரம், யோகம், கரணம் – முழு பஞ்சாங்கம்",
      imageSrc: "/images/daily-calendar.png",
      link: "/daily",
      readMoreTa: "தினசரி பஞ்சாங்கம் →"
    },
    {
      id: 2,
      titleTa: "நல்ல நேரம்",
      excerptTa: "நல்ல நேரம், ராகு காலம், கௌரி நேரம் மற்றும் பல.",
      imageSrc: "/images/nalla-neram.png",
      link: "/nalla-neram",
      readMoreTa: "நல்ல நேரங்களை காண்க →"
    },
    {
      id: 3,
      titleTa: "முகூர்த்த தேதிகள்",
      excerptTa: "திருமணம் மற்றும் விசேஷ நிகழ்வுகளுக்கான முகூர்த்தங்கள் (2026 & 2027).",
      imageSrc: "/images/muhurtham.png",
      link: "/muhurtham",
      readMoreTa: "திருமண நாட்களை காண்க →"
    },
    {
      id: 4,
      titleTa: "திருவிழாக்கள் 2026",
      excerptTa: "பொங்கல், தீபாவளி, கார்த்திகை உள்ளிட்ட அனைத்து தமிழ்த் திருவிழாக்கள்.",
      imageSrc: "/images/festivals.png",
      link: "/festivals",
      readMoreTa: "திருவிழாக்களை காண்க →"
    },
    {
      id: 5,
      titleTa: "அரசு விடுமுறைகள்",
      excerptTa: "2026 ஆம் ஆண்டிற்கான தமிழ்நாடு பொது விடுமுறைகள்.",
      imageSrc: "/images/holidays.png",
      link: "/holidays",
      readMoreTa: "விடுமுறை பட்டியலை காண்க →"
    },
    {
      id: 6,
      titleTa: "சந்திராஷ்டமம் 2026",
      excerptTa: "ஒவ்வொரு ராசிக்கும் சந்திராஷ்டமம் துவக்கம் மற்றும் முடிவு நேரங்கள்.",
      imageSrc: "/images/chandrashtamam.png",
      link: "/chandrashtamam",
      readMoreTa: "சந்திராஷ்டமத்தை காண்க →"
    },
    {
      id: 7,
      titleTa: "மாதாந்திர நாட்காட்டி",
      excerptTa: "மாத வாரியான நாட்காட்டி, விசேஷ நாட்கள் மற்றும் நிகழ்வுகள்.",
      imageSrc: "/images/monthly-calendar.png",
      link: "/monthly",
      readMoreTa: "மாதங்களை பார்க்க →"
    },
    // ✨ NEW: Chandra Darisanam card
    {
      id: 8,
      titleTa: "சந்திர தரிசனம் 2026",
      excerptTa: "அமாவாசைக்குப் பின் தெரியும் பிறைச்சந்திரனின் மங்கல தரிசன நேரங்கள். முழு விபரங்கள்.",
      imageSrc: "/images/chandra-darisanam.png",  // make sure this image exists in public/images
      link: "/chandra-darisanam",
      readMoreTa: "தரிசன நேரங்களை காண்க →"
    },
    {
      id: 9,
      titleTa: "ராசி பலன்",
      excerptTa: "கிரக நிலைகளின் அடிப்படையில் தினசரி ராசி கணிப்புகள்.",
      imageSrc: "/images/rasi-palan.png",
      link: "/daily",
      readMoreTa: "ராசி பலனை காண்க →"
    },
    {
  id: 10,
  titleTa: "அமாவாசை 2026",
  excerptTa: "அமாவாசை தேதிகள், பித்ரு தர்ப்பணம் மற்றும் ஆன்மீக முக்கியத்துவம்.",
  imageSrc: "/images/amavasai.png",
  link: "/amavasai",
  readMoreTa: "அமாவாசை தேதிகளை காண்க →"
},
{
  id: 11,
  titleTa: "பௌர்ணமி 2026",
  excerptTa: "முழு நிலவு நாட்கள், விரதங்கள், விழாக்கள் மற்றும் சடங்குகள்.",
  imageSrc: "/images/pournami.png",
  link: "/pournami",
  readMoreTa: "பௌர்ணமி தேதிகளை காண்க →"
}
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tamil Calendar 2026",
    "description": `இன்றைய தமிழ் தேதி: ${tamilDateInfo.fullString}. தினசரி தமிழ் நாட்காட்டி மற்றும் பஞ்சாங்கம் மாதாந்திர விபரங்களுடன்.`,
    "url": "https://tamilcalendar.vercel.app/",
    "inLanguage": ["ta-IN", "en-US"]
  };

  return (
    <div className="home-page">
      <Helmet>
        <html lang="ta" />
        <title>Tamil Calendar 2026 | Today Tamil Calendar, Nalla Neram, Rahu Kalam</title>
        <meta 
          name="description" 
          content={`இன்றைய தமிழ் தேதி: ${tamilDateInfo.fullString}. Online Tamil Calendar 2026 with Nalla Neram, Rahu Kalam, Daily Panchangam, Muhurtham Dates, Chandra Darisanam, and Tamil Nadu Government Holidays.`} 
        />
        <meta 
          name="keywords" 
          content="Tamil Calendar 2026, தமிழ் காலண்டர் 2026, Today Tamil Calendar, Nalla Neram Today, Rahu Kalam Today, Tamil Panchangam, Tamil Festivals, Muhurtham Dates, Chandra Darisanam 2026, Tamil Nadu Holidays" 
        />
        <link rel="canonical" href="https://tamilcalendar.vercel.app/" />
        
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ta_IN" />
        <meta property="og:title" content="Tamil Calendar 2026 | Today Tamil Calendar & Panchangam" />
        <meta property="og:description" content={`இன்றைய தேதி: ${tamilDateInfo.fullString}. Daily Tamil Calendar with Nalla Neram, Rahu Kalam, Festivals, Holidays, Chandra Darisanam and Panchangam.`} />
        <meta property="og:url" content="https://tamilcalendar.vercel.app/" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tamil Calendar 2026" />
        <meta name="twitter:description" content="Get precise daily Tamil dates, Nalla Neram, Rahu Kalam, Chandra Darshan timings, and full Panchangam info." />
        
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>

      <header className="hero-section">
        <h1 className="visually-hidden">தமிழ் காலண்டர் 2026 - Tamil Calendar 2026</h1>
        <div className="hero-content">
          <div className="hero-tamil-date" aria-live="polite">
            {tamilDateInfo.fullString}
          </div>
          <div className="hero-english-date">
            {englishDate}
          </div>
          <LiveClock />
        </div>
      </header>

      <main className="blog-grid-section">
        <h2 className="section-title visually-hidden">காலண்டர் சேவைகள்</h2>
        <div className="blog-grid">
          {features.map((feature) => (
            <article key={feature.id} className="blog-card">
              <Link to={feature.link} className="blog-image-link">
                <div className="blog-icon">
                  <img 
                    src={feature.imageSrc} 
                    alt={`${feature.titleTa} icon`} 
                    className="feature-image"
                    loading="lazy"
                  />
                </div>
              </Link>
              <h3 className="blog-title">
                {feature.titleTa}
              </h3>
              <p className="blog-excerpt">
                {feature.excerptTa}
              </p>
              <Link 
                to={feature.link} 
                className="blog-read-more"
                aria-label={`${feature.titleTa} விபரங்களை அறிய`}
              >
                {feature.readMoreTa}
              </Link>
            </article>
          ))}
        </div>
      </main>

      <article className="seo-content">
        <h2>தமிழ் காலண்டர் 2026 - முழு விபரங்கள்</h2>
        <p>
          தமிழ் காலண்டர் 2026-ல் தினசரி தமிழ் தேதி, நல்ல நேரம்,
          ராகு காலம், எமகண்டம், குளிகை, திதி, நட்சத்திரம்,
          யோகம், கரணம் மற்றும் பஞ்சாங்க விவரங்கள் துல்லியமாக வழங்கப்படுகின்றன.
        </p>
        <p>
          திருமண முகூர்த்த நாட்கள், அரசு விடுமுறைகள்,
          தமிழர் திருநாட்களான பொங்கல், தீபாவளி, கார்த்திகை தீபம், அமாவாசை, பௌர்ணமி,
          பிரதோஷம், ஏகாதசி, <strong>சந்திர தரிசனம் (Chandra Darisanam)</strong> மற்றும் 
          முக்கிய ஆன்மீக வழிபாட்டு நாட்கள் பற்றிய விரிவான தகவல்களையும் இங்கு எளிதாக அறிந்து கொள்ளலாம்.
        </p>

        <h3>தமிழ் காலண்டர் முதன்மை சிறப்பம்சங்கள்:</h3>
        <ul>
          <li>தினசரி தமிழ் தேதி மற்றும் பராபவ வருட கணிப்புகள்</li>
          <li>இன்றைய நல்ல நேரம் மற்றும் கௌரி நல்ல நேரம்</li>
          <li>துல்லியமான ராகு காலம், எமகண்டம், குளிகை நேரங்கள்</li>
          <li>சுப முகூர்த்த நாட்கள் (2026 & 2027)</li>
          <li>தமிழ்நாடு அரசு பொது விடுமுறை பட்டியல் 2026</li>
          <li>ராசி வாரியான தினசரி சந்திராஷ்டமம் விபரங்கள்</li>
          <li>சந்திர தரிசனம் 2026 – பிறைச் சந்திரனைக் காணும் நேரங்கள் (Chandra Darshan 2026)</li>
          <li>மாதாந்திர தமிழ் காலண்டர் மற்றும் தினசரி ராசி பலன்</li>
        </ul>
      </article>
    </div>
  );
}

export default Home;