// card.jsx — PSG Alumni Association Design System
import React from "react";

export function Card({ children, className = "", dark = false, accent = false }) {
  return (
    <div
      className={`psg-card ${dark ? "psg-card-dark" : ""} ${accent ? "psg-card-accent" : ""} ${className}`}
      style={{
        background: dark ? "#0c0e1a" : "#fff",
        border: dark ? "1px solid rgba(201,168,76,.18)" : "1px solid rgba(0,0,0,.07)",
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        boxShadow: dark ? "0 20px 60px rgba(0,0,0,.22)" : "0 4px 24px rgba(0,0,0,.06)",
      }}
    >
      {accent && (
        <div style={{ height: 2, background: "linear-gradient(90deg,#b8882a,#e8c560,#b8882a)", flexShrink: 0 }} />
      )}
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={className} style={{ padding: "0" }}>
      {children}
    </div>
  );
}
