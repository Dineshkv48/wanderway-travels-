import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Trash2 } from 'lucide-react';

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchTrips();
  }, [user]);

  const fetchTrips = () => {
    setLoading(true);
    fetch(`http://localhost:5000/api/trips/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setTrips(data);
        setLoading(false);
      })
      .catch(console.error);
  };

  const handleDelete = async (tripId) => {
    try {
      await fetch(`http://localhost:5000/api/trips/${tripId}`, { method: 'DELETE' });
      fetchTrips();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  const getDaysUntil = (dateStr) => {
    const diff = new Date(dateStr) - new Date();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
       <div className="text-center" style={{ marginBottom: '4rem' }}>
         <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 700 }}>
           My <span className="text-gradient">Trips</span>
         </h1>
         <p className="text-muted">Manage your travel plans</p>
       </div>

       {loading ? (
         <div className="text-center text-muted">Loading trips...</div>
       ) : trips.length === 0 ? (
         <div className="text-center text-muted">You have no trips planned yet.</div>
       ) : (
         <div className="flex flex-col gap-3" style={{ maxWidth: '800px', margin: '0 auto' }}>
           {trips.map(trip => (
             <div key={trip.id} className="glass-card flex" style={{ overflow: 'hidden', padding: 0 }}>
               <img 
                 src={trip.destImage} 
                 alt={trip.destName} 
                 style={{ width: '250px', objectFit: 'cover' }} 
                 onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/800/600?random=" + trip.destinationId; }}
               />
               <div style={{ padding: '2rem', flex: 1 }}>
                 <div className="flex justify-between items-start mb-2">
                   <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{trip.destName}</h3>
                   <span className="btn-secondary" style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem', color: trip.status === 'Booked' ? '#10b981' : '#b166e8', fontWeight: 600, letterSpacing: '1px' }}>
                     {trip.status}
                   </span>
                 </div>

                 {trip.status === 'Booked' && getDaysUntil(trip.startDate) > 0 && (
                   <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.6rem 1rem', borderRadius: '8px', color: '#10b981', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                     <span>⏳</span> Only {getDaysUntil(trip.startDate)} Days Until Departure!
                   </div>
                 )}

                 <div className="flex items-center text-muted gap-1 mb-4" style={{ fontSize: '0.9rem' }}>
                   <MapPin size={14} /> {trip.destLoc}
                 </div>
                 
                 <div className="flex items-center gap-4 text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                   <div className="flex items-center gap-1"><Calendar size={14} /> {trip.startDate} — {trip.endDate}</div>
                   <div className="flex items-center gap-1"><Users size={14} /> {trip.travelers} travelers</div>
                 </div>

                 <div className="flex items-center gap-2">
                   <select className="input-control" style={{ width: '150px', background: 'transparent', padding: '0.5rem' }}>
                     <option>Planning</option>
                     <option>Booked</option>
                     <option>Completed</option>
                   </select>
                   <button 
                     onClick={() => handleDelete(trip.id)}
                     className="btn btn-secondary flex items-center gap-1"
                     style={{ padding: '0.5rem 1rem' }}
                   >
                     <Trash2 size={16} /> Delete
                   </button>
                 </div>
               </div>
             </div>
           ))}
         </div>
       )}
    </div>
  );
};

export default MyTrips;
