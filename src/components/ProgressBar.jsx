// src/components/ProgressBar.jsx
import React from "react";

export default function ProgressBar({ current, total, accent = "#8A9A86" }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="h-1 rounded-full overflow-hidden" style={{ background: "#EAEBE5" }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${pct}%`, background: accent }}
        />
      </div>
    </div>
  );
}
