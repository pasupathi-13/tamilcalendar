import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>📅 தமிழ் நாட்காட்டி 2026 | Tamil Calendar 2026 – Panchangam, Nalla Neram, Muhurtham</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
        <div className="copyright">© 2026 Tamil Calendar. All Rights Reserved.</div>
      </div>
    </footer>
  );
}
export default Footer;