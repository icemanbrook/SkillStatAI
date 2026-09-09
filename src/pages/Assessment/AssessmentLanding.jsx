// src/pages/Assessment/AssessmentLanding.jsx
import React, { useState } from "react";

export default function AssessmentLanding({ role, questionCount, estimatedMinutes, onStart }) {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <div className="max-w-xl w-full">
      <p className="text-3xl leading-snug mb-4" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
        Let's find your starting point.
      </p>
      <p className="text-[15px] leading-relaxed mb-8" style={{ color: "#5B5D55" }}>
        This isn't a test you pass or fail — it's a way to see where you're strong today and
        where there's room to grow. Skill gaps are normal, and they're exactly where good
        learning plans start. Answer honestly; "I haven't learned this yet" is a completely
        fine answer.
      </p>

      <div className="p-5 mb-8" style={{ background: "#F0F1EC", borderRadius: 16 }}>
        <p className="text-sm mb-1" style={{ color: "#7A7C73" }}>Role</p>
        <p className="text-base font-medium mb-4">{role.name}</p>
        <div className="flex items-center justify-between text-sm" style={{ color: "#7A7C73" }}>
          <span>{questionCount} questions</span>
          <button
            type="button"
            onClick={() => setShowTimer((s) => !s)}
            className="underline decoration-dotted underline-offset-4"
          >
            {showTimer ? `~${estimatedMinutes} mins left · tap to hide` : "show time estimate"}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="w-full py-3 text-white text-[15px] font-medium transition-opacity hover:opacity-90"
        style={{ background: "#8A9A86", borderRadius: 14 }}
      >
        Begin when you're ready
      </button>
    </div>
  );
}
