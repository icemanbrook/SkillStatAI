SkillStat AI — Person 4 Module

> **AI-Powered Competency & Skill-Gap Platform**  
> A low-anxiety, psychological-safety-first digital experience for evaluating employee skills, mapping skill gaps, delivering targeted course quizzes, and generating AI quizzes from learning materials.

Overview

**SkillStat AI** is designed to transform traditional high-stakes employee testing into a supportive, mentor-driven learning journey. Grounded in psychological safety and growth mindset principles, the system eliminates test anxiety while tracking competency progression across official statistical, technical, digital governance, and managerial domains.

The Core Product Loop


EMPLOYEE → BASELINE ASSESSMENT → COMPETENCY SCORE → SKILL GAP → RECOMMENDED COURSE → QUIZ → COMPETENCY UPDATE

Key Features (Person 4 Responsibilities)

1.  Baseline Assessment System
- **Single-Card Focus Mode**: Minimalist view containing only the single question card and essential navigation, removing distraction clutter.
- **Safe Option Strategy**: Guilt-free answer choice (*"I haven't learned this concept yet / Unsure"*) to discourage forced guessing.
- **Collapsible Time Estimate**: Toggleable timer estimate (~10 mins total) replacing ticking countdown clocks.
- **Strength-First Results Framing**: Performance broken down as **"Your Current Superpowers"** and **"Your Next Opportunities for Growth"**.

2.  Skill Gap Intelligence & Growth Roadmap
- **Formula**: `Required Level − Current Level = Skill Gap`
- **Gap Classification**: Categorized into `No Gap`, `Low`, `Moderate`, and `High`.
- **Targeted Recommendations**: Connects identified skill gaps directly to relevant courses (`courses.json`).

3. Post-Learning Quiz Engine
- **Course-Specific Quizzes**: Evaluates knowledge after course completion.
- **Competency Progression Tracking**: Shows level increases (e.g. `+0.5 / +1.0 Level Progression`) feeding back into the competency system.
- **Question Explanation Drawers**: Detailed breakdown of answers and explanations upon quiz completion.

4. File → AI Quiz Generator
- **Multi-Format Support**: Drag-and-drop uploader supporting **PDF**, **PPT/PPTX**, and **DOC/DOCX** (up to 25MB).
- **Multi-Step Processing Pipeline**: Simulates text extraction, concept analysis, and structured quiz question generation.
- **Interactive Quiz Runner**: Reuses the core quiz runner engine for seamless active retrieval practice.

5. Mountain Trail Visual Progression Mechanic
- **Interactive Climbing**: An SVG mountain trail darkens and climbs as questions are answered.
- **Summit Flag Hoisting (≥70% Score)**: Reaching the mountain peak hoists a red victory flag at the summit alongside the heart pill badge: *"New Skills Higher Horizons!"*.
- **Basecamp Retreat (<50% Score)**: In low-score evaluations, the trail retreats back toward basecamp with encouraging microcopy (*"Basecamp reached — ready to ascend again!"*).

Design Philosophy: Warm Neutral (Clean & Elegant)

**Color Palette**:
  - Primary Warm Earthy Brown: `#8C7355` / `#94785F`
  - Page Background: Warm Alabaster Cream (`#FAF6F0`)
  - Card & Accent Backgrounds: Warm Sand (`#F5EFE6`)
  - Text & Headings: Deep Warm Charcoal (`#36302B`)
- **Background Graphics**: Layered SVG mountain silhouette vectors framing the viewport.
- **Typography**: Clean sans-serif UI paired with elegant serif headings (`Georgia`).

---

## Repository Structure

```
skillstat-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx                     # Top Tab Switcher & Integrated Story Navigator
│   ├── index.css                   # Tailwind & Design Tokens
│   │
│   ├── data/                       # Demo Datasets
│   │   ├── competencies.json       # Skill definitions & categories
│   │   ├── job_roles.json          # Job roles & required competency levels
│   │   ├── employees.json          # Demo user profiles (Ananya Rao)
│   │   ├── questions.json          # 30+ multiple-choice questions & explanations
│   │   ├── courses.json            # Course metadata & competency mappings
│   │   └── nssta_programmes.json   # Training programme references
│   │
│   ├── services/                   # Decoupled Service Layer
│   │   ├── assessmentService.js    # Baseline test selection & mock scoring
│   │   ├── quizService.js          # Course quiz selection & competency updates
│   │   └── uploadService.js        # File validation & AI quiz pipeline
│   │
│   ├── components/                 # Reusable UI Components
│   │   ├── MountainTrailWidget.jsx # Mountain trail climbing & flag hoisting
│   │   ├── QuestionCard.jsx        # Single-card focus mode with safe options
│   │   ├── QuizCard.jsx            # Quiz card with explanation review
│   │   ├── FileUploader.jsx        # Drag & drop uploader with state machine
│   │   ├── ProgressBar.jsx         # Stepped progress indicator
│   │   ├── SkillGapBar.jsx         # Required vs Current level visual bar
│   │   └── SubmitConfirmation.jsx  # Non-destructive submission modal
│   │
│   └── pages/                      # Application Page Views
│       ├── Assessment/             # Baseline Landing & Runner
│       ├── Results/                # Baseline Assessment Results
│       ├── SkillGaps/              # Skill Gap Display & Course Roadmap
│       ├── Quiz/                   # Course Quiz Runner & Quiz Results
│       └── AIQuizUpload/           # File → AI Quiz Workflow Page
```
### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- `npm` package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/icemanbrook/SkillStatAI.git
   cd SkillStatAI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173`

---

## 🛠️ Production Build Verification

To test compilation and build output:

```bash
npm run build
```

Production bundle outputs to `dist/`:
```
dist/index.html                   0.59 kB
dist/assets/index-BWWxiTDr.css   18.98 kB
dist/assets/index-CZFsqYTc.js   218.65 kB
✓ Built successfully in 4.46s
```

---

##  Authoritative Scoring Note

As specified in the project contract:
- The backend remains the authoritative source of truth for competency scores.
- Frontend percentage scores are demo estimations only; competency level updates are decoupled via `services/` to seamlessly swap mock data for backend REST endpoints (`GET /assessments`, `POST /quizzes/submit`, `POST /ai/generate-quiz`).


##  License

This project is created for the **SkillStat AI** competency development platform.
