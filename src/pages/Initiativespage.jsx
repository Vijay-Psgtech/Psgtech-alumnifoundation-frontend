import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Microscope, Award, Users, Globe } from "lucide-react";

const initiativeSections = [
  {
    id: 1,
    title: "Academic & Research Excellence",
    icon: Microscope,
    color: "#c9a84c",
    description: "Strengthening the academic and research ecosystem of PSG institutions through strategic collaborations.",
    items: [
      "Centres of Excellence",
      "Research Infrastructure Development",
      "Academic Chairs and Fellowships",
      "Innovation and R&D Initiatives",
      "Industry-Academia Collaboration",
      "International Knowledge Exchange Programs"
    ]
  },
  {
    id: 2,
    title: "Scholarships & Financial Support",
    icon: Award,
    color: "#7eb8f7",
    description: "Empowering deserving students from economically challenged backgrounds with educational opportunities.",
    items: [
      "Merit-based scholarships",
      "Need-based financial aid",
      "Educational assistance programs",
      "Access to quality education",
      "Academic resources provision",   
      "Developmental opportunities"
    ]
  },
  {
    id: 3,
    title: "Capacity Building",
    icon: Users,
    color: "#7edfa0",
    description: "Enhancing academic, technical, and professional capabilities of students and faculty.",
    items: [
      "Workshops and Seminars",
      "Faculty Development Programs",
      "Industrial Visits",
      "Technical Training Sessions",
      "Mentorship Programs",
      "Leadership Development"
    ]
  },
    
];

