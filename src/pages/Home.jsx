import LiveClock from '../components/LiveClock'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <LiveClock />
        <h1 className="hero-title">தமிழ் நாட்காட்டி</h1>
        <p className="hero-subtitle">Tamil Calendar 2026 – Daily Panchangam, Auspicious Timings & Festivals</p>
      </div>
      <div className="features-grid">
        <div className="feature-card"><div className="feature-icon">📅</div><h3>Daily Calendar</h3><p>Tithi, Nakshatra, Yoga, Karana</p></div>
        <div className="feature-card"><div className="feature-icon">✨</div><h3>Nalla Neram</h3><p>Auspicious timings</p></div>
        <div className="feature-card"><div className="feature-icon">💍</div><h3>Muhurtham</h3><p>Wedding & event muhurthams</p></div>
        <div className="feature-card"><div className="feature-icon">🎉</div><h3>Festivals</h3><p>All Tamil festivals & holidays</p></div>
      </div>
    </div>
  )
}
export default Home