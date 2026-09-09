// src/components/SkillGapBar.jsx
import React from "react";

const CLASSIFICATION_COLOR = {
  "No gap": "#8A9A86",
  "Low": "#7C8CA6",
  "Moderate": "#C2A878",
  "High": "#C08B6B",
};

const MAX_LEVEL = 4;

export default function SkillGapBar({ name, currentLevel, requiredLevel, classification }) {
  const color = CLASSIFICATION_COLOR[classification] ?? "#7C8CA6";
  const currentPct = (currentLevel / MAX_LEVEL) * 100;
  const requiredPct = (requiredLevel / MAX_LEVEL) * 100;

  return (
    <div className="mb-5">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[15px]">{name}</span>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${color}22`, color }}>
          {classification}
        </span>
      </div>

      <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: "#EAEBE5" }}>
        <div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ width: `${currentPct}%`, background: color }}
        />
        {/* marker for the level the role requires */}
        <div
          className="absolute top-0 h-full"
          style={{ left: `${requiredPct}%`, width: 2, background: "#33352F", opacity: 0.35 }}
        />
      </div>

      <div className="flex justify-between text-[11px] mt-1" style={{ color: "#9A9C92" }}>
        <span>Level {currentLevel} today</span>
        <span>Role needs level {requiredLevel}</span>
      </div>
    </div>
  );
}