const InitiativesPage = () => {
  const [expandedId, setExpandedId] = useState(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        .init-hero{background:linear-gradient(165deg,#f8f5ee 0%,#fdfcf9 45%,#f2f4fa 100%);padding:100px 24px;font-family:'Outfit',sans-serif;position:relative;overflow:hidden;}
        .init-hero::before{content:'';position:absolute;top:-150px;right:-150px;width:450px;height:450px;background:radial-gradient(circle,rgba(201,168,76,.06) 0%,transparent 68%);pointer-events:none;}
        .init-inner{max-width:1240px;margin:0 auto;}
        .init-header{text-align:center;margin-bottom:80px;position:relative;z-index:2;}
        .init-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#a87630;margin-bottom:24px;}
        .init-eyebrow::before,.init-eyebrow::after{content:'';width:28px;height:1.5px;background:linear-gradient(90deg,#b8882a,#e8c560);}
        .init-h1{font-family:'Playfair Display',serif;font-size:clamp(44px,6vw,72px);font-weight:800;color:#0c0e1a;letter-spacing:-.025em;margin-bottom:20px;line-height:1.05;}
        .init-h1 em{font-style:italic;background:linear-gradient(130deg,#a87630,#e0bc55);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .init-sub{font-size:16px;font-weight:300;color:#535e78;max-width:600px;margin:0 auto;line-height:1.72;}
        .init-grid{display:grid;grid-template-columns:1fr;gap:20px;}
        .init-item{position:relative;border-radius:8px;overflow:hidden;background:white;border:1px solid rgba(0,0,0,.065);transition:all .35s cubic-bezier(.4,0,.2,1);}
        .init-item.active{box-shadow:0 20px 60px rgba(0,0,0,.15);border-color:transparent;}
        .init-item.active .init-item-header{background:linear-gradient(135deg,rgba(201,168,76,.08),rgba(201,168,76,.04));}
        .init-item-header{padding:28px 32px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:24px;transition:background .35s;position:relative;z-index:2;}
        .init-item:hover .init-item-header{background:linear-gradient(135deg,rgba(201,168,76,.06),rgba(201,168,76,.02));}
        .init-item-head-left{display:flex;align-items:center;gap:16px;flex:1;}
        .init-icon-box{width:52px;height:52px;border-radius:10px;background:var(--icolor);opacity:.12;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .init-icon-box svg{color:var(--icolor);width:24px;height:24px;}
        .init-head-text h3{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#0c0e1a;margin-bottom:4px;line-height:1.2;}
        .init-head-text p{font-size:13px;font-weight:300;color:#8b94aa;line-height:1.5;}
        .init-chevron{width:20px;height:20px;color:#c9a84c;transition:transform .35s;flex-shrink:0;}
        .init-item.active .init-chevron{transform:rotate(180deg);}
        .init-content{max-height:0;overflow:hidden;transition:max-height .35s cubic-bezier(.4,0,.2,1);}
        .init-item.active .init-content{max-height:400px;}
        .init-content-inner{padding:0 32px 28px;border-top:1px solid rgba(201,168,76,.15);}
        .init-content-text{font-size:14px;font-weight:300;color:#535e78;line-height:1.8;margin-bottom:20px;}
        .init-items-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;}
        .init-list-item{padding:12px 16px;background:linear-gradient(135deg,rgba(201,168,76,.05),rgba(201,168,76,.02));border:1px solid rgba(201,168,76,.15);border-radius:6px;font-size:13px;font-weight:500;color:#0c0e1a;display:flex;align-items:center;gap:8px;}
        .init-list-item::before{content:'✓';color:#c9a84c;font-weight:700;width:16px;flex-shrink:0;}
        .init-museum{margin-top:80px;padding:60px 40px;background:#080b18;border-radius:12px;position:relative;overflow:hidden;}
        .init-museum::before{content:'';position:absolute;top:-100px;right:-100px;width:400px;height:400px;background:radial-gradient(circle,rgba(201,168,76,.05) 0%,transparent 68%);pointer-events:none;}
        .init-museum-content{position:relative;z-index:2;color:#f2ede3;}
        .init-museum-title{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,44px);font-weight:700;color:#f2ede3;margin-bottom:20px;line-height:1.2;}
        .init-museum-text{font-size:15px;font-weight:300;line-height:1.8;color:rgba(200,215,240,.72);margin-bottom:24px;}
        .init-museum-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-top:28px;}
        .init-museum-card{padding:20px;background:rgba(201,168,76,.08);border:1px solid rgba(201,168,76,.2);border-radius:8px;}
        .init-museum-card strong{color:#c9a84c;display:block;margin-bottom:4px;}
        .init-museum-card p{font-size:13px;color:rgba(200,215,240,.6);}
        @media(max-width:820px){.init-item-header{padding:20px 16px;}.init-content-inner{padding:0 16px 20px;}.init-museum{padding:40px 24px;}}
      `}</style>

      {/* Hero Section */}
      <section className="init-hero">
        <div className="init-inner">
          <motion.div className="init-header" initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
            <div className="init-eyebrow">Initiatives</div>
            <h1 className="init-h1">Our Strategic <em>Programs</em></h1>
            <p className="init-sub">
              Through transformative initiatives, we create academic and societal impact by strengthening education, innovation, research, and student development.
            </p>
          </motion.div>

          {/* Initiatives List */}
          <motion.div className="init-grid" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.9,delay:.2}}>
            {initiativeSections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  className={`init-item ${expandedId === section.id ? 'active' : ''}`}
                  style={{'--icolor': section.color}}
                  initial={{opacity:0,y:20}}
                  whileInView={{opacity:1,y:0}}
                  transition={{duration:.6,delay:idx*.08}}
                  viewport={{once:true}}
                >
                  <div className="init-item-header" onClick={()=>setExpandedId(expandedId===section.id?null:section.id)}>
                    <div className="init-item-head-left">
                      <div className="init-icon-box">
                        <Icon/>
                      </div>
                      <div className="init-head-text">
                        <h3>{section.title}</h3>
                        <p>{section.description}</p>
                      </div>
                    </div>
                    <ChevronDown className="init-chevron"/>
                  </div>

                  <AnimatePresence>
                    {expandedId === section.id && (
                      <motion.div
                        className="init-content"
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        exit={{opacity:0}}
                        transition={{duration:.3}}
                      >
                        <div className="init-content-inner">
                          <p className="init-content-text">{section.description}</p>
                          <div className="init-items-list">
                            {section.items.map((item,i)=>(
                              <motion.div key={i} className="init-list-item" initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*.05}}>
                                {item}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Museum Section */}
          <motion.div className="init-museum" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:.8}} viewport={{once:true}}>
            <div className="init-museum-content">
              <h2 className="init-museum-title">🏛️ PSG GRD Museum of Science & Technology</h2>
              <p className="init-museum-text">
                A landmark initiative jointly established by PSG & Sons' Charities and the PSG Tech Alumni Foundation. Dedicated to the memory of Dr. G.R. Damodaran, the visionary architect of PSG institutions, the museum promotes scientific curiosity, experiential learning, and public engagement through immersive exhibits and technology-driven educational experiences.
              </p>
              <p className="init-museum-text">
                Spread across over 30,000 square feet with exhibits in Science & Technology, the museum serves as a vibrant learning destination for students, educators, researchers, and visitors of all age groups.
              </p>
              <div className="init-museum-grid">
                <div className="init-museum-card">
                  <strong>30,000+ sq ft</strong>
                  <p>State-of-the-art facility</p>
                </div>
                <div className="init-museum-card">
                  <strong>Interactive Exhibits</strong>
                  <p>Science & Technology focus</p>
                </div>
                <div className="init-museum-card">
                  <strong>Public Engagement</strong>
                  <p>All age groups welcome</p>
                </div>
                <div className="init-museum-card">
                  <strong>Learning Destination</strong>
                  <p>Students & researchers</p>
                </div>
              </div>
              <p style={{marginTop:'24px',fontSize:'13px',color:'rgba(200,215,240,.5)'}}>
                For more information, visit <strong style={{color:'#c9a84c'}}>https://thepsggrdmuseum.com/</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default InitiativesPage;