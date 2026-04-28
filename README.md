# GrowO — Complete Project Guide

**AI-powered growth tracker for developers**
_Grow every day. Go every day._

---

## Cost Summary — $0 to Launch

| Item                     | Cost             | Notes                          |
| ------------------------ | ---------------- | ------------------------------ |
| Vercel (frontend)        | $0 forever       | Auto-deploy from GitHub        |
| MongoDB Atlas            | $0 forever       | 512MB free tier                |
| GitHub                   | $0 forever       | Public repo                    |
| Render.com (backend)     | $0               | Free tier — cold start on idle |
| Gemini API (AI)          | $0 until October | You already have Pro           |
| Deepseek API (after Oct) | ~$0              | Extremely cheap                |
| Stripe                   | $0 monthly       | 2.9% only when you earn        |
| Resend (email)           | $0               | 3000 emails/month free         |
| Domain                   | $0               | Use growo.vercel.app to start  |
| **Total launch cost**    | **$0**           |                                |

### AI Provider Roadmap

| Phase                 | Provider                    | Cost               | When                          |
| --------------------- | --------------------------- | ------------------ | ----------------------------- |
| Launch → October 2025 | Gemini 1.5 Pro (free)       | $0                 | Use existing Pro subscription |
| October 2025 onwards  | Deepseek V3                 | ~$0                | Cheapest quality alternative  |
| Scale stage           | Claude Haiku or GPT-4o mini | Covered by revenue | When Pro users grow           |

> Swapping AI providers = changing only `server/services/ai.service.js` and `.env`.
> Nothing else in the project changes.

---

## GitHub Repository

**Primary:** `growo`
**Fallback:** `growo-app`
**Visibility:** Public (builds credibility, free CI/CD)
**Description:** `AI-powered growth tracker for developers. Grow every day. Go every day.`
**Topics:** `mern` `react` `nodejs` `mongodb` `ai` `habit-tracker` `developer-tools` `productivity`

---

## Tech Stack

| Layer           | Technology        | Why                               |
| --------------- | ----------------- | --------------------------------- |
| Frontend        | React 18 + Vite   | Fast, modern, great DX            |
| Styling         | Tailwind CSS v3   | Rapid UI, no CSS files            |
| State           | Zustand           | Simple, lightweight               |
| Charts          | Recharts          | Perfect for contribution graphs   |
| Backend         | Node.js + Express | Your MERN strength                |
| Database        | MongoDB Atlas     | Free tier, flexible               |
| Auth            | JWT + bcrypt      | Simple, no third-party cost       |
| AI (launch)     | Gemini 1.5 Pro    | Free with your existing Pro plan  |
| AI (after Oct)  | Deepseek V3       | Near-zero cost, excellent quality |
| Email           | Resend.com        | 3000 emails/month free            |
| Payments        | Stripe            | Industry standard                 |
| Deploy Frontend | Vercel            | Free, auto-deploy from GitHub     |
| Deploy Backend  | Render.com        | Free tier to start                |

---

## Full Project Structure

