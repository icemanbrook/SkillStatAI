// src/pages/Results/AssessmentResults.jsx
import React from "react";
import MountainTrailWidget from "../../components/MountainTrailWidget";

function CompetencyBar({ name, pct, color }) {
  return (
    <div className="mb-2.5">
      <div className="flex justify-between text-[13px] mb-1">
        <span className="font-medium text-[#36302B]">{name}</span>
        <span style={{ color: "#786558" }}>{pct}%</span>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#EAE3DA" }}>
        <div className="h-full transition-all duration-500" style={{ width: `${pct}%`, background: color, borderRadius: 8 }} />
      </div>
    </div>
  );
}

export default function AssessmentResults({ score, onRestart, onViewSkillGaps }) {
  return (
    <div className="max-w-3xl w-full bg-white p-7 md:p-9 rounded-3xl border border-[#EAE3DA] shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-6 border-b border-[#EAE3DA]">
        <div>
          <p className="text-3xl font-semibold mb-1 text-[#36302B]" style={{ fontFamily: "'Georgia', serif" }}>
            Here's your starting point
          </p>
          <p className="text-sm text-[#786558]">
            {score.overallCorrect} of {score.overallTotal} answered correctly — a solid baseline to build from.
          </p>
        </div>

        {/* Mountain Trail Widget */}
        <div className="shrink-0">
          <MountainTrailWidget
            answeredCount={score.overallTotal}
            totalQuestions={score.overallTotal}
            scorePct={score.overallPct}
            showFlag={true}
            compact={true}
          />
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[#8C7355]">
          Your current superpowers
        </p>
        {score.strengths.map((s) => (
          <CompetencyBar key={s.competencyId} name={s.name} pct={s.pct} color="#8C7355" />
        ))}
      </div>

      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[#786558]">
          Your next opportunities for growth
        </p>
        {score.growthAreas.map((s) => (
          <CompetencyBar key={s.competencyId} name={s.name} pct={s.pct} color="#B4A392" />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#EAE3DA]">
        <button
          type="button"
          onClick={onRestart}
          className="flex-1 py-3 text-[15px] font-medium border border-[#EAE3DA] rounded-2xl hover:bg-[#FAF6F0] text-[#4A4036] transition-colors"
        >
          Start over
        </button>
        <button
          type="button"
          onClick={onViewSkillGaps}
          className="flex-1 py-3 text-[15px] font-medium text-white rounded-2xl shadow-xs transition-colors"
          style={{ background: "#8C7355" }}
        >
          View my skill gaps
        </button>
      </div>
    </div>
  );
}
