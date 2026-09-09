// src/services/quizService.js
//
// TEMPORARY MOCK LOGIC FOR QUIZZES
// When backend endpoints arrive (e.g. GET /quizzes/course/:id, POST /quizzes/submit),
// only the internals of these functions will update to fetch calls.

import courses from "../data/courses.json";
import questions from "../data/questions.json";
import competencies from "../data/competencies.json";

const getCompetencyName = (id) =>
  competencies.find((c) => c.id === id)?.name ?? id;

/**
 * Retrieves a quiz specifically for a given course.
 * Selects questions matching the course's primary competencyId,
 * padded with fallback questions if needed to reach target length (5-8 questions).
 */
export function getCourseQuiz(courseId) {
  const course = courses.find((c) => c.id === courseId) || courses[0];
  
  // Primary matching questions
  let matchedQuestions = questions.filter(
    (q) => q.competencyId === course.competencyId
  );

  // If matched questions are fewer than 5, grab related questions
  if (matchedQuestions.length < 5) {
    const extraQuestions = questions.filter(
      (q) => q.competencyId !== course.competencyId
    ).slice(0, 5 - matchedQuestions.length);
    matchedQuestions = [...matchedQuestions, ...extraQuestions];
  }

  const quizQuestions = matchedQuestions.slice(0, 6);

  return {
    course,
    competencyName: getCompetencyName(course.competencyId),
    questions: quizQuestions,
    estimatedMinutes: Math.max(3, Math.round(quizQuestions.length * 1)),
  };
}

/**
 * Scores a completed course quiz locally.
 * Returns score breakdown, strength/growth framing, and simulated competency update.
 */
export function scoreQuiz(quiz, answers) {
  let correctCount = 0;
  let unsureCount = 0;

  const questionDetails = quiz.questions.map((q) => {
    const userAnswer = answers[q.id];
    const isUnsure = userAnswer === "__unsure__";
    const isCorrect = userAnswer === q.correctOption;

    if (isUnsure) unsureCount++;
    else if (isCorrect) correctCount++;

    return {
      questionId: q.id,
      questionText: q.question,
      options: q.options,
      correctOption: q.correctOption,
      userAnswer,
      isCorrect,
      isUnsure,
      explanation: q.explanation,
    };
  });

  const totalQuestions = quiz.questions.length;
  const scorePct = Math.round((correctCount / totalQuestions) * 100);

  // Growth-oriented framing according to design guidelines
  let feedbackMessage = "";
  let competencyIncrease = 0;

  if (scorePct >= 80) {
    feedbackMessage = "Outstanding performance! You've demonstrated high mastery of this module.";
    competencyIncrease = 1.0;
  } else if (scorePct >= 60) {
    feedbackMessage = "Solid progress! You've mastered key concepts and are building real strength here.";
    competencyIncrease = 0.5;
  } else {
    feedbackMessage = "Great effort baseline! Review the explanation notes below to strengthen your grasp.";
    competencyIncrease = 0.25;
  }

  return {
    courseTitle: quiz.course.title,
    competencyId: quiz.course.competencyId,
    competencyName: quiz.competencyName,
    correctCount,
    totalQuestions,
    unsureCount,
    scorePct,
    feedbackMessage,
    competencyIncrease,
    questionDetails,
  };
}
