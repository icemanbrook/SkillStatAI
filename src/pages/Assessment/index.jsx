// src/pages/Assessment/index.jsx
import React, { useState } from "react";
import { getBaselineAssessment, scoreAssessment, computeSkillGaps } from "../../services/assessmentService";
import AssessmentLanding from "./AssessmentLanding";
import AssessmentRunner from "./AssessmentRunner";
import AssessmentResults from "../Results/AssessmentResults";
import SkillGapDisplay from "../SkillGaps/SkillGapDisplay";

export default function AssessmentPage({ onStartCourse, onOpenAIQuiz }) {
  const [assessment] = useState(() => getBaselineAssessment());
  const [screen, setScreen] = useState("landing"); // landing | running | results | skillgaps
  const [score, setScore] = useState(null);
  const [gaps, setGaps] = useState(null);

  const handleComplete = (answers) => {
    setScore(scoreAssessment(assessment.questions, answers));
    setScreen("results");
  };

  return (
    <div className="w-full flex items-center justify-center">
      {screen === "landing" && (
        <AssessmentLanding
          role={assessment.role}
          questionCount={assessment.questions.length}
          estimatedMinutes={assessment.estimatedMinutes}
          onStart={() => setScreen("running")}
        />
      )}

      {screen === "running" && (
        <AssessmentRunner questions={assessment.questions} onComplete={handleComplete} />
      )}

      {screen === "results" && score && (
        <AssessmentResults
          score={score}
          onRestart={() => { setScreen("landing"); setScore(null); setGaps(null); }}
          onViewSkillGaps={() => {
            setGaps(computeSkillGaps(score, assessment.role));
            setScreen("skillgaps");
          }}
        />
      )}

      {screen === "skillgaps" && gaps && (
        <SkillGapDisplay
          gaps={gaps}
          onBackToResults={() => setScreen("results")}
          onStartLearning={(course) => {
            if (onStartCourse) onStartCourse(course);
          }}
          onOpenAIQuiz={onOpenAIQuiz}
        />
      )}
    </div>
  );
}
