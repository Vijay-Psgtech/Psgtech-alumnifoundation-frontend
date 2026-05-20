import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Handshake, ArrowRight, CheckCircle } from "lucide-react";

const engagementPaths = [
  {
    id: 1,
    icon: Heart,
    title: "Engage as a Donor",
    color: "#c9a84c",
    description:
      "Your contribution directly supports scholarships, research, infrastructure development, and capacity-building initiatives.",
    benefits: [
      "Direct support to deserving students",
      "Fund research and innovation centers",
      "Strengthen institutional infrastructure",
      "Build centers of excellence",
      "Support capacity-building programs",
      "Tax-deductible donations",
    ],
    cta: "Start Donating",
    highlight:
      "Every contribution, regardless of size, creates opportunities for deserving students and strengthens the future of education and innovation.",
  },
  {
    id: 2,
    icon: Users,
    title: "Engage as a Mentor",
    color: "#7eb8f7",
    description:
      "Share your expertise and experience with the next generation of leaders through structured mentorship programs.",
    benefits: [
      "Career guidance and counseling",
      "Technical mentoring sessions",
      "Leadership development workshops",
      "Industry insights sharing",
      "Networking opportunities",
      "Shape future professionals",
    ],
    cta: "Become a Mentor",
    highlight:
      "Mentorship plays a significant role in shaping future-ready graduates and strengthening the PSG learning ecosystem.",
  },
  {
    id: 3,
    icon: Handshake,
    title: "Engage as a Partner",
    color: "#7edfa0",
    description:
      "Collaborate as a long-term partner in advancing education, research, innovation, and community development.",
    benefits: [
      "Strategic partnership opportunities",
      "Industry-academia collaboration",
      "Research partnerships",
      "Corporate CSR alignment",
      "Long-term sustainable impact",
      "Brand visibility and recognition",
    ],
    cta: "Become a Partner",
    highlight:
      "Strategic partnerships help create sustainable impact while strengthening the support ecosystem around PSG institutions.",
  },
];

