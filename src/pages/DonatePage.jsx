import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Target, Users, Award, ArrowRight } from "lucide-react";

const DonationImpact = [
  { amount: "₹5,000", impact: "One Student Scholarship", icon: "🎓" },
  { amount: "₹10,000", impact: "Monthly Mentoring Program", icon: "🤝" },
  { amount: "₹25,000", impact: "Workshop & Training Session", icon: "📚" },
  { amount: "₹50,000", impact: "Research Project Support", icon: "🔬" },
  { amount: "₹1,00,000+", impact: "Annual Scholarship Fund", icon: "🏆" }
];

const DonationWays = [
  { title: "Online Payment", desc: "Direct donation via secure payment gateway (Razorpay/PayU)", icon: "💳" },
  { title: "Bank Transfer", desc: "Direct deposit to foundation account", icon: "🏦" },
  { title: "Cheque/Draft", desc: "Payable to PSG Tech Alumni Foundation", icon: "✏️" },
  { title: "Corporate CSR", desc: "Align your CSR initiatives with our programs", icon: "🏢" }
];

const DonatePage = () => {
  const [donationAmount, setDonationAmount] = useState(10000);
  const [isMonthly, setIsMonthly] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        .donate-hero {
          background: linear-gradient(165deg, #0a0e1a 0%, #0d1428 100%);
          padding: 120px 24px;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }
        
        .donate-hero::before {
          content: '';
          position: absolute;
          top: -150px;
          right: -150px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .donate-inner {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        
        .donate-header {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .donate-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(201, 168, 76, 0.65);
          margin-bottom: 20px;
        }
        
        .donate-eyebrow::before, .donate-eyebrow::after {
          content: '';
          width: 32px;
          height: 1.5px;
          background: linear-gradient(90deg, rgba(201, 168, 76, 0.4), rgba(201, 168, 76, 0.1));
        }
        
        .donate-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 6vw, 72px);
          font-weight: 800;
          color: #f2ede3;
          line-height: 1.08;
          letter-spacing: -0.025em;
          margin-bottom: 24px;
        }
        
        .donate-h1 em {
          font-style: italic;
          background: linear-gradient(130deg, #c9a84c, #f0d870);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .donate-sub {
          font-size: 16px;
          font-weight: 300;
          color: rgba(200, 215, 240, 0.5);
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.75;
        }
        
        .donate-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-bottom: 80px;
        }
        
        .donate-form-section h3 {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #f2ede3;
          margin-bottom: 32px;
          line-height: 1.2;
        }
        
        .donation-amount-group {
          margin-bottom: 32px;
        }
        
        .donation-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(201, 168, 76, 0.8);
          margin-bottom: 12px;
          display: block;
        }
        
        .amount-presets {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }
        
        .amount-btn {
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 6px;
          color: rgba(200, 215, 240, 0.7);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        
        .amount-btn:hover, .amount-btn.active {
          background: rgba(201, 168, 76, 0.2);
          border-color: rgba(201, 168, 76, 0.5);
          color: #e8c560;
        }
        
        .amount-custom {
          display: flex;
          gap: 10px;
        }
        
        .amount-custom input {
          flex: 1;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 6px;
          color: #f2ede3;
          font-size: 12px;
          transition: all 0.25s ease;
        }
        
        .amount-custom input:focus {
          outline: none;
          border-color: rgba(201, 168, 76, 0.5);
          background: rgba(201, 168, 76, 0.05);
        }
        
        .frequency-toggle {
          display: flex;
          gap: 10px;
          margin-bottom: 32px;
        }
        
        .freq-btn {
          flex: 1;
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 6px;
          color: rgba(200, 215, 240, 0.7);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        
        .freq-btn.active {
          background: rgba(201, 168, 76, 0.2);
          border-color: rgba(201, 168, 76, 0.5);
          color: #e8c560;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(200, 215, 240, 0.6);
          margin-bottom: 8px;
          display: block;
        }
        
        .form-input {
          width: 100%;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 6px;
          color: #f2ede3;
          font-size: 12px;
          transition: all 0.25s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: rgba(201, 168, 76, 0.5);
          background: rgba(201, 168, 76, 0.05);
        }
        
        .donate-btn {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #b8882a, #e8c255);
          color: #07080e;
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: none;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .donate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201, 168, 76, 0.35);
        }
        
        .info-section {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        
        .info-card {
          padding: 28px 32px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 10px;
          transition: all 0.35s ease;
        }
        
        .info-card:hover {
          border-color: rgba(201, 168, 76, 0.35);
          background: rgba(201, 168, 76, 0.05);
        }
        
        .info-card h4 {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #f2ede3;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        
        .info-card p {
          font-size: 13px;
          color: rgba(200, 215, 240, 0.6);
          line-height: 1.7;
        }
        
        .impact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        .impact-item {
          padding: 14px;
          background: rgba(201, 168, 76, 0.05);
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 6px;
          text-align: center;
          font-size: 11px;
          color: rgba(200, 215, 240, 0.65);
          line-height: 1.5;
        }
        
        .impact-amount {
          font-weight: 700;
          color: #c9a84c;
          display: block;
          margin-bottom: 4px;
        }
        
        .donation-ways {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 40px;
        }
        
        .way-card {
          padding: 20px;
          background: rgba(201, 168, 76, 0.04);
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 8px;
        }
        
        .way-icon {
          font-size: 28px;
          margin-bottom: 8px;
          display: block;
        }
        
        .way-card h5 {
          font-size: 13px;
          font-weight: 600;
          color: #f2ede3;
          margin-bottom: 4px;
        }
        
        .way-card p {
          font-size: 11px;
          color: rgba(200, 215, 240, 0.55);
          line-height: 1.5;
        }
        
        @media (max-width: 820px) {
          .donate-main { grid-template-columns: 1fr; gap: 40px; }
          .amount-presets { grid-template-columns: repeat(2, 1fr); }
          .donation-ways { grid-template-columns: 1fr; }
          .impact-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="donate-hero">
        <div className="donate-inner">
          <motion.div 
            className="donate-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="donate-eyebrow">Make a Difference</div>
            <h1 className="donate-h1">Support Education & <em>Innovation</em></h1>
            <p className="donate-sub">
              Your donation directly supports scholarships, research initiatives, infrastructure development, and capacity-building programs at PSG College of Technology & Polytechnic College.
            </p>
          </motion.div>

          <motion.div 
            className="donate-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {/* Donation Form */}
            <div className="donate-form-section">
              <h3>Make Your Donation</h3>
              
              <div className="donation-amount-group">
                <label className="donation-label">Select Amount</label>
                <div className="amount-presets">
                  <button 
                    className={`amount-btn ${donationAmount === 5000 ? 'active' : ''}`}
                    onClick={() => setDonationAmount(5000)}
                  >
                    ₹5,000
                  </button>
                  <button 
                    className={`amount-btn ${donationAmount === 10000 ? 'active' : ''}`}
                    onClick={() => setDonationAmount(10000)}
                  >
                    ₹10,000
                  </button>
                  <button 
                    className={`amount-btn ${donationAmount === 25000 ? 'active' : ''}`}
                    onClick={() => setDonationAmount(25000)}
                  >
                    ₹25,000
                  </button>
                  <button 
                    className={`amount-btn ${donationAmount === 50000 ? 'active' : ''}`}
                    onClick={() => setDonationAmount(50000)}
                  >
                    ₹50,000
                  </button>
                </div>
                <div className="amount-custom">
                  <span style={{display: 'flex', alignItems: 'center', color: 'rgba(200, 215, 240, 0.6)', fontSize: '12px'}}>₹</span>
                  <input 
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
                    placeholder="Custom amount"
                  />
                </div>
              </div>

              <div className="frequency-toggle">
                <button 
                  className={`freq-btn ${!isMonthly ? 'active' : ''}`}
                  onClick={() => setIsMonthly(false)}
                >
                  One-Time
                </button>
                <button 
                  className={`freq-btn ${isMonthly ? 'active' : ''}`}
                  onClick={() => setIsMonthly(true)}
                >
                  Monthly
                </button>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message (Optional)</label>
                <textarea 
                  className="form-input"
                  placeholder="Share why you're supporting us..."
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ resize: 'none' }}
                />
              </div>

              <button className="donate-btn">
                <Heart size={16} />
                Proceed to Payment
              </button>
            </div>

            {/* Information Section */}
            <div className="info-section">
              <div className="info-card">
                <h4>🎯 Your Impact</h4>
                <p>
                  Every contribution, regardless of size, directly creates opportunities for deserving students and strengthens the future of education and innovation at PSG institutions.
                </p>
                <div className="impact-grid">
                  {DonationImpact.map((item, i) => (
                    <div key={i} className="impact-item">
                      <span className="impact-amount">{item.amount}</span>
                      {item.impact}
                    </div>
                  ))}
                </div>
              </div>

              <div className="info-card">
                <h4>📋 Tax Benefits</h4>
                <p>
                  Donations to PSG Tech Alumni Foundation are eligible for tax deduction under Section 80G of the Indian Income Tax Act. Get your tax-exemption certificate upon donation.
                </p>
              </div>

              <div className="info-card">
                <h4>🔒 Security & Transparency</h4>
                <p>
                  We maintain the highest standards of financial transparency and accountability. All funds are used strictly as per our mission and statutory guidelines.
                </p>
              </div>

              <div className="info-card">
                <h4>💳 Payment Methods</h4>
                <div className="donation-ways">
                  {DonationWays.map((way, i) => (
                    <div key={i} className="way-card">
                      <span className="way-icon">{way.icon}</span>
                      <h5>{way.title}</h5>
                      <p>{way.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default DonatePage;