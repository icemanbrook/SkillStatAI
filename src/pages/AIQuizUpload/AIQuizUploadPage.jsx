// src/pages/AIQuizUpload/AIQuizUploadPage.jsx
import React, { useState } from "react";
import FileUploader from "../../components/FileUploader";
import QuizRunner from "../Quiz/QuizRunner";
import QuizResults from "../Quiz/QuizResults";
import { simulateAIQuizGeneration } from "../../services/uploadService";
import { scoreQuiz } from "../../services/quizService";
import { Sparkles, CheckCircle2, Play, RefreshCw, ArrowLeft } from "lucide-react";

export default function AIQuizUploadPage({ onBackToDashboard }) {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | processing | ready | running | results
  const [progressText, setProgressText] = useState("");
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  const warmBrown = "#8C7355";

  const handleFileSelect = (selectedFile, error) => {
    if (error) {
      setErrorMessage(error);
      setFile(null);
      return;
    }
    setErrorMessage("");
    setFile(selectedFile);
  };

  const handleStartGeneration = async () => {
    if (!file) return;
    setStatus("processing");
    setErrorMessage("");

    try {
      const quiz = await simulateAIQuizGeneration(file, (stepIdx, text) => {
        setProgressText(text);
      });
      setGeneratedQuiz(quiz);
      setStatus("ready");
    } catch (err) {
      setErrorMessage("Failed to generate quiz from document. Please try again.");
      setStatus("idle");
    }
  };

  const handleUseSampleFile = () => {
    const sampleFile = new File(
      ["Sample survey methodology content"],
      "Sampling_Design_Guidelines_2026.pdf",
      { type: "application/pdf" }
    );
    handleFileSelect(sampleFile, null);
  };

  const handleQuizComplete = (answers) => {
    const scoreData = scoreQuiz(
      {
        course: { title: generatedQuiz.title, competencyId: "COMP-002" },
        competencyName: "Sampling & Methodology",
        questions: generatedQuiz.questions,
      },
      answers
    );
    setQuizResults(scoreData);
    setStatus("results");
  };

  if (status === "running" && generatedQuiz) {
    return (
      <QuizRunner
        quiz={generatedQuiz}
        onComplete={handleQuizComplete}
        onCancel={() => setStatus("ready")}
      />
    );
  }

  if (status === "results" && quizResults) {
    return (
      <QuizResults
        results={quizResults}
        onRetake={() => setStatus("running")}
        onReturnToLearning={() => {
          setStatus("idle");
          setFile(null);
          setGeneratedQuiz(null);
          if (onBackToDashboard) onBackToDashboard();
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white p-7 md:p-9 rounded-3xl border border-[#EAE3DA] shadow-sm">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-5 border-b border-[#EAE3DA] mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#8C7355] flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#36302B]" style={{ fontFamily: "'Georgia', serif" }}>
              AI Quiz Generator
            </h2>
            <p className="text-xs text-[#786558]">Upload learning material to generate instant practice quizzes</p>
          </div>
        </div>

        {onBackToDashboard && (
          <button
            type="button"
            onClick={onBackToDashboard}
            className="text-xs text-[#786558] hover:text-[#36302B] flex items-center gap-1"
          >
            <ArrowLeft size={14} /> Back
          </button>
        )}
      </div>

      {/* Main Upload Box or Generated Quiz Card */}
      {status === "ready" && generatedQuiz ? (
        <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#EAE3DA] mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F5EFE6] text-[#8C7355] mb-2">
                <CheckCircle2 size={13} />
                Quiz Generated
              </span>
              <h3 className="text-lg font-semibold text-[#36302B]">{generatedQuiz.title}</h3>
              <p className="text-xs text-[#786558] mt-0.5">
                Extracted {generatedQuiz.questions.length} questions from <span className="font-medium text-[#36302B]">{generatedQuiz.sourceFileName}</span>
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {generatedQuiz.questions.map((q, idx) => (
              <div key={idx} className="p-3 bg-white rounded-xl border border-[#EAE3DA] text-xs text-[#36302B] flex items-center justify-between">
                <span className="font-medium truncate max-w-md">Q{idx + 1}: {q.question}</span>
                <span className="text-[11px] text-[#8C7355] bg-[#F5EFE6] px-2 py-0.5 rounded-md shrink-0">4 options</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setFile(null);
                setGeneratedQuiz(null);
              }}
              className="px-4 py-2.5 rounded-xl border border-[#EAE3DA] text-xs font-medium text-[#4A4036] hover:bg-white flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Upload another file
            </button>

            <button
              type="button"
              onClick={() => setStatus("running")}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-white flex items-center gap-2 transition-colors shadow-xs"
              style={{ background: warmBrown }}
            >
              <Play size={16} /> Start AI Quiz
            </button>
          </div>
        </div>
      ) : (
        <>
          <FileUploader
            onFileSelect={handleFileSelect}
            status={status}
            progressText={progressText}
            errorMessage={errorMessage}
          />

          {/* Quick Demo Option */}
          {status === "idle" && !file && (
            <div className="mt-4 text-center">
              <span className="text-xs text-[#8C7B6B]">Don't have a document handy? </span>
              <button
                type="button"
                onClick={handleUseSampleFile}
                className="text-xs font-semibold text-[#8C7355] underline hover:text-[#574B40] ml-1"
              >
                Use sample PDF (Sampling_Design_Guidelines.pdf)
              </button>
            </div>
          )}

          {/* Action Button */}
          {file && status === "idle" && (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleStartGeneration}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-xs hover:opacity-95"
                style={{ background: warmBrown }}
              >
                <Sparkles size={18} />
                Generate AI Quiz from File
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
