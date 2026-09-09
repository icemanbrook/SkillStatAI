// src/pages/Assessment/AssessmentRunner.jsx
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressBar from "../../components/ProgressBar";
import QuestionCard from "../../components/QuestionCard";
import SubmitConfirmation from "../../components/SubmitConfirmation";
import MountainTrailWidget from "../../components/MountainTrailWidget";

export default function AssessmentRunner({ questions, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);

  const q = questions[current];
  const answeredCount = Object.keys(answers).length;
  const isLast = current === questions.length - 1;

  const selectAnswer = (value) => setAnswers((a) => ({ ...a, [q.id]: value }));

  return (
    <div className="max-w-4xl w-full flex flex-col md:flex-row items-start gap-8">
      {/* Left Column: Question Focus Area */}
      <div className="flex-1 w-full bg-white p-7 md:p-8 rounded-3xl border border-[#EAE3DA] shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-[#8C7B6B]">
            Question {current + 1} of {questions.length}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#F5EFE6] text-[#8C7355] font-medium">
            Draft saved
          </span>
        </div>

        <div className="mb-8">
          <ProgressBar current={current + 1} total={questions.length} />
        </div>

        <QuestionCard question={q} selected={answers[q.id]} onSelect={selectAnswer} />

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#EAE3DA]">
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="flex items-center gap-1.5 text-sm px-4 py-2 text-[#4A4036] disabled:opacity-30 hover:bg-[#F5EFE6] rounded-xl transition-colors"
          >
            <ArrowLeft size={15} /> Back
          </button>

          {!isLast ? (
            <button
              type="button"
              onClick={() => setCurrent((c) => c + 1)}
              className="flex items-center gap-1.5 text-sm px-5 py-2.5 text-white font-medium rounded-2xl shadow-xs transition-colors"
              style={{ background: "#8C7355" }}
            >
              Move forward <ArrowRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="text-sm px-5 py-2.5 text-white font-medium rounded-2xl shadow-xs transition-colors"
              style={{ background: "#8C7355" }}
            >
              Finish assessment
            </button>
          )}
        </div>
      </div>

      {/* Right Column: Warm Mountain Trail Progression Widget */}
      <div className="w-full md:w-64 shrink-0 flex flex-col items-center">
        <MountainTrailWidget
          answeredCount={answeredCount}
          totalQuestions={questions.length}
          compact={false}
        />
        <p className="text-[11px] text-[#8C7B6B] text-center mt-3 leading-relaxed px-2">
          Your answers darken the trail as you climb. Reach the summit to hoist the victory flag!
        </p>
      </div>

      {confirmOpen && (
        <SubmitConfirmation
          answeredCount={answeredCount}
          totalCount={questions.length}
          onKeepReviewing={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            onComplete(answers);
          }}
        />
      )}
    </div>
  );
}
