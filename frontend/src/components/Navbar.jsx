import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Compass, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar container flex items-center justify-between" style={{ padding: '1.5rem 1.5rem' }}>
      <Link to="/" className="flex items-center gap-1" style={{ fontSize: '1.5rem', fontWeight: '700' }}>
        <Compass size={28} color="#d946ef" />
        <span className="text-gradient">WanderWay</span>
      </Link>

      <ul className="flex items-center gap-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/destinations">Destinations</Link></li>
        {user && <li><Link to="/trips">My Trips</Link></li>}
      </ul>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="flex items-center gap-1 text-muted" style={{ fontSize: '0.9rem' }}>
              <span className="user-icon" style={{ padding: '0.2rem' }}>👤</span>
              {user.name || user.email.split('@')[0]}
            </div>
            <button onClick={handleLogout} className="btn btn-secondary flex items-center gap-1" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