```
growo/
├── client/                           # React frontend (Vite)
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/                   # Logo, images, icons
│   │   ├── components/
│   │   │   ├── ui/                   # Base reusable components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   └── BlurGate.jsx      # Soft-gate blur overlay component
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── PageWrapper.jsx
│   │   │   ├── habits/
│   │   │   │   ├── HabitCard.jsx
│   │   │   │   ├── HabitForm.jsx
│   │   │   │   ├── HabitList.jsx
│   │   │   │   └── CheckInButton.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── ContributionGraph.jsx
│   │   │   │   ├── StatsCard.jsx
│   │   │   │   ├── StreakCounter.jsx
│   │   │   │   └── TodayProgress.jsx
│   │   │   ├── ai/
│   │   │   │   ├── CoachPanel.jsx
│   │   │   │   ├── CoachMessage.jsx
│   │   │   │   ├── WeeklySummary.jsx
│   │   │   │   └── InsightBlur.jsx   # Blurred insight teaser
│   │   │   ├── upgrade/              # All upgrade trigger components
│   │   │   │   ├── UpgradeModal.jsx  # Reusable upgrade prompt modal
│   │   │   │   ├── UpgradeBanner.jsx
│   │   │   │   └── FeatureGate.jsx   # Wraps Pro features with gate logic
│   │   │   └── auth/
│   │   │       ├── LoginForm.jsx
│   │   │       └── RegisterForm.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx           # Public landing page
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx         # Today's habits + stats
│   │   │   ├── Habits.jsx            # Habit management
│   │   │   ├── Analytics.jsx         # Charts, graph, AI insights
│   │   │   ├── Coach.jsx             # AI coach chat (Pro)
│   │   │   ├── Settings.jsx
│   │   │   └── Upgrade.jsx           # Pricing page
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useHabits.js
│   │   │   ├── useStreak.js
│   │   │   └── useUpgrade.js         # Controls upgrade modal trigger logic
│   │   ├── store/
│   │   │   ├── authStore.js
│   │   │   ├── habitStore.js
│   │   │   └── upgradeStore.js       # Tracks summaries used, messages used
│   │   ├── services/
│   │   │   ├── api.js                # Axios instance + interceptors
│   │   │   ├── authService.js
│   │   │   ├── habitService.js
│   │   │   └── aiService.js
│   │   ├── utils/
│   │   │   ├── dateUtils.js
│   │   │   ├── streakUtils.js
│   │   │   └── formatters.js
│   │   ├── constants/
│   │   │   ├── habits.js             # Developer habit templates
│   │   │   └── plans.js              # Free vs Pro limits — single source of truth
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/
│   ├── config/
│   │   ├── db.js                     # MongoDB connection
│   │   └── constants.js              # Mirror of client plans.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Habit.js
│   │   ├── HabitLog.js
│   │   └── Subscription.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── habit.routes.js
│   │   ├── log.routes.js
│   │   ├── ai.routes.js
│   │   └── subscription.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── habit.controller.js
│   │   ├── log.controller.js
│   │   ├── ai.controller.js
│   │   └── subscription.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js        # JWT verification
│   │   ├── pro.middleware.js         # Hard gate for Pro-only endpoints
│   │   └── error.middleware.js       # Global error handler
│   ├── services/
│   │   ├── ai.service.js             # AI provider — swap here only
│   │   ├── streak.service.js
│   │   ├── email.service.js
│   │   └── stripe.service.js
│   ├── utils/
│   │   └── logger.js
│   ├── app.js                        # Express app setup
│   └── server.js                     # Entry point
│
├── .env.example
├── .gitignore
└── README.md
```

---

## Database Schema

### User

```js
{
  _id,
  email,
  password,                  // bcrypt hashed
  name,
  username,
  plan: 'free' | 'pro',
  stripeCustomerId,
  aiSummariesUsed: Number,   // lock after 2 for free users
  aiMessagesUsed:  Number,   // preview 3 then soft gate for free users
  createdAt,
  updatedAt
}
```

### Habit

```js
{
  _id,
  userId,
  title,           // e.g. "LeetCode daily"
  description,
  category,        // 'coding'|'learning'|'health'|'reading'|'custom'(Pro only)
  frequency,       // 'daily'|'weekdays'|'custom'
  targetDays: [],  // [1,2,3,4,5] = Mon-Fri
  color,
  icon,
  isActive: true,
  createdAt
}
```

### HabitLog

```js
{
  _id,
  userId,
  habitId,
  date,            // 'YYYY-MM-DD'
  completed: Boolean,
  note,            // optional
  mood: 1-5,       // optional
  createdAt
}
```

### Subscription

```js
{
  _id,
  userId,
  stripeSubscriptionId,
  status: 'active' | 'cancelled' | 'past_due',
  plan: 'monthly' | 'yearly',
  currentPeriodEnd,
  createdAt
}
```

---

## Freemium Strategy — Value First, Gate Second

