import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const About = () => {
  const fade = (d=0) => ({
    hidden:{opacity:0,y:36,filter:"blur(4px)"},
    visible:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:0.85,delay:d,ease:[0.22,1,0.36,1]}}
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        .about-s{background:linear-gradient(165deg,#f8f5ee 0%,#fdfcf9 45%,#f2f4fa 100%);padding:110px 24px;position:relative;overflow:hidden;font-family:'Outfit',sans-serif;}
        .about-s::before{content:'';position:absolute;top:-180px;right:-180px;width:500px;height:500px;background:radial-gradient(circle,rgba(201,168,76,.07) 0%,transparent 68%);pointer-events:none;}
        .about-s::after{content:'';position:absolute;bottom:-120px;left:-120px;width:400px;height:400px;background:radial-gradient(circle,rgba(80,110,220,.04) 0%,transparent 65%);pointer-events:none;}
        .about-inner{max-width:1240px;margin:0 auto;}
        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
        .section-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#a87630;margin-bottom:22px;}
        .section-eyebrow::before{content:'';width:28px;height:1.5px;background:linear-gradient(90deg,#b8882a,#e8c560);}
        .about-h2{font-family:'Playfair Display',serif;font-size:clamp(36px,4.5vw,58px);font-weight:800;color:#0c0e1a;line-height:1.03;margin-bottom:30px;letter-spacing:-.025em;}
        .about-h2 em{font-style:italic;background:linear-gradient(130deg,#a87630,#e0bc55);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .about-p{font-size:16px;font-weight:300;line-height:1.88;color:#464e66;margin-bottom:20px;}
        .about-hl{font-weight:600;color:#0c0e1a;}
        .about-quote-wrap{margin:28px 0;padding:20px 0 20px 24px;border-left:2.5px solid #c9a84c;}
        .about-quote{font-family:'Playfair Display',serif;font-size:19px;font-style:italic;color:#6b5920;line-height:1.5;}
        .about-cta{display:inline-flex;align-items:center;gap:10px;margin-top:36px;padding:13px 30px;background:#0c0e1a;color:#e8c560;font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;border-radius:7px;text-decoration:none;border:1px solid rgba(201,168,76,.25);transition:all .35s ease;}
        .about-cta:hover{background:linear-gradient(135deg,#b8882a,#e0bc55);color:#07080e;border-color:transparent;transform:translateY(-2px);box-shadow:0 10px 32px rgba(201,168,76,.3);}
        .img-wrap{position:relative;}
        .img-frame{position:relative;border-radius:3px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.15);}
        .img-frame img{display:block;width:100%;height:480px;object-fit:cover;filter:saturate(.88) contrast(1.06);transition:transform .7s ease,filter .5s ease;}
        .img-frame:hover img{transform:scale(1.05);filter:saturate(1) contrast(1.06);}
        .corner{position:absolute;width:56px;height:56px;border-color:#c9a84c;border-style:solid;}
        .c-tl{top:-10px;left:-10px;border-width:2px 0 0 2px;}
        .c-br{bottom:-10px;right:-10px;border-width:0 2px 2px 0;}
        .img-badge{position:absolute;bottom:-22px;left:28px;background:#0c0e1a;border:1px solid rgba(201,168,76,.28);border-radius:10px;padding:14px 22px;z-index:5;}
        .badge-yr{font-family:'Playfair Display',serif;font-size:34px;font-weight:700;background:linear-gradient(135deg,#c9a84c,#f0d870);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;}
        .badge-txt{font-size:9.5px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:rgba(200,215,240,.42);margin-top:3px;}
        @media(max-width:820px){.about-grid{grid-template-columns:1fr;gap:56px;}.img-frame img{height:300px;}.img-badge{left:16px;}}
      `}</style>
      <section className="about-s">
        <div className="about-inner">
          <div className="about-grid">
            <motion.div className="img-wrap" variants={fade(0)} initial="hidden" whileInView="visible" viewport={{once:true,margin:"-80px"}}>
              <div className="img-frame">
                <img src="/about.webp" alt="PSG Tech Alumni Foundation"/>
              </div>
              <div className="corner c-tl"/><div className="corner c-br"/>
              <div className="img-badge">
                <div className="badge-yr">2016</div>
                <div className="badge-txt">Year Founded</div>
              </div>
            </motion.div>
            <div>
              <motion.div variants={fade(.12)} initial="hidden" whileInView="visible" viewport={{once:true}}>
                <div className="section-eyebrow">About Us</div>
              </motion.div>
              <motion.h2 className="about-h2" variants={fade(.22)} initial="hidden" whileInView="visible" viewport={{once:true}}>
                PSG Tech Alumni <em>Foundation</em>
              </motion.h2>
              <motion.p className="about-p" variants={fade(.32)} initial="hidden" whileInView="visible" viewport={{once:true}}>
                The PSG TECH Alumni Foundation, a long-felt need for a financial arm of PSG Tech Alumni Association, was registered on <span className="about-hl">19th October 2016</span> as a not-for-profit Trust under the Indian Trust Act 1882 in Tamil Nadu.
              </motion.p>
              <motion.p className="about-p" variants={fade(.4)} initial="hidden" whileInView="visible" viewport={{once:true}}>
                The Foundation is a dedicated organization for alumni, corporates, and well-wishers to collaborate and contribute towards the progress of PSG College of Technology & Polytechnic College. With transparency, accountability, and institutional development at its core, the Foundation actively supports initiatives that strengthen education, research, innovation, and scientific learning within the PSG ecosystem.
              </motion.p>
              <motion.p className="about-p" variants={fade(.48)} initial="hidden" whileInView="visible" viewport={{once:true}}>
                The Foundation is governed by a Board of Trustees comprising distinguished alumni and institutional leaders who drive our mission forward with excellence and dedication.
              </motion.p>
              <motion.div className="about-quote-wrap" variants={fade(.56)} initial="hidden" whileInView="visible" viewport={{once:true}}>
                <div className="about-quote">"Come Curious. Leave Connected."</div>
              </motion.div>
              <motion.div variants={fade(.64)} initial="hidden" whileInView="visible" viewport={{once:true}}>
                <a href="/about" className="about-cta">
                  Learn More <ArrowRight size={15}/>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default About;