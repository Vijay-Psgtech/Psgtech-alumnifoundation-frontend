import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        .footer-s { background: linear-gradient(165deg, #08080f 0%, #0c0e1a 100%); padding: 80px 24px 40px; font-family: 'Outfit', sans-serif; position: relative; overflow: hidden; }
        .footer-grid { max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 60px; margin-bottom: 60px; }
        .footer-col h4 { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #f2ede3; margin-bottom: 24px; }
        .footer-col p { font-size: 14px; font-weight: 300; color: rgba(200, 215, 240, 0.6); line-height: 1.72; margin-bottom: 16px; }
        .footer-link { display: block; font-size: 14px; color: rgba(200, 215, 240, 0.6); text-decoration: none; margin-bottom: 12px; transition: all 0.3s ease; }
        .footer-link:hover { color: #c9a84c; transform: translateX(4px); }
        .footer-divider { max-width: 1240px; margin: 0 auto 40px; height: 1px; background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.3), transparent); }
        .footer-bottom { max-width: 1240px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding-top: 40px; border-top: 1px solid rgba(201, 168, 76, 0.1); flex-wrap: wrap; gap: 20px; }
        .footer-copyright { font-size: 13px; color: rgba(200, 215, 240, 0.4); }
        .footer-social { display: flex; gap: 16px; }
        .social-icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(201, 168, 76, 0.3); border-radius: 6px; color: rgba(200, 215, 240, 0.6); transition: all 0.3s ease; cursor: pointer; }
        .social-icon:hover { background: rgba(201, 168, 76, 0.15); border-color: #c9a84c; color: #c9a84c; }
        .contact-item { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .contact-item a { color: rgba(200, 215, 240, 0.6); text-decoration: none; font-size: 14px; transition: color 0.3s ease; }
        .contact-item a:hover { color: #c9a84c; }
        .contact-icon { color: #c9a84c; }
        @media(max-width:820px) { .footer-grid { grid-template-columns: repeat(2, 1fr); gap: 40px; } .footer-bottom { flex-direction: column; align-items: flex-start; } }
        @media(max-width:600px) { .footer-grid { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>

      <footer className="footer-s">
        <div className="footer-grid">
          {/* About */}
          <div className="footer-col">
            <h4>About Foundation</h4>
            <p>
              PSG Tech Alumni Foundation, registered in 2016, is a non-profit trust dedicated to strengthening education, innovation, and research at PSG College of Technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/objectives" className="footer-link">Objectives</Link>
            <Link to="/events" className="footer-link">Events</Link>
            <Link to="/donate" className="footer-link">Donate</Link>
          </div>

          {/* Alumni */}
          <div className="footer-col">
            <h4>Alumni</h4>
            <Link to="/alumni/register" className="footer-link">Register</Link>
            <Link to="/alumni/login" className="footer-link">Login</Link>
            <Link to="/alumni/directory" className="footer-link">Directory</Link>
            <Link to="/alumni/map" className="footer-link">World Map</Link>
            <Link to="/alumni/profile" className="footer-link">My Profile</Link>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="contact-item">
              <MapPin size={18} className="contact-icon" />
              <a href="https://maps.google.com/maps?q=PSG+College+of+Technology,+Coimbatore" target="_blank" rel="noopener noreferrer">
                C-Block, PSG College of Technology<br/>Peelamedu, Coimbatore – 641004
              </a>
            </div>
            <div className="contact-item">
              <Phone size={18} className="contact-icon" />
              <a href="tel:+914224344474">+91 422 4344474</a>
            </div>
            <div className="contact-item">
              <Mail size={18} className="contact-icon" />
              <a href="mailto:admin@psgtechalumnifoundation.org">admin@psgtechalumnifoundation.org</a>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2024 PSG Tech Alumni Foundation. All rights reserved. | Registered as Non-Profit Trust (19th October 2016)
          </div>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Twitter">
              <Twitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;