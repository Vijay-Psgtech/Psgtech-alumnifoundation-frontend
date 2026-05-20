import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Download, Paperclip, PaperclipIcon } from "lucide-react";
import AboutImg from "../assets/Images/3c2b2ea4eae14b04a4c38c9e00ae71b9.png";
import usePageTitle from "../hooks/usePageTitle";


const timelineData = [
  { title: "Heritage of Excellence", sub: "Since foundation", side: "left" },
  { title: "Global Chapters", sub: "Global network expansion", side: "right" },
  { title: "Foundation Registered", sub: "19th October 2016", side: "left" },
  { title: "First Scholarships", sub: "Recipients awarded", side: "right" },
  { title: "GRD Museum Initiative", sub: "Major projects launched", side: "left" },
];
const trustees = [
  { name: "Dr. S. Senior", role: "Managing Trustee" },
  { name: "Prof. A. Principal", role: "Principal (Ex-officio)" },
  { name: "Mr. P. President", role: "President, Alumni Association (Ex-official)" }, 
];
const initiatives = [
  "Alumni Day & Young Alumni Meet", "Entrepreneurship & Innovation Programs",
  "Technical Conferences & Workshops", "Alumni Innovation Exhibitions",
  "Underprivileged Student Scholarships", "GRD Inter-Collegiate Tamil Debate", "Academic Excellence Awards",
];

