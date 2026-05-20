import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 200]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const contentY = useTransform(scrollY, [0, 450], [0, 60]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      a: Math.random() * 0.55 + 0.12,
      gold: Math.random() > 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(201,168,76,${p.a})` : `rgba(150,180,230,${p.a * 0.5})`;
        ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(201,168,76,${((130 - d) / 130) * 0.1})`;
          ctx.lineWidth = 0.6; ctx.stroke();
        }
      }));
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const words = ["Create", "Opportunity", "Together"];
  const wordVariant = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: (i) => ({
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { delay: 0.35 + i * 0.14, duration: 1, ease: [0.22, 1, 0.36, 1] }
    }),
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500&display=swap');

        .banner-root {
          position: relative; min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; background: #05060f;
        }
        .banner-bg {
          position: absolute; inset: -10%; will-change: transform;
          background-image: url('/image1.jpg');
          background-size: cover; background-position: center;
        }
        .banner-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(to bottom, rgba(4,5,14,0.6) 0%, rgba(4,5,14,0.32) 50%, rgba(4,5,14,0.78) 100%),
            radial-gradient(ellipse at 25% 35%, rgba(201,168,76,0.13) 0%, transparent 58%),
            radial-gradient(ellipse at 75% 65%, rgba(60,90,200,0.1) 0%, transparent 55%);
        }
        .banner-canvas { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
        .banner-grain {
          position: absolute; inset: 0; pointer-events: none; z-index: 2; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 128px;
        }
        .banner-content {
          position: relative; z-index: 10;
          text-align: center; padding: 0 24px; max-width: 860px; margin: 0 auto;
          padding-top: 80px;
        }
        .banner-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 7px 22px;
          border: 1px solid rgba(201,168,76,0.32);
          border-radius: 100px;
          background: rgba(201,168,76,0.06);
          backdrop-filter: blur(10px);
          margin-bottom: 44px;
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(201,168,76,0.88);
        }
        .eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%; background: #c9a84c;
          animation: eyebrow-pulse 2.2s ease-in-out infinite;
        }
        @keyframes eyebrow-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.65); }
        }
        .banner-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(54px, 9.5vw, 110px);
          font-weight: 800;
          line-height: 0.93;
          letter-spacing: -0.025em;
          margin-bottom: 36px;
          color: #fff;
        }
        .title-gold {
          background: linear-gradient(130deg, #c9a84c 0%, #f0d870 38%, #c9a84c 65%, #e8c560 100%);
          background-size: 220% 100%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: gold-shimmer 5s linear infinite;
          display: block;
        }
        @keyframes gold-shimmer {
          0% { background-position: 220% 0; }
          100% { background-position: -220% 0; }
        }
        .banner-sub {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(15px, 2.2vw, 20px); font-weight: 300;
          color: rgba(210,225,248,0.7);
          max-width: 520px; margin: 0 auto 52px;
          line-height: 1.75; letter-spacing: 0.02em;
        }
        .banner-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .banner-btn-gold {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 15px 36px;
          background: linear-gradient(135deg, #b8882a 0%, #e8c255 50%, #b8882a 100%);
          background-size: 220% 100%; background-position: right;
          border: none; border-radius: 7px;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; color: #07080e;
          cursor: pointer; text-decoration: none;
          transition: background-position 0.45s ease, box-shadow 0.3s, transform 0.2s;
        }
        .banner-btn-gold:hover {
          background-position: left;
          box-shadow: 0 8px 36px rgba(201,168,76,0.42);
          transform: translateY(-2px);
        }
        .banner-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 34px;
          background: transparent;
          border: 1px solid rgba(200,220,248,0.22);
          border-radius: 7px;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 400;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(200,220,248,0.78); cursor: pointer; text-decoration: none;
          transition: all 0.3s ease;
        }
        .banner-btn-ghost:hover {
          border-color: rgba(201,168,76,0.45); color: #e8c560;
          background: rgba(201,168,76,0.05);
        }
        .banner-stats {
          display: flex; justify-content: center;
          margin-top: 72px;
          border-top: 1px solid rgba(201,168,76,0.14);
          padding-top: 40px;
          gap: 0;
        }
        .banner-stat {
          padding: 0 44px; text-align: center;
          border-right: 1px solid rgba(201,168,76,0.1);
        }
        .banner-stat:last-child { border-right: none; }
        .stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 38px; font-weight: 700; line-height: 1;
          background: linear-gradient(135deg, #c9a84c, #f0d870);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-bottom: 7px; display: block;
        }
        .stat-lbl {
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(200,215,240,0.38);
        }
        .scroll-cue {
          position: absolute; bottom: 34px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 10;
          pointer-events: none;
        }
        .scroll-text {
          font-family: 'Outfit', sans-serif; font-size: 9px; font-weight: 500;
          letter-spacing: 0.28em; text-transform: uppercase; color: rgba(201,168,76,0.42);
        }
        .scroll-line {
          width: 1px; height: 52px;
          background: linear-gradient(to bottom, rgba(201,168,76,0.65), transparent);
          animation: scroll-drop 2.2s ease-in-out infinite;
        }
        @keyframes scroll-drop {
          0% { opacity:0; transform:scaleY(0); transform-origin:top; }
          45% { opacity:1; transform:scaleY(1); transform-origin:top; }
          100% { opacity:0; transform:scaleY(1); transform-origin:bottom; }
        }
        @media(max-width:600px){
          .banner-stats { flex-wrap:wrap; gap:20px; }
          .banner-stat { border-right:none; padding:0 20px; }
        }
      `}</style>

      <div className="banner-root" ref={containerRef}>
        <motion.div className="banner-bg" style={{ y: bgY }} />
        <div className="banner-overlay" />
        <canvas ref={canvasRef} className="banner-canvas" />
        <div className="banner-grain" />

        <motion.div className="banner-content" style={{ opacity: contentOpacity, y: contentY }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }}>
            <div className="banner-eyebrow">
              <span className="eyebrow-dot" />
              PSG Tech Alumni Foundation · Est. 2016
            </div>
          </motion.div>

          <div className="banner-title">
            {words.map((w, i) => (
              <motion.span key={w} custom={i} variants={wordVariant} initial="hidden" animate="visible"
                className={i === 1 ? "title-gold" : ""} style={{ display: "block" }}>
                {w}
              </motion.span>
            ))}
          </div>

          <motion.p className="banner-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.95 }}>
            Join us in building a stronger PSG Tech Alumni Network — connecting talent, fostering legacy, and shaping tomorrow's leaders.
          </motion.p>

          <motion.div className="banner-actions" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.12 }}>
            <Link to="/donate" className="banner-btn-gold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              Donate Now
            </Link>
            <Link to="/alumni/register" className="banner-btn-ghost">Join the Network</Link>
          </motion.div>

          <motion.div className="banner-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, delay: 1.4 }}>
            {[{val:"5K+",lbl:"Alumni Worldwide"},{val:"2016",lbl:"Established"},{val:"50+",lbl:"Global Chapters"},{val:"₹Cr+",lbl:"Funds Raised"}].map(s => (
              <div className="banner-stat" key={s.lbl}>
                <span className="stat-val">{s.val}</span>
                <span className="stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="scroll-cue">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </>
  );
};

export default Banner;