> Golden rule: User must feel "this is genuinely useful" BEFORE any paywall.

### Feature Table

| Feature             | Free                   | Pro ($4.99/mo)  | Gate Type                    |
| ------------------- | ---------------------- | --------------- | ---------------------------- |
| Habits              | 5 max                  | Unlimited       | Hard — prompt at 6th attempt |
| Daily check-in      | ✅ Full                | ✅ Full         | Never gated                  |
| Streak tracking     | ✅ Full                | ✅ Full         | Never gated                  |
| Contribution graph  | ✅ Last 30 days        | ✅ All-time     | Tied to analytics history    |
| AI weekly summary   | 2 free → locked        | ✅ Every week   | Soft — taste value first     |
| AI coach chat       | 3 messages → blurred   | ✅ Unlimited    | Soft — mid-conversation gate |
| Analytics history   | 7 days                 | All-time        | Hard — loss aversion         |
| AI pattern insights | 1 shown → rest blurred | ✅ Full         | Soft — curiosity gate        |
| Reminders           | 1 daily                | Smart AI timing | Soft                         |
| Custom categories   | 4 defaults             | Fully custom    | Hard                         |
| Export data         | ❌                     | ✅ CSV          | Weak trigger — not promoted  |

### The 5 Upgrade Trigger Moments

Show upgrade prompt ONLY at these exact moments. Never interrupt cold users.

**Trigger 1 — Habit wall**

- When: User tries to add a 6th habit
- Message: _"You've built 5 habits — you're on a roll! Unlock unlimited habits to keep growing."_
- Why: Peak engagement — user is fully invested

**Trigger 2 — AI summary gate**

- When: User tries to view their 3rd weekly summary
- Message: _"Your Week 3 AI insight is ready → Upgrade to unlock your full coaching report."_
- Why: User already experienced AI value twice — they know it's worth it

**Trigger 3 — AI coach chat limit**

- When: User sends their 4th message to AI coach
- Message: _"You've seen what your AI coach can do. Go Pro to keep the conversation going."_
- Why: User is mid-conversation — highest intent moment possible

**Trigger 4 — Analytics data loss**

- When: User tries to view analytics beyond 7 days
- Message: _"Your progress from 3 weeks ago is no longer visible. Upgrade to keep your full history."_
- Why: Loss aversion — people fear losing more than they desire gaining

**Trigger 5 — Blurred insight**

- When: User opens analytics page
- Action: Show 1 AI insight clearly → blur remaining 2-3 with overlay
- Message: _"Your AI found 2 more patterns in your habits → Upgrade to see what they are."_
- Why: Curiosity is irresistible when the answer exists but is hidden

### Soft Gate vs Hard Gate

**Soft gate** (blur/preview): AI coach, AI insights, weekly summary teaser
→ Always show partial value first, then overlay upgrade prompt

**Hard gate** (full block): 6th habit, analytics beyond 7 days
→ Natural walls user walks into at peak engagement

---

## constants/plans.js — Single Source of Truth

```js
// client/src/constants/plans.js
// Mirror exactly in server/config/constants.js

export const PLANS = {
  free: {
    maxHabits: 5,
    aiSummariesAllowed: 2,
    aiMessagesPreview: 3,
    analyticsHistoryDays: 7,
    contributionGraphDays: 30,
    insightsPreview: 1,
    defaultCategories: ["coding", "learning", "health", "reading"],
  },
  pro: {
    maxHabits: Infinity,
    aiSummariesAllowed: Infinity,
    aiMessagesPreview: Infinity,
    analyticsHistoryDays: Infinity,
    contributionGraphDays: Infinity,
    insightsPreview: Infinity,
    defaultCategories: "custom",
  },
};
```

---

## Developer Habit Templates

Pre-load on registration — no empty state on day one.

