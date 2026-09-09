import React, { useState } from "react";
import AssessmentPage from "./pages/Assessment";
import QuizRunner from "./pages/Quiz/QuizRunner";
import QuizResults from "./pages/Quiz/QuizResults";
import AIQuizUploadPage from "./pages/AIQuizUpload/AIQuizUploadPage";
import SkillGapDisplay from "./pages/SkillGaps/SkillGapDisplay";
import { getBaselineAssessment, scoreAssessment, computeSkillGaps } from "./services/assessmentService";
import { getCourseQuiz, scoreQuiz } from "./services/quizService";
import { ClipboardList, BarChart3, BookOpen, Sparkles, User } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("assessment"); // assessment | skillgaps | coursequiz | aiquiz
  const [currentCourse, setCurrentCourse] = useState(null);
  const [quizState, setQuizState] = useState("runner"); // runner | results
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  // Default baseline data for direct tab navigation
  const [assessment] = useState(() => getBaselineAssessment());
  const [mockScore] = useState(() =>
    scoreAssessment(assessment.questions, {
      "Q-001": 1,
      "Q-002": 1,
      "Q-003": 1,
      "Q-004": 1,
      "Q-005": 1,
    })
  );
  const [mockGaps] = useState(() => computeSkillGaps(mockScore, assessment.role));

  const handleStartCourse = (course) => {
    setCurrentCourse(course);
    const quizData = getCourseQuiz(course.id);
    setActiveQuiz(quizData);
    setQuizState("runner");
    setActiveTab("coursequiz");
  };

  const handleCourseQuizComplete = (answers) => {
    if (!activeQuiz) return;
    const scored = scoreQuiz(activeQuiz, answers);
    setQuizResults(scored);
    setQuizState("results");
  };

  const warmBrown = "#8C7355";

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 overflow-x-hidden"
      style={{
        background: "#FAF6F0",
        fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
        color: "#36302B",
      }}
    >
      {/* Background Mountain Silhouettes on Left & Right Sides (Warm Neutral Art) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        {/* Left Side Mountain Silhouette */}
        <svg viewBox="0 0 400 800" className="absolute left-0 bottom-0 w-80 md:w-96 text-[#EAE3DA]" fill="currentColor">
          <path d="M 0 800 L 0 450 Q 80 400 150 480 T 300 420 Q 360 460 400 520 L 400 800 Z" />
          <path d="M 0 800 L 0 550 Q 100 500 200 600 T 400 580 L 400 800 Z" opacity="0.6" fill="#DCD2C5" />
        </svg>

        {/* Right Side Mountain Silhouette */}
        <svg viewBox="0 0 400 800" className="absolute right-0 bottom-0 w-80 md:w-96 text-[#EAE3DA]" fill="currentColor">
          <path d="M 400 800 L 400 430 Q 320 380 240 460 T 100 410 Q 40 450 0 510 L 0 800 Z" />
          <path d="M 400 800 L 400 530 Q 300 480 180 580 T 0 560 L 0 800 Z" opacity="0.6" fill="#DCD2C5" />
        </svg>
      </div>

      {/* Main Container Z-Index Above Background */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Top Application Header */}
        <header className="w-full bg-white border border-[#EAE3DA] rounded-3xl p-4 mb-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Platform Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8C7355] text-white flex items-center justify-center font-bold text-lg shadow-xs">
              S
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#36302B] tracking-tight">SkillStat AI</h1>
              <p className="text-xs text-[#786558]">Competency & Skill Gap Platform • Person 4 Module</p>
            </div>
          </div>

          {/* Demo User Badge matching mockup */}
          <div className="flex items-center gap-2 bg-[#FAF6F0] px-4 py-2 rounded-full border border-[#EAE3DA] text-xs">
            <User size={14} className="text-[#8C7355]" />
            <span className="font-semibold text-[#36302B]">Ananya Rao</span>
            <span className="text-[#8C7B6B]">• Statistical Officer</span>
          </div>
        </header>

        {/* Product Story Workflow Navigation Tabs matching uploaded image */}
        <nav className="w-full bg-white border border-[#EAE3DA] rounded-3xl p-2 mb-8 shadow-xs overflow-x-auto">
          <div className="flex items-center justify-between gap-1.5 min-w-[580px]">
            <button
              type="button"
              onClick={() => setActiveTab("assessment")}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === "assessment"
                  ? "bg-[#8C7355] text-white shadow-xs"
                  : "text-[#786558] hover:bg-[#FAF6F0]"
              }`}
            >
              <ClipboardList size={15} />
              1. Baseline Test
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("skillgaps")}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === "skillgaps"
                  ? "bg-[#8C7355] text-white shadow-xs"
                  : "text-[#786558] hover:bg-[#FAF6F0]"
              }`}
            >
              <BarChart3 size={15} />
              2. Skill Gaps & Roadmap
            </button>

            <button
              type="button"
              onClick={() => {
                if (!activeQuiz) {
                  const defaultCourseQuiz = getCourseQuiz("COURSE-001");
                  setActiveQuiz(defaultCourseQuiz);
                  setQuizState("results"); // Open directly on results for high-fidelity demo
                }
                setActiveTab("coursequiz");
              }}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === "coursequiz"
                  ? "bg-[#8C7355] text-white shadow-xs"
                  : "text-[#786558] hover:bg-[#FAF6F0]"
              }`}
            >
              <BookOpen size={15} />
              3. Course Quiz
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("aiquiz")}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === "aiquiz"
                  ? "bg-[#8C7355] text-white shadow-xs"
                  : "text-[#786558] hover:bg-[#FAF6F0]"
              }`}
            >
              <Sparkles size={15} />
              4. AI Quiz Generator
            </button>
          </div>
        </nav>

        {/* Main View Area */}
        <main className="w-full flex items-center justify-center z-10">
          {activeTab === "assessment" && (
            <AssessmentPage
              onStartCourse={handleStartCourse}
              onOpenAIQuiz={() => setActiveTab("aiquiz")}
            />
          )}

          {activeTab === "skillgaps" && (
            <SkillGapDisplay
              gaps={mockGaps}
              onBackToResults={() => setActiveTab("assessment")}
              onStartLearning={handleStartCourse}
              onOpenAIQuiz={() => setActiveTab("aiquiz")}
            />
          )}

          {activeTab === "coursequiz" && (
            <div className="w-full flex justify-center">
              {quizState === "runner" && activeQuiz ? (
                <QuizRunner
                  quiz={activeQuiz}
                  onComplete={handleCourseQuizComplete}
                  onCancel={() => setActiveTab("skillgaps")}
                />
              ) : (
                <QuizResults
                  results={
                    quizResults || {
                      courseTitle: "Python for Statistical Analysis",
                      competencyId: "COMP-010",
                      competencyName: "Python",
                      correctCount: 5,
                      totalQuestions: 5,
                      unsureCount: 0,
                      scorePct: 100,
                      feedbackMessage:
                        "Outstanding performance! You've demonstrated high mastery of this module.",
                      competencyIncrease: 1.0,
                      questionDetails: [
                        {
                          questionId: "Q-001",
                          questionText:
                            "Which Python library is primarily used for tabular data manipulation?",
                          options: ["Pandas", "NumPy", "Matplotlib", "Flask"],
                          correctOption: 0,
                          userAnswer: 0,
                          isCorrect: true,
                          explanation:
                            "Pandas provides DataFrames and Series for structured tabular data manipulation.",
                        },
                      ],
                    }
                  }
                  onRetake={() => {
                    if (!activeQuiz) {
                      setActiveQuiz(getCourseQuiz("COURSE-001"));
                    }
                    setQuizState("runner");
                  }}
                  onReturnToLearning={() => setActiveTab("skillgaps")}
                />
              )}
            </div>
          )}

          {activeTab === "aiquiz" && (
            <AIQuizUploadPage
              onBackToDashboard={() => setActiveTab("skillgaps")}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-[#8C7B6B] max-w-md leading-relaxed">
          SkillStat AI — Professional, minimal, and timeless design.
          <br />
          Warm Neutral (Clean & Elegant) Theme • Person 4 Module
        </footer>
      </div>
    </div>
  );
}
