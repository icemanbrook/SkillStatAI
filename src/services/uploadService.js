// src/services/uploadService.js
//
// MOCK SERVICE FOR FILE UPLOAD & AI QUIZ GENERATION PIPELINE
// Simulates the pipeline: File Upload -> Text Extraction -> LLM Processing -> Structured Quiz JSON
// When backend endpoints arrive (POST /ai/generate-quiz), this service will handle actual API calls.

/**
 * Validates uploaded file type and size.
 * Supported: PDF, PPT, PPTX, DOC, DOCX
 */
export function validateUploadFile(file) {
  if (!file) {
    return { valid: false, error: "No file selected." };
  }

  const validExtensions = [".pdf", ".ppt", ".pptx", ".doc", ".docx"];
  const fileName = file.name.toLowerCase();
  const isValidExtension = validExtensions.some((ext) => fileName.endsWith(ext));

  if (!isValidExtension) {
    return {
      valid: false,
      error: "Unsupported file format. Please upload a PDF, PPT, or DOCX document.",
    };
  }

  const maxSizeMB = 25;
  if (file.size > maxSizeMB * 1024 * 1024) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit. Please upload a smaller file.`,
    };
  }

  return { valid: true, error: null };
}

/**
 * Simulates async processing steps for extracting questions from an uploaded document.
 * Calls onProgress(stepIndex, stepText) at key state transitions.
 */
export async function simulateAIQuizGeneration(file, onProgress) {
  const steps = [
    { delay: 800, text: "Uploading document securely..." },
    { delay: 1200, text: "Extracting text & structure from document..." },
    { delay: 1400, text: "Analyzing key statistical & domain concepts..." },
    { delay: 1200, text: "Generating custom multiple-choice questions..." },
    { delay: 800, text: "Validating question difficulty & explanations..." },
  ];

  for (let i = 0; i < steps.length; i++) {
    if (onProgress) onProgress(i, steps[i].text);
    await new Promise((resolve) => setTimeout(resolve, steps[i].delay));
  }

  // Generate realistic, document-tailored mock questions based on file name
  const docTitle = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");

  const generatedQuiz = {
    id: `ai-quiz-${Date.now()}`,
    sourceFileName: file.name,
    title: `AI Generated Quiz: ${docTitle}`,
    estimatedMinutes: 5,
    questions: [
      {
        id: "AI-Q1",
        question: `Based on '${file.name}', what is the primary objective of systematic data collection in official statistics?`,
        options: [
          "To eliminate all qualitative observations",
          "To ensure standard, unbiased, and reproducible measurement",
          "To speed up publishing without validation",
          "To replace administrative data entirely"
        ],
        correctOption: 1,
        explanation: "Systematic data collection ensures consistent measurement, minimizes bias, and supports statistical reliability."
      },
      {
        id: "AI-Q2",
        question: `According to the key concepts in '${docTitle}', which indicator best reflects sample variance precision?`,
        options: [
          "Standard Error (SE)",
          "Response Rate",
          "Sample Frame Count",
          "Skewness Index"
        ],
        correctOption: 0,
        explanation: "Standard error quantifies the variability of a sample statistic relative to the true population parameter."
      },
      {
        id: "AI-Q3",
        question: "When evaluating data quality, 'completeness' is defined as:",
        options: [
          "The speed at which data is collected",
          "The proportion of expected data values that are successfully recorded",
          "The format of the database table",
          "The encryption key strength"
        ],
        correctOption: 1,
        explanation: "Completeness measures whether all required data items are present in the dataset."
      },
      {
        id: "AI-Q4",
        question: "Which approach is recommended to handle missing data without introducing systematic bias?",
        options: [
          "Deleting all incomplete records automatically",
          "Valid imputation using domain knowledge or model-based methods",
          "Setting missing values to zero",
          "Ignoring missing fields during aggregation"
        ],
        correctOption: 1,
        explanation: "Principled imputation methods protect against sample bias introduced by listwise deletion."
      },
      {
        id: "AI-Q5",
        question: "What is the key benefit of automated AI quiz extraction for training materials?",
        options: [
          "It replaces human mentors completely",
          "It instantly converts passive reading into active retrieval practice",
          "It forces mandatory exam deadlines",
          "It locks access to the document"
        ],
        correctOption: 1,
        explanation: "Active retrieval practice significantly boosts long-term retention compared to passive reading."
      }
    ]
  };

  return generatedQuiz;
}
