import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, DollarSign, Clock, Heart, Send } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const DestinationDetail = () => {
  const { id } = useParams();
  const [dest, setDest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/destinations/${id}`)
      .then(res => res.json())
      .then(data => {
        setDest(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [id]);

  const handleBook = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Route to payment checkout flow
    navigate(`/checkout/${id}`);
  };

  if (loading) return <div className="container py-5 text-center">Loading...</div>;
  if (!dest) return <div className="container py-5 text-center">Not found</div>;

  return (
    <>
      {/* Hero Banner */}
      <div style={{ position: 'relative', height: '400px', width: '100%', overflow: 'hidden' }}>
        <img 
          src={dest.image} 
          alt={dest.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} 
          onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/1200/800?random=" + dest.id; }}
        />
        <div className="container flex flex-col items-center justify-center" style={{ position: 'absolute', inset: 0, textAlign: 'center' }}>
          <span className="btn-secondary" style={{ padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.8rem', color: '#b166e8', marginBottom: '1rem', letterSpacing: '1px' }}>{dest.type}</span>
          <h1 style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '0.5rem' }}>{dest.name}</h1>
          <div className="flex items-center gap-1 text-muted" style={{ fontSize: '1.1rem' }}>
            <MapPin size={18} /> {dest.location}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '3rem' }}>
          
          {/* Main Content */}
          <div>
            {/* Stats Row */}
            <div className="glass-card flex items-center justify-between" style={{ padding: '1.5rem 3rem', marginBottom: '3rem', textAlign: 'center' }}>
              <div>
                <Star size={20} color="#b166e8" style={{ margin: '0 auto 0.5rem auto' }} />
                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{dest.rating}</div>
                <div className="text-muted" style={{ fontSize: '0.8rem' }}>Rating</div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }}></div>
              <div>
                <DollarSign size={20} color="#b166e8" style={{ margin: '0 auto 0.5rem auto' }} />
                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>${dest.price}</div>
                <div className="text-muted" style={{ fontSize: '0.8rem' }}>Per Person</div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }}></div>
              <div>
                <Clock size={20} color="#b166e8" style={{ margin: '0 auto 0.5rem auto' }} />
                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{dest.bestTime}</div>
                <div className="text-muted" style={{ fontSize: '0.8rem' }}>Best Time</div>
              </div>
            </div>

            <div className="flex gap-4 mb-5" style={{ flexWrap: 'wrap' }}>
              <div className="glass-card flex items-center justify-between" style={{ flex: 1, minWidth: '280px', padding: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.2rem' }}>Current Weather</h4>
                  <div className="text-muted" style={{ fontSize: '0.9rem' }}>Mostly Sunny, perfect for travel.</div>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '2.5rem' }}>☀️</span>
                  <span style={{ fontSize: '2.2rem', fontWeight: 700, color: '#fbbf24' }}>82°F</span>
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>About This Destination</h3>
            <p className="text-muted" style={{ lineHeight: '1.8', marginBottom: '2.5rem' }}>
              {dest.description}
            </p>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Interactive Map</h3>
            <div style={{ width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden', marginBottom: '3rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(dest.location)}&t=&z=7&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Highlights</h3>
            <div className="flex flex-wrap gap-2 mb-4" style={{ marginBottom: '3rem' }}>
              {['Burj Khalifa', 'Desert Safari', 'Palm Jumeirah', 'Gold Souk'].map(h => (
                <div key={h} className="glass-card flex items-center gap-1 text-muted" style={{ padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.9rem' }}>
                  <Heart size={14} color="#d946ef" /> {h}
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>Guest Testimonials</h3>
            <div className="flex gap-4 mb-5" style={{ overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
              {[
                { name: "Sarah Jenkins", text: `Absolutely breathtaking! The views at ${dest.name} were everything I dreamed of and more. The booking process via WanderWay was flawless.`, date: "Oct 2025" },
                { name: "Michael Chen", text: `A truly unforgettable experience. I've traveled all over, but this particular spot is 10/10. Will definitely be using this platform again!`, date: "Dec 2025" },
                { name: "Elena Rodriguez", text: `From the hotel to the scenery, perfection. ${dest.name} is a must-visit for anyone looking to escape and recharge. 5 stars all around.`, date: "Feb 2026" }
              ].map((rev, i) => (
                <div key={i} className="glass-card" style={{ minWidth: '280px', flex: 1, padding: '1.5rem', borderRadius: '16px' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{rev.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.8rem' }}>{rev.date}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', color: '#fbbf24', fontSize: '0.8rem', letterSpacing: '2px' }}>★★★★★</div>
                  </div>
                  <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 600 }}>Leave a Review</h3>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
               <div className="mb-2">
                 <select className="input-control" style={{ width: 'auto', background: 'transparent' }}>
                   <option>Rating: 5 ★</option>
                 </select>
               </div>
               <textarea className="input-control" rows={3} placeholder="Share your experience..." style={{ background: 'transparent', resize: 'vertical' }}></textarea>
               <button className="btn btn-primary mt-2 flex items-center gap-1" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                 <Send size={14} /> Submit Review
               </button>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 600 }}>Plan Your Trip</h3>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#d946ef', marginBottom: '1.5rem' }}>
                ${dest.price} <span className="text-muted" style={{ fontSize: '1rem', fontWeight: 400 }}>/ person</span>
              </div>
              <button 
                className="btn btn-primary flex items-center justify-center gap-2" 
                style={{ width: '100%', padding: '1rem' }}
                onClick={handleBook}
              >
                Start Planning
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default DestinationDetail;
