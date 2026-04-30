// frontend/src/pages/EventsPage.jsx — reads from DataContext (live sync with admin)
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Search,
  ChevronRight,
  Sparkles,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { eventsAPI } from "../services/api";
import usePageTitle from "../hooks/usePageTitle";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.toLocaleString("en-US", { month: "short" }),
    year: date.getFullYear(),
    dayName: date.toLocaleString("en-US", { weekday: "long" }),
  };
};

const EventCard = ({ event, idx }) => {
  const dateInfo = formatDate(event.date);
  //const catColor = CATEGORY_COLORS[event.category] || "#b8882a";
  const catColor = "#b8882a";
  const isUpcoming = event.status === "upcoming";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: idx * 0.07 }}
      style={{
        background: "#ffffff",
        border: event.highlight
          ? `1px solid ${catColor}55`
          : "1px solid rgba(15,27,53,0.09)",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 2px 16px rgba(15,27,53,0.06)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(15,27,53,0.12), 0 0 0 1px ${catColor}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(15,27,53,0.06)";
      }}
    >
      {event.highlight && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${catColor}, transparent)`,
          }}
        />
      )}

      <div style={{ padding: "24px 24px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              background: `${catColor}12`,
              color: catColor,
              border: `1px solid ${catColor}30`,
              borderRadius: "20px",
              padding: "4px 14px",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {event.category}
          </span>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {event.highlight && (
              <Star size={14} fill={catColor} color={catColor} />
            )}
            {!isUpcoming && (
              <span
                style={{
                  color: "#9ca3af",
                  fontSize: "11px",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                COMPLETED
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          <div
            style={{
              background: isUpcoming ? `${catColor}10` : "rgba(15,27,53,0.04)",
              border: `1px solid ${isUpcoming ? catColor + "30" : "rgba(15,27,53,0.1)"}`,
              borderRadius: "14px",
              padding: "12px 16px",
              textAlign: "center",
              minWidth: "64px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: isUpcoming ? catColor : "#9ca3af",
                fontFamily: "'Playfair Display', serif",
                lineHeight: 1,
              }}
            >
              {dateInfo.day}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: isUpcoming ? catColor : "#9ca3af",
                fontWeight: "600",
                letterSpacing: "1px",
                marginTop: "2px",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {dateInfo.month.toUpperCase()}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#adb5bd",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {dateInfo.year}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "#0f1b35",
                fontFamily: "'Playfair Display', serif",
                lineHeight: 1.3,
                marginBottom: "8px",
              }}
            >
              {event.title}
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {event.description}
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "16px 24px 20px",
          marginTop: "16px",
          borderTop: "1px solid rgba(15,27,53,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: "#9ca3af",
              fontSize: "12px",
            }}
          >
            <MapPin size={12} />
            {event.venue?.split(",")[0]}
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: "#9ca3af",
              fontSize: "12px",
            }}
          >
            <Users size={12} />
            {event.attendees} {isUpcoming ? "expected" : "attended"}
          </span>
        </div>
        <Link
          to={`/events/${event._id}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: isUpcoming ? `${catColor}09` : "rgba(15,27,53,0.03)",
            border: `1px solid ${isUpcoming ? catColor + "25" : "rgba(15,27,53,0.08)"}`,
            borderRadius: "10px",
            padding: "10px 16px",
            color: isUpcoming ? catColor : "#9ca3af",
            fontSize: "13px",
            fontWeight: "600",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateX(3px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateX(0)")
          }
        >
          <span>
            {isUpcoming ? "View Details & Register" : "View Event Summary"}
          </span>
          <ChevronRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
};

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  usePageTitle("Events");

  // ✅ Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Fetch all events from API
  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll();
      setEvents(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch events:", err);

      setEvents([]);
    }
  };

  const filteredEvents = events.filter((e) => {
    const matchFilter = e.status === filter;
    const matchSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const upcoming = events.filter((e) => e.status === "upcoming").length;
  const completed = events.filter((e) => e.status === "completed").length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #faf7f2 0%, #f3ede3 50%, #faf7f2 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800;900&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px; }
        @media (max-width: 640px) { .events-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Hero */}
      <div
        style={{
          position: "relative",
          padding: "100px 40px 60px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(184,136,42,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30px",
            right: "10%",
            width: "180px",
            height: "180px",
            background:
              "radial-gradient(circle, rgba(109,79,194,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(184,136,42,0.1)",
              border: "1px solid rgba(184,136,42,0.25)",
              borderRadius: "30px",
              padding: "6px 18px",
              marginBottom: "24px",
            }}
          >
            <Sparkles size={14} color="#b8882a" />
            <span
              style={{
                color: "#b8882a",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "2px",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              ALUMNI EVENTS
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: "900",
              color: "#0f1b35",
              fontFamily: "'Playfair Display', serif",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            Where Alumni
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #b8882a, #9a7020, #6d4fc2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Come Together
            </span>
          </h1>
          <p
            style={{
              color: "#6b7280",
              fontSize: "18px",
              maxWidth: "520px",
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            Discover upcoming events, relive memories from past gatherings, and
            stay connected with your alma mater.
          </p>
          <div
            style={{
              display: "inline-flex",
              gap: "0",
              background: "#ffffff",
              border: "1px solid rgba(15,27,53,0.1)",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(15,27,53,0.07)",
            }}
          >
            {[
              { label: "Upcoming", value: upcoming, color: "#b8882a" },
              { label: "Completed", value: completed, color: "#6d4fc2" },
              { label: "Total Alumni", value: "15K+", color: "#1a7a54" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 28px",
                  borderRight: i < 2 ? "1px solid rgba(15,27,53,0.08)" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: "800",
                    color: stat.color,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#9ca3af",
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "1px",
                  }}
                >
                  {stat.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "40px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, minWidth: "260px", position: "relative" }}>
            <Search
              size={16}
              color="#9ca3af"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <input
              type="text"
              placeholder="Search events, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                background: "#ffffff",
                border: "1px solid rgba(15,27,53,0.1)",
                borderRadius: "12px",
                padding: "13px 16px 13px 44px",
                color: "#0f1b35",
                fontSize: "14px",
                outline: "none",
                fontFamily: "'Inter', sans-serif",
                boxShadow: "0 2px 8px rgba(15,27,53,0.04)",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(184,136,42,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(15,27,53,0.1)")
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              background: "#ffffff",
              border: "1px solid rgba(15,27,53,0.1)",
              borderRadius: "12px",
              padding: "4px",
              boxShadow: "0 2px 8px rgba(15,27,53,0.04)",
            }}
          >
            {["upcoming", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "9px 22px",
                  borderRadius: "9px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s ease",
                  background:
                    filter === f
                      ? f === "upcoming"
                        ? "linear-gradient(135deg, #b8882a, #9a7020)"
                        : "linear-gradient(135deg, #6d4fc2, #4050b5)"
                      : "transparent",
                  color: filter === f ? "#fff" : "#9ca3af",
                }}
              >
                {f === "upcoming" ? "Upcoming" : "Completed"}
              </button>
            ))}
          </div>
          <Link
            to="/events/calendar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#ffffff",
              border: "1px solid rgba(15,27,53,0.1)",
              borderRadius: "12px",
              padding: "12px 20px",
              color: "#6b7280",
              fontSize: "13px",
              fontWeight: "600",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(15,27,53,0.04)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(109,79,194,0.4)";
              e.currentTarget.style.color = "#6d4fc2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(15,27,53,0.1)";
              e.currentTarget.style.color = "#6b7280";
            }}
          >
            <Calendar size={14} />
            Calendar View
          </Link>
        </motion.div>

        {/* Section label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "24px",
              background:
                filter === "upcoming"
                  ? "linear-gradient(#b8882a,#9a7020)"
                  : "linear-gradient(#6d4fc2,#4050b5)",
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              color: "#0f1b35",
              fontWeight: "700",
              fontSize: "18px",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {filter === "upcoming" ? "Upcoming Events" : "Completed Events"}
          </span>
          <span
            style={{
              color: "#9ca3af",
              fontSize: "14px",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            ({filteredEvents.length})
          </span>
        </div>

        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            <div className="events-grid">
              {filteredEvents.map((event, idx) => (
                <EventCard key={event._id} event={event} idx={idx} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: "center",
                padding: "80px 20px",
                background: "#ffffff",
                border: "1px solid rgba(15,27,53,0.08)",
                borderRadius: "20px",
                boxShadow: "0 2px 16px rgba(15,27,53,0.05)",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                {filter === "upcoming" ? "📅" : "✓"}
              </div>
              <h3
                style={{
                  color: "#0f1b35",
                  fontSize: "20px",
                  fontFamily: "'Playfair Display', serif",
                  marginBottom: "8px",
                }}
              >
                No events found
              </h3>
              <p style={{ color: "#9ca3af" }}>
                Try adjusting your search or check back later.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventsPage;
