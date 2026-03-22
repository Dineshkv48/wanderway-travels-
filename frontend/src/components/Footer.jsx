import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3rem 1.5rem', marginTop: 'auto' }}>
      <div className="container flex flex-col items-center justify-center gap-3">
        <Link to="/" className="flex items-center gap-1 text-muted" style={{ fontSize: '1.2rem', fontWeight: '700', transition: '0.3s' }}>
          <Compass size={24} color="#d946ef" />
          <span>WanderWay Travels</span>
        </Link>
        <div className="flex items-center gap-4 mt-2 mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
          <Link to="/policies" style={{ textDecoration: 'underline' }}>Terms & Policies</Link>
          <Link to="/" style={{ textDecoration: 'underline' }}>Help Center</Link>
          <Link to="/" style={{ textDecoration: 'underline' }}>Contact Us</Link>
        </div>
        <p className="text-muted" style={{ fontSize: '0.8rem' }}>© 2026 WanderWay Travels. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