```js
// client/src/constants/habits.js
export const DEVELOPER_HABIT_TEMPLATES = [
  {
    title: "LeetCode / DSA practice",
    category: "coding",
    icon: "🧠",
    color: "#F59E0B",
  },
  {
    title: "Build my side project",
    category: "coding",
    icon: "🚀",
    color: "#6366F1",
  },
  {
    title: "Read tech articles / docs",
    category: "learning",
    icon: "📖",
    color: "#10B981",
  },
  {
    title: "GitHub commit streak",
    category: "coding",
    icon: "🐙",
    color: "#1D4ED8",
  },
  {
    title: "No-screen focus hour",
    category: "health",
    icon: "🧘",
    color: "#EC4899",
  },
];
```

---

## AI Service — Gemini Integration (Launch Version)

````js
// server/services/ai.service.js
// CURRENT PROVIDER: Gemini 1.5 Pro (free with Google AI Studio)
// TO SWAP PROVIDER: Only change this file + .env — nothing else changes

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// ─── Weekly Summary ───────────────────────────────────────────────────────────
export const generateWeeklySummary = async (user, habits, logs) => {
  const habitSummary = habits
    .map((h) => {
      const weekLogs = logs.filter((l) => l.habitId === h._id.toString());
      const completed = weekLogs.filter((l) => l.completed).length;
      return `- ${h.title}: completed ${completed}/7 days`;
    })
    .join("\n");

  const prompt = `
You are a supportive AI growth coach for developers.
Tone: encouraging, specific, honest — like a senior dev mentor who genuinely cares.
Never be generic. Never say "great job" without a specific reason.

Developer: ${user.name}
This week's habit data:
${habitSummary}

Write a weekly coaching summary that:
1. Acknowledges what they actually did (use specific numbers)
2. Identifies ONE pattern from their data — good or bad
3. Gives ONE specific actionable suggestion for next week
4. Ends with a genuine short encouragement (1 sentence, not cheesy)

Keep it under 150 words. Sound human, not robotic.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

// ─── Coach Chat ───────────────────────────────────────────────────────────────
export const generateCoachReply = async (
  user,
  habits,
  recentLogs,
  userMessage,
) => {
  const context = habits
    .map((h) => {
      const last7 = recentLogs.filter((l) => l.habitId === h._id.toString());
      const rate = Math.round(
        (last7.filter((l) => l.completed).length / 7) * 100,
      );
      return `${h.title}: ${rate}% completion last 7 days`;
    })
    .join("\n");

  const prompt = `
You are GrowO's AI coach for developers building daily growth habits.
You have this developer's real data. Use it. Be specific. Never give generic advice.

Developer: ${user.name}
Current habit performance:
${context}

Their message: "${userMessage}"

Respond as a coach who knows their numbers. Be direct, specific, under 100 words.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

// ─── Pattern Insights ─────────────────────────────────────────────────────────
export const generateInsights = async (user, habits, logs) => {
  const summary = habits
    .map((h) => {
      const habitLogs = logs.filter((l) => l.habitId === h._id.toString());
      const completed = habitLogs.filter((l) => l.completed).length;
      const total = habitLogs.length;
      const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
      return `${h.title}: ${rate}% overall completion (${completed}/${total} days)`;
    })
    .join("\n");

  const prompt = `
You are analyzing a developer's habit data to find meaningful patterns.

Developer: ${user.name}
Habit data:
${summary}

Generate exactly 3 specific insights about their patterns.
Each insight must be:
- Based on the actual data
- Actionable or meaningful
- One sentence each

Return as a JSON array of strings: ["insight1", "insight2", "insight3"]
Return ONLY the JSON array, nothing else.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean); // returns array of 3 insight strings
};
````

### How to swap to Deepseek (after October)

```js
// server/services/ai.service.js — Deepseek version
// Deepseek uses OpenAI-compatible API format

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

export const generateWeeklySummary = async (user, habits, logs) => {
  // ... same prompt building logic ...
  const response = await client.chat.completions.create({
    model: "deepseek-chat",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 300,
  });
  return response.choices[0].message.content;
};
// generateCoachReply and generateInsights follow same pattern
```

### How to swap to Claude (scale stage)

```js
// server/services/ai.service.js — Claude version
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export const generateWeeklySummary = async (user, habits, logs) => {
  // ... same prompt building logic ...
  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });
  return message.content[0].text;
};
```

---

## Environment Variables

### server/.env

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d

# AI Provider — swap key here when changing provider
GEMINI_API_KEY=AIza...
# DEEPSEEK_API_KEY=sk-...       # uncomment after October
# ANTHROPIC_API_KEY=sk-ant-...  # uncomment at scale stage

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_MONTHLY=price_...
STRIPE_PRICE_ID_YEARLY=price_...

RESEND_API_KEY=re_...
FROM_EMAIL=hello@growo.app
CLIENT_URL=http://localhost:5173
```

