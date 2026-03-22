import { Link } from 'react-router-dom';
import { ArrowRight, Plane } from 'lucide-react';

const Home = () => {
  return (
    <div className="container flex items-center justify-center flex-col" style={{ minHeight: 'calc(100vh - 100px)', textAlign: 'center' }}>
      <div style={{ padding: '0.5rem 1.2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#a0aab2' }}>
        <Plane size={16} /> <span style={{fontSize: '0.9rem'}}>Your Next Adventure Awaits</span>
      </div>
      
      <h1 style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
        Explore The World's <br />
        <span className="text-gradient">Most Beautiful Places</span>
      </h1>
      
      <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
        Discover breathtaking destinations, plan your dream trips, and create
        unforgettable memories with WanderWay.
      </p>
      
      <div className="flex items-center justify-center gap-3">
        <Link to="/destinations" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '12px' }}>
          Explore Destinations <ArrowRight size={20} style={{ marginLeft: '8px' }} />
        </Link>
        <Link to="/destinations" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}>
          Start Planning
        </Link>
      </div>
    </div>
  );
};

export default Home;
