"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Heart,
  Settings,
  LayoutDashboardIcon,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/Images/staffImages/psg_logo.jpg";
import { s } from "framer-motion/client";

export default function NavBar() {
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [alumniOpen, setAlumniOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
  const [mobileAlumniOpen, setMobileAlumniOpen] = useState(false);
  const [mobileAdminOpen, setMobileAdminOpen] = useState(false);
  const navRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      { label: "Home", path: "/" },
      {
        label: "About",
        submenu: [
          { label: "Overview", path: "/about" },
          { label: "Patrons", path: "/patrons" },
          { label: "Office Bearers", path: "/officebearers" },
        ],
      },
      { label: "Objectives", path: "/objectives" },
      {
        label: "Events",
        submenu: [
          { label: "All Events", path: "/events" },
          { label: "Calendar", path: "/events/calendar" },
          { label: "Year Albums", path: "/events/albums" },
        ],
      },
      {
      label: "Find Alumni",
      submenu: [
        user ? { label: "Alumni Directory", path: "/alumni/directory" } : null,
        user ? { label: "Alumni Map", path: "/alumni/map" } : null,
        user ? { label: "Alumni Chapters", path: "/alumni/chapters" } : null
      ].filter(Boolean),
    },

      { label: "Contact", path: "/contact" },
    ];

    if (user?.role === "admin" || user?.role === "superadmin") {
      baseItems.push({
        label: "Admin",
        submenu: [
          { label: "Dashboard", path: "/admin/dashboard" },
          { label: "Events", path: "/admin/events" },
          { label: "Newsletters", path: "/admin/newsletters" },
          { label: "Alumni Management", path: "/admin/users" },
          { label: "Reports", path: "/admin/reports" },
        ],
      });
    }

    return baseItems;
  };

  // ✅ FIXED: All items are proper objects — no raw JSX in array
  // const navItems = [
  //   { label: "Home", path: "/" },
  //   {
  //     label: "About",
  //     submenu: [
  //       { label: "Overview", path: "/about" },
  //       { label: "Patrons", path: "/patrons" },
  //       { label: "Office Bearers", path: "/officebearers" },
  //     ],
  //   },
  //   { label: "Objectives", path: "/objectives" },
  //   { label: "Newsletter", path: "/newsletter" },
  //   {
  //     label: "Events",
  //     submenu: [
  //       { label: "All Events", path: "/events" },
  //       { label: "Calendar", path: "/events/calendar" },
  //       { label: "Year Albums", path: "/events/albums" },
  //     ],
  //   },
  //   { label: "Contact", path: "/contact" },
  //   {
  //     label: "Alumni",
  //     submenu: [
  //       user ? { label: "Directory", path: "/alumni/directory" } : null,
  //       user ? { label: "Alumni Map", path: "/alumni/map" } : null,
  //       user ? { label: "My Profile", path: "/alumni/profile" } : null,
  //       user ? { label: "My Donations", path: "/alumni/donations" } : null,
  //       user?.isAdmin
  //         ? { label: "Admin Dashboard", path: "/admin/dashboard" }
  //         : null,
  //     ].filter(Boolean),
  //   },
  // ];

  const navItems = getNavItems();

  // Helper to check which dropdown is open
  const isDropdownOpen = (label) => {
    if (label === "About") return aboutOpen;
    if (label === "Events") return eventsOpen;
    if (label === "Find Alumni") return alumniOpen;
    if (label === "Admin") return adminOpen;
    return false;
  };

  const toggleDropdown = (label) => {
    setAboutOpen(label === "About" ? (p) => !p : false);
    setEventsOpen(label === "Events" ? (p) => !p : false);
    setAlumniOpen(label === "Find Alumni" ? (p) => !p : false);
    setAdminOpen(label === "Admin" ? (p) => !p : false);
  };

  const toggleMobileDropdown = (label) => {
    if (label === "About") setMobileAboutOpen((p) => !p);
    if (label === "Events") setMobileEventsOpen((p) => !p);
    if (label === "Find Alumni") setMobileAlumniOpen((p) => !p);
    if (label === "Admin") setMobileAdminOpen((p) => !p);
  };

  const isMobileDropdownOpen = (label) => {
    if (label === "About") return mobileAboutOpen;
    if (label === "Events") return mobileEventsOpen;
    if (label === "Find Alumni") return mobileAlumniOpen;
    if (label === "Admin") return mobileAdminOpen;
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
        setAdminOpen(false);
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
    setAdminOpen(false);
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
          max-width: 1340px; margin: 0 auto;
          padding: 0 32px;
          height: 72px;
          display: flex; align-items: center; justify-content: space-between;
        }

        /* LOGO */
        .nav-logo { display: flex; align-items: center; gap: 14px; text-decoration: none; flex-shrink: 0; }
        .nav-logo-img-wrap {
          width: 46px; height: 46px; border-radius: 10px;
          border: 1px solid rgba(201,168,76,0.28);
          background: rgba(201,168,76,0.07);
          padding: 3px; flex-shrink: 0;
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
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          letter-spacing: 0.01em;
        }
        .nav-logo-sub {
          font-size: 9.5px; font-weight: 400; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(200,210,235,0.42);
        }

        /* DESKTOP LINKS */
        .nav-links { display: flex; align-items: center; gap: 34px; }
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
        .nav-link:hover, .nav-link.active { color: var(--gold-light); }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        /* DROPDOWN */
        .dropdown-wrap { position: relative; }
        .dropdown-panel {
          position: absolute; top: calc(100% + 18px); left: 50%;
          transform: translateX(-50%) scaleY(0.88) translateY(-10px);
          transform-origin: top center;
          width: 210px; background: rgba(7,10,22,0.97);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 10px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.06) inset;
          opacity: 0; pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.4,0,0.2,1);
          backdrop-filter: blur(18px);
        }
        .dropdown-panel.open {
          opacity: 1; pointer-events: auto;
          transform: translateX(-50%) scaleY(1) translateY(0);
        }
        .dropdown-gold-bar { height: 2px; background: linear-gradient(90deg, #b8882a, #e8c560, #b8882a); }
        .dropdown-item {
          display: block; padding: 11px 18px;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: rgba(210,220,240,0.7);
          text-decoration: none;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          border-left: 2px solid transparent;
        }
        .dropdown-item:hover, .dropdown-item.active-dd {
          color: var(--gold-light); background: rgba(201,168,76,0.07);
          border-left-color: rgba(201,168,76,0.6);
        }

        /* RIGHT ACTIONS */
        .nav-actions { display: flex; align-items: center; gap: 10px; }
        .btn-ghost-nav {
          padding: 8px 20px; border: 1px solid rgba(201,168,76,0.28);
          border-radius: 7px; background: transparent;
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(210,220,240,0.8); cursor: pointer;
          transition: all 0.28s ease; text-decoration: none; display: inline-block;
        }
        .btn-ghost-nav:hover { border-color: rgba(201,168,76,0.65); color: var(--gold-light); background: rgba(201,168,76,0.06); }

        .btn-gold-nav {
          padding: 9px 22px; border: none; border-radius: 7px;
          background: linear-gradient(135deg, #b8882a 0%, #e0bc55 50%, #b8882a 100%);
          background-size: 200% 100%; background-position: right center;
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 0.09em; text-transform: uppercase;
          color: #08090f; cursor: pointer;
          transition: background-position 0.4s ease, box-shadow 0.3s, transform 0.2s;
          text-decoration: none; display: inline-block;
        }
        .btn-gold-nav:hover {
          background-position: left center;
          box-shadow: 0 0 22px rgba(201,168,76,0.42);
          transform: translateY(-1px);
        }

        /* USER AVATAR */
        .user-btn {
          display: flex; align-items: center; gap: 9px;
          background: none; border: none; cursor: pointer; padding: 0;
        }
        .user-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, #b8882a, #e0bc55);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 13px; color: #08090f;
          transition: box-shadow 0.3s; flex-shrink: 0;
        }
        .user-btn:hover .user-avatar { box-shadow: 0 0 16px rgba(201,168,76,0.5); }
        .user-name { font-size: 13px; font-weight: 500; color: rgba(220,228,245,0.9); line-height: 1.2; text-align: left; }
        .chevron-icon { color: rgba(200,210,235,0.45); transition: transform 0.3s; }
        .chevron-open { transform: rotate(180deg); }

        /* USER DROPDOWN */
        .user-dropdown {
          position: absolute; top: calc(100% + 14px); right: 0;
          width: 225px; background: rgba(7,10,22,0.98);
          border: 1px solid rgba(201,168,76,0.2); border-radius: 11px;
          overflow: hidden; box-shadow: 0 20px 55px rgba(0,0,0,0.7);
          backdrop-filter: blur(20px);
          animation: dropFadeIn 0.2s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes dropFadeIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .user-dropdown-header {
          padding: 14px 18px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .ud-signed-in { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(200,210,235,0.32); margin-bottom: 3px; }
        .ud-name { font-size: 14px; font-weight: 600; color: #e8d8a8; }
        .ud-item {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 18px; font-size: 12px; font-weight: 500;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: rgba(210,220,240,0.65); text-decoration: none;
          border-left: 2px solid transparent;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          background: none; border-right: none; border-top: none; border-bottom: none;
          width: 100%; cursor: pointer;
          font-family: 'Outfit', sans-serif;
        }
        .ud-item:hover { color: var(--gold-light); background: rgba(201,168,76,0.07); border-left-color: rgba(201,168,76,0.55); }
        .ud-item.danger { color: rgba(240,90,90,0.75); }
        .ud-item.danger:hover { color: rgba(255,110,110,0.95); background: rgba(220,50,50,0.07); border-left-color: rgba(220,60,60,0.5); }
        .ud-divider { height: 1px; background: linear-gradient(90deg,transparent,rgba(201,168,76,0.18),transparent); margin: 4px 0; }

        /* HAMBURGER */
        .ham-btn {
          background: none; border: 1px solid rgba(201,168,76,0.22);
          border-radius: 8px; padding: 8px; color: var(--gold);
          cursor: pointer; display: none; transition: all 0.25s;
        }
        .ham-btn:hover { border-color: rgba(201,168,76,0.55); background: rgba(201,168,76,0.06); }

        /* MOBILE PANEL */
        .mobile-panel {
          background: rgba(5,8,18,0.98);
          border-top: 1px solid rgba(201,168,76,0.12);
          backdrop-filter: blur(24px);
          padding: 8px 24px 28px;
          animation: mobileIn 0.25s ease;
        }
        @keyframes mobileIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .m-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 0; font-size: 15px; font-weight: 500;
          color: rgba(210,220,240,0.75);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          text-decoration: none; background: none; border-left: none; border-right: none; border-top: none;
          width: 100%; cursor: pointer; font-family: 'Outfit', sans-serif;
          transition: color 0.2s;
        }
        .m-link:hover, .m-link.m-active { color: var(--gold-light); }
        .m-sub {
          overflow: hidden; transition: max-height 0.35s ease;
          padding-left: 16px; border-left: 1px solid rgba(201,168,76,0.18); margin-left: 6px;
        }
        .m-sub-link { display: block; padding: 10px 0; font-size: 13.5px; font-weight: 400; color: rgba(200,210,235,0.6); text-decoration: none; letter-spacing: 0.04em; transition: color 0.2s; }
        .m-sub-link:hover { color: var(--gold-light); }
        .m-user-card { margin: 18px 0 12px; padding: 14px 16px; border-radius: 10px; background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.14); }
        .m-user-label { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(200,210,235,0.35); margin-bottom: 3px; }
        .m-user-name { font-size: 14px; font-weight: 600; color: #e8d8a8; }
        .m-btn-row { display: flex; flex-direction: column; gap: 10px; margin-top: 18px; border-top: 1px solid rgba(201,168,76,0.12); padding-top: 18px; }
        .m-btn-gold { padding: 13px; border-radius: 9px; background: linear-gradient(135deg,#b8882a,#e0bc55); color: #08090f; font-family:'Outfit',sans-serif; font-size:13px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; border:none; cursor:pointer; text-align:center; text-decoration:none; display:block; }
        .m-btn-ghost { padding: 12px; border-radius: 9px; background: transparent; color: rgba(200,215,240,0.7); font-family:'Outfit',sans-serif; font-size:13px; font-weight:500; letter-spacing:.07em; text-transform:uppercase; border:1px solid rgba(200,215,240,0.12); cursor:pointer; text-align:center; text-decoration:none; display:block; transition:all .25s; }
        .m-btn-ghost:hover { border-color:rgba(201,168,76,.35); color:var(--gold-light); }
        .m-btn-danger { padding:12px; border-radius:9px; background:rgba(200,40,40,.08); color:rgba(240,90,90,.8); border:1px solid rgba(200,40,40,.2); font-family:'Outfit',sans-serif; font-size:13px; font-weight:500; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:all .25s; width: 100%; }
        .m-btn-danger:hover { background:rgba(200,40,40,.14); color:rgba(255,110,110,.95); }

        @media(max-width:900px) {
          .nav-links, .nav-actions { display: none; }
          .ham-btn { display: flex; }
        }
        @media(min-width:901px) {
          .mobile-panel { display: none !important; }
        }
      `}</style>

      <nav
        className={`psg-nav ${!navVisible ? "hidden-nav" : ""} ${scrolled ? "scrolled" : "top"}`}
      >
        <div className="nav-gold-line" />
        <div className="nav-inner" ref={navRef}>
          {/* LOGO */}
          <Link to="/" className="nav-logo">
            <div className="nav-logo-img-wrap">
              <img src={Logo} alt="PSG Logo" className="nav-logo-img" />
            </div>
            <div className="nav-logo-text">
              <div className="nav-logo-main">PSG Tech Alumni</div>
              <div className="nav-logo-sub">Foundation</div>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
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
                            setAdminOpen(false);
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

          {/* DESKTOP RIGHT */}
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
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-gold-bar" />
                    <div className="user-dropdown-header">
                      <div className="ud-signed-in">Signed in as</div>
                      <div className="ud-name">
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                    <div style={{ padding: "6px 0" }}>
                      {user.role === "alumni" && (
                        <>
                          <NavLink
                            to="/alumni/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="ud-item"
                          >
                            <LayoutDashboardIcon size={14} />
                            Dashboard
                          </NavLink>

                          <NavLink
                            to="/alumni/profile"
                            onClick={() => setUserMenuOpen(false)}
                            className="ud-item"
                          >
                            <User size={14} />
                            My Profile
                          </NavLink>

                          <NavLink
                            to="/alumni/donations"
                            onClick={() => setUserMenuOpen(false)}
                            className="ud-item"
                          >
                            <Heart size={14} />
                            My Donations
                          </NavLink>
                        </>
                      )}
                      {(user.role === "admin" ||
                        user.role === "superadmin") && (
                        <>
                          <div className="ud-divider" />
                          <NavLink
                            to="/admin/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="ud-item"
                          >
                            <LayoutDashboard size={14} />
                            Admin Dashboard
                          </NavLink>
                          <NavLink
                            to="/admin/events"
                            onClick={() => setUserMenuOpen(false)}
                            className="ud-item"
                          >
                            <Calendar size={14} />
                            Manage Events
                          </NavLink>
                          <NavLink
                            to="/admin/users"
                            onClick={() => setUserMenuOpen(false)}
                            className="ud-item"
                          >
                            <Users size={14} />
                            Alumni Management
                          </NavLink>
                          <NavLink
                            to="/admin/reports"
                            onClick={() => setUserMenuOpen(false)}
                            className="ud-item"
                          >
                            <FileText size={14} />
                            Reports
                          </NavLink>
                        </>
                      )}
                      <div className="ud-divider" />
                      <button onClick={handleLogout} className="ud-item danger">
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
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

          {/* HAMBURGER */}
          <button
            className="ham-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE */}
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
                        ? "300px"
                        : "0",
                    }}
                  >
                    {item.submenu.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        onClick={closeAll}
                        className="m-sub-link"
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
                    to="/admin/dashboard"
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
                  Donate Now
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