### client/.env

```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## Build Phases

### Phase 1 — Foundation (Week 1)

Project setup, GitHub, env config, MongoDB, Express server running, React + Vite + Tailwind running, frontend connected to backend, deployed to Render + Vercel.

**Commits:**

```
chore: initialize project structure with client and server
chore: setup express server with mongodb connection
chore: setup react client with vite and tailwind
feat: add plan constants as single source of truth
feat: add health check endpoint and axios connection
chore: deploy backend to render and frontend to vercel
```

---

### Phase 2 — Authentication (Week 1–2)

User model (with AI usage tracking fields), register/login/logout, JWT middleware, auth UI, protected routes, Zustand auth store.

**Commits:**

```
feat: add user model with ai usage tracking fields
feat: add register and login endpoints with jwt
feat: add jwt auth middleware for protected routes
feat: add register and login pages with form validation
feat: add zustand auth store
feat: add protected route wrapper component
```

---

### Phase 3 — Core Habit System (Week 2–3)

Habit CRUD, developer templates loaded on first login, habit UI, 5-habit freemium limit with Trigger 1 upgrade prompt.

**Commits:**

```
feat: add habit model and crud endpoints
feat: add developer habit templates loaded on first login
feat: add habit list and creation ui
feat: add habit category and color selection
feat: add 5-habit freemium limit with upgrade trigger 1
```

---

### Phase 4 — Daily Check-in & Streaks (Week 3–4)

HabitLog model, check-in endpoints, one-tap check-in UI, streak calculation service, GitHub-style contribution graph.

**Commits:**

```
feat: add habit log model and daily check-in endpoint
feat: add streak calculation service
feat: add one-tap daily check-in ui
feat: add github-style contribution graph component
feat: add today progress and streak counter on dashboard
```

---

### Phase 5 — AI Coach with Gemini (Week 4–5)

Gemini API integration, weekly summary (2 free → Trigger 2), AI coach chat (3 message preview → Trigger 3), blurred insights component (Trigger 5).

**Commits:**

```
feat: add gemini ai service with prompt templates
feat: add weekly summary endpoint with 2-free soft gate
feat: add ai coach chat endpoint with 3-message preview
feat: add weekly summary card on dashboard with soft gate
feat: add ai coach chat panel with blur upgrade gate
feat: add blurred insight component for analytics trigger 5
```

---

### Phase 6 — Upgrade & Payments (Week 5–6)

Stripe integration, UpgradeModal, FeatureGate component, all 5 triggers wired up, Pro middleware, webhook handler.

**Commits:**

```
feat: add stripe subscription checkout endpoint
feat: add stripe webhook handler for subscription events
feat: add upgrade modal component
feat: add feature gate component for pro features
feat: add pricing and upgrade page
feat: wire all 5 upgrade trigger moments throughout app
feat: add pro middleware to protect full pro endpoints
```

---

### Phase 7 — Analytics (Week 6–7)

Full analytics page, completion rate charts, 7-day free limit with Trigger 4, mood trends, all-time graph for Pro.

**Commits:**

```
feat: add analytics page with recharts
feat: add habit completion rate and streak history charts
feat: add 7-day free limit with data loss trigger 4
feat: add mood and productivity trend charts
feat: add all-time contribution graph for pro users
```

---

### Phase 8 — Polish & Launch (Week 7–8)

Landing page targeting developers, email notifications, mobile responsive fixes, README with screenshots, Product Hunt prep, social media posts.

**Commits:**

```
feat: add public landing page targeting developers
feat: add transactional emails with resend
fix: mobile responsive improvements across all pages
docs: add readme with screenshots and setup guide
chore: production environment setup and final checks
```

---

## VS Code Agent — Master Prompt Template

Copy this at the start of every session. Fill in the bottom two lines.

```
You are helping me build GrowO — an AI-powered growth tracker for developers.
Tagline: "Grow every day. Go every day."
Stack: MERN (MongoDB, Express, React + Vite, Node.js) + Tailwind CSS + Gemini AI API.

