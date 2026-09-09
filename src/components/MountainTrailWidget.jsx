// src/components/MountainTrailWidget.jsx
import React from "react";
import { Heart, Compass, Mountain, Flag } from "lucide-react";

/**
 * MountainTrailWidget - Warm Neutral Mountain Trail Progression Graphic.
 * - Trail darkens and climbs as questions are answered.
 * - On great score (≥70%): Trail reaches summit & flag hoists at the peak!
 * - On low score (<50%): Trail retreats back down toward basecamp.
 * - Background mountain silhouettes matching user design.
 */
export default function MountainTrailWidget({
  answeredCount = 0,
  totalQuestions = 10,
  scorePct = null,
  showFlag = false,
  compact = false,
}) {
  const progressRatio = totalQuestions > 0 ? Math.min(1, answeredCount / totalQuestions) : 0;
  const isGreatResult = showFlag && scorePct !== null && scorePct >= 70;
  const isLowResult = showFlag && scorePct !== null && scorePct < 50;

  // Calculate trail fill percentage (0 to 100)
  const trailProgress = isLowResult ? 15 : showFlag ? (isGreatResult ? 100 : 75) : Math.round(progressRatio * 100);

  // SVG Trail path definition
  // Path length approx 260px
  const maxDash = 260;
  const dashOffset = maxDash - (maxDash * trailProgress) / 100;

  return (
    <div
      className={`flex flex-col items-center p-4 rounded-3xl border border-[#EAE3DA] bg-gradient-to-b from-[#FAF6F0] via-[#F5EFE6] to-[#EFE7DC] shadow-sm transition-all duration-300 ${
        compact ? "w-full sm:w-56" : "w-full max-w-xs"
      }`}
    >
      {/* SVG Canvas Box */}
      <div className="relative w-48 h-56 rounded-2xl overflow-hidden bg-gradient-to-b from-[#FAF4EC] to-[#F1E8DC] border border-[#E5DDD2] shadow-inner flex items-center justify-center">
        <svg viewBox="0 0 200 240" className="w-full h-full">
          <defs>
            {/* Sun Glow */}
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
            {/* Mountain Gradient */}
            <linearGradient id="mainPeakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BDAB99" />
              <stop offset="50%" stopColor="#9C8875" />
              <stop offset="100%" stopColor="#82705E" />
            </linearGradient>
            <linearGradient id="backPeakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D8CDBF" />
              <stop offset="100%" stopColor="#BBAF9F" />
            </linearGradient>
          </defs>

          {/* Warm Golden Sun */}
          <circle cx="50" cy="45" r="22" fill="url(#sunGlow)" />
          <circle cx="50" cy="45" r="12" fill="#FBBF24" />
          {/* Sun Rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 50 + 15 * Math.cos(rad);
            const y1 = 45 + 15 * Math.sin(rad);
            const x2 = 50 + 19 * Math.cos(rad);
            const y2 = 45 + 19 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />;
          })}

          {/* Background Far Mountain Peaks */}
          <polygon points="10,240 70,110 130,240" fill="url(#backPeakGrad)" opacity="0.85" />
          <polygon points="110,240 160,130 200,240" fill="url(#backPeakGrad)" opacity="0.7" />

          {/* Main Summit Center Mountain */}
          <polygon points="40,240 120,40 195,240" fill="url(#mainPeakGrad)" />

          {/* Snow Cap on Main Peak */}
          <polygon points="120,40 106,72 116,68 120,74 126,68 134,72" fill="#FFFDF9" opacity="0.95" />

          {/* Base Pine Trees */}
          <g fill="#5C6D58">
            <polygon points="20,240 28,215 36,240" />
            <polygon points="30,240 38,205 46,240" />
            <polygon points="165,240 173,210 181,240" />
            <polygon points="175,240 183,218 191,240" />
          </g>

          {/* Winding Trail Path (Base to Summit) */}
          {/* Light Background Trail Path */}
          <path
            d="M 55 235 C 75 220 105 210 85 185 C 65 160 145 150 125 120 C 105 95 135 75 120 42"
            fill="none"
            stroke="#E5DDD2"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Active Darkened Progress Trail Path */}
          <path
            d="M 55 235 C 75 220 105 210 85 185 C 65 160 145 150 125 120 C 105 95 135 75 120 42"
            fill="none"
            stroke="#4A3E35"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={maxDash}
            strokeDashoffset={dashOffset}
            className="transition-all duration-700 ease-out"
          />

          {/* Dotted Trail Guide Line */}
          <path
            d="M 55 235 C 75 220 105 210 85 185 C 65 160 145 150 125 120 C 105 95 135 75 120 42"
            fill="none"
            stroke="#F5EFE6"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />

          {/* Current Hiker Position Marker during test */}
          {!showFlag && trailProgress > 0 && (
            <circle
              cx={120}
              cy={42 + (193 * (100 - trailProgress)) / 100}
              r="4.5"
              fill="#8C7355"
              stroke="#FFF"
              strokeWidth="1.5"
              className="animate-pulse"
            />
          )}

          {/* FLAG HOISTING ON SUMMIT (Appears on Great Result ≥ 70%) */}
          {isGreatResult && (
            <g className="transition-all duration-700 animate-bounce" style={{ animationDuration: "2s" }}>
              {/* Flag Pole */}
              <line x1="120" y1="42" x2="120" y2="18" stroke="#362F2B" strokeWidth="2.5" strokeLinecap="round" />
              {/* Gold Top Ball */}
              <circle cx="120" cy="17" r="2" fill="#F59E0B" />
              {/* Hoisted Flag */}
              <polygon points="120,19 142,26 120,33" fill="#C85A32" />
              <polygon points="120,20 138,26 120,31" fill="#D96B43" />
            </g>
          )}

          {/* BASECAMP RETREAT TENT (Appears on Low Result < 50%) */}
          {isLowResult && (
            <g className="transition-all duration-500">
              {/* Small Basecamp Tent at trail start */}
              <polygon points="50,235 60,218 70,235" fill="#C87D55" stroke="#4A3E35" strokeWidth="1" />
              <polygon points="58,225 60,218 62,225" fill="#FFFDF9" />
            </g>
          )}
        </svg>
      </div>

      {/* Microcopy Pill Badge matching user image style */}
      <div className="mt-3 text-center">
        {isGreatResult ? (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DDD2] text-xs font-semibold text-[#36302B] shadow-xs">
            <Heart size={14} className="text-[#C85A32] fill-current" />
            <span>New Skills Higher Horizons!</span>
          </div>
        ) : isLowResult ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DDD2] text-xs font-medium text-[#786558]">
            <Compass size={14} className="text-[#8C7355]" />
            <span>Basecamp reached — ready to ascend again!</span>
          </div>
        ) : showFlag ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DDD2] text-xs font-medium text-[#36302B]">
            <Mountain size={14} className="text-[#8C7355]" />
            <span>Mountain Summit Reached</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DDD2] text-xs text-[#786558]">
            <Compass size={14} className="text-[#8C7355]" />
            <span>
              {answeredCount === 0
                ? "Begin test to start mountain climb"
                : `Trail climbing: ${Math.round(progressRatio * 100)}% to summit`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
