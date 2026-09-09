// src/pages/Quiz/QuizResults.jsx
import React, { useState } from "react";
import QuizCard from "../../components/QuizCard";
import MountainTrailWidget from "../../components/MountainTrailWidget";
import { Award, ArrowRight, RotateCcw, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from "lucide-react";

export default function QuizResults({ results, onRetake, onReturnToLearning }) {
  const [showReview, setShowReview] = useState(false);
  const warmBrown = "#8C7355";

  return (
    <div className="w-full max-w-4xl bg-white p-7 md:p-9 rounded-3xl border border-[#EAE3DA] shadow-sm">
      {/* Top Main Section matching uploaded mockup layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mb-8 pb-8 border-b border-[#EAE3DA]">
        {/* Left Column: Title + Score Box */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-[#F5EFE6] text-[#8C7355] flex items-center justify-center mb-3">
              <Award size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#36302B] tracking-tight mb-1" style={{ fontFamily: "'Georgia', serif" }}>
              Quiz Complete
            </h2>
            <p className="text-sm font-medium text-[#786558] mb-6">{results.courseTitle || "Python for Statistical Analysis"}</p>
          </div>

          {/* Large Score Card */}
          <div className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#EAE3DA] text-center">
            <div className="text-6xl font-extrabold text-[#36302B] mb-1" style={{ fontFamily: "'Georgia', serif" }}>
              {results.scorePct}%
            </div>
            <p className="text-sm font-semibold text-[#574B40] mb-2">
              {results.correctCount} of {results.totalQuestions} questions correct
            </p>
            <p className="text-xs text-[#786558] max-w-md mx-auto leading-relaxed mb-6">
              {results.feedbackMessage}
            </p>

            {/* Action Buttons matching mockup pills */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onReturnToLearning}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-xs hover:opacity-95"
                style={{ background: warmBrown }}
              >
                Continue Learning <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={onReturnToLearning}
                className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-semibold text-[#4A4036] border border-[#D4C9BD] hover:bg-[#F5EFE6] transition-colors"
              >
                Back to Courses
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Framed Mountain Summit Graphic */}
        <div className="md:col-span-5 flex items-center justify-center">
          <MountainTrailWidget
            answeredCount={results.totalQuestions}
            totalQuestions={results.totalQuestions}
            scorePct={results.scorePct}
            showFlag={true}
            compact={false}
          />
        </div>
      </div>

      {/* Strength Framing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#E8DFD5]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B5746] mb-1 flex items-center gap-1.5">
            <CheckCircle size={14} />
            Your Current Superpowers
          </h4>
          <p className="text-xs text-[#574B40] leading-relaxed">
            Strong understanding demonstrated in core concepts and application rules.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EAE3DA]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#786558] mb-1 flex items-center gap-1.5">
            <HelpCircle size={14} />
            Next Growth Opportunities
          </h4>
          <p className="text-xs text-[#786558] leading-relaxed">
            Review detailed notes below to solidify edge-case questions.
          </p>
        </div>
      </div>

      {/* Accordion Toggle for Question Review */}
      <div>
        <button
          type="button"
          onClick={() => setShowReview(!showReview)}
          className="w-full p-4 rounded-2xl border border-[#EAE3DA] bg-white hover:bg-[#FAF6F0] flex items-center justify-between text-sm font-medium text-[#36302B] transition-colors"
        >
          <span>Review Questions & Explanations ({results.questionDetails.length})</span>
          {showReview ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showReview && (
          <div className="mt-4 flex flex-col gap-6 p-4 bg-[#FAF6F0] rounded-2xl border border-[#EAE3DA]">
            {results.questionDetails.map((q, idx) => (
              <div key={idx} className="p-4 bg-white rounded-2xl border border-[#EAE3DA]">
                <p className="text-xs font-bold text-[#8C7355] mb-2">Question {idx + 1}</p>
                <QuizCard
                  question={{
                    question: q.questionText,
                    options: q.options,
                    correctOption: q.correctOption,
                    explanation: q.explanation,
                  }}
                  selected={q.userAnswer}
                  onSelect={() => {}}
                  showReview={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