Project:
- /client → React + Vite frontend
- /server → Node.js + Express backend

Coding rules — always follow:
1. Clean, readable, well-commented code
2. async/await only — never callbacks
3. All API responses:
   Success → { success: true, data: {} }
   Error   → { success: false, message: "" }
4. Never hardcode secrets — always process.env / import.meta.env
5. Mobile-first responsive design with Tailwind
6. After each completed feature: give me the exact git commit message
7. Tell me the exact path of every new file you create
8. Read existing relevant files before writing any new code

Freemium rules — always keep in mind:
Free:  5 habits max | 2 AI summaries free | 3 AI chat messages preview | 7-day analytics
Pro:   unlimited habits | full AI access | all-time analytics

Gate approach:
- Soft gates: blur/preview AI features before locking (AI chat, insights, summaries)
- Hard gates: 6th habit attempt, analytics beyond 7 days
- Show upgrade prompts ONLY at the 5 trigger moments — never interrupt cold users

Current phase: [PHASE NUMBER] — [PHASE NAME]

Task for this session:
[DESCRIBE EXACTLY WHAT YOU WANT BUILT TODAY]

Read existing relevant files first, build step by step, wait for my confirmation after each step.
```

---

## Phase 1 Prompt — Paste This Today to Start

```
You are helping me build GrowO — an AI-powered growth tracker for developers.
Tagline: "Grow every day. Go every day."
Stack: MERN (MongoDB, Express, React + Vite, Node.js) + Tailwind CSS.

Coding rules:
1. Clean, readable, well-commented code
2. async/await only
3. API: { success: true, data: {} } or { success: false, message: "" }
4. No hardcoded secrets — always .env
5. Mobile-first Tailwind
6. After each step: exact git commit message
7. Exact file path for every new file

Phase 1 — Foundation. Do one step at a time. Wait for my confirmation before next step.

STEP 1 — Initialize /server
- npm init with package.json
- Install: express mongoose dotenv cors helmet morgan
- Install dev: nodemon
- Create folders: config/ models/ routes/ controllers/ middleware/ services/ utils/
- Create server.js — entry point, starts the Express server
- Create app.js — Express setup, global middleware, routes mounted, error handler
- Create config/db.js — mongoose connection with error handling and logs
- Create config/constants.js — PLANS object (free and pro limits, mirrors client)
- Create .env.example with all required variable names
- Create .gitignore — include node_modules, .env, dist
- Add dev and start scripts to package.json
→ Give me the exact commit message

STEP 2 — Initialize /client
- Create React + Vite project
- Install: tailwindcss postcss autoprefixer axios zustand react-router-dom recharts
- Setup tailwind.config.js and src/index.css with Tailwind directives
- Remove all Vite boilerplate (default App.css, assets etc)
- Create full folder structure:
  components/ui/
  components/layout/
  components/habits/
  components/dashboard/
  components/ai/
  components/upgrade/
  components/auth/
  pages/
  hooks/
  store/
  services/
  utils/
  constants/
- Create constants/plans.js — PLANS object matching server constants
- Create constants/habits.js — DEVELOPER_HABIT_TEMPLATES array (5 templates)
- Create App.jsx — react-router-dom with placeholder page components
- Create .env with VITE_API_URL=http://localhost:5000/api
→ Give me the exact commit message

