import React from "react";
import { motion } from "framer-motion";

const Footer = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Outfit:wght@300;400;500&display=swap');
      .foot-root{background:#04050e;border-top:1px solid rgba(201,168,76,.1);padding:64px 24px 32px;font-family:'Outfit',sans-serif;position:relative;}
      .foot-root::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.42),transparent);}
      .foot-inner{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1.7fr 1fr 1fr;gap:48px;padding-bottom:44px;border-bottom:1px solid rgba(255,255,255,.04);margin-bottom:30px;}
      .foot-brand-name{font-family:'Playfair Display',serif;font-size:21px;font-weight:700;background:linear-gradient(135deg,#c9a84c,#f0d870);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:12px;}
      .foot-brand-desc{font-size:13px;font-weight:300;line-height:1.78;color:rgba(200,215,240,.36);max-width:275px;margin-bottom:24px;}
      .foot-socials{display:flex;gap:10px;}
      .foot-social{width:34px;height:34px;border-radius:50%;border:1px solid rgba(201,168,76,.17);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:rgba(201,168,76,.42);cursor:pointer;transition:all .22s ease;}
      .foot-social:hover{border-color:rgba(201,168,76,.52);color:#f0d870;transform:translateY(-2px);}
      .foot-col-title{font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(201,168,76,.52);margin-bottom:18px;}
      .foot-link{display:block;font-size:13px;font-weight:300;color:rgba(200,215,240,.38);text-decoration:none;margin-bottom:10px;transition:color .2s ease;}
      .foot-link:hover{color:#f0d870;}
      .foot-bottom{max-width:1240px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;}
      .foot-copy{font-size:12px;font-weight:300;color:rgba(200,215,240,.26);}
      .foot-dev{font-size:11px;color:rgba(200,215,240,.2);}
      .foot-dev span{color:rgba(201,168,76,.42);}
      @media(max-width:768px){.foot-inner{grid-template-columns:1fr;gap:30px;}.foot-bottom{flex-direction:column;text-align:center;}}
    `}</style>
    <motion.footer
      className="foot-root"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="foot-inner">
        <div>
          <div className="foot-brand-name">PSG Tech Alumni Association</div>
          <p className="foot-brand-desc">
            A not-for-profit Trust registered under Tamil Nadu law, dedicated to
            strengthening PSG Tech's legacy for future generations.
          </p>
          <div className="foot-socials">
            {["FB", "LI", "TW"].map((s) => (
              <div className="foot-social" key={s}>
                {s}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="foot-col-title">Quick Links</div>
          {[
            ["Home", "/"],
            [" About", "/about"],
            ["Objectives", "/objectives"],
            ["Donate", "/donate"],
            ["Contact", "/contact"],
          ].map(([l, p]) => (
            <a key={l} href={p} className="foot-link">
              {l}
            </a>
          ))}
        </div>
        <div>
          <div className="foot-col-title">Contact</div>
          <a href="mailto:alumni@psgtech.ac.in" className="foot-link">
            alumni@psgtech.ac.in
          </a>
          <span className="foot-link" style={{ cursor: "default" }}>
            0422 2572177 (Ext: 4474)
          </span>
          <div style={{ marginTop: 20 }}>
            <div className="foot-col-title">Registered</div>
            <span className="foot-link" style={{ cursor: "default" }}>
              19 October 2016
            </span>
            <span className="foot-link" style={{ cursor: "default" }}>
              Tamil Nadu, India
            </span>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <div className="foot-copy">
          © {new Date().getFullYear()} PSG Tech Alumni Association. All Rights
          Reserved.
        </div>
        <div className="foot-dev">
          Developed by <span>Central IT Services Team</span>
        </div>
      </div>
    </motion.footer>
  </>
);
export default Footer;
