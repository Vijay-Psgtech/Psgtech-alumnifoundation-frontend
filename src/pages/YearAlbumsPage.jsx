// frontend/src/pages/YearAlbumsPage.jsx — reads from DataContext (live sync with admin)
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Image,
  ChevronRight,
  X,
  ChevronLeft,
  Sparkles,
  Film,
  Star,
} from "lucide-react";
import { albumsAPI, API_BASE } from "../services/api";
import usePageTitle from "../hooks/usePageTitle";

const imgUrl = (path = "") => {
  if (!path) return "";
  if (typeof path === "string" && /^(https?:)?\/\//.test(path))
    return encodeURI(path);
  return encodeURI(`${API_BASE}/${path.replace(/\\/g, "/")}`);
};

const normalizeAlbumsData = (payload) => {
  if (!payload) return {};
  if (Array.isArray(payload)) {
    return payload.reduce((acc, album) => {
      const year = String(
        album.year ??
          (album.date ? new Date(album.date).getFullYear() : "unknown"),
      );
      const photos =
        parseInt(album.photos, 10) ||
        (Array.isArray(album.images) ? album.images.length : 0) ||
        0;

      if (!acc[year]) {
        acc[year] = {
          coverColor: album.coverColor || "#667eea",
          totalPhotos: 0,
          albums: [],
        };
      }

      acc[year].albums.push(album);
      acc[year].totalPhotos += photos;
      return acc;
    }, {});
  }
  return payload;
};

const generatePlaceholderPhotos = (count, accent, gradient) =>
  Array.from({ length: Math.min(count, 12) }, (_, i) => ({
    id: i,
    gradient: gradient || `linear-gradient(135deg, ${accent}20, ${accent}08)`,
    label: `Photo ${i + 1}`,
  }));

const AlbumCard = ({ album, onClick, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: idx * 0.06 }}
    onClick={() => onClick(album)}
    style={{
      borderRadius: "20px",
      overflow: "hidden",
      cursor: "pointer",
      background: "#fff",
      border: "1px solid rgba(15,27,53,0.09)",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 16px rgba(15,27,53,0.06)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-6px)";
      e.currentTarget.style.boxShadow = `0 20px 48px rgba(15,27,53,0.13), 0 0 0 1px ${album.accent}25`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 16px rgba(15,27,53,0.06)";
    }}
  >
    {/* Cover */}
    <div
      style={{
        height: "200px",
        position: "relative",
        overflow: "hidden",
        background:
          album.coverImage || album.images?.[0]
            ? `linear-gradient(180deg, rgba(15,27,53,0.18), rgba(15,27,53,0.02)), url("${imgUrl(album.coverImage || album.images[0])}") center/cover no-repeat`
            : `linear-gradient(135deg, ${album.accent}18, ${album.accent}06)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Camera size={32} color={album.accent} style={{ opacity: 0.7 }} />
          <div
            style={{
              color: album.accent,
              fontSize: "13px",
              fontFamily: "'DM Mono', monospace",
              fontWeight: "700",
              marginTop: "6px",
            }}
          >
            {album.photos} PHOTOS
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "rgba(255,255,255,0.9)",
          border: `1px solid ${album.accent}30`,
          borderRadius: "20px",
          padding: "4px 10px",
        }}
      >
        <span
          style={{
            color: album.accent,
            fontSize: "10px",
            fontFamily: "'DM Mono', monospace",
            fontWeight: "700",
          }}
        >
          {String(album.date).split(",")[0]}
        </span>
      </div>
    </div>

    {/* Info */}
    <div style={{ padding: "18px 20px 16px" }}>
      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "10px",
          flexWrap: "wrap",
        }}
      >
        {(Array.isArray(album.tags) ? album.tags : [])
          .slice(0, 2)
          .map((tag) => (
            <span
              key={tag}
              style={{
                background: `${album.accent}10`,
                color: album.accent,
                border: `1px solid ${album.accent}20`,
                borderRadius: "8px",
                padding: "2px 8px",
                fontSize: "9px",
                fontFamily: "'DM Mono', monospace",
                fontWeight: "700",
                letterSpacing: "0.5px",
              }}
            >
              {tag.toUpperCase()}
            </span>
          ))}
      </div>
      <h3
        style={{
          color: "#0f1b35",
          fontWeight: "700",
          fontSize: "15px",
          fontFamily: "'Playfair Display', serif",
          lineHeight: 1.3,
          marginBottom: "6px",
        }}
      >
        {album.title}
      </h3>
      <p style={{ color: "#9ca3af", fontSize: "12px" }}>
        {album.event} · {album.date}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "14px",
          paddingTop: "12px",
          borderTop: "1px solid rgba(15,27,53,0.06)",
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
          <Image size={11} />
          {album.photos} photos
        </span>
        <span
          style={{
            color: album.accent,
            fontSize: "12px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          View Album <ChevronRight size={12} />
        </span>
      </div>
    </div>
  </motion.div>
);

const LightboxModal = ({ album, onClose }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const photos =
    Array.isArray(album.images) && album.images.length
      ? album.images.map((path, i) => ({
          id: i,
          src: imgUrl(path),
          label: `Photo ${i + 1}`,
        }))
      : generatePlaceholderPhotos(album.photos, album.accent, null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(250,247,242,0.97)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 32px",
          borderBottom: "1px solid rgba(15,27,53,0.09)",
          background: "#fff",
        }}
      >
        <div>
          <h2
            style={{
              color: "#0f1b35",
              fontWeight: "700",
              fontSize: "18px",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {album.title}
          </h2>
          <span style={{ color: "#9ca3af", fontSize: "13px" }}>
            {currentPhoto + 1} of {photos.length} · {album.date}
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "rgba(15,27,53,0.06)",
            border: "1px solid rgba(15,27,53,0.1)",
            borderRadius: "10px",
            padding: "8px 14px",
            color: "#6b7280",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          <X size={14} /> Close
        </button>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "20px",
        }}
      >
        <button
          onClick={() => setCurrentPhoto(Math.max(0, currentPhoto - 1))}
          style={{
            position: "absolute",
            left: "20px",
            background: "#fff",
            border: "1px solid rgba(15,27,53,0.1)",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(15,27,53,0.1)",
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <motion.div
          key={currentPhoto}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            width: "100%",
            maxWidth: "800px",
            height: "460px",
            borderRadius: "20px",
            background: photos[currentPhoto]?.src
              ? `url("${photos[currentPhoto].src}") center/cover no-repeat`
              : photos[currentPhoto]?.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${album.accent}20`,
            boxShadow: "0 8px 40px rgba(15,27,53,0.1)",
          }}
        >
          {!photos[currentPhoto]?.src && (
            <div style={{ textAlign: "center" }}>
              <Camera size={48} color={album.accent} style={{ opacity: 0.3 }} />
              <div
                style={{
                  color: album.accent,
                  marginTop: "12px",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                  opacity: 0.5,
                }}
              >
                {photos[currentPhoto]?.label}
              </div>
            </div>
          )}
        </motion.div>
        <button
          onClick={() =>
            setCurrentPhoto(Math.min(photos.length - 1, currentPhoto + 1))
          }
          style={{
            position: "absolute",
            right: "20px",
            background: "#fff",
            border: "1px solid rgba(15,27,53,0.1)",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(15,27,53,0.1)",
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "16px 32px",
          overflowX: "auto",
          borderTop: "1px solid rgba(15,27,53,0.08)",
          background: "#fff",
        }}
      >
        {photos.map((p, i) => (
          <div
            key={i}
            onClick={() => setCurrentPhoto(i)}
            style={{
              width: "72px",
              height: "54px",
              borderRadius: "8px",
              flexShrink: 0,
              cursor: "pointer",
              background: p.src
                ? `url("${p.src}") center/cover no-repeat`
                : p.gradient,
              border:
                i === currentPhoto
                  ? `2px solid ${album.accent}`
                  : "2px solid transparent",
              transition: "all 0.2s",
              opacity: i === currentPhoto ? 1 : 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const YearAlbumsPage = () => {
  const [albumsData, setAlbumsData] = useState({});
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  usePageTitle("Year Albums & Memories");

  React.useEffect(() => {
    albumsAPI.getAll().then((res) => {
      const payload = res.data?.data ?? res.data;
      const normalized = normalizeAlbumsData(payload);
      setAlbumsData(normalized);
      const yearList = Object.keys(normalized).sort((a, b) => b - a);
      if (yearList.length) {
        setSelectedYear(yearList[0]);
      }
    });
  }, []);

  const years = Object.keys(albumsData).sort((a, b) => b - a);

  React.useEffect(() => {
    if (!selectedYear && years.length) {
      setSelectedYear(years[0]);
    } else if (selectedYear && !albumsData[selectedYear] && years.length) {
      setSelectedYear(years[0]);
    }
  }, [albumsData, years, selectedYear]);

  const yearData = albumsData[selectedYear];
  const filteredAlbums = (yearData?.albums || []).filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(a.tags) ? a.tags : []).some((t) =>
        t.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const totalPhotos = Object.values(albumsData).reduce(
    (acc, y) => acc + (y.totalPhotos || 0),
    0,
  );
  const totalEvents = Object.values(albumsData).reduce(
    (acc, y) => acc + (y.totalEvents || 0),
    0,
  );

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
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(15,27,53,0.12); border-radius: 3px; }
      `}</style>

      {/* Hero */}
      <div
        style={{
          position: "relative",
          padding: "80px 40px 50px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(184,136,42,0.09) 0%, rgba(109,79,194,0.06) 50%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Film strip decoration */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "5%",
            display: "flex",
            gap: "4px",
            opacity: 0.05,
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "40px",
                height: "100px",
                background: "#0f1b35",
                borderRadius: "4px",
                position: "relative",
              }}
            >
              {[0, 1, 2].map((j) => (
                <div
                  key={j}
                  style={{
                    position: "absolute",
                    left: "4px",
                    right: "4px",
                    height: "20px",
                    top: `${8 + j * 28}px`,
                    background: "#faf7f2",
                    borderRadius: "2px",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

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
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(184,136,42,0.1)",
              border: "1px solid rgba(184,136,42,0.25)",
              borderRadius: "30px",
              padding: "5px 16px",
              marginBottom: "20px",
            }}
          >
            <Film size={12} color="#b8882a" />
            <span
              style={{
                color: "#b8882a",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "2px",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              MEMORY ARCHIVE
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 58px)",
              fontWeight: "900",
              color: "#0f1b35",
              fontFamily: "'Playfair Display', serif",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Year Albums
            <span
              style={{
                display: "block",
                background: "linear-gradient(135deg, #b8882a, #6d4fc2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              & Memories
            </span>
          </h1>
          <p
            style={{
              color: "#6b7280",
              fontSize: "16px",
              marginBottom: "40px",
              maxWidth: "500px",
              lineHeight: 1.6,
            }}
          >
            Relive the moments that made PSG Tech alumni community what it is
            today.
          </p>
          {/* Stats */}
          <div
            style={{
              display: "inline-grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              background: "rgba(15,27,53,0.1)",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(15,27,53,0.1)",
              boxShadow: "0 4px 24px rgba(15,27,53,0.08)",
            }}
          >
            {[
              {
                v:
                  totalPhotos >= 1000
                    ? `${(totalPhotos / 1000).toFixed(1)}K+`
                    : `${totalPhotos}+`,
                l: "Total Photos",
                c: "#b8882a",
              },
              { v: `${totalEvents}+`, l: "Events Covered", c: "#6d4fc2" },
              { v: `${years.length}`, l: "Years Archived", c: "#1a7a54" },
            ].map(({ v, l, c }, i) => (
              <div
                key={i}
                style={{
                  padding: "18px 28px",
                  background: "#fff",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    color: c,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {v}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#9ca3af",
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "1px",
                  }}
                >
                  {l.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 80px" }}
      >
        {/* Year Selector */}
        <div style={{ marginBottom: "32px" }}>
          <h3
            style={{
              color: "#9ca3af",
              fontSize: "11px",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "2px",
              marginBottom: "16px",
            }}
          >
            SELECT YEAR
          </h3>
          {years.length === 0 ? (
            <p
              style={{
                color: "#9ca3af",
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              No albums yet. Add albums from the Admin panel.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                paddingBottom: "8px",
              }}
            >
              {years.map((y) => {
                const yd = albumsData[y];
                const isSelected = selectedYear === y;
                return (
                  <motion.button
                    key={y}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSelectedYear(y);
                      setSearchTerm("");
                    }}
                    style={{
                      padding: 0,
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        padding: "16px 24px",
                        borderRadius: "16px",
                        minWidth: "120px",
                        background: isSelected ? `${yd.coverColor}08` : "#fff",
                        border: isSelected
                          ? `1px solid ${yd.coverColor}40`
                          : "1px solid rgba(15,27,53,0.09)",
                        transition: "all 0.2s",
                        textAlign: "center",
                        boxShadow: isSelected
                          ? `0 4px 20px ${yd.coverColor}20`
                          : "0 2px 8px rgba(15,27,53,0.05)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "26px",
                          fontWeight: "900",
                          color: isSelected ? yd.coverColor : "#9ca3af",
                          fontFamily: "'Playfair Display', serif",
                          lineHeight: 1,
                        }}
                      >
                        {y}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: isSelected ? yd.coverColor : "#d1d5db",
                          fontFamily: "'DM Mono', monospace",
                          marginTop: "4px",
                        }}
                      >
                        {yd.albums.length} ALBUMS
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#9ca3af",
                          fontFamily: "'DM Mono', monospace",
                        }}
                      >
                        {yd.totalPhotos} PHOTOS
                      </div>
                      {isSelected && (
                        <div
                          style={{
                            width: "20px",
                            height: "2px",
                            background: yd.coverColor,
                            borderRadius: "1px",
                            margin: "8px auto 0",
                          }}
                        />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>

        {yearData && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Year Banner */}
              <div
                style={{
                  background: `${yearData.coverColor}07`,
                  border: `1px solid ${yearData.coverColor}20`,
                  borderRadius: "20px",
                  padding: "28px 32px",
                  marginBottom: "32px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                  boxShadow: `0 4px 20px ${yearData.coverColor}10`,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    <Star
                      size={16}
                      fill={yearData.coverColor}
                      color={yearData.coverColor}
                    />
                    <span
                      style={{
                        color: yearData.coverColor,
                        fontSize: "13px",
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: "600",
                        letterSpacing: "1px",
                      }}
                    >
                      YEAR {selectedYear}
                    </span>
                  </div>
                  <h2
                    style={{
                      color: "#0f1b35",
                      fontSize: "26px",
                      fontWeight: "800",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {yearData.albums.length} Albums · {yearData.totalPhotos}{" "}
                    Photos
                  </h2>
                </div>
                <input
                  type="text"
                  placeholder="Search albums..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(15,27,53,0.1)",
                    borderRadius: "10px",
                    padding: "10px 16px",
                    color: "#0f1b35",
                    fontSize: "13px",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif",
                    width: "200px",
                    boxShadow: "0 2px 8px rgba(15,27,53,0.05)",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = `${yearData.coverColor}50`)
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(15,27,53,0.1)")
                  }
                />
              </div>

              {/* Albums Grid */}
              {filteredAlbums.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px",
                    color: "#9ca3af",
                    background: "#fff",
                    borderRadius: "20px",
                    border: "1px solid rgba(15,27,53,0.08)",
                  }}
                >
                  <Camera
                    size={40}
                    style={{
                      opacity: 0.2,
                      margin: "0 auto 16px",
                      display: "block",
                    }}
                    color="#0f1b35"
                  />
                  <p>
                    {searchTerm
                      ? "No albums match your search."
                      : "No albums for this year yet."}
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {filteredAlbums.map((album, idx) => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                      onClick={setSelectedAlbum}
                      idx={idx}
                    />
                  ))}
                </div>
              )}

              {/* Tag chips */}
              {yearData.albums.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginTop: "32px",
                    padding: "20px",
                    background: "#fff",
                    borderRadius: "14px",
                    border: "1px solid rgba(15,27,53,0.08)",
                    boxShadow: "0 2px 8px rgba(15,27,53,0.04)",
                  }}
                >
                  <span
                    style={{
                      color: "#9ca3af",
                      fontSize: "11px",
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: "1px",
                      alignSelf: "center",
                    }}
                  >
                    CATEGORIES:
                  </span>
                  {Array.from(
                    new Set(
                      yearData.albums.flatMap((a) =>
                        Array.isArray(a.tags) ? a.tags : [],
                      ),
                    ),
                  ).map((tag) => (
                    <span
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      style={{
                        background: "rgba(15,27,53,0.04)",
                        border: "1px solid rgba(15,27,53,0.09)",
                        borderRadius: "20px",
                        padding: "4px 14px",
                        color: "#6b7280",
                        fontSize: "12px",
                        fontFamily: "'DM Mono', monospace",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${yearData.coverColor}40`;
                        e.currentTarget.style.color = yearData.coverColor;
                        e.currentTarget.style.background = `${yearData.coverColor}08`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(15,27,53,0.09)";
                        e.currentTarget.style.color = "#6b7280";
                        e.currentTarget.style.background =
                          "rgba(15,27,53,0.04)";
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <AnimatePresence>
        {selectedAlbum && (
          <LightboxModal
            album={selectedAlbum}
            onClose={() => setSelectedAlbum(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default YearAlbumsPage;