STEP 3 — Connect frontend to backend
- Create client/src/services/api.js — axios instance with VITE_API_URL as base URL, include request/response interceptors for auth token
- Add GET /api/health endpoint on server → { success: true, message: "GrowO API is running" }
- Test and confirm connection works
→ Give me the exact commit message

After all 3 steps: list every single file created with its exact path.
```

---

## Git Commit Convention

```
feat:     new feature added
fix:      bug fixed
chore:    setup, config, dependency changes
style:    UI or styling changes only
refactor: code restructured, no behavior change
docs:     documentation only
```

**Examples:**

```
feat: add user authentication with jwt
fix: resolve streak not resetting at midnight
chore: add gemini api dependency and config
style: improve dashboard layout on mobile
feat: add soft gate blur overlay for ai coach chat
feat: add upgrade trigger 3 on fourth ai chat message
```

---

## Daily Solo Developer Workflow

```
1. git pull origin main
2. Terminal 1: cd server && npm run dev
3. Terminal 2: cd client && npm run dev
4. Open Claude Code agent in VS Code
5. Paste master prompt with today's specific task
6. Build one feature at a time — review every file before confirming next step
7. Commit after each completed feature with the suggested message
8. git push origin main
   → Vercel auto-deploys frontend instantly
   → Render auto-deploys backend on push
```

---

## Render.com Deployment Notes

Render free tier important facts:

- Web service spins down after 15 minutes of inactivity
- First request after idle takes ~30 seconds (cold start)
- This is fine for MVP and early users — they won't notice after first load
- When you get consistent daily users, upgrade to Render paid ($7/month) or Railway ($5/month)
- Set `NODE_ENV=production` and all env vars in Render dashboard
- Add a `/api/health` endpoint — Render pings it to keep service alive (optional with paid plan)

**Pro tip:** Use UptimeRobot (free) to ping your Render URL every 14 minutes — this prevents cold starts completely on the free tier.

---

## Launch Checklist (Phase 8)

**Technical:**

- [ ] All features working on production URLs
- [ ] All env vars set on Vercel and Render dashboards
- [ ] Stripe switched from test to live mode
- [ ] Error handling tested — no raw errors shown to users
- [ ] Mobile responsive on iPhone and Android screen sizes

**Content:**

- [ ] README complete with screenshots and demo link
- [ ] Landing page live and specifically targeting developers
- [ ] Demo video recorded (60 seconds, screen recording is fine)

**Marketing:**

- [ ] Product Hunt draft ready — submit Tuesday or Wednesday 12:01am PST
- [ ] Reddit posts drafted:
  - r/webdev — "I built an AI habit tracker for developers"
  - r/SideProject — show the product
  - r/learnprogramming — focus on coding habit angle
  - r/programming — technical angle
- [ ] Dev.to article written: "I built an AI habit tracker for developers — here's what I learned"
- [ ] Twitter/X launch thread drafted (5-7 tweets with screenshots)
- [ ] First 10 users personally invited — friends, developer communities, Sri Lankan dev groups

---

## Money Flow Projection

| Month    | Users | Free | Pro (est 3%) | Revenue |
| -------- | ----- | ---- | ------------ | ------- |
| Month 1  | 50    | 48   | 2            | ~$10    |
| Month 2  | 200   | 192  | 8            | ~$40    |
| Month 3  | 500   | 482  | 18           | ~$90    |
| Month 6  | 2000  | 1930 | 70           | ~$350   |
| Month 12 | 5000  | 4800 | 200          | ~$1000  |

> 3% free-to-pro conversion is conservative for a well-gated freemium product.
> At Month 3 the $90/month covers all future hosting and API costs.
> At Month 12 $1000/month is serious income in Sri Lanka.

---

_GrowO — Grow every day. Go every day._
_Built solo. Zero cost launch. MERN + Gemini AI → Deepseek → Claude._
