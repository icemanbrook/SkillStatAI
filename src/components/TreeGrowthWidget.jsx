// src/components/TreeGrowthWidget.jsx
import React, { useEffect, useState } from "react";
import { Sparkles, Sprout, Heart, CloudRain } from "lucide-react";

/**
 * TreeGrowthWidget - Dynamic Calming Visual Growth Tree.
 * Features:
 * - Visually rich organic tree design with multi-tone shading.
 * - Dynamic reaction on EVERY question response (leaf pulse/sprout).
 * - High score (≥80%): Lush canopy, apples + cozy BIRD NEST with bird on top branches!
 * - Low score (<50%): Leaves turn brown & fall off to the ground in a calming animation.
 */
export default function TreeGrowthWidget({
  answeredCount = 0,
  totalQuestions = 10,
  scorePct = null,
  showApples = false,
  compact = false,
  lastAnsweredId = null,
}) {
  const [pulse, setPulse] = useState(false);

  // Trigger pulse effect whenever user selects an answer
  useEffect(() => {
    if (answeredCount > 0) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 400);
      return () => clearTimeout(timer);
    }
  }, [answeredCount, lastAnsweredId]);

  const progressRatio = totalQuestions > 0 ? Math.min(1, answeredCount / totalQuestions) : 0;
  const leavesToDisplay = Math.round(progressRatio * 10);

  const isLowScore = showApples && scorePct !== null && scorePct < 50;
  const isHighScore = showApples && scorePct !== null && scorePct >= 80;

  // Number of apples based on score
  const appleCount = scorePct !== null
    ? isLowScore
      ? 1
      : Math.max(3, Math.round((scorePct / 100) * 8))
    : 0;

  // 10 leaf cluster positions on branch tips
  const leafPositions = [
    { cx: 100, cy: 52, r: 20, color: "#8A9A86", subColor: "#A4B5A0" }, // Top center
    { cx: 68, cy: 72, r: 18, color: "#95A691", subColor: "#B2C3AE" },  // Top left
    { cx: 132, cy: 72, r: 18, color: "#7B8C77", subColor: "#93A58F" }, // Top right
    { cx: 48, cy: 102, r: 19, color: "#8A9A86", subColor: "#A4B5A0" }, // Mid left
    { cx: 152, cy: 102, r: 19, color: "#95A691", subColor: "#B2C3AE" }, // Mid right
    { cx: 84, cy: 92, r: 17, color: "#7B8C77", subColor: "#93A58F" },  // Center inner left
    { cx: 116, cy: 92, r: 17, color: "#8A9A86", subColor: "#A4B5A0" }, // Center inner right
    { cx: 32, cy: 132, r: 16, color: "#95A691", subColor: "#B2C3AE" }, // Lower left
    { cx: 168, cy: 132, r: 16, color: "#7B8C77", subColor: "#93A58F" }, // Lower right
    { cx: 100, cy: 122, r: 18, color: "#8A9A86", subColor: "#A4B5A0" }, // Mid canopy center
  ];

  // Positions for falling leaves when score is low
  const fallingLeaves = [
    { cx: 45, startY: 100, endY: 195, rot: 45, delay: "0s" },
    { cx: 75, startY: 80, endY: 198, rot: -30, delay: "0.4s" },
    { cx: 125, startY: 75, endY: 196, rot: 60, delay: "0.2s" },
    { cx: 155, startY: 110, endY: 197, rot: -45, delay: "0.6s" },
    { cx: 95, startY: 120, endY: 199, rot: 20, delay: "0.3s" },
  ];

  // Positions for apples
  const applePositions = [
    { cx: 95, cy: 58, color: "#E05638" },
    { cx: 136, cy: 78, color: "#E05638" },
    { cx: 64, cy: 78, color: "#E76448" },
    { cx: 148, cy: 108, color: "#E05638" },
    { cx: 52, cy: 108, color: "#E76448" },
    { cx: 104, cy: 98, color: "#E05638" },
    { cx: 36, cy: 136, color: "#E76448" },
    { cx: 164, cy: 136, color: "#E05638" },
  ];

  const trunkColor = "#625246";
  const trunkGradient = "#786558";

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-2xl border border-[#E2E4DA] bg-gradient-to-b from-[#FAFBF7] via-[#F4F6F0] to-[#EAECE4] shadow-sm transition-all duration-300 ${
        compact ? "w-full sm:w-52" : "w-full max-w-xs"
      }`}
    >
      {/* Visual SVG Canvas */}
      <div className="relative w-48 h-52 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 230" className="w-full h-full overflow-visible">
          <defs>
            {/* Trunk Gradient */}
            <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7D6B5D" />
              <stop offset="50%" stopColor="#625246" />
              <stop offset="100%" stopColor="#4A3D34" />
            </linearGradient>

            {/* Apple Gradient */}
            <radialGradient id="appleGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FF7B60" />
              <stop offset="70%" stopColor="#E05638" />
              <stop offset="100%" stopColor="#B33A20" />
            </radialGradient>
          </defs>

          {/* Ground mound with grass tufts */}
          <ellipse cx="100" cy="206" rx="70" ry="12" fill="#DCE1D3" />
          <ellipse cx="100" cy="204" rx="52" ry="8" fill="#CCD3C2" />

          {/* Fallen Leaves on ground if low score */}
          {isLowScore && (
            <g className="animate-fade-in">
              <path d="M 60 206 Q 65 203 70 206 Q 65 208 60 206" fill="#C87D55" />
              <path d="M 120 207 Q 125 204 130 207 Q 125 209 120 207" fill="#B86B32" />
              <path d="M 85 208 Q 90 205 95 208 Q 90 210 85 208" fill="#D48C46" />
              <path d="M 140 205 Q 145 202 150 205 Q 145 207 140 205" fill="#C87D55" />
            </g>
          )}

          {/* Organic Tree Trunk & Main Branches */}
          <g className={`transition-transform duration-300 ${pulse ? "scale-[1.02]" : "scale-100"}`} style={{ transformOrigin: "100px 200px" }}>
            {/* Base Root flare */}
            <path
              d="M 82 206 C 90 195 94 175 92 150 C 88 125 76 100 62 80 C 55 70 45 62 38 58"
              fill="none"
              stroke="url(#trunkGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M 118 206 C 110 195 106 175 108 150 C 112 125 124 100 138 80 C 145 70 155 62 162 58"
              fill="none"
              stroke="url(#trunkGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Center Trunk core */}
            <path
              d="M 100 206 L 100 110 C 100 90 100 70 100 48"
              fill="none"
              stroke="url(#trunkGrad)"
              strokeWidth="11"
              strokeLinecap="round"
            />
            {/* Secondary branches */}
            <path
              d="M 100 145 C 115 130 135 115 152 98 M 100 135 C 85 120 65 110 48 98 M 100 95 C 112 82 125 72 135 62 M 100 95 C 88 82 75 72 65 62"
              fill="none"
              stroke="url(#trunkGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            {/* Small twigs */}
            <path
              d="M 135 62 Q 145 52 150 50 M 65 62 Q 55 52 50 50 M 152 98 Q 162 90 168 88 M 48 98 Q 38 90 32 88"
              fill="none"
              stroke={trunkColor}
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>

          {/* Dynamic Leaf Clusters */}
          {leafPositions.map((pos, idx) => {
            const isVisible = idx < leavesToDisplay && !isLowScore;
            const leafColor = isLowScore ? "#C87D55" : pos.color;
            const subLeafColor = isLowScore ? "#E09870" : pos.subColor;

            return (
              <g
                key={idx}
                className="transition-all duration-500 ease-out"
                style={{
                  transformOrigin: `${pos.cx}px ${pos.cy}px`,
                  transform: isVisible
                    ? pulse && idx === leavesToDisplay - 1
                      ? "scale(1.25)"
                      : "scale(1)"
                    : isLowScore
                    ? "scale(0.3)"
                    : "scale(0)",
                  opacity: isVisible ? 0.92 : isLowScore ? 0.2 : 0,
                }}
              >
                {/* Main Leaf circle */}
                <circle cx={pos.cx} cy={pos.cy} r={pos.r} fill={leafColor} />
                {/* Secondary highlight leaf circle */}
                <circle cx={pos.cx - 3} cy={pos.cy - 3} r={pos.r * 0.6} fill={subLeafColor} opacity="0.75" />
                {/* Small leaf detail vein */}
                <path
                  d={`M ${pos.cx - 4} ${pos.cy + 4} Q ${pos.cx} ${pos.cy} ${pos.cx + 5} ${pos.cy - 5}`}
                  stroke="#566653"
                  strokeWidth="1.2"
                  fill="none"
                  opacity="0.5"
                />
              </g>
            );
          })}

          {/* Falling Leaves Animation for Low Score */}
          {isLowScore &&
            fallingLeaves.map((leaf, idx) => (
              <g
                key={idx}
                className="animate-bounce"
                style={{
                  animationDuration: `${2.5 + idx * 0.4}s`,
                  animationIterationCount: "infinite",
                }}
              >
                <path
                  d={`M ${leaf.cx} ${leaf.startY} Q ${leaf.cx + 10} ${leaf.startY + 40} ${leaf.cx - 5} ${leaf.endY}`}
                  fill="none"
                />
                <circle cx={leaf.cx} cy={leaf.startY + 50} r="5" fill="#D48C46" opacity="0.8" />
              </g>
            ))}

          {/* Apples (Sprout when showApples is true and score is good) */}
          {showApples &&
            !isLowScore &&
            applePositions.slice(0, appleCount).map((apple, idx) => (
              <g key={idx} className="transition-all duration-500 hover:scale-125">
                {/* Stem */}
                <path
                  d={`M ${apple.cx} ${apple.cy - 7} Q ${apple.cx + 2} ${apple.cy - 10} ${apple.cx + 4} ${apple.cy - 11}`}
                  stroke="#4A3D34"
                  strokeWidth="1.8"
                  fill="none"
                />
                {/* Tiny green leaf on stem */}
                <path
                  d={`M ${apple.cx + 2} ${apple.cy - 9} Q ${apple.cx + 6} ${apple.cy - 11} ${apple.cx + 4} ${apple.cy - 7}`}
                  fill="#7B8C77"
                />
                {/* Apple Body */}
                <circle cx={apple.cx} cy={apple.cy} r="7" fill="url(#appleGrad)" />
                {/* Shiny Specular Highlight */}
                <circle cx={apple.cx - 2.5} cy={apple.cy - 2.5} r="1.8" fill="#FFFFFF" opacity="0.65" />
              </g>
            ))}

          {/* BIRD NEST & BIRD (Appears on High Score >= 80%) */}
          {isHighScore && (
            <g className="transition-all duration-700 animate-pulse">
              {/* Woven Nest in Top Branch Fork (cx: 100, cy: 45) */}
              <ellipse cx="100" cy="46" rx="16" ry="7" fill="#6E5037" />
              <path
                d="M 84 46 C 84 56 116 56 116 46 Z"
                fill="#8C6D4F"
                stroke="#573F2B"
                strokeWidth="1.5"
              />
              {/* Twig texture lines on nest */}
              <path d="M 86 48 Q 100 53 114 48" stroke="#A88B6D" strokeWidth="1" fill="none" />
              <path d="M 89 51 Q 100 55 111 51" stroke="#573F2B" strokeWidth="1" fill="none" />

              {/* Cute Blue Bird in Nest */}
              {/* Bird Body */}
              <circle cx="100" cy="38" r="7.5" fill="#4A90E2" />
              {/* Bird Head */}
              <circle cx="97" cy="34" r="5" fill="#5C9CE6" />
              {/* Eye */}
              <circle cx="95.5" cy="33" r="1" fill="#1E293B" />
              {/* Beak */}
              <polygon points="93,34 89,36 93,37" fill="#F59E0B" />
              {/* Wing */}
              <path d="M 99 37 Q 104 35 105 41 Q 100 42 99 37" fill="#3B82F6" />
              {/* Little Heart Tweet Particle above bird */}
              <g className="animate-bounce" style={{ animationDuration: "1.5s" }}>
                <path
                  d="M 98 22 C 98 20 96 19 95 20.5 C 94 19 92 20 92 22 C 92 24 95 26 95 26 C 95 26 98 24 98 22 Z"
                  fill="#EC4899"
                  opacity="0.85"
                />
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Dynamic Status Microcopy */}
      <div className="mt-2 text-center">
        {isHighScore ? (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EFF7F2] border border-[#8A9A86] text-xs font-semibold text-[#2E5E3D] shadow-2xs">
            <Heart size={13} className="text-[#EC4899] fill-current" />
            <span>Mastery Harvest: {appleCount} Apples & Nesting Bird!</span>
          </div>
        ) : isLowScore ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8F0] border border-[#E8C8A8] text-xs font-medium text-[#9C5A29]">
            <CloudRain size={13} className="text-[#D48C46]" />
            <span>Leaves fall so new growth begins. Review notes!</span>
          </div>
        ) : showApples ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF7F2] border border-[#B8D9C0] text-xs font-semibold text-[#2E5E3D]">
            <Sparkles size={13} className="text-[#8A9A86]" />
            <span>Growth Harvest: {appleCount} Apples</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 text-xs text-[#64748B] bg-white px-3 py-1 rounded-full border border-[#E2E4DA]">
            <Sprout size={13} className="text-[#8A9A86]" />
            <span>
              {leavesToDisplay === 0
                ? "Select answers to sprout leaves!"
                : leavesToDisplay === 10
                ? "Lush canopy ready for evaluation!"
                : `Leaves blooming: ${leavesToDisplay}/10`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
