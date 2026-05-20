"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/Images/staffImages/logo.jpg";

export default function NavBar() {
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [alumniOpen, setAlumniOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
  const [mobileAlumniOpen, setMobileAlumniOpen] = useState(false);
  const navRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/" },
    {
      label: "About",
      submenu: [
        { label: "Overview", path: "/about" },
        { label: "Objectives", path: "/objectives" },
        { label: "Patrons", path: "/patrons" },
        { label: "Office Bearers", path: "/officebearers" },
        { label: "Council Members", path: "/council" },
        { label: "Engagement", path: "/engagement" },
        { label: "Initiatives", path: "/initiatives" },
      ],
    },
    { label: "Gallery", path: "/gallery" },
    {
      label: "Events",
      submenu: [
        { label: "All Events", path: "/events" },
        { label: "Calendar", path: "/events/calendar" },
        { label: "Photo Albums", path: "/events/albums" },
      ],
    },
    {
      label: "Access",
      submenu: [
        { label: "PSG TECH EVENTS ", path: "https://alumni.psgtech.ac.in/events" },
        { label: "PSG TECH", path: "https://alumni.psgtech.ac.in/" },
        { label: "PSG TECH ALUMNI GALLERY", path: "https://alumni.psgtech.ac.in/gallery" },
      ],
    },
    { label: "Contact", path: "/contact" },
    {
      label: "Alumni",
      submenu: [
        user ? { label: "Directory", path: "/alumni/directory" } : null,
        user ? { label: "Alumni Map", path: "/alumni/map" } : null,
        user ? { label: "My Profile", path: "/alumni/profile" } : null,
        user ? { label: "My Donations", path: "/alumni/donations" } : null,
        user?.isAdmin
          ? { label: "Admin Dashboard", path: "/alumni/dashboard" }
          : null,
      ].filter(Boolean),
    },
  ];

  const isDropdownOpen = (label) => {
    if (label === "About") return aboutOpen;
    if (label === "Events") return eventsOpen;
    if (label === "Alumni") return alumniOpen;
    return false;
  };

  const toggleDropdown = (label) => {
    setAboutOpen(label === "About" ? (p) => !p : false);
    setEventsOpen(label === "Events" ? (p) => !p : false);
    setAlumniOpen(label === "Alumni" ? (p) => !p : false);
  };

  const toggleMobileDropdown = (label) => {
    if (label === "About") setMobileAboutOpen((p) => !p);
    if (label === "Events") setMobileEventsOpen((p) => !p);
    if (label === "Alumni") setMobileAlumniOpen((p) => !p);
  };

  const isMobileDropdownOpen = (label) => {
    if (label === "About") return mobileAboutOpen;
    if (label === "Events") return mobileEventsOpen;
    if (label === "Alumni") return mobileAlumniOpen;
    return false;
  };

  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY;
      setScrolled(cur > 30);
      setNavVisible(!(cur > lastScroll && cur > 100));
      setLastScroll(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setAboutOpen(false);
        setEventsOpen(false);
        setAlumniOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setUserMenuOpen(false);
    setIsOpen(false);
    navigate("/");
  }, [logout, navigate]);

  const closeAll = useCallback(() => {
    setIsOpen(false);
    setAboutOpen(false);
    setEventsOpen(false);
    setAlumniOpen(false);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --navy: #0a0e1a;
          --navy-80: rgba(10,14,26,0.82);
          --gold: #c9a84c;
          --gold-light: #e8c96a;
          --gold-dim: rgba(201,168,76,0.18);
          --cream: #f5f0e8;
          --text-muted: rgba(200,210,235,0.6);
        }

        .psg-nav {
          font-family: 'Outfit', sans-serif;
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          transition: transform 0.45s cubic-bezier(0.4,0,0.2,1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
          will-change: transform;
        }
        .psg-nav.hidden-nav { transform: translateY(-100%); }
        .psg-nav.scrolled {
          background: rgba(8,11,22,0.93);
          backdrop-filter: blur(20px) saturate(160%);
          border-bottom: 1px solid rgba(201,168,76,0.22);
          box-shadow: 0 4px 40px rgba(0,0,0,0.45);
        }
        .psg-nav.top {
          background: linear-gradient(to bottom, rgba(5,8,18,0.72), transparent);
          border-bottom: 1px solid transparent;
        }

        .nav-gold-line {
          height: 1.5px;
          background: linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold-light) 60%, transparent 100%);
          opacity: 0.7;
        }

        .nav-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 0 32px;
          height: 72px;
          display: flex; align-items: center; justify-content: space-between;
        }

        .nav-logo { display: flex; align-items: center; gap: 14px; text-decoration: none; flex-shrink: 0; }
        .nav-logo-img-wrap {
          width: 66px; height: 66px; border-radius: 10px;
          border: 1px solid rgba(201,168,76,0.28);
          background: rgba(201,168,76,0.07);
          padding: 5px; flex-shrink: 0;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .nav-logo:hover .nav-logo-img-wrap {
          border-color: rgba(201,168,76,0.55);
          box-shadow: 0 0 18px rgba(201,168,76,0.2);
        }
        .nav-logo-img { width: 100%; height: 100%; object-fit: cover; border-radius: 7px; }
        .nav-logo-text { line-height: 1.15; }
        .nav-logo-main {
          font-family: 'Playfair Display', serif;
          font-weight: 700; font-size: 16.5px;
          background: linear-gradient(130deg, #c9a84c 0%, #f0d080 55%, #c4a045 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.01em;
        }
        .nav-logo-sub {
          font-size: 9.5px; font-weight: 400; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(200,210,235,0.42);
        }

        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-link {
          position: relative; font-size: 13px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(215,225,245,0.8);
          text-decoration: none;
          transition: color 0.25s; padding-bottom: 3px;
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 4px;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -1px; left: 0;
          width: 0; height: 1px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          transition: width 0.32s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover { color: var(--gold); }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: var(--gold); }
        .nav-link.active::after { width: 100%; }

        .dropdown-wrap { position: relative; }
        .dropdown-panel {
          position: absolute; top: 100%; left: -12px;
          background: rgba(8,11,22,0.98); backdrop-filter: blur(18px);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 10px;
          padding: 8px 0;
          min-width: 220px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-8px);
          transition: opacity 0.3s, transform 0.3s;
          z-index: 1000;
          margin-top: 8px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .dropdown-wrap:hover .dropdown-panel,
        .dropdown-panel.open {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        .dropdown-gold-bar { height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }
        .dropdown-item {
          display: block; width: 100%;
          padding: 10px 16px;
          font-size: 12px; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--text-muted);
          text-decoration: none; transition: all 0.25s;
          border: none; cursor: pointer; text-align: left; background: none;
        }
        .dropdown-item:hover { background: rgba(201,168,76,0.1); color: var(--gold); }
        .dropdown-item.active-dd { color: var(--gold); background: rgba(201,168,76,0.05); }

        .nav-actions { display: flex; align-items: center; gap: 18px; }
        .user-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 5px 12px 5px 5px;
          background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.24);
          border-radius: 8px;
          cursor: pointer; transition: all 0.25s;
        }
        .user-btn:hover { background: rgba(201,168,76,0.13); border-color: rgba(201,168,76,0.35); }
        .user-avatar {
          width: 34px; height: 34px; border-radius: 6px;
          background: linear-gradient(135deg, var(--gold), #e8c96a);
          color: #07080e; font-weight: 700; font-size: 14px;
          display: flex; align-items: center; justify-content: center;
        }
        .user-name { font-size: 12px; font-weight: 500; color: rgba(215,225,245,0.9); }
        .chevron-icon { transition: transform 0.3s; }
        .chevron-open { transform: scaleY(-1); }

        .user-dropdown {
          position: absolute; top: 100%; right: 0;
          background: rgba(8,11,22,0.98); backdrop-filter: blur(18px);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 10px;
          padding: 8px 0;
          min-width: 200px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-8px);
          transition: opacity 0.3s, transform 0.3s;
          z-index: 1000;
          margin-top: 8px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .user-dropdown.open {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .ud-item {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 16px;
          font-size: 12px; text-decoration: none; color: var(--text-muted);
          cursor: pointer; transition: all 0.25s;
          border: none; background: none; text-align: left; width: 100%;
        }
        .ud-item:hover { background: rgba(201,168,76,0.1); color: var(--gold); }
        .ud-item.danger:hover { background: rgba(220,53,69,0.15); color: #ff6b6b; }
        .ud-divider { height: 1px; background: rgba(201,168,76,0.1); margin: 4px 0; }

        .btn-gold-nav {
          padding: 9px 20px; background: linear-gradient(135deg, #b8882a, #e8c255);
          color: #07080e; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          border-radius: 6px; text-decoration: none; transition: all 0.25s;
          border: none; cursor: pointer;
        }
        .btn-gold-nav:hover { box-shadow: 0 6px 20px rgba(201,168,76,0.35); transform: translateY(-2px); }

        .btn-ghost-nav {
          padding: 9px 16px; border: 1px solid rgba(201,168,76,0.32);
          background: transparent; color: var(--gold);
          font-size: 12px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;
          border-radius: 6px; text-decoration: none; transition: all 0.25s; cursor: pointer;
        }
        .btn-ghost-nav:hover { background: rgba(201,168,76,0.12); border-color: rgba(201,168,76,0.5); }

        .ham-btn {
          display: none; background: none; border: none; color: var(--gold);
          cursor: pointer; transition: color 0.25s;
        }
        .ham-btn:hover { color: var(--gold-light); }

        .mobile-panel {
          position: absolute; top: 72px; left: 0; right: 0; width: 100%;
          background: rgba(8,11,22,0.97); backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(201,168,76,0.2);
          padding: 16px 24px; display: flex; flex-direction: column; gap: 8px;
          animation: slideDown 0.3s ease forwards;
          max-height: calc(100vh - 72px);
          overflow-y: auto;
          z-index: 998;
        }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }

        .m-link {
          padding: 12px 0; font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-muted); text-decoration: none; background: none; border: none; cursor: pointer;
          text-align: left; width: 100%; display: flex; align-items: center; justify-content: space-between;
          transition: color 0.25s;
        }
        .m-link:hover, .m-link.m-active { color: var(--gold); }
        .m-sub {
          overflow: hidden; transition: max-height 0.35s ease;
          padding-left: 16px; border-left: 2px solid rgba(201,168,76,0.2);
          margin-top: 4px;
        }
        .m-sub-link {
          display: block; padding: 8px 0; font-size: 12px; color: var(--text-muted);
          text-decoration: none; transition: color 0.25s;
        }
        .m-sub-link:hover { color: var(--gold); }

        .m-user-card { padding: 12px 0; margin: 8px 0; border-top: 1px solid rgba(201,168,76,0.1); border-bottom: 1px solid rgba(201,168,76,0.1); }
        .m-user-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(200,215,240,0.42); margin-bottom: 4px; }
        .m-user-name { font-size: 14px; font-weight: 600; color: var(--gold); }

        .m-btn-row { display: flex; gap: 10px; margin-top: 16px; }
        .m-btn-gold {
          flex: 1; padding: 10px 16px; background: linear-gradient(135deg, #b8882a, #e8c255);
          color: #07080e; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          border-radius: 6px; text-decoration: none; border: none; cursor: pointer; transition: all 0.25s;
        }
        .m-btn-gold:hover { box-shadow: 0 6px 20px rgba(201,168,76,0.35); }
        .m-btn-ghost {
          flex: 1; padding: 10px 16px; border: 1px solid rgba(201,168,76,0.32);
          background: transparent; color: var(--gold);
          font-size: 12px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;
          border-radius: 6px; text-decoration: none; cursor: pointer; transition: all 0.25s; text-align: center; display: flex; align-items: center; justify-content: center;
        }
        .m-btn-ghost:hover { background: rgba(201,168,76,0.12); border-color: rgba(201,168,76,0.5); }
        .m-btn-danger {
          flex: 1; padding: 10px 16px; background: rgba(220,53,69,0.15);
          color: #ff6b6b; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          border-radius: 6px; border: 1px solid rgba(220,53,69,0.3); cursor: pointer; transition: all 0.25s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .m-btn-danger:hover { background: rgba(220,53,69,0.25); border-color: rgba(220,53,69,0.5); }

        @media (max-width: 1200px) {
          .nav-links { gap: 24px; }
        }
        @media (max-width: 1024px) {
          .nav-links { gap: 18px; }
          .nav-link { font-size: 12px; }
        }
        @media (max-width: 768px) {
          .nav-inner { padding: 0 16px; height: 64px; }
          .nav-links { display: none; }
          .nav-actions { display: none; }
          .ham-btn { display: flex; }
          .nav-logo-main { font-size: 14px; }
          .nav-logo-img-wrap { width: 40px; height: 40px; padding: 3px; }
          .nav-logo { gap: 10px; }
        }
      `}</style>

      <nav
        className={`psg-nav ${navVisible ? "visible" : "hidden-nav"} ${scrolled ? "scrolled" : "top"}`}
        ref={navRef}
      >
        <div className="nav-gold-line" />
        <div className="nav-inner">
          <Link to="/" className="nav-logo" onClick={closeAll}>
            <div className="nav-logo-img-wrap">
              <img src={Logo} alt="PSG Tech Alumni Foundation" className="nav-logo-img" />
            </div>
            <div className="nav-logo-text">
              <div className="nav-logo-main">PSG TECH</div>
              <div className="nav-logo-sub">Alumni Foundation</div>
            </div>
          </Link>

          <div className="nav-links">
            {navItems.map((item) =>
              item.submenu ? (
                <div key={item.label} className="dropdown-wrap">
                  <button
                    className="nav-link"
                    onClick={() => toggleDropdown(item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`chevron-icon ${isDropdownOpen(item.label) ? "chevron-open" : ""}`}
                    />
                  </button>
                  <div
                    className={`dropdown-panel ${isDropdownOpen(item.label) ? "open" : ""}`}
                  >
                    <div className="dropdown-gold-bar" />
                    <div style={{ padding: "6px 0" }}>
                      {item.submenu.map((sub) => (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          onClick={() => {
                            setAboutOpen(false);
                            setEventsOpen(false);
                            setAlumniOpen(false);
                          }}
                          className={({ isActive }) =>
                            `dropdown-item${isActive ? " active-dd" : ""}`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </div>

          <div className="nav-actions">
            {user ? (
              <div style={{ position: "relative" }} ref={userMenuRef}>
                <button
                  className="user-btn"
                  onClick={() => setUserMenuOpen((p) => !p)}
                >
                  <div className="user-avatar">
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </div>
                  <div>
                    <div className="user-name">{user.firstName}</div>
                  </div>
                  <ChevronDown
                    size={13}
                    className={`chevron-icon ${userMenuOpen ? "chevron-open" : ""}`}
                  />
                </button>

                <div className={`user-dropdown ${userMenuOpen ? "open" : ""}`}>
                  <div style={{ padding: "6px 0" }}>
                    <NavLink
                      to="/alumni/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="ud-item"
                    >
                      <User size={14} /> My Profile
                    </NavLink>
                    <NavLink
                      to="/alumni/donations"
                      onClick={() => setUserMenuOpen(false)}
                      className="ud-item"
                    >
                      💳 My Donations
                    </NavLink>
                    {user.isAdmin && (
                      <NavLink
                        to="/alumni/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="ud-item"
                      >
                        <LayoutDashboard
                          size={14}
                          style={{ color: "var(--gold)" }}
                        />{" "}
                        Admin Dashboard
                      </NavLink>
                    )}
                    <div className="ud-divider" />
                    <button 
                      onClick={handleLogout} 
                      className="ud-item danger"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/alumni/login" className="btn-ghost-nav">
                  Sign In
                </Link>
                <Link to="/donate" className="btn-gold-nav">
                  Donate
                </Link>
              </>
            )}
          </div>

          <button
            className="ham-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="mobile-panel">
            {navItems.map((item) =>
              item.submenu ? (
                <div key={item.label}>
                  <button
                    className="m-link"
                    onClick={() => toggleMobileDropdown(item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`chevron-icon ${isMobileDropdownOpen(item.label) ? "chevron-open" : ""}`}
                    />
                  </button>
                  <div
                    className="m-sub"
                    style={{
                      maxHeight: isMobileDropdownOpen(item.label)
                        ? "400px"
                        : "0",
                    }}
                  >
                    {item.submenu.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        onClick={closeAll}
                        className={({ isActive }) =>
                          `m-sub-link${isActive ? " active" : ""}`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeAll}
                  className={({ isActive }) =>
                    `m-link${isActive ? " m-active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}

            {user ? (
              <>
                <div className="m-user-card">
                  <div className="m-user-label">Signed in as</div>
                  <div className="m-user-name">
                    {user.firstName} {user.lastName}
                  </div>
                </div>
                <NavLink
                  to="/alumni/profile"
                  onClick={closeAll}
                  className="m-link"
                >
                  <User size={15} /> My Profile
                </NavLink>
                <NavLink
                  to="/alumni/donations"
                  onClick={closeAll}
                  className="m-link"
                >
                  💳 My Donations
                </NavLink>
                {user.isAdmin && (
                  <NavLink
                    to="/alumni/dashboard"
                    onClick={closeAll}
                    className="m-link"
                  >
                    <LayoutDashboard size={15} /> Admin Dashboard
                  </NavLink>
                )}
                <div className="m-btn-row">
                  <button
                    onClick={() => {
                      handleLogout();
                      closeAll();
                    }}
                    className="m-btn-danger"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="m-btn-row">
                <Link
                  to="/alumni/login"
                  onClick={closeAll}
                  className="m-btn-ghost"
                >
                  Alumni Login
                </Link>
                <Link to="/donate" onClick={closeAll} className="m-btn-gold">
                  Contibute  Now
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}  