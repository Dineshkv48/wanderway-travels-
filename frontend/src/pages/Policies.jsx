import React from 'react';

const Policies = () => {
  return (
    <div className="container" style={{ paddingBottom: '5rem', paddingTop: '2rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 700 }}>
        Terms & <span className="text-gradient">Policies</span>
      </h1>
      <p className="text-muted" style={{ marginBottom: '3rem' }}>Last updated: March 2026</p>

      <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#d946ef' }}>1. Payment Policy</h2>
          <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
            All payments must be made in full at the time of booking unless a specific installment plan is selected. 
            We accept all major Credit and Debit cards, as well as digital UPI transactions (Google Pay, PhonePe). 
            Upon successful payment, you will receive an immediate confirmation email and your trip status will be updated to "Booked" in your My Trips dashboard. 
            All transactions are securely encrypted and processed through our verified payment gateways.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#d946ef' }}>2. Cancellation Policy</h2>
          <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
            We understand that travel plans can change. Cancellations made 30 days or more prior to the scheduled departure date will not incur any penalties. 
            Cancellations made between 15 and 29 days prior to departure will incur a 30% cancellation fee. 
            Cancellations made 14 days or less from the departure date are strictly non-refundable. 
            To cancel a trip, please use the "Delete/Cancel" option in your My Trips dashboard or contact our support team.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#d946ef' }}>3. Refund Policy</h2>
          <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
            Eligible refunds according to our Cancellation Policy will be processed back to the original method of payment within 7-10 business days. 
            If your trip is entirely cancelled by WanderWay Travels due to unforeseen circumstances (e.g., extreme weather, safety concerns), you will be entitled to a 100% full refund or a complimentary reschedule. 
            Service fees and transaction fees applied by the payment gateway are strictly non-refundable.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#d946ef' }}>4. Responsibility & Liability</h2>
          <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
            WanderWay Travels acts strictly as an agent for the various independent suppliers that provide hotel accommodations, transportation, sightseeing, activities, and other services. 
            We assume no responsibility for any loss, damage, injury, delay, or irregularity which may be caused either by reason of any defect in any vehicle or through the acts or defaults of any company or person engaged in conveying the passenger or in carrying out the arrangements of the tour. 
            Travelers are heavily advised to purchase independent travel insurance prior to departure.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Policies;