const EnagementPage = () => {
  const [expandedId, setExpandedId] = useState(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        .eng-hero {
          background: linear-gradient(165deg, #0a0e1a 0%, #0d1428 100%);
          padding: 120px 24px;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }
        
        .eng-hero::before {
          content: '';
          position: absolute;
          top: -150px;
          right: -150px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .eng-inner {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        
        .eng-header {
          text-align: center;
          margin-bottom: 100px;
        }
        
        .eng-eyebrow {
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
        
        .eng-eyebrow::before, .eng-eyebrow::after {
          content: '';
          width: 32px;
          height: 1.5px;
          background: linear-gradient(90deg, rgba(201, 168, 76, 0.4), rgba(201, 168, 76, 0.1));
        }
        
        .eng-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 6vw, 72px);
          font-weight: 800;
          color: #f2ede3;
          line-height: 1.08;
          letter-spacing: -0.025em;
          margin-bottom: 24px;
        }
        
        .eng-h1 em {
          font-style: italic;
          background: linear-gradient(130deg, #c9a84c, #f0d870);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .eng-sub {
          font-size: 16px;
          font-weight: 300;
          color: rgba(200, 215, 240, 0.5);
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.75;
        }
        
        .eng-paths {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 80px;
        }
        
        .eng-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(201, 168, 76, 0.15);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .eng-card.active {
          background: rgba(201, 168, 76, 0.06);
          border-color: rgba(201, 168, 76, 0.35);
          box-shadow: 0 16px 48px rgba(201, 168, 76, 0.15);
        }
        
        .eng-card-header {
          padding: 36px 40px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          transition: background 0.35s;
        }
        
        .eng-card:hover .eng-card-header {
          background: rgba(201, 168, 76, 0.04);
        }
        
        .eng-card-left {
          display: flex;
          align-items: center;
          gap: 24px;
          flex: 1;
        }
        
        .eng-icon-box {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          background: var(--eng-color);
          opacity: 0.15;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .eng-icon-box svg {
          color: var(--eng-color);
          width: 32px;
          height: 32px;
        }
        
        .eng-header-text h3 {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #f2ede3;
          margin-bottom: 8px;
          line-height: 1.2;
        }
        
        .eng-header-text p {
          font-size: 14px;
          font-weight: 300;
          color: rgba(200, 215, 240, 0.6);
          line-height: 1.6;
        }
        
        .eng-chevron {
          width: 24px;
          height: 24px;
          color: var(--eng-color);
          transition: transform 0.35s;
          flex-shrink: 0;
        }
        
        .eng-card.active .eng-chevron {
          transform: rotate(180deg);
        }
        
        .eng-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .eng-card.active .eng-content {
          max-height: 600px;
        }
        
        .eng-content-inner {
          padding: 0 40px 40px;
          border-top: 1px solid rgba(201, 168, 76, 0.15);
        }
        
        .eng-highlight {
          padding: 20px 24px;
          margin-bottom: 28px;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.08), rgba(201, 168, 76, 0.03));
          border-left: 3px solid var(--eng-color);
          border-radius: 6px;
          font-size: 14px;
          font-weight: 300;
          color: rgba(200, 215, 240, 0.7);
          line-height: 1.7;
          font-style: italic;
        }
        
        .eng-benefits {
          margin-bottom: 28px;
        }
        
        .eng-benefits-title {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(201, 168, 76, 0.8);
          margin-bottom: 16px;
        }
        
        .eng-benefits-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        
        .eng-benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: rgba(200, 215, 240, 0.65);
          line-height: 1.5;
        }
        
        .eng-benefit-item svg {
          width: 16px;
          height: 16px;
          color: var(--eng-color);
          flex-shrink: 0;
          margin-top: 3px;
        }
        
        .eng-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 28px;
          background: var(--eng-color);
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
        }
        
        .eng-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(201, 168, 76, 0.3);
        }
        
        .eng-why {
          margin-top: 100px;
          padding: 60px 40px;
          background: rgba(201, 168, 76, 0.05);
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 12px;
          text-align: center;
        }
        
        .eng-why-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          color: #f2ede3;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        
        .eng-why-text 
        
        
        
        @media (max-width: 820px) {
          .eng-card-header { padding: 24px 20px; }
          .eng-card-left { gap: 16px; }
          .eng-icon-box { width: 52px; height: 52px; }
          .eng-content-inner { padding: 0 20px 20px; }
          .eng-benefits-list { grid-template-columns: 1fr; }
          .eng-why { padding: 40px 20px; }
        }
      `}</style>

      <section className="eng-hero">
        <div className="eng-inner">
          <motion.div
            className="eng-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="eng-eyebrow">Engagement Opportunities</div>
            <h1 className="eng-h1">
              Ways to <em>Get Involved</em>
            </h1>
            <p className="eng-sub">
              Join the PSG Tech Alumni Foundation community and make a
              meaningful impact on education, innovation, and student
              development through various engagement pathways.
            </p>
          </motion.div>

          <motion.div
            className="eng-paths"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {engagementPaths.map((path, idx) => {
              const Icon = path.icon;
              return (
                <motion.div
                  key={path.id}
                  className={`eng-card ${expandedId === path.id ? "active" : ""}`}
                  style={{ "--eng-color": path.color }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="eng-card-header"
                    onClick={() =>
                      setExpandedId(expandedId === path.id ? null : path.id)
                    }
                  >
                    <div className="eng-card-left">
                      <div className="eng-icon-box">
                        <Icon />
                      </div>
                      <div className="eng-header-text">
                        <h3>{path.title}</h3>
                        <p>{path.description}</p>
                      </div>
                    </div>
                    <svg
                      className="eng-chevron"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>

                  <div className="eng-content">
                    <div className="eng-content-inner">
                      <div className="eng-highlight">{path.highlight}</div>

                      <div className="eng-benefits">
                        <div className="eng-benefits-title">
                          Key Benefits & Opportunities
                        </div>
                        <div className="eng-benefits-list">
                          {path.benefits.map((benefit, i) => (
                            <motion.div
                              key={i}
                              className="eng-benefit-item"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <CheckCircle />
                              {benefit}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <button className="eng-cta">
                        {path.cta}
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="eng-why"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="eng-why-title text-blue-100 ">Why Engage With Us?</h2>
            <p className="eng-why-text text-amber-100">
              The PSG Tech Alumni Foundation welcomes experienced professionals,
              academicians, entrepreneurs, and industry experts to collaborate
              in advancing education, research, innovation, and community
              development. Together, we create sustainable impact and strengthen
              the PSG learning ecosystem for future generations.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default EnagementPage;
