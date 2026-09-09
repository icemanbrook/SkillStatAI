// src/components/QuizCard.jsx
import React from "react";
import { Check, Circle, HelpCircle } from "lucide-react";

export const UNSURE = "__unsure__";

export default function QuizCard({ question, selected, onSelect, showReview = false }) {
  const warmBrown = "#8C7355";

  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-normal leading-snug mb-6 text-[#36302B]" style={{ fontFamily: "'Georgia', serif" }}>
        {question.question}
      </h3>

      <div className="flex flex-col gap-3 mb-5">
        {question.options.map((optionText, idx) => {
          const isSelected = selected === idx;
          const isCorrect = showReview && idx === question.correctOption;
          const isUserChoice = showReview && selected === idx;

          let bg = "white";
          let border = "#EAE3DA";

          if (showReview) {
            if (isCorrect) {
              bg = "#F5EFE6";
              border = "#8C7355";
            } else if (isUserChoice && !isCorrect) {
              bg = "#FAF0F0";
              border = "#E5A9A9";
            }
          } else if (isSelected) {
            bg = "#F5EFE6";
            border = warmBrown;
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={showReview}
              onClick={() => onSelect(idx)}
              className="text-left px-4 py-3.5 flex items-center justify-between transition-all duration-150 rounded-2xl"
              style={{
                border: `1.5px solid ${border}`,
                background: bg,
                cursor: showReview ? "default" : "pointer",
              }}
            >
              <div className="flex items-center gap-3 pr-2">
                {isSelected ? (
                  <Check size={18} color={warmBrown} strokeWidth={2.5} />
                ) : (
                  <Circle size={18} color="#D4C9BD" strokeWidth={1.5} />
                )}
                <span className="text-[15px] font-normal text-[#36302B]">{optionText}</span>
              </div>

              {showReview && isCorrect && (
                <span className="text-xs font-semibold px-2.5 py-1 bg-[#8C7355] text-white rounded-md">
                  Correct
                </span>
              )}
            </button>
          );
        })}
      </div>

      {!showReview && (
        <div className="pt-1 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onSelect(UNSURE)}
            className="flex items-center gap-1.5 text-xs text-[#8C7B6B] hover:text-[#36302B] transition-colors underline decoration-dotted underline-offset-4"
          >
            <HelpCircle size={14} color="#8C7B6B" />
            <span>I haven't learned this concept yet / Unsure</span>
          </button>
          {selected !== undefined && (
            <span className="text-[11px] font-medium text-[#8C7355] bg-[#F5EFE6] px-2.5 py-0.5 rounded-full">
              Draft saved
            </span>
          )}
        </div>
      )}

      {showReview && question.explanation && (
        <div className="mt-4 p-4 rounded-2xl bg-[#F5EFE6] border border-[#E8DFD5] text-sm text-[#4A4036]">
          <p className="font-semibold mb-1 text-[#36302B]">Explanation:</p>
          <p className="leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
