// src/services/assessmentService.js
//
// TEMPORARY MOCK LOGIC. Every function here reads from local JSON.
// When the backend contract is ready, only the *insides* of these functions
// change to fetch() calls — no component that imports this file should need editing.

import competencies from "../data/competencies.json";
import jobRoles from "../data/job_roles.json";
import questions from "../data/questions.json";
import employees from "../data/employees.json";

// --- helpers -------------------------------------------------

const getLoggedInEmployee = () =>
  employees.find((e) => e.isDemoLoggedInUser) || employees[0];

const getRoleById = (roleId) => jobRoles.find((r) => r.id === roleId);

const getCompetencyName = (id) =>
  competencies.find((c) => c.id === id)?.name ?? id;

const ASSESSMENT_LENGTH = 10;

/**
 * Deterministically picks up to `targetCount` questions, spread as evenly as
 * possible across the given competencies, so every required competency gets
 * represented before any one competency gets a second question.
 *
 * Deterministic by construction: no randomness anywhere. `requiredCompetencies`
 * is read in the fixed order it appears in job_roles.json, and each
 * competency's own question pool keeps questions.json's existing order
 * (which is already sorted by question id). Same inputs -> same 10 questions,
 * every run, every demo.
 *
 * Round-robin: round 0 takes each pool's 1st question, round 1 takes each
 * pool's 2nd question, and so on, skipping any pool that's run out — until
 * `targetCount` questions are collected or every pool is exhausted.
 */
function selectBalancedQuestions(requiredCompetencies, allQuestions, targetCount = ASSESSMENT_LENGTH) {
  const pools = requiredCompetencies.map(({ competencyId }) =>
    allQuestions.filter((q) => q.competencyId === competencyId)
  );

  const selected = [];
  let round = 0;

  while (selected.length < targetCount) {
    const beforeThisRound = selected.length;

    for (const pool of pools) {
      if (selected.length >= targetCount) break;
      if (pool[round]) selected.push(pool[round]);
    }

    if (selected.length === beforeThisRound) break; // every pool exhausted
    round += 1;
  }

  return selected;
}

// --- public service functions ---------------------------------

/**
 * Returns the assessment definition for the logged-in employee's role:
 * role info + a balanced, fixed-length question set covering that role's
 * required competencies.
 * MOCK: selects a deterministic 10-question subset locally.
 * Later: GET /assessments/baseline?employeeId=...
 */
export function getBaselineAssessment() {
  const employee = getLoggedInEmployee();
  const role = getRoleById(employee.jobRoleId);

  const assessmentQuestions = selectBalancedQuestions(role.competencies, questions);

  return {
    employee,
    role,
    questions: assessmentQuestions,
    estimatedMinutes: Math.max(5, Math.round(assessmentQuestions.length * 1)),
  };
}

/**
 * Scores a completed assessment locally.
 * IMPORTANT: this percentage is a DEMO score only. It is never treated as an
 * authoritative competency level — that mapping belongs to the backend.
 * Later: POST /assessments/baseline/submit  { employeeId, answers }
 */
export function scoreAssessment(assessmentQuestions, answers) {
  const byCompetency = {};

  assessmentQuestions.forEach((q) => {
    const bucket = (byCompetency[q.competencyId] ||= {
      competencyId: q.competencyId,
      name: getCompetencyName(q.competencyId),
      correct: 0,
      total: 0,
      unsure: 0,
    });
    bucket.total += 1;
    if (answers[q.id] === "__unsure__") {
      bucket.unsure += 1;
    } else if (answers[q.id] === q.correctOption) {
      bucket.correct += 1;
    }
  });

  const perCompetency = Object.values(byCompetency).map((b) => ({
    ...b,
    pct: Math.round((b.correct / b.total) * 100),
  }));

  const overallCorrect = perCompetency.reduce((s, c) => s + c.correct, 0);
  const overallTotal = assessmentQuestions.length;

  return {
    overallCorrect,
    overallTotal,
    overallPct: Math.round((overallCorrect / overallTotal) * 100),
    perCompetency,
    strengths: [...perCompetency].sort((a, b) => b.pct - a.pct).slice(0, 3),
    growthAreas: [...perCompetency].sort((a, b) => a.pct - b.pct).slice(0, 3),
  };
}

// --- skill gaps --------------------------------------------------
//
// !! TEMPORARY / DEMO-ONLY LOGIC !!
// The real product formula is:  Required Level − Current Level = Gap
// "Current Level" is supposed to be an authoritative competency level that
// only the backend's scoring logic may set (see project contract — AI/frontend
// must never set this directly). Until that endpoint exists, this function
// derives a rough stand-in current level from the local quiz percentage
// (0–100% -> a 0–4 level) purely so this screen has something to render.
// Replace the inside of this function with the backend's real current-level
// values as soon as they're available — nothing downstream should need to change.
export function classifyGap(gap) {
  if (gap <= 0) return "No gap";
  if (gap === 1) return "Low";
  if (gap === 2) return "Moderate";
  return "High";
}

export function computeSkillGaps(score, role) {
  return role.competencies.map(({ competencyId, requiredLevel }) => {
    const comp = score.perCompetency.find((c) => c.competencyId === competencyId);
    const currentLevel = comp ? Math.round((comp.pct / 100) * 4) : 0; // MOCK mapping
    const gap = Math.max(0, requiredLevel - currentLevel);
    return {
      competencyId,
      name: getCompetencyName(competencyId),
      requiredLevel,
      currentLevel,
      gap,
      classification: classifyGap(gap),
    };
  }).sort((a, b) => b.gap - a.gap);
}
