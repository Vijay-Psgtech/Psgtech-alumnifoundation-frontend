import React from "react";
import { motion } from "framer-motion";
import { Heart, Zap, Leaf } from "lucide-react";

const vals = [
  {
    Icon: Heart,
    title: "Integrity",
    desc: "We conduct ourselves with honesty, transparency, and ethical principles in all our endeavors — building trust across generations.",
    accent: "#c9a84c",
    bg: "rgba(201,168,76,.05)",
  },
  {
    Icon: Zap,
    title: "Support & Commitment",
    desc: "We make every effort to garner support for the benefit of PSG Tech and its stakeholders, standing firm in our commitments.",
    accent: "#7eb8f7",
    bg: "rgba(126,184,247,.05)",
  },
  {
    Icon: Leaf,
    title: "Passion & Growth",
    desc: "We work passionately for the sustainable development and continuous growth of PSG Tech, inspiring alumni to contribute meaningfully.",
    accent: "#7edfa0",
    bg: "rgba(126,223,160,.05)",
  },
];

const Values = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
      .vals-s{background:linear-gradient(175deg,#f8f5ee 0%,#fdfcf9 55%);padding:110px 24px;font-family:'Outfit',sans-serif;position:relative;overflow:hidden;}
      .vals-inner{max-width:1240px;margin:0 auto;}
      .vals-header{text-align:center;margin-bottom:72px;}
      .vals-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#a87630;margin-bottom:20px;}
      .vals-eyebrow::before,.vals-eyebrow::after{content:'';width:28px;height:1.5px;background:linear-gradient(90deg,#b8882a,#e8c560);}
      .vals-h2{font-family:'Playfair Display',serif;font-size:clamp(36px,4.5vw,58px);font-weight:800;color:#0c0e1a;letter-spacing:-.025em;line-height:1.05;}
      .vals-h2 em{font-style:italic;background:linear-gradient(130deg,#a87630,#e0bc55);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
      .vals-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;}
      .val-card{position:relative;padding:44px 36px;background:#fff;border:1px solid rgba(0,0,0,.065);border-radius:4px;overflow:hidden;transition:all .4s cubic-bezier(.4,0,.2,1);cursor:default;}
      .val-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2.5px;background:var(--vacc);transform:scaleX(0);transform-origin:left;transition:transform .4s ease;}
      .val-card:hover{transform:translateY(-7px);box-shadow:0 22px 64px rgba(0,0,0,.1);border-color:transparent;}
      .val-card:hover::before{transform:scaleX(1);}
      .val-icon-wrap{width:52px;height:52px;border-radius:12px;background:var(--vbg);border:1px solid var(--vacc);display:flex;align-items:center;justify-content:center;margin-bottom:28px;transition:transform .3s,box-shadow .3s;}
      .val-card:hover .val-icon-wrap{transform:scale(1.1) rotate(4deg);box-shadow:0 8px 24px rgba(0,0,0,.1);}
      .val-title{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#0c0e1a;margin-bottom:14px;line-height:1.15;}
      .val-desc{font-size:15px;font-weight:300;line-height:1.78;color:#535e78;}
      .val-num{position:absolute;bottom:22px;right:22px;font-family:'Playfair Display',serif;font-size:80px;font-weight:800;color:rgba(0,0,0,.028);line-height:1;pointer-events:none;user-select:none;}
      .vals-footer{margin-top:52px;padding:44px 52px;border:1px solid rgba(201,168,76,.2);border-radius:12px;background:linear-gradient(135deg,rgba(201,168,76,.04),rgba(201,168,76,.02));text-align:center;position:relative;}
      .vals-footer::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.5),transparent);}
      .vals-footer-text{font-family:'Playfair Display',serif;font-size:clamp(16px,2vw,20px);font-style:italic;color:#6b5920;line-height:1.6;}
      @media(max-width:820px){.vals-grid{grid-template-columns:1fr;}}
    `}</style>
    <section className="vals-s">
      <div className="vals-inner">
        <motion.div
          className="vals-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="vals-eyebrow">Our Values</div>
          <h2 className="vals-h2">
            The Principles That <em>Guide Us</em>
          </h2>
        </motion.div>
        <div className="vals-grid">
          {vals.map(({ Icon, title, desc, accent, bg }, i) => (
            <motion.div
              key={title}
              className="val-card"
              style={{ "--vacc": accent, "--vbg": bg }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: i * 0.11 }}
              viewport={{ once: true }}
            >
              <div className="val-icon-wrap">
                <Icon size={24} style={{ color: accent }} />
              </div>
              <h3 className="val-title">{title}</h3>
              <p className="val-desc">{desc}</p>
              <div className="val-num">0{i + 1}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="vals-footer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="vals-footer-text">
            "These core values form the foundation of everything we do —
            ensuring that our <strong>actions align with our mission</strong> to
            support PSG Tech's excellence and development."
          </p>
        </motion.div>
      </div>
    </section>
  </>
);
export default Values;
