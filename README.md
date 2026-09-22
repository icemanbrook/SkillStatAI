# SkillStat AI — Manager & Admin Dashboard

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2-8884d8?style=for-the-badge)](https://recharts.org/)

Manager and Admin oversight dashboards for **SkillStat AI** — an AI-powered competency and skill-gap platform built for **SIH26101** (Smart India Hackathon, MoSPI, Smart Education theme).

This module is the organisation's oversight layer: it shows managers their own team's skill gaps, and shows admins the entire organisation's competency health, drilled down from department → manager → employee.

---

## 🌟 Features

| Feature | Description |
|---|---|
| **Live-calculated data** | Every count, average, and chart is computed from actual data relationships — nothing is hardcoded |
| **Role-based access** | Admins see the whole organisation; logged-in managers see only their own department and team |
| **Drill-down hierarchy** | Organisation → Department → Manager → Employee, with conditional single/multi-manager branching |
| **AI-generated insights** | Plain-English sentences auto-explaining each gap and its main driver |
| **Severity flagging** | Automatic "Critical" badges on any gap ≥ 40% |
| **Recommendation engine** | Suggested training tied to each person's weakest skill category, with 3 variants per category |
| **Human-in-the-loop review** | Admins can approve or request an alternative recommendation |
| **Natural-language query box** | Ask questions like *"which department is worst?"* and get an instant answer |
| **Department comparison** | Select any combination of departments and compare across all 4 skill domains |
| **Spotlight callout** | Automatically surfaces the single worst-performing department |
| **Skyline visualization** | At-a-glance bar chart summarising every department's gap |
| **Breadcrumb navigation** | Context-aware trail — different for admin vs. logged-in manager views |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | UI framework and build tool |
| Tailwind CSS | Styling |
| Recharts | Bar charts, radar charts |
| Framer Motion | Page transitions and micro-interactions |
| Lucide React | Icons |
| React Router | Routing |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

---

## 🔐 Demo Login

The Manager side requires login. Use any of these demo credentials:

| Username | Password | Manager | Department |
|---|---|---|---|
| `john.doe` | `pass123` | John Doe | Labour Statistics |
| `sarah.smith` | `pass123` | Sarah Smith | Price Statistics |
| `mike.johnson` | `pass123` | Mike Johnson | Price Statistics |
| `anita.kumar` | `pass123` | Anita Kumar | National Accounts |
| `ravi.shah` | `pass123` | Ravi Shah | Survey Design |

Admin side requires no login — just visit `/admin`.

---

## 📁 Project Structure

---

## 📄 Key Pages / Routes

| Route | Description |
|---|---|
| `/admin` | Organisation overview — skyline chart, query box, spotlight callout, department tiles |
| `/admin/department/:id` | Department detail — gap breakdown, insight, managers |
| `/admin/manager/:id` | Manager detail (admin view) |
| `/admin/manager/:id/employees` | Manager's team list |
| `/admin/employee/:id` | Individual employee detail — radar chart, recommendation |
| `/admin/compare` | Compare multiple departments side by side |
| `/login` | Manager login |
| `/manager` | Logged-in manager's own dashboard |
| `/manager/employees` | Logged-in manager's team list |

---

## 🧠 Known Simplifications

- Authentication is client-side only (no real backend yet) — intended to connect to the team's backend service
- All data is mock, structured to match the shape a real API would return
- Recommendations are a rule-based lookup, not a live LLM call — designed to demonstrate the concept

---

## 👥 Part of SkillStat AI

This is Person 3's module in a 4-person SIH26101 team build. See the other branches in this repository for the Employee Portal and Assessment modules.