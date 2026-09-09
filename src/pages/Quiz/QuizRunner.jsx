// src/pages/Quiz/QuizRunner.jsx
import React, { useState } from "react";
import QuizCard from "../../components/QuizCard";
import ProgressBar from "../../components/ProgressBar";
import SubmitConfirmation from "../../components/SubmitConfirmation";
import MountainTrailWidget from "../../components/MountainTrailWidget";
import { Clock, Eye, EyeOff, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

export default function QuizRunner({ quiz, onComplete, onCancel }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  const questions = quiz.questions;
  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const answeredCount = Object.keys(answers).length;

  const handleSelect = (optionIdx) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIdx,
    }));
  };

  const warmBrown = "#8C7355";

  return (
    <div className="w-full max-w-4xl flex flex-col md:flex-row items-start gap-8">
      {/* Question Focus Runner */}
      <div className="flex-1 w-full bg-white p-7 md:p-8 rounded-3xl border border-[#EAE3DA] shadow-sm">
        {/* Header Info */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE3DA] mb-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#F5EFE6] text-[#8C7355]">
              <BookOpen size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#36302B]">{quiz.title || quiz.course?.title || "Module Quiz"}</h2>
              <p className="text-xs text-[#8C7B6B]">
                Question {currentIndex + 1} of {total}
              </p>
            </div>
          </div>

          {/* Collapsible Timer */}
          <div className="flex items-center gap-2 text-xs text-[#8C7B6B] bg-[#FAF6F0] px-3 py-1.5 rounded-full border border-[#EAE3DA]">
            <Clock size={14} />
            {showTimer ? (
              <span>~{quiz.estimatedMinutes || 5} min total</span>
            ) : (
              <span>Timer hidden</span>
            )}
            <button
              type="button"
              onClick={() => setShowTimer(!showTimer)}
              className="ml-1 hover:text-[#36302B] text-[#A6998B]"
            >
              {showTimer ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar current={currentIndex + 1} total={total} />
        </div>

        {/* Single Question Focus Card */}
        <div className="mb-8">
          <QuizCard
            question={currentQuestion}
            selected={answers[currentQuestion.id]}
            onSelect={handleSelect}
          />
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-[#EAE3DA]">
          {currentIndex > 0 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((i) => i - 1)}
              className="px-4 py-2.5 rounded-2xl border border-[#EAE3DA] text-sm font-medium text-[#4A4036] hover:bg-[#F5EFE6] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-2xl text-sm font-medium text-[#8C7B6B] hover:text-[#36302B] transition-colors"
            >
              Exit Quiz
            </button>
          )}

          {currentIndex < total - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="px-5 py-2.5 rounded-2xl text-sm font-medium text-white flex items-center gap-1.5 transition-colors shadow-sm"
              style={{ background: warmBrown }}
            >
              Next Question
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="px-5 py-2.5 rounded-2xl text-sm font-medium text-white flex items-center gap-1.5 transition-colors shadow-sm"
              style={{ background: warmBrown }}
            >
              Complete Quiz
            </button>
          )}
        </div>
      </div>

      {/* Right Column: Mountain Trail Widget */}
      <div className="w-full md:w-64 shrink-0 flex flex-col items-center">
        <MountainTrailWidget
          answeredCount={answeredCount}
          totalQuestions={total}
          compact={false}
        />
        <p className="text-[11px] text-[#8C7B6B] text-center mt-3 leading-relaxed px-2">
          Selecting answers darkens your trail to the summit. Score ≥70% to hoist the victory flag!
        </p>
      </div>

      {showConfirm && (
        <SubmitConfirmation
          total={total}
          answered={answeredCount}
          onConfirm={() => {
            setShowConfirm(false);
            onComplete(answers);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
