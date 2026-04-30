import React from "react";
import { motion } from "framer-motion";
import { Compass, Users, DollarSign, Briefcase, Building2 } from "lucide-react";

const pillars = [
  {
    Icon: Users,
    n: "01",
    title: "Foster Active Interest",
    desc: "Stimulate and foster active interest among alumni and friends to volunteer in support of PSG Tech.",
  },
  {
    Icon: DollarSign,
    n: "02",
    title: "Consistent Fund Flow",
    desc: "Create and maintain a consistent flow of funds to achieve the Vision and support institutional growth.",
  },
  {
    Icon: Briefcase,
    n: "03",
    title: "Secure & Manage Funds",
    desc: "Secure, manage, and disburse private funds strategically to meet organizational objectives.",
  },
];
const projects = [
  {
    Icon: Users,
    title: "Scholarship Augmentation",
    desc: "Enhance and expand scholarship programs to support deserving students in pursuing excellence.",
    emoji: "🎓",
  },
  {
    Icon: Building2,
    title: "GRD Science & Technology Museum",
    desc: "Establish a comprehensive Science and Technology Museum showcasing innovation.",
    emoji: "🏛️",
  },
  {
    Icon: Briefcase,
    title: "Research Centre",
    desc: "Set up a dedicated Research Centre to foster groundbreaking research and development initiatives.",
    emoji: "🔬",
  },
];

const Mission = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
      .miss-s{background:#080b18;padding:110px 24px;font-family:'Outfit',sans-serif;position:relative;overflow:hidden;}
      .miss-inner{max-width:1240px;margin:0 auto;position:relative;z-index:2;}
      .miss-header{text-align:center;margin-bottom:80px;}
      .miss-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(201,168,76,.68);margin-bottom:24px;}
      .miss-h2{font-family:'Playfair Display',serif;font-size:clamp(38px,5vw,66px);font-weight:800;color:#f2ede3;letter-spacing:-.025em;line-height:1.0;margin-bottom:16px;}
      .miss-h2 em{font-style:italic;background:linear-gradient(130deg,#c9a84c,#f0d870);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
      .miss-sub{font-size:15px;font-weight:300;color:rgba(200,215,240,.42);letter-spacing:.02em;}
      .miss-section-lbl{font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(201,168,76,.48);margin-bottom:28px;display:flex;align-items:center;gap:16px;}
      .miss-section-lbl::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(201,168,76,.28),transparent);}
      .pillars-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.1);border-radius:8px;overflow:hidden;margin-bottom:80px;}
      .pillar{background:rgba(255,255,255,.022);padding:40px 32px;transition:background .3s;}
      .pillar:hover{background:rgba(201,168,76,.048);}
      .pillar-n{font-family:'Playfair Display',serif;font-size:52px;font-weight:800;background:linear-gradient(135deg,rgba(201,168,76,.32),rgba(240,208,128,.18));-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;margin-bottom:22px;}
      .pillar-title{font-family:'Playfair Display',serif;font-size:21px;font-weight:700;color:#f2ede3;margin-bottom:12px;line-height:1.2;}
      .pillar-desc{font-size:14px;font-weight:300;line-height:1.72;color:rgba(200,215,240,.44);}
      .proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
      .proj-card{padding:36px 28px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.055);border-radius:12px;transition:all .38s ease;position:relative;overflow:hidden;}
      .proj-card::after{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.35),transparent);opacity:0;transition:opacity .35s;}
      .proj-card:hover{border-color:rgba(201,168,76,.24);transform:translateY(-4px);box-shadow:0 18px 52px rgba(0,0,0,.42);}
      .proj-card:hover::after{opacity:1;}
      .proj-emoji{font-size:38px;margin-bottom:20px;display:block;}
      .proj-title{font-family:'Playfair Display',serif;font-size:21px;font-weight:700;color:#f2ede3;margin-bottom:12px;line-height:1.2;}
      .proj-desc{font-size:14px;font-weight:300;line-height:1.72;color:rgba(200,215,240,.44);margin-bottom:24px;}
      .proj-link{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9a84c;display:flex;align-items:center;gap:8px;}
      .miss-cta{margin-top:72px;text-align:center;padding:60px;border:1px solid rgba(201,168,76,.17);border-radius:14px;background:rgba(201,168,76,.025);position:relative;}
      .miss-cta::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.5),transparent);}
      .miss-cta-h{font-family:'Playfair Display',serif;font-size:clamp(26px,3.5vw,40px);font-weight:700;color:#f2ede3;margin-bottom:14px;}
      .miss-cta-p{font-size:15px;font-weight:300;color:rgba(200,215,240,.48);max-width:450px;margin:0 auto 30px;line-height:1.72;}
      .miss-cta-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 36px;background:linear-gradient(135deg,#b8882a,#e8c255);color:#07080e;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:none;border-radius:7px;cursor:pointer;transition:all .35s ease;}
      .miss-cta-btn:hover{box-shadow:0 8px 30px rgba(201,168,76,.4);transform:translateY(-2px);}
      @media(max-width:820px){.pillars-grid{grid-template-columns:1fr;}.proj-grid{grid-template-columns:1fr;}.miss-cta{padding:36px 20px;}}
    `}</style>
    <section className="miss-s">
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -180,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(201,168,76,.05) 0%,transparent 68%)",
          pointerEvents: "none",
        }}
      />
      <div className="miss-inner">
        <motion.div
          className="miss-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="miss-eyebrow">Our Mission</div>
          <h2 className="miss-h2">
            How We Make an <em>Impact</em>
          </h2>
          <p className="miss-sub">
            The strategic pillars that drive our work forward
          </p>
        </motion.div>
        <div className="miss-section-lbl">The Trust Will</div>
        <motion.div
          className="pillars-grid"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {pillars.map(({ n, title, desc }) => (
            <div className="pillar" key={n}>
              <div className="pillar-n">{n}</div>
              <h4 className="pillar-title">{title}</h4>
              <p className="pillar-desc">{desc}</p>
            </div>
          ))}
        </motion.div>
        <div className="miss-section-lbl">Major Projects to Begin With</div>
        <div className="proj-grid">
          {projects.map(({ emoji, title, desc }, i) => (
            <motion.div
              key={title}
              className="proj-card"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="proj-emoji">{emoji}</span>
              <h4 className="proj-title">{title}</h4>
              <p className="proj-desc">{desc}</p>
              <div className="proj-link">Explore More →</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="miss-cta"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
        >
          <h3 className="miss-cta-h">Join Our Mission</h3>
          <p className="miss-cta-p">
            Be part of our collective effort to support PSG Tech's growth and
            excellence for the next generation.
          </p>
          <button
            className="miss-cta-btn"
            onClick={() => (window.location.href = "/donate")}
          >
            Get Involved Today{" "}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  </>
);
export default Mission;
