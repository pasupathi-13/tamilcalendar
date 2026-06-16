import './About.css';

function About() {
  return (
    <div className="about-container">
        <Helmet>
        <title>About Tamil Calendar 2026 | பற்றி</title>
        <meta name="description" content="About Tamil Calendar 2026 - A complete Tamil panchangam app with daily timings, festivals, holidays, and muhurtham dates." />
        <link rel="canonical" href="https://tamilcalendar.vercel.app/about" />
      </Helmet>
      <h1>📖 பற்றி | About</h1>
      <div className="about-content">
        <p>
          <strong>தமிழ் நாட்காட்டி 2026</strong> – உங்கள் அன்றாட வாழ்க்கைக்குத் தேவையான 
          பஞ்சாங்கம், நல்ல நேரம், முகூர்த்த தேதிகள், திருவிழாக்கள், அரசு விடுமுறைகள் மற்றும் 
          சந்திராஷ்டமம் ஆகியவற்றை ஒரே இடத்தில் வழங்கும் ஒரு முழுமையான வலைத்தளம்.
        </p>
        <p>
          <strong>Tamil Calendar 2026</strong> – A complete Tamil calendar app providing daily 
          panchangam, auspicious timings (Nalla Neram), wedding muhurtham dates, festival lists, 
          government holidays, and Chandrashtamam details – all in one place.
        </p>
        <hr />
        <h2>✨ அம்சங்கள் | Features</h2>
        <ul>
          <li>📅 தினசரி நாட்காட்டி (Daily Panchangam)</li>
          <li>⏰ நல்ல நேரம் & ராகு காலம் (Auspicious Timings)</li>
          <li>💍 திருமண முகூர்த்த தேதிகள் 2026 & 2027</li>
          <li>🎉 திருவிழாக்கள் (Pongal, Deepavali, etc.)</li>
          <li>🏛️ அரசு விடுமுறைகள் (Government Holidays)</li>
          <li>🌙 சந்திராஷ்டமம் 2026 (Chandrashtamam)</li>
          <li>🕉️ ராசி பலன் (Raasi Palan)</li>
          <li>📆 மாதாந்திர நாட்காட்டி (Monthly Calendar with images)</li>
        </ul>
        <hr />
        <h2>🔒 தனியுரிமை | Privacy Policy</h2>
        <p>இந்த வலைத்தளம் பயன்படுத்தும் எந்தத் தனிப்பட்ட தரவுகளும் சேமிக்கப்பட மாட்டாது. 
        All information provided is based on standard Tamil calendar calculations.</p>
        <p className="copyright">© 2026 Tamil Calendar — All rights reserved.</p>
      </div>
    </div>
  );
}

export default About;