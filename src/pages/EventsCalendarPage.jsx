// frontend/src/pages/EventsCalendarPage.jsx — reads from DataContext (live sync with admin)
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Users,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import { eventsAPI } from "../services/api";
import usePageTitle from "../hooks/usePageTitle";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EventsCalendarPage = () => {
  const [events, setEvents] = useState([]);
  usePageTitle("Events Calendar");

  React.useEffect(() => {
    eventsAPI.getAll().then((res) => setEvents(res.data.data));
  }, []);

  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [view, setView] = useState("month");

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const getDateStr = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const getEventsForDate = (dateStr) =>
    events.filter(
      (e) => new Date(e.date).toISOString().slice(0, 10) === dateStr,
    );

  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const cells = Array.from({ length: totalCells }, (_, i) => {
    if (i < firstDay)
      return {
        day: daysInPrevMonth - firstDay + i + 1,
        current: false,
        prev: true,
      };
    const d = i - firstDay + 1;
    if (d > daysInMonth)
      return { day: d - daysInMonth, current: false, next: true };
    return { day: d, current: true };
  });

  const handleDateClick = (cell) => {
    if (!cell.current) return;
    const dateStr = getDateStr(year, month, cell.day);
    const evts = getEventsForDate(dateStr);
    setSelectedDate(dateStr);
    setSelectedEvents(evts);
  };

  const monthEvents = events.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  // Derive unique year-months from all events for list view
  const allMonthKeys = useMemo(() => {
    const keys = new Set(events.map((e) => e.date.slice(0, 7)));
    return Array.from(keys).sort().reverse();
  }, [events]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #faf7f2 0%, #f3ede3 50%, #faf7f2 100%)",
        fontFamily: "'Inter', sans-serif",
        padding: "0 0 80px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800;900&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cal-cell { transition: all 0.15s ease; }
        .cal-cell:hover { background: rgba(184,136,42,0.06) !important; }
      `}</style>

      {/* Header */}
      <div
        style={{
          padding: "80px 40px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "200px",
            background:
              "radial-gradient(ellipse, rgba(109,79,194,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Link
            to="/events"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#9ca3af",
              fontSize: "13px",
              textDecoration: "none",
              marginBottom: "24px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0f1b35")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
          >
            <ArrowLeft size={14} /> Back to Events
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(109,79,194,0.1)",
                  border: "1px solid rgba(109,79,194,0.25)",
                  borderRadius: "30px",
                  padding: "5px 16px",
                  marginBottom: "16px",
                }}
              >
                <Sparkles size={12} color="#6d4fc2" />
                <span
                  style={{
                    color: "#6d4fc2",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "2px",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  CALENDAR VIEW
                </span>
              </div>
              <h1
                style={{
                  fontSize: "clamp(28px, 4vw, 44px)",
                  fontWeight: "900",
                  color: "#0f1b35",
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1.1,
                }}
              >
                Events Calendar
              </h1>
              <p
                style={{ color: "#9ca3af", marginTop: "8px", fontSize: "15px" }}
              >
                Plan ahead — view all {events.length} events at a glance.
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {["month", "list"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    padding: "9px 20px",
                    borderRadius: "10px",
                    border: "1px solid rgba(15,27,53,0.1)",
                    background: view === v ? "rgba(109,79,194,0.1)" : "#fff",
                    color: view === v ? "#6d4fc2" : "#9ca3af",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    textTransform: "capitalize",
                    transition: "all 0.2s",
                  }}
                >
                  {v === "month" ? "📅 Month" : "☰ List"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        {view === "month" && (
          <>
            {/* Month Nav */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <button
                onClick={() => setViewDate(new Date(year, month - 1, 1))}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(15,27,53,0.1)",
                  background: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(15,27,53,0.06)",
                }}
              >
                <ChevronLeft size={18} color="#6b7280" />
              </button>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "clamp(20px, 3vw, 28px)",
                    fontWeight: "800",
                    color: "#0f1b35",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {MONTHS[month]}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#9ca3af",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {year}
                </div>
              </div>
              <button
                onClick={() => setViewDate(new Date(year, month + 1, 1))}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(15,27,53,0.1)",
                  background: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(15,27,53,0.06)",
                }}
              >
                <ChevronRight size={18} color="#6b7280" />
              </button>
            </div>

            {/* Calendar grid */}
            <div
              style={{
                background: "#fff",
                border: "1px solid rgba(15,27,53,0.09)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(15,27,53,0.07)",
              }}
            >
              {/* Day headers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  borderBottom: "1px solid rgba(15,27,53,0.07)",
                }}
              >
                {DAYS.map((d) => (
                  <div
                    key={d}
                    style={{
                      padding: "14px 0",
                      textAlign: "center",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#9ca3af",
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: "1px",
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>
              {/* Cells */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                }}
              >
                {cells.map((cell, idx) => {
                  const dateStr = cell.current
                    ? getDateStr(year, month, cell.day)
                    : null;
                  const dayEvents = dateStr ? getEventsForDate(dateStr) : [];
                  const isToday =
                    cell.current &&
                    dateStr ===
                      getDateStr(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate(),
                      );
                  const isSelected = dateStr === selectedDate;
                  return (
                    <div
                      key={idx}
                      className="cal-cell"
                      onClick={() => handleDateClick(cell)}
                      style={{
                        minHeight: "90px",
                        padding: "10px 8px",
                        borderRight:
                          (idx + 1) % 7 !== 0
                            ? "1px solid rgba(15,27,53,0.05)"
                            : "none",
                        borderBottom:
                          idx < totalCells - 7
                            ? "1px solid rgba(15,27,53,0.05)"
                            : "none",
                        background: isSelected
                          ? "rgba(184,136,42,0.06)"
                          : "transparent",
                        cursor: cell.current ? "pointer" : "default",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "6px",
                          background: isToday
                            ? "#b8882a"
                            : isSelected
                              ? "rgba(184,136,42,0.12)"
                              : "transparent",
                          fontSize: "13px",
                          fontWeight: isToday || cell.current ? "700" : "400",
                          color: isToday
                            ? "#fff"
                            : cell.current
                              ? "#0f1b35"
                              : "#d1d5db",
                        }}
                      >
                        {cell.day}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        {dayEvents.slice(0, 2).map((ev, i) => {
                          const cc = "#b8882a";
                          return (
                            <div
                              key={i}
                              style={{
                                background: `${cc}15`,
                                border: `1px solid ${cc}30`,
                                borderRadius: "4px",
                                padding: "2px 5px",
                                fontSize: "9px",
                                color: cc,
                                fontWeight: "700",
                                fontFamily: "'DM Mono', monospace",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {ev.title.slice(0, 14)}
                              {ev.title.length > 14 ? "…" : ""}
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <div
                            style={{
                              fontSize: "9px",
                              color: "#9ca3af",
                              fontFamily: "'DM Mono', monospace",
                            }}
                          >
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected date popup */}
            <AnimatePresence>
              {selectedDate && selectedEvents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    marginTop: "24px",
                    background: "#fff",
                    border: "1px solid rgba(15,27,53,0.09)",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    boxShadow: "0 4px 20px rgba(15,27,53,0.08)",
                  }}
                >
                  <div
                    style={{
                      color: "#0f1b35",
                      fontWeight: "700",
                      fontSize: "15px",
                      fontFamily: "'Playfair Display', serif",
                      marginBottom: "14px",
                    }}
                  >
                    Events on{" "}
                    {new Date(selectedDate + "T00:00:00").toLocaleDateString(
                      "en-US",
                      { weekday: "long", month: "long", day: "numeric" },
                    )}
                  </div>
                  {selectedEvents.map((evt, i) => {
                    const cc = "#b8882a";
                    return (
                      <div
                        key={i}
                        style={{
                          background: "rgba(15,27,53,0.02)",
                          border: "1px solid rgba(15,27,53,0.08)",
                          borderRadius: "12px",
                          padding: "14px",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "8px",
                          }}
                        >
                          <span
                            style={{
                              background: `${cc}12`,
                              color: cc,
                              border: `1px solid ${cc}25`,
                              borderRadius: "10px",
                              padding: "2px 10px",
                              fontSize: "10px",
                              fontFamily: "'DM Mono', monospace",
                              fontWeight: "700",
                            }}
                          >
                            {evt.category}
                          </span>
                          <span style={{ color: "#9ca3af", fontSize: "11px" }}>
                            {evt.time}
                          </span>
                        </div>
                        <div
                          style={{
                            color: "#0f1b35",
                            fontWeight: "700",
                            fontSize: "13px",
                            marginBottom: "4px",
                            lineHeight: 1.3,
                          }}
                        >
                          {evt.title}
                        </div>
                        <Link
                          to={`/events/${evt._id}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            color: cc,
                            fontSize: "12px",
                            fontWeight: "600",
                            textDecoration: "none",
                            marginTop: "8px",
                          }}
                        >
                          View Details <ChevronRight size={12} />
                        </Link>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Month summary */}
            {monthEvents.length > 0 && (
              <div
                style={{
                  marginTop: "32px",
                  background: "#fff",
                  border: "1px solid rgba(15,27,53,0.08)",
                  borderRadius: "20px",
                  padding: "24px",
                  boxShadow: "0 2px 16px rgba(15,27,53,0.05)",
                }}
              >
                <h3
                  style={{
                    color: "#0f1b35",
                    fontWeight: "700",
                    fontSize: "18px",
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: "16px",
                  }}
                >
                  {MONTHS[month]} {year} — {monthEvents.length} Event
                  {monthEvents.length > 1 ? "s" : ""}
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {monthEvents.map((evt) => {
                    const cc = "#b8882a";
                    const d = new Date(evt.date);
                    return (
                      <Link
                        key={evt._id}
                        to={`/events/${evt._id}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          padding: "14px 16px",
                          borderRadius: "12px",
                          background: "rgba(15,27,53,0.02)",
                          border: "1px solid rgba(15,27,53,0.07)",
                          textDecoration: "none",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `${cc}35`;
                          e.currentTarget.style.background = `${cc}05`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(15,27,53,0.07)";
                          e.currentTarget.style.background =
                            "rgba(15,27,53,0.02)";
                        }}
                      >
                        <div
                          style={{
                            background: `${cc}10`,
                            border: `1px solid ${cc}25`,
                            borderRadius: "10px",
                            padding: "8px 12px",
                            textAlign: "center",
                            minWidth: "48px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "18px",
                              fontWeight: "800",
                              color: cc,
                              fontFamily: "'Playfair Display', serif",
                              lineHeight: 1,
                            }}
                          >
                            {d.getDate()}
                          </div>
                          <div
                            style={{
                              fontSize: "9px",
                              color: cc,
                              fontFamily: "'DM Mono', monospace",
                              opacity: 0.7,
                              letterSpacing: "1px",
                            }}
                          >
                            {MONTHS[d.getMonth()].slice(0, 3).toUpperCase()}
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              color: "#0f1b35",
                              fontWeight: "600",
                              fontSize: "14px",
                            }}
                          >
                            {evt.title}
                          </div>
                          <div
                            style={{
                              color: "#9ca3af",
                              fontSize: "12px",
                              marginTop: "2px",
                            }}
                          >
                            {evt.time || "TBD"} · {evt.attendees} attendees
                          </div>
                        </div>
                        <span
                          style={{
                            background: `${cc}10`,
                            color: cc,
                            border: `1px solid ${cc}25`,
                            borderRadius: "10px",
                            padding: "3px 10px",
                            fontSize: "10px",
                            fontFamily: "'DM Mono', monospace",
                            fontWeight: "700",
                          }}
                        >
                          {evt.status === "upcoming" ? "UPCOMING" : "DONE"}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {monthEvents.length === 0 && (
              <div
                style={{
                  marginTop: "24px",
                  textAlign: "center",
                  padding: "48px",
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid rgba(15,27,53,0.08)",
                  color: "#9ca3af",
                }}
              >
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                  }}
                >
                  No events in {MONTHS[month]} {year}
                </p>
              </div>
            )}
          </>
        )}

        {/* List view — all events grouped by month */}
        {view === "list" && (
          <div>
            {allMonthKeys.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px",
                  color: "#9ca3af",
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid rgba(15,27,53,0.08)",
                }}
              >
                No events yet.
              </div>
            )}
            {allMonthKeys.map((ym) => {
              const [y, m] = ym.split("-").map(Number);
              const monthEvts = events.filter((e) => e.date.startsWith(ym));
              if (monthEvts.length === 0) return null;
              return (
                <div key={ym} style={{ marginBottom: "40px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "3px",
                        height: "28px",
                        background: "linear-gradient(#6d4fc2,#4050b5)",
                        borderRadius: "2px",
                      }}
                    />
                    <h2
                      style={{
                        color: "#0f1b35",
                        fontSize: "22px",
                        fontWeight: "700",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {MONTHS[m - 1]} {y}
                    </h2>
                    <span
                      style={{
                        color: "#9ca3af",
                        fontSize: "13px",
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      ({monthEvts.length})
                    </span>
                  </div>
                  {monthEvts.map((evt, i) => {
                    const cc = "#b8882a";
                    const d = new Date(evt.date);
                    return (
                      <motion.div
                        key={evt._id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <Link
                          to={`/events/${evt._id}`}
                          style={{
                            display: "flex",
                            gap: "20px",
                            alignItems: "center",
                            padding: "18px 20px",
                            borderRadius: "14px",
                            background: "#fff",
                            border: "1px solid rgba(15,27,53,0.08)",
                            marginBottom: "10px",
                            textDecoration: "none",
                            transition: "all 0.2s",
                            boxShadow: "0 2px 8px rgba(15,27,53,0.04)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = `${cc}30`;
                            e.currentTarget.style.transform = "translateX(4px)";
                            e.currentTarget.style.boxShadow = `0 4px 20px rgba(15,27,53,0.09)`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor =
                              "rgba(15,27,53,0.08)";
                            e.currentTarget.style.transform = "translateX(0)";
                            e.currentTarget.style.boxShadow =
                              "0 2px 8px rgba(15,27,53,0.04)";
                          }}
                        >
                          <div
                            style={{
                              background: `${cc}10`,
                              border: `1px solid ${cc}25`,
                              borderRadius: "12px",
                              padding: "10px 14px",
                              textAlign: "center",
                              minWidth: "56px",
                              flexShrink: 0,
                            }}
                          >
                            <div
                              style={{
                                fontSize: "22px",
                                fontWeight: "800",
                                color: cc,
                                fontFamily: "'Playfair Display', serif",
                                lineHeight: 1,
                              }}
                            >
                              {d.getDate()}
                            </div>
                            <div
                              style={{
                                fontSize: "9px",
                                color: cc,
                                fontFamily: "'DM Mono', monospace",
                                opacity: 0.7,
                              }}
                            >
                              {MONTHS[d.getMonth()].slice(0, 3).toUpperCase()}
                            </div>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                marginBottom: "6px",
                              }}
                            >
                              <span
                                style={{
                                  background: `${cc}10`,
                                  color: cc,
                                  borderRadius: "8px",
                                  padding: "2px 8px",
                                  fontSize: "9px",
                                  fontFamily: "'DM Mono', monospace",
                                  fontWeight: "700",
                                }}
                              >
                                {evt.category}
                              </span>
                              <span
                                style={{
                                  background:
                                    evt.status === "upcoming"
                                      ? "rgba(26,122,84,0.1)"
                                      : "rgba(15,27,53,0.06)",
                                  color:
                                    evt.status === "upcoming"
                                      ? "#1a7a54"
                                      : "#9ca3af",
                                  borderRadius: "8px",
                                  padding: "2px 8px",
                                  fontSize: "9px",
                                  fontFamily: "'DM Mono', monospace",
                                  fontWeight: "700",
                                }}
                              >
                                {evt.status.toUpperCase()}
                              </span>
                            </div>
                            <div
                              style={{
                                color: "#0f1b35",
                                fontWeight: "700",
                                fontSize: "15px",
                                marginBottom: "4px",
                              }}
                            >
                              {evt.title}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "16px",
                                flexWrap: "wrap",
                              }}
                            >
                              <span
                                style={{
                                  color: "#9ca3af",
                                  fontSize: "12px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <Clock size={11} />
                                {evt.time || "TBD"}
                              </span>
                              <span
                                style={{
                                  color: "#9ca3af",
                                  fontSize: "12px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <Users size={11} />
                                {evt.attendees}
                              </span>
                              <span
                                style={{
                                  color: "#9ca3af",
                                  fontSize: "12px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <MapPin size={11} />
                                {evt.venue?.split(",")[0]}
                              </span>
                            </div>
                          </div>
                          <ChevronRight size={16} color="#d1d5db" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCalendarPage;