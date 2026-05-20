import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Users, Lightbulb, Building2, Globe, Microscope } from "lucide-react";
import usePageTitle from "../hooks/usePageTitle";

const objectives = [
  {
    Icon: Award,
    title: "Scholarships & Aid",
    desc: "Provide scholarships, financial aid, and educational assistance to deserving students from economically challenged backgrounds."
  },
  {
    Icon: BookOpen,
    title: "Higher Education",
    desc: "Support higher education, research, and academic development initiatives at PSG institutions."
  },
  {
    Icon: Microscope,
    title: "Research Excellence",
    desc: "Establish research chairs, fellowships, and centres of excellence for groundbreaking research."
  },
  {
    Icon: Users,
    title: "Knowledge Events",
    desc: "Facilitate conferences, seminars, workshops, and expert lectures for academic excellence."
  },
  {
    Icon: Lightbulb,
    title: "Innovation & Research",
    desc: "Promote innovation and interdisciplinary research across science, technology, engineering, management, and arts."
  },
  {
    Icon: Building2,
    title: "Infrastructure",
    desc: "Strengthen institutional infrastructure and academic capabilities to global standards."
  },
  {
    Icon: Globe,
    title: "Science Outreach",
    desc: "Encourage scientific learning and public engagement through museums, libraries, and exhibitions."
  },
];

const ObjectivesPage = () => {
  usePageTitle("Objectives");
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        .obj-hero{background:linear-gradient(165deg,#0a0e1f 0%,#0d1428 100%);padding:120px 24px 80px;font-family:'Outfit',sans-serif;position:relative;overflow:hidden;}
        .obj-hero::before{content:'';position:absolute;top:-100px;right:-100px;width:500px;height:500px;background:radial-gradient(circle,rgba(201,168,76,.08) 0%,transparent 68%);pointer-events:none;}
        .obj-inner{max-width:1240px;margin:0 auto;position:relative;z-index:2;}
        .obj-header{text-align:center;margin-bottom:80px;}
        .obj-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(201,168,76,.72);margin-bottom:26px;}
        .obj-eyebrow::before,.obj-eyebrow::after{content:'';width:28px;height:1.5px;background:rgba(201,168,76,.5);}
        .obj-h1{font-family:'Playfair Display',serif;font-size:clamp(44px,7vw,80px);font-weight:800;color:#f2ede3;line-height:1.0;margin-bottom:20px;letter-spacing:-.025em;}
        .obj-h1 em{font-style:italic;background:linear-gradient(130deg,#c9a84c,#f0d870);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .obj-sub{font-size:16px;font-weight:300;color:rgba(200,215,240,.52);max-width:600px;margin:0 auto;line-height:1.72;}
        .obj-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;}
        .obj-card{position:relative;padding:40px 32px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.055);border-radius:12px;transition:all .35s ease;overflow:hidden;}
        .obj-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#a86e20,#e8c255,#a86e20);opacity:0;transition:opacity .35s;}
        .obj-card:hover{border-color:rgba(201,168,76,.28);transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.4);}
        .obj-card:hover::before{opacity:1;}
        .obj-icon-wrap{width:56px;height:56px;border-radius:10px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.3);display:flex;align-items:center;justify-content:center;margin-bottom:20px;transition:all .3s;}
        .obj-card:hover .obj-icon-wrap{background:rgba(201,168,76,.2);border-color:rgba(201,168,76,.6);transform:scale(1.08) rotate(4deg);}
        .obj-icon{color:#c9a84c;}
        .obj-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#f2ede3;margin-bottom:12px;line-height:1.2;}
        .obj-desc{font-size:14px;font-weight:300;line-height:1.72;color:rgba(200,215,240,.56);}
        .obj-section{margin-top:100px;padding:60px 40px;background:rgba(201,168,76,.05);border:1px solid rgba(201,168,76,.15);border-radius:14px;position:relative;}
        .obj-section::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.5),transparent);}
        .obj-section-title{font-family:'Playfair Display',serif;font-size:32px;font-weight:700;color:#0c0e1a;margin-bottom:24px;line-height:1.2;}
        .obj-section-text{font-size:15px;font-weight:300;line-height:1.8;color:#535e78;}
        .obj-highlight{font-weight:600;color:#0c0e1a;}
        @media(max-width:820px){.obj-grid{grid-template-columns:1fr;}.obj-section{padding:40px 24px;}}
      `}</style>

      {/* Hero Section */}
      <section className="obj-hero">
        <div className="obj-inner">
          <motion.div className="obj-header" initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
            <div className="obj-eyebrow">Objectives</div>
            <h1 className="obj-h1">Our Commitment to <em>Excellence</em></h1>
            <p className="obj-sub">
              The PSG Tech Alumni Foundation is dedicated to advancing educational excellence through strategic initiatives and transformative programs that create lasting impact.
            </p>
          </motion.div>

          <motion.div className="obj-grid" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.9,delay:.2}}>
            {objectives.map(({Icon,title,desc},i)=>(
              <motion.div key={title} className="obj-card" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:.6,delay:i*.08}} viewport={{once:true}}>
                <div className="obj-icon-wrap">
                  <Icon size={28} className="obj-icon"/>
                </div>
                <h3 className="obj-title">{title}</h3>
                <p className="obj-desc">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="obj-section" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:.75}} viewport={{once:true}}>
            <h2 className="obj-section-title">Our Foundation Principles</h2>
            <p className="obj-section-text">
              The PSG Tech Alumni Foundation operates on the core principle that <span className="obj-highlight">no deserving student should be deprived of quality education due to financial limitations</span>. Through scholarships, capacity-building programs, and research initiatives, we empower the next generation of leaders and innovators. Our structured philanthropic approach ensures transparency, accountability, and sustainable impact across all educational and institutional development initiatives.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ObjectivesPage;