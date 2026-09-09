// src/pages/SkillGaps/SkillGapDisplay.jsx
import React from "react";
import courses from "../../data/courses.json";
import SkillGapBar from "../../components/SkillGapBar";
import { Sparkles, BookOpen, ArrowRight } from "lucide-react";

function recommendedCourseFor(competencyId) {
  return courses.find((c) => c.competencyId === competencyId);
}

export default function SkillGapDisplay({ gaps, onBackToResults, onStartLearning, onOpenAIQuiz }) {
  const priorityGaps = gaps.filter((g) => g.gap > 0);
  const strongAreas = gaps.filter((g) => g.gap === 0);

  const recommendedCourses = priorityGaps
    .map((g) => recommendedCourseFor(g.competencyId))
    .filter(Boolean);

  const warmBrown = "#8C7355";

  return (
    <div className="max-w-2xl w-full bg-white p-7 md:p-9 rounded-3xl border border-[#EAE3DA] shadow-sm">
      <p className="text-3xl font-semibold mb-1 text-[#36302B]" style={{ fontFamily: "'Georgia', serif" }}>
        Your growth roadmap
      </p>
      <p className="text-sm mb-7 text-[#786558]">
        {priorityGaps.length === 0
          ? "You're meeting the required level across the board for your role — nice work."
          : `${priorityGaps.length} area${priorityGaps.length > 1 ? "s" : ""} to focus on next, organized by required competency levels.`}
      </p>

      {/* Priority Skill Gaps */}
      {priorityGaps.length > 0 && (
        <div className="mb-8">
          {priorityGaps.map((g) => (
            <SkillGapBar
              key={g.competencyId}
              name={g.name}
              currentLevel={g.currentLevel}
              requiredLevel={g.requiredLevel}
              classification={g.classification}
            />
          ))}
        </div>
      )}

      {/* Strong Areas */}
      {strongAreas.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[#8C7355]">
            Your Current Strengths (Meeting Role Standard)
          </p>
          <div className="flex flex-wrap gap-2">
            {strongAreas.map((g) => (
              <span
                key={g.competencyId}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#F5EFE6] text-[#4A4036]"
              >
                ✓ {g.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Courses List */}
      {recommendedCourses.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[#786558]">
            Targeted Learning & Practice Quizzes
          </p>
          <div className="space-y-3">
            {recommendedCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EAE3DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C7355] mb-0.5">
                    <BookOpen size={14} />
                    <span>{course.format || "Self-paced"} • {course.durationHours}h</span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#36302B]">{course.title}</h4>
                  <p className="text-xs text-[#786558] mt-0.5 max-w-sm">{course.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onStartLearning?.(course)}
                  className="px-4 py-2 text-xs font-medium text-white rounded-xl shadow-xs shrink-0 hover:opacity-95 transition-opacity"
                  style={{ background: warmBrown }}
                >
                  Take Course Quiz
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Quiz Generator Banner */}
      {onOpenAIQuiz && (
        <div className="p-5 mb-8 rounded-2xl bg-[#F5EFE6] border border-[#E8DFD5] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-[#8C7355] flex items-center justify-center shadow-xs">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#36302B]">Have your own study notes or PDFs?</p>
              <p className="text-[11px] text-[#786558]">Upload a document to generate an AI quiz instantly</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenAIQuiz}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#8C7355] rounded-xl hover:opacity-95 flex items-center gap-1 shrink-0 transition-colors shadow-xs"
          >
            Try AI Quiz <ArrowRight size={13} />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={onBackToResults}
        className="w-full py-3 text-[15px] font-medium rounded-2xl border border-[#EAE3DA] bg-white hover:bg-[#FAF6F0] text-[#36302B] transition-colors"
      >
        Back to results
      </button>
    </div>
  );
}
