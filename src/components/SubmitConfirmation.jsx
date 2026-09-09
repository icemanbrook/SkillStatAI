// src/components/SubmitConfirmation.jsx
import React from "react";

export default function SubmitConfirmation({ answeredCount, totalCount, onKeepReviewing, onConfirm }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-6"
      style={{ background: "rgba(51,53,47,0.25)" }}
    >
      <div className="max-w-sm w-full bg-white p-6" style={{ borderRadius: 16 }}>
        <p className="text-xl mb-2" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
          Ready to see your results?
        </p>
        <p className="text-sm mb-6" style={{ color: "#7A7C73" }}>
          You've answered {answeredCount} of {totalCount} questions. You can still go back and
          change anything first.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onKeepReviewing}
            className="flex-1 py-2.5 text-sm"
            style={{ border: "1.5px solid #E4E5DE", borderRadius: 12 }}
          >
            Keep reviewing
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 text-sm text-white"
            style={{ background: "#8A9A86", borderRadius: 12 }}
          >
            Show my results
          </button>
        </div>
      </div>
    </div>
  );
}