function TCard({ name, role }) {
  const ini = name.split(" ").map(n => n[0]).slice(0, 2).join("");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: "1px solid rgba(201,168,76,.1)" }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#b8882a,#e0bc55)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 14, color: "#08090f", flexShrink: 0 }}>{ini}</div>
      <div>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 13, color: "#f2ede3" }}>{name}</div>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 300, fontSize: 11, color: "rgba(200,215,240,.42)", marginTop: 2 }}>{role}</div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const fade = (d = 0, x = 0) => ({ hidden: { opacity: 0, y: x ? 0 : 28, x }, visible: { opacity: 1, y: 0, x: 0, transition: { duration: .85, delay: d, ease: [0.22, 1, 0.36, 1] } } });
  usePageTitle("About Us");
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,500;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
        .ap { background: linear-gradient(165deg,#f8f5ee 0%,#fdfcf9 50%,#f2f4fb 100%); min-height: 100vh; font-family: "Outfit",sans-serif; padding-top: 90px; }
        .ap-inner { max-width: 1280px; margin: 0 auto; padding: 0 28px; }
        .ap-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; padding: 72px 0 80px; }
        .ap-ey { display: inline-flex; align-items: center; gap: 10px; font-size: 10px; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; color: #a87630; margin-bottom: 22px; }
        .ap-ey::before { content: ""; width: 24px; height: 1.5px; background: linear-gradient(90deg,#b8882a,#e8c560); }
        .ap-h1 { font-family: "Playfair Display",serif; font-size: clamp(36px,4.5vw,58px); font-weight: 800; color: #0c0e1a; line-height: 1.04; letter-spacing: -.025em; margin-bottom: 22px; }
        .ap-h1 em { font-style: italic; background: linear-gradient(130deg,#a87630,#e0bc55); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .ap-lead { font-size: 17px; font-weight: 300; line-height: 1.82; color: #505868; margin-bottom: 32px; }
        .ap-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-g { display: inline-flex; align-items: center; gap: 9px; padding: 13px 28px; background: #0c0e1a; color: #e8c560; font-family: "Outfit",sans-serif; font-size: 12px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; border-radius: 7px; text-decoration: none; border: 1px solid rgba(201,168,76,.24); transition: all .32s ease; }
        .btn-g:hover { background: linear-gradient(135deg,#b8882a,#e0bc55); color: #07080e; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(201,168,76,.28); }
        .btn-gh { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; background: transparent; color: #a87630; font-family: "Outfit",sans-serif; font-size: 12px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; border-radius: 7px; border: 1px solid rgba(201,168,76,.3); text-decoration: none; transition: all .28s ease; }
        .btn-gh:hover { background: rgba(201,168,76,.07); border-color: rgba(201,168,76,.55); }
        .hero-iw { position: relative; }
        .hero-if { border-radius: 4px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,.14); }
        .hero-if img { display: block; width: 100%; height: 420px; object-fit: cover; filter: saturate(.88) contrast(1.05); transition: transform .7s ease; }
        .hero-if:hover img { transform: scale(1.04); }
        .hc { position: absolute; width: 52px; height: 52px; border-color: #c9a84c; border-style: solid; }
        .hc-tl { top: -10px; left: -10px; border-width: 2px 0 0 2px; }
        .hc-br { bottom: -10px; right: -10px; border-width: 0 2px 2px 0; }
        .cg { display: grid; grid-template-columns: 1fr 340px; gap: 52px; margin-bottom: 72px; }
        .sl { font-size: 10px; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; color: #a87630; display: flex; align-items: center; gap: 12px; margin-bottom: 22px; }
        .sl::after { content: ""; flex: 1; height: 1px; background: linear-gradient(90deg,rgba(201,168,76,.3),transparent); }
        .ap-h2 { font-family: "Playfair Display",serif; font-size: clamp(26px,3vw,36px); font-weight: 700; color: #0c0e1a; letter-spacing: -.02em; margin-bottom: 24px; line-height: 1.1; }
        .ap-h2 em { font-style: italic; background: linear-gradient(130deg,#a87630,#e0bc55); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .ap-p { font-size: 15px; font-weight: 300; line-height: 1.88; color: #505868; margin-bottom: 18px; }
        .ap-ol { font-size: 15px; font-weight: 300; line-height: 1.88; color: #505868; padding-left: 22px; }
        .ap-ol li { margin-bottom: 10px; }
        .tl-wrap { position: relative; margin-top: 44px; }
        .tl-line { position: absolute; left: 50%; transform: translateX(-50%); top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom,rgba(201,168,76,.45),rgba(201,168,76,.08)); }
        .tl-items { display: flex; flex-direction: column; gap: 22px; }
        .tl-r { display: flex; width: 100%; }
        .tl-r.l { justify-content: flex-start; }
        .tl-r.r { justify-content: flex-end; }
        .tl-c { width: 46%; background: #fff; border: 1px solid rgba(201,168,76,.14); border-radius: 10px; padding: 16px 20px; box-shadow: 0 4px 20px rgba(0,0,0,.055); position: relative; }
        .tl-r.l .tl-c::after { content: ""; position: absolute; right: -26px; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; background: #c9a84c; border-radius: 50%; }
        .tl-r.r .tl-c::after { content: ""; position: absolute; left: -26px; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; background: #c9a84c; border-radius: 50%; }
        .tl-s { font-size: 10px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: #c9a84c; margin-bottom: 5px; }
        .tl-t { font-family: "Playfair Display",serif; font-size: 16px; font-weight: 700; color: #0c0e1a; }
        .sc { background: #0c0e1a; border: 1px solid rgba(201,168,76,.18); border-radius: 12px; padding: 26px; margin-bottom: 18px; }
        .sc::before { content: ""; display: block; height: 2px; background: linear-gradient(90deg,#b8882a,#e8c560,#b8882a); border-radius: 2px; margin-bottom: 20px; }
        .sc-ti { font-family: "Playfair Display",serif; font-size: 19px; font-weight: 700; color: #f2ede3; margin-bottom: 4px; }
        .sc-su { font-size: 11px; font-weight: 300; color: rgba(200,215,240,.4); margin-bottom: 18px; letter-spacing: .02em; }
        .sc-sv { font-family: "Playfair Display",serif; font-size: 28px; font-weight: 700; background: linear-gradient(135deg,#c9a84c,#f0d870); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; margin-bottom: 4px; }
        .sc-sl { font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: rgba(200,215,240,.33); }
        .ig { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-top: 48px; }
        .ic { background: #fff; border: 1px solid rgba(0,0,0,.07); border-radius: 8px; padding: 18px 16px; transition: all .32s ease; position: relative; overflow: hidden; }
        .ic::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg,#b8882a,#e8c560); transform: scaleX(0); transform-origin: left; transition: transform .35s ease; }
        .ic:hover { transform: translateY(-5px); box-shadow: 0 16px 44px rgba(0,0,0,.09); }
        .ic:hover::before { transform: scaleX(1); }
        .ii { width: 36px; height: 36px; border-radius: 7px; background: rgba(201,168,76,.07); border: 1px solid rgba(201,168,76,.18); display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
        .it { font-size: 12.5px; font-weight: 600; color: #0c0e1a; line-height: 1.4; }
        .cb { background: #0c0e1a; border: 1px solid rgba(201,168,76,.17); border-radius: 14px; padding: 52px 60px; display: flex; justify-content: space-between; align-items: center; gap: 32px; margin: 72px 0; position: relative; overflow: hidden; }
        .cb::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg,#b8882a,#e8c560,#b8882a); }
        .cb-h { font-family: "Playfair Display",serif; font-size: 26px; font-weight: 700; color: #f2ede3; margin-bottom: 8px; }
        .cb-p { font-size: 14px; font-weight: 300; color: rgba(200,215,240,.48); }
        @media(max-width:900px) {
          .ap-hero { grid-template-columns: 1fr; gap: 40px; }
          .cg { grid-template-columns: 1fr; }
          .ig { grid-template-columns: 1fr 1fr; }
          .cb { flex-direction: column; text-align: center; padding: 36px 24px; }
          .hero-if img { height: 280px; }
          .tl-line,.tl-r.l .tl-c::after,.tl-r.r .tl-c::after { display: none; }
          .tl-r { justify-content: flex-start !important; }
          .tl-c { width: 100%; }
        }
      `}</style>
      <main className="ap">
        <div className="ap-inner">
          <div className="ap-hero">
            <motion.div variants={fade(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="ap-ey">PSG Tech Alumni Foundation</div>
              <h1 className="ap-h1">Connecting <em>Techians</em><br />Across the Globe</h1>
              <p className="ap-lead">Celebrating a legacy of excellence — connecting alumni globally with mentorship, opportunities, and purpose-driven initiatives since 2016.</p>
              <div className="ap-btns">
                <a href="/donate" className="btn-g">Donate <ArrowRight size={15} /></a>
                <a href="/psg-tech-foundation-brochure.pdf" className="btn-gh"><Download size={13} /> Brochure</a>
              </div>
            </motion.div>
            <motion.div className="hero-iw" variants={fade(.12)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="hero-if"><img src={AboutImg} alt="PSG Tech Alumni Foundation" /></div>
              <div className="hc hc-tl" /><div className="hc hc-br" />
            </motion.div>
          </div>

          <div className="cg">
            <article>
              <div className="sl">Our Story</div>
              <h2 className="ap-h2">Built on <em>Legacy</em>, Driven by Purpose</h2>
              <p className="ap-p">The PSG TECH Alumni Foundation, a long felt need for a financial arm of PSG Tech Alumni Association, was registered on <strong>19th October 2016</strong> as a not-for-profit Trust under the laws of the State of Tamil Nadu.</p>
              <p className="ap-p">The Foundation was established to provide an avenue through which alumni and well-wishers may contribute financially through gifts, grants, and bequests to benefit present and future students — providing scholarship assistance and funding special projects like PSG-GRD Science & Technology Museum and Research Centre.</p>
              <p className="ap-p">The Foundation's purpose is to receive gifts for the College / Alumni Association and to hold these contributed funds in perpetual endowment. Only the accrued interest and/or income from the funds is expended unless otherwise designated.</p>
              <p className="ap-p">The Foundation is managed by a Board of Trustees comprising six senior alumni and three ex-officio Trustees. The Board provides direction for major functions necessary to carry out the mission of the Foundation.</p>
              <ol className="ap-ol">
                <li>Award of Scholarships to the needy and deserving students.</li>
                <li>Setting up and Managing the PSG-GRD Museum at Neelambur campus.</li>
                <li>Any other activity to support PSG Tech to achieve excellence in education and research including fellowships, centers of excellence, new programs, and special projects.</li>
              </ol>
              <p className="ap-p" style={{ marginTop: 18 }}>The foundation abides by rules and regulations followed in the <strong>Indian Trusts Act, 1882</strong>.</p>

              <div className="sl" style={{ marginTop: 48 }}>Our Journey</div>
              <div className="tl-wrap">
                <div className="tl-line" />
                <div className="tl-items">
                  {timelineData.map((t, i) => (
                    <motion.div key={t.title} className={`tl-r ${t.side === "left" ? "l" : "r"}`}
                      initial={{ opacity: 0, x: t.side === "left" ? -28 : 28 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: i * .08 }} viewport={{ once: true }}>
                      <div className="tl-c"><div className="tl-s">{t.sub}</div><div className="tl-t">{t.title}</div></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </article>

            <aside>
              <motion.div className="sc" variants={fade(.18)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="sc-ti">Board of Trustees</div>
                <div className="sc-su">Current managing trustees and ex-officio members</div>
                {trustees.map(t => <TCard key={t.name} {...t} />)}
                <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
                  <a href="/donate" className="btn-g" style={{ flex: 1, justifyContent: "center", fontSize: 11 }}>Support</a>
                  <a href="/contact" className="btn-gh" style={{ flex: 1, justifyContent: "center", fontSize: 11 }}>Contact</a>
                </div>   
              </motion.div>
              <motion.div className="sc" variants={fade(.28)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="sc-ti" style={{ marginBottom: 16 }}>Impact Numbers</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[{ v: "200+", l: "Scholarships" }, { v: "35+", l: "Projects" }].map(s => (
                    <div key={s.l} style={{ background: "rgba(201,168,76,.06)", border: "1px solid rgba(201,168,76,.13)", borderRadius: 8, padding: 14, textAlign: "center" }}>
                      <div className="sc-sv">{s.v}</div><div className="sc-sl">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(201,168,76,.04)", border: "1px solid rgba(201,168,76,.1)", borderRadius: 8 }}>
                  <div style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(200,215,240,.3)", marginBottom: 4 }}>Endowment</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 14, color: "rgba(200,215,240,.55)" }}>Confidential</div>
                </div>
              </motion.div>
            </aside>
          </div>

          <div className="sl">Key Initiatives</div>
          <div className="ig">
            {initiatives.map((it, i) => (
              <motion.div key={it} className="ic" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: i * .055 }} viewport={{ once: true }}>
                <div className="ii"><Calendar size={15} style={{ color: "#c9a84c" }} /></div>
                <div className="it">{it}</div>
              </motion.div>
            ))}
          </div>

          <motion.div className="cb" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .75 }} viewport={{ once: true }}>
            <div><div className="cb-h">Support the Foundation</div><div className="cb-p">Your gift helps transform student lives — scholarships, labs, and more.</div></div>
            <div className="ap-btns">
              <a href="/donate" className="btn-g">Donate Now <ArrowRight size={15} /></a>
              <a href="/contact" className="btn-gh">Contact Us</a>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}