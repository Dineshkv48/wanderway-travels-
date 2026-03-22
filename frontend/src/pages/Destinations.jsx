import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

const CATEGORIES = ['All', 'Beach', 'Mountain', 'City', 'Countryside', 'Desert', 'Island', 'Historical'];

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Newest');

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        let url = 'http://localhost:5000/api/destinations?';
        if (search) url += `search=${search}&`;
        if (activeCategory !== 'All') url += `type=${activeCategory}`;
        
        const res = await fetch(url);
        const data = await res.json();
        setDestinations(data);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
      } finally {
        setLoading(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      fetchDestinations();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, activeCategory]);

  return (
    <div className="container" style={{ paddingBottom: '4rem', paddingTop: '2rem' }}>
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: 800 }}>
          Explore <span className="text-gradient">Destinations</span>
        </h1>
        <p className="text-muted">Find your next adventure from our curated collection</p>
      </div>

      {/* Search and Filter area */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div className="flex gap-2 mb-3 items-center">
          <div style={{ flex: 1, position: 'relative' }}>
            <Search className="text-muted" size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="input-control" 
              placeholder="Search destinations or countries..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '3rem' }}
            />
          </div>
          <button className="btn btn-primary" style={{ padding: '0.8rem 2.5rem' }}>Search</button>
        </div>

        <div className="flex items-center gap-2" style={{ overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
          {CATEGORIES.map(category => (
            <button 
              key={category}
              className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveCategory(category)}
              style={{ borderRadius: '20px', padding: '0.5rem 1.2rem', whiteSpace: 'nowrap', fontSize: '0.9rem' }}
            >
              {category}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', minWidth: '150px' }}>
             <select 
               className="input-control" 
               style={{ background: 'rgba(0,0,0,0.3)', padding: '0.6rem 1rem' }}
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
             >
               <option>Newest</option>
               <option>Price: Low to High</option>
               <option>Price: High to Low</option>
               <option>Highest Rated</option>
             </select>
          </div>
        </div>
      </div>
      
      <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>{destinations.length} destinations found</p>

      {/* Grid */}
      {loading ? (
        <div className="text-center text-muted py-5" style={{ padding: '3rem 0' }}>Loading destinations...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {[...destinations].sort((a, b) => {
            switch (sortBy) {
              case 'Price: Low to High': return a.price - b.price;
              case 'Price: High to Low': return b.price - a.price;
              case 'Highest Rated': return b.rating - a.rating;
              case 'Newest':
              default: return b.id - a.id;
            }
          }).map(dest => (
            <Link to={`/destinations/${dest.id}`} key={dest.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: '16px', transition: 'transform 0.3s ease, box-shadow 0.3s ease', textDecoration: 'none', color: 'inherit' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)' }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ position: 'relative', height: '220px' }}>
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/800/600?random=" + dest.id; }}
                />
                <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '1px', color: '#b166e8', textTransform: 'uppercase' }}>
                  {dest.type}
                </span>
                {dest.rating >= 4.8 && (
                   <span className="text-gradient" style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.8)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '700' }}>
                     ★ FEATURED
                   </span>
                )}
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '600' }}>{dest.name}</h3>
                <div className="flex items-center text-muted gap-1 mb-2" style={{ fontSize: '0.9rem' }}>
                  <MapPin size={14} /> {dest.location}
                </div>
                <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {dest.description.substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white' }}>${dest.price}</span>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}> / person</span>
                  </div>
                  <div className="flex items-center gap-1" style={{ color: '#fbbf24', fontSize: '0.9rem', fontWeight: '600' }}>
                    ★ {dest.rating}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Destinations;
