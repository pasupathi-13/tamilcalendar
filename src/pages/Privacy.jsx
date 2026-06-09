import './Privacy.css';

function Privacy() {
  return (
    <div className="privacy-container">
      <h1>🔒 தனியுரிமைக் கொள்கை | Privacy Policy</h1>
      <div className="privacy-content">
        <p>
          இந்த வலைத்தளம் உங்களின் தனிப்பட்ட தகவல்களை எதையும் சேகரிக்கவோ, சேமிக்கவோ மாட்டாது.  
          No personal data is collected or stored by this website.
        </p>
        <p>
          நாங்கள் பயன்படுத்தும் ஒரே தகவல், உங்கள் மொழி விருப்பம் (Tamil/English) ஆகும், 
          இது உங்கள் உலாவியில் (localStorage) சேமிக்கப்படும்.
        </p>
        <p>
          The only information we store is your language preference (Tamil/English), saved in your browser's localStorage.
        </p>
        <p>
          இந்த வலைத்தளம் மூன்றாம் தரப்பு குக்கீகளைப் பயன்படுத்துவதில்லை.  
          This website does not use third‑party cookies.
        </p>
        <p className="copyright">© 2026 Tamil Calendar — All rights reserved.</p>
      </div>
    </div>
  );
}

export default Privacy;