import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CreditCard, Smartphone, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { id } = useParams();
  const [dest, setDest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [travelers, setTravelers] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [roomType, setRoomType] = useState('Standard');
  const [selectedHotelIndex, setSelectedHotelIndex] = useState(0);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetch(`http://localhost:5000/api/destinations/${id}`)
      .then(res => res.json())
      .then(data => {
        setDest(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [id, user, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(async () => {
      try {
        const res = await fetch('http://localhost:5000/api/trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            destinationId: dest.id,
            travelers: travelers,
            startDate: startDate,
            endDate: endDate,
            status: 'Booked' // Marked as Paid/Booked
          })
        });
        
        if (res.ok) {
          setIsProcessing(false);
          setSuccess(true);
          setTimeout(() => {
            navigate('/trips');
          }, 2000);
        }
      } catch (err) {
        console.error(err);
        setIsProcessing(false);
      }
    }, 2000);
  };

  if (loading) return <div className="container py-5 text-center">Loading...</div>;
  if (!dest) return <div className="container py-5 text-center">Destination not found</div>;

  if (success) {
    return (
      <div className="container flex flex-col items-center justify-center" style={{ minHeight: '60vh', textAlign: 'center' }}>
        <CheckCircle size={80} color="#d946ef" style={{ marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Payment <span className="text-gradient">Successful!</span></h1>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>Your trip to {dest.name} is confirmed. Redirecting to your trips...</p>
      </div>
    );
  }

  const roomPrices = {
    'Standard': 0,
    'Deluxe Room': 150,
    'Luxury Suite': 350
  };
  const hotels = [
    { name: 'WanderWay Budget Stay', rating: '★★★', price: 0, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600' },
    { name: 'Oceanview Hotel', rating: '★★★★', price: 150, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600' },
    { name: 'The Royal Inn', rating: '★★★★', price: 200, image: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8376?q=80&w=600' },
    { name: 'Grand Paradise Resort', rating: '★★★★★', price: 500, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600' },
  ];
  const finalTotal = (dest.price * travelers) + ((roomPrices[roomType] + hotels[selectedHotelIndex].price) * rooms);

  // Generate dynamic QR code for UPI (GPay / PhonePe) 
  const upiUrl = `upi://pay?pa=wanderway@upi&pn=WanderWay%20Travels&am=${finalTotal}&cu=USD`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}&bgcolor=16-27-34&color=ffffff&margin=10`;

  return (
    <div className="container" style={{ paddingBottom: '5rem', paddingTop: '2rem' }}>
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 700 }}>
          Secure <span className="text-gradient">Checkout</span>
        </h1>
        <p className="text-muted">Complete your payment to finalize your adventure.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '3rem' }}>
        
        {/* Payment Forms */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>Trip Details</h3>
          
          <div style={{ marginBottom: '2rem' }}>
            <label className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>Select Hotel & Rating</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {hotels.map((hotel, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedHotelIndex(idx)}
                  style={{ 
                    border: selectedHotelIndex === idx ? '2px solid #d946ef' : '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '12px', 
                    padding: '0.8rem', 
                    cursor: 'pointer',
                    background: selectedHotelIndex === idx ? 'rgba(217, 70, 239, 0.1)' : 'rgba(0,0,0,0.3)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={e => { if(selectedHotelIndex !== idx) e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.5)' }}
                  onMouseOut={e => { if(selectedHotelIndex !== idx) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                  <img src={hotel.image} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/400/300?random=" + (idx+50); }} alt={hotel.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.8rem' }} />
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.3rem', lineHeight: '1.3' }}>{hotel.name}</div>
                  <div style={{ color: '#fbbf24', fontSize: '0.85rem', marginBottom: '0.4rem' }}>{hotel.rating}</div>
                  <div className="text-muted" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{hotel.price > 0 ? `+$${hotel.price} premium` : 'Included in Base Price'}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-4" style={{ flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Check-in Date</label>
              <input type="date" className="input-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Check-out Date</label>
              <input type="date" className="input-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>

          <div className="flex gap-3 mb-4" style={{ flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '120px' }}>
              <label className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Travelers</label>
              <select className="input-control" value={travelers} onChange={e => setTravelers(Number(e.target.value))}>
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Person(s)</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Room Type</label>
              <select className="input-control" value={roomType} onChange={e => setRoomType(e.target.value)}>
                <option value="Standard">Standard (Included)</option>
                <option value="Deluxe Room">Deluxe Room (+$150)</option>
                <option value="Luxury Suite">Luxury Suite (+$350)</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: '120px' }}>
              <label className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Rooms</label>
              <select className="input-control" value={rooms} onChange={e => setRooms(Number(e.target.value))}>
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} Room(s)</option>)}
              </select>
            </div>
          </div>
          <hr style={{ borderColor: 'rgba(255,255,255,0.08)', marginBottom: '2rem', marginTop: '1rem' }} />

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>Payment Method</h3>
          
          {/* Tabs */}
          <div className="flex gap-2" style={{ marginBottom: '2rem' }}>
            <button 
              type="button"
              className={`btn flex items-center justify-center gap-2 ${paymentMethod === 'card' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ flex: 1, padding: '1rem' }}
              onClick={() => setPaymentMethod('card')}
            >
              <CreditCard size={20} /> Credit/Debit Card
            </button>
            <button 
              type="button"
              className={`btn flex items-center justify-center gap-2 ${paymentMethod === 'upi' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ flex: 1, padding: '1rem' }}
              onClick={() => setPaymentMethod('upi')}
            >
              <Smartphone size={20} /> GPay / PhonePe (UPI)
            </button>
          </div>

          <form onSubmit={handlePayment}>
            {paymentMethod === 'card' ? (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Cardholder Name</label>
                  <input type="text" className="input-control" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Card Number</label>
                  <input type="text" className="input-control" placeholder="0000 0000 0000 0000" maxLength="19" required />
                </div>
                <div className="flex gap-3">
                  <div style={{ flex: 1 }}>
                    <label className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Expiry Date</label>
                    <input type="text" className="input-control" placeholder="MM/YY" maxLength="5" required />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>CVV</label>
                    <input type="password" className="input-control" placeholder="123" maxLength="4" required />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-muted text-center mb-2">Scan the QR code below using Google Pay, PhonePe, or any UPI app to pay <strong>${finalTotal}</strong>.</p>
                <div style={{ background: '#161b22', padding: '1rem', borderRadius: '16px', border: '2px solid rgba(217, 70, 239, 0.4)' }}>
                  <img src={qrCodeUrl} alt="UPI QR Code" style={{ width: '220px', height: '220px', display: 'block', borderRadius: '8px' }} />
                </div>
                <div style={{ width: '100%', marginTop: '1.5rem' }}>
                  <label className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Or Enter UPI ID manually</label>
                  <input type="text" className="input-control" placeholder="username@upi" required={paymentMethod === 'upi'} />
                </div>
              </div>
            )}

            <div className="flex items-start gap-2 mt-4" style={{ marginBottom: '0.5rem' }}>
              <input type="checkbox" id="terms" required style={{ marginTop: '0.3rem', width: '16px', height: '16px', accentColor: '#d946ef', cursor: 'pointer' }} />
              <label htmlFor="terms" className="text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                I acknowledge and agree to WanderWay Travels' <a href="/policies" target="_blank" className="text-gradient" style={{textDecoration: 'none', fontWeight: 600}}>Payment, Refund, & Cancellation Policies</a> and assume all liability outlined.
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary mt-2" 
              style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem' }}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing Payment...' : `Pay $${finalTotal} & Book`}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600 }}>Order Summary</h3>
            
            <div className="flex items-center gap-3 mb-4" style={{ paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
               <img src={dest.image} alt={dest.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/200/200?random=" + dest.id; }} />
               <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.2rem' }}>{dest.name}</h4>
                  <p className="text-muted" style={{ fontSize: '0.8rem' }}>{dest.location}</p>
               </div>
            </div>

            <div className="flex justify-between mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
              <span>Base Price (1 person)</span>
              <span>${dest.price}</span>
            </div>
            
            <div className="flex justify-between mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
              <span>Travelers</span>
              <span>x {travelers}</span>
            </div>

            <div className="flex justify-between mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
              <span>Hotel ({hotels[selectedHotelIndex].rating})</span>
              <span>+ ${hotels[selectedHotelIndex].price * rooms}</span>
            </div>

            <div className="flex justify-between mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
              <span>{rooms}x {roomType}</span>
              <span>+ ${roomPrices[roomType] * rooms}</span>
            </div>

            <div className="flex justify-between mb-4 text-muted" style={{ fontSize: '0.9rem' }}>
              <span>Taxes & Fees</span>
              <span>$0</span>
            </div>

            <div className="flex justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', fontSize: '1.2rem', fontWeight: 600 }}>
              <span>Total Amount</span>
              <span className="text-gradient">${finalTotal}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
