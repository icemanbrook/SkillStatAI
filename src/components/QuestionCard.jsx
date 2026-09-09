// src/components/QuestionCard.jsx
import React from "react";
import { Check, Circle } from "lucide-react";

export const UNSURE = "__unsure__";

export default function QuestionCard({ question, selected, onSelect }) {
  const warmBrown = "#8C7355";

  return (
    <div>
      <p className="text-xl md:text-2xl leading-snug mb-7 text-[#36302B]" style={{ fontFamily: "'Georgia', serif" }}>
        {question.question}
      </p>

      <div className="flex flex-col gap-3 mb-5">
        {question.options.map((opt, idx) => {
          const isSelected = selected === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(idx)}
              className="text-left px-4 py-3.5 flex items-center gap-3 transition-colors rounded-2xl"
              style={{
                border: `1.5px solid ${isSelected ? warmBrown : "#EAE3DA"}`,
                background: isSelected ? "#F5EFE6" : "white",
              }}
            >
              {isSelected ? (
                <Check size={18} color={warmBrown} strokeWidth={2.5} />
              ) : (
                <Circle size={18} color="#D4C9BD" strokeWidth={1.5} />
              )}
              <span className="text-[15px] font-normal text-[#36302B]">{opt}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onSelect(UNSURE)}
        className="text-xs underline decoration-dotted underline-offset-4 text-[#8C7B6B] hover:text-[#36302B] transition-colors"
      >
        I haven't learned this concept yet / Unsure
      </button>
    </div>
  );
}
