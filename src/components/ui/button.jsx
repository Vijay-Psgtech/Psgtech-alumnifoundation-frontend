// button.jsx — PSG Alumni Association Design System
import React from "react";

export function Button({ children, className = "", onClick, disabled = false, type = "button", variant = "gold" }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 12,
    letterSpacing: ".12em", textTransform: "uppercase", borderRadius: 7,
    cursor: disabled ? "not-allowed" : "pointer", transition: "all .32s ease",
    border: "none", outline: "none", opacity: disabled ? .55 : 1,
    padding: "12px 26px",
  };
  const variants = {
    gold: {
      background: "linear-gradient(135deg,#b8882a 0%,#e8c255 50%,#b8882a 100%)",
      backgroundSize: "200% 100%", backgroundPosition: "right", color: "#08090f",
    },
    dark: {
      background: "#0c0e1a", color: "#e8c560",
      border: "1px solid rgba(201,168,76,.24)",
    },
    ghost: {
      background: "transparent", color: "#a87630",
      border: "1px solid rgba(201,168,76,.3)",
    },
    danger: {
      background: "rgba(200,40,40,.08)", color: "rgba(240,90,90,.8)",
      border: "1px solid rgba(200,40,40,.2)",
    },
  };

  return (
    <>
      <style>{`
        .psg-btn:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,.12); }
        .psg-btn.gold:hover:not(:disabled) { background-position: left !important; box-shadow: 0 8px 28px rgba(201,168,76,.32) !important; }
        .psg-btn.dark:hover:not(:disabled) { background: linear-gradient(135deg,#b8882a,#e0bc55) !important; color: #08090f !important; }
        .psg-btn.ghost:hover:not(:disabled) { background: rgba(201,168,76,.07) !important; border-color: rgba(201,168,76,.55) !important; }
        .psg-btn:active:not(:disabled) { transform: translateY(0) scale(.98); }
      `}</style>
      <button
        type={type}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={`psg-btn ${variant} ${className}`}
        style={{ ...base, ...variants[variant] }}
      >
        {children}
      </button>
    </>
  );
}