import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import DailyCalendar from './pages/DailyCalendar';
import MonthlyCalendar from './pages/MonthlyCalendar';
import NallaNeram from './pages/NallaNeram';
import Muhurtham from './pages/Muhurtham';
import Festivals from './pages/Festivals';
import Holidays from './pages/Holidays';
import Chandrashtamam from './pages/Chandrashtamam';   // ✅ correct import

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily" element={<DailyCalendar />} />
          <Route path="/monthly" element={<MonthlyCalendar />} />
          <Route path="/nalla-neram" element={<NallaNeram />} />
          <Route path="/muhurtham" element={<Muhurtham />} />
          <Route path="/festivals" element={<Festivals />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/chandrashtamam" element={<Chandrashtamam />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;