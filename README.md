# GrowO — Project Guide
**AI-powered growth tracker for developers**  
*Grow every day. Go every day.*

---

## GitHub Repository
**Primary:** `growo`  
**Fallback:** `growo-app`  
**Visibility:** Public (builds credibility, free CI/CD)  
**Description field:** `AI-powered growth tracker for developers. Grow every day. Go every day.`  
**Topics/tags:** `mern` `react` `nodejs` `mongodb` `ai` `habit-tracker` `developer-tools` `productivity`

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React 18 + Vite | Fast, modern, great DX |
| Styling | Tailwind CSS v3 | Rapid UI, no CSS files |
| State | Zustand | Simple, lightweight |
| Charts | Recharts | Great for contribution graphs |
| Backend | Node.js + Express | Your MERN strength |
| Database | MongoDB Atlas | Free tier, flexible |
| Auth | JWT + bcrypt | Simple, no third-party cost |
| AI | Claude API (claude-haiku) | Cheapest, fastest, great quality |
| Email | Resend.com | 3000 emails/month free |
| Payments | Stripe | Industry standard |
| Deploy FE | Vercel | Free, auto-deploy from GitHub |
| Deploy BE | Railway | Free $5 credit/month |

---

## Full Project Structure

```
growo/
├── client/                          # React frontend (Vite)
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/                  # Logos, images, icons
│   │   ├── components/              # Reusable UI components
│   │   │   ├── ui/                  # Base components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   └── Input.jsx
│   │   │   ├── layout/              # Layout components
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── PageWrapper.jsx
│   │   │   ├── habits/              # Habit-specific components
│   │   │   │   ├── HabitCard.jsx
│   │   │   │   ├── HabitForm.jsx
│   │   │   │   ├── HabitList.jsx
│   │   │   │   └── CheckInButton.jsx
│   │   │   ├── dashboard/           # Dashboard components
│   │   │   │   ├── ContributionGraph.jsx
│   │   │   │   ├── StatsCard.jsx
│   │   │   │   ├── StreakCounter.jsx
│   │   │   │   └── TodayProgress.jsx
│   │   │   ├── ai/                  # AI coach components
│   │   │   │   ├── CoachPanel.jsx
│   │   │   │   ├── WeeklySummary.jsx
│   │   │   │   └── CoachMessage.jsx
│   │   │   └── auth/                # Auth components
│   │   │       ├── LoginForm.jsx
│   │   │       └── RegisterForm.jsx
│   │   ├── pages/                   # Route pages
│   │   │   ├── Landing.jsx          # Public landing page
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx        # Main app dashboard
│   │   │   ├── Habits.jsx           # Habit management
│   │   │   ├── Analytics.jsx        # Charts and insights
│   │   │   ├── Coach.jsx            # AI coach chat (Pro)
│   │   │   ├── Settings.jsx
│   │   │   └── Upgrade.jsx          # Pricing / upgrade page
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useHabits.js
│   │   │   └── useStreak.js
│   │   ├── store/                   # Zustand state stores
│   │   │   ├── authStore.js
│   │   │   └── habitStore.js
│   │   ├── services/                # API call functions
│   │   │   ├── api.js               # Axios instance + interceptors
│   │   │   ├── authService.js
│   │   │   ├── habitService.js
│   │   │   └── aiService.js
│   │   ├── utils/                   # Helper functions
│   │   │   ├── dateUtils.js
│   │   │   ├── streakUtils.js
│   │   │   └── formatters.js
│   │   ├── constants/               # App-wide constants
│   │   │   ├── habits.js            # Default habit templates
│   │   │   └── plans.js             # Free vs Pro limits
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                          # Node.js + Express backend
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   └── constants.js             # Server-wide constants
│   ├── models/                      # Mongoose models
│   │   ├── User.js
│   │   ├── Habit.js
│   │   ├── HabitLog.js
│   │   └── Subscription.js
│   ├── routes/                      # Express route files
│   │   ├── auth.routes.js
│   │   ├── habit.routes.js
│   │   ├── log.routes.js
│   │   ├── ai.routes.js
│   │   └── subscription.routes.js
│   ├── controllers/                 # Route handler logic
│   │   ├── auth.controller.js
│   │   ├── habit.controller.js
│   │   ├── log.controller.js
│   │   ├── ai.controller.js
│   │   └── subscription.controller.js
│   ├── middleware/                  # Express middleware
│   │   ├── auth.middleware.js       # JWT verification
│   │   ├── pro.middleware.js        # Pro plan gate
│   │   └── error.middleware.js      # Global error handler
│   ├── services/                    # Business logic
│   │   ├── ai.service.js            # Claude API calls
│   │   ├── streak.service.js        # Streak calculation logic
│   │   ├── email.service.js         # Resend email service
│   │   └── stripe.service.js        # Stripe payment logic
│   ├── utils/
│   │   └── logger.js
│   ├── app.js                       # Express app setup
│   └── server.js                    # Entry point
│
├── .env.example                     # Template for env vars
├── .gitignore
├── README.md
└── package.json                     # Root scripts (optional)
```

---

## Database Schema

### User
```js
{
  _id, email, password (hashed),
  name, username,
  plan: 'free' | 'pro',
  stripeCustomerId,
  createdAt, updatedAt
}
```

### Habit
```js
{
  _id, userId,
  title,           // e.g. "LeetCode daily"
  description,
  category,        // 'coding' | 'learning' | 'health' | 'custom'
  frequency,       // 'daily' | 'weekdays' | 'custom'
  targetDays: [],  // [1,2,3,4,5] = Mon-Fri
  color,           // for UI
  icon,
  isActive: true,
  createdAt
}
```

### HabitLog
```js
{
  _id, userId, habitId,
  date,            // YYYY-MM-DD string
  completed: bool,
  note,            // optional user note
  mood: 1-5,       // optional
  createdAt
}
```

### Subscription
```js
{
  _id, userId,
  stripeSubscriptionId,
  status: 'active' | 'cancelled' | 'past_due',
  plan: 'monthly' | 'yearly',
  currentPeriodEnd,
  createdAt
}
```

---

## Freemium Limits

| Feature | Free | Pro ($4.99/mo) |
|---|---|---|
| Habits | Up to 5 | Unlimited |
| AI weekly summary | ✗ | ✓ |
| AI coach chat | ✗ | ✓ |
| Analytics history | 7 days | All time |
| Contribution graph | Basic | Full |
| Export data | ✗ | ✓ |
| Custom categories | ✗ | ✓ |

---

## Build Phases

### Phase 1 — Foundation (Week 1)
Project setup, folder structure, GitHub, environment config, MongoDB connection, basic Express server running, React + Vite + Tailwind running, both connected.

**Commits in this phase:**
- `chore: initialize project structure`
- `chore: setup express server with mongodb connection`
- `chore: setup react client with vite and tailwind`
- `feat: add environment configuration and constants`

---

### Phase 2 — Authentication (Week 1–2)
User model, register/login endpoints, JWT middleware, login/register UI pages, protected routes, auth state with Zustand.

**Commits in this phase:**
- `feat: add user model with mongoose`
- `feat: add auth routes register and login`
- `feat: add jwt middleware for protected routes`
- `feat: add register and login pages with form validation`
- `feat: add auth state management with zustand`
- `feat: add protected route wrapper`

---

### Phase 3 — Core Habit System (Week 2–3)
Habit model, CRUD endpoints, habit creation UI, habit list view, freemium limit enforcement (max 5 free).

**Commits in this phase:**
- `feat: add habit model and schema`
- `feat: add habit CRUD routes and controllers`
- `feat: add habit list and creation UI`
- `feat: add freemium habit limit enforcement`
- `feat: add habit category and color selection`

---

### Phase 4 — Daily Check-in & Streaks (Week 3–4)
HabitLog model, daily log endpoints, check-in UI, streak calculation service, contribution graph (GitHub-style).

**Commits in this phase:**
- `feat: add habit log model and daily check-in endpoint`
- `feat: add streak calculation service`
- `feat: add daily check-in UI with one-tap completion`
- `feat: add contribution graph component`
- `feat: add today progress and stats cards on dashboard`

---

### Phase 5 — AI Coach (Week 4–5)
Claude API integration, weekly summary generation, AI coach chat (Pro), context-aware prompting with user's last 30 days data.

**Commits in this phase:**
- `feat: add claude api service for ai coaching`
- `feat: add weekly summary generation endpoint`
- `feat: add ai coach chat endpoint for pro users`
- `feat: add weekly summary UI card on dashboard`
- `feat: add ai coach chat panel for pro users`

---

### Phase 6 — Payments (Week 5–6)
Stripe integration, subscription model, upgrade page UI, Pro middleware gate, webhook handler.

**Commits in this phase:**
- `feat: add stripe service and subscription model`
- `feat: add subscription checkout endpoint`
- `feat: add stripe webhook handler`
- `feat: add upgrade page with pricing UI`
- `feat: add pro middleware to gate premium features`

---

### Phase 7 — Analytics (Week 6–7)
Full analytics page, completion rate charts, habit performance over time, mood trends (Recharts).

**Commits in this phase:**
- `feat: add analytics page with recharts`
- `feat: add habit completion rate chart`
- `feat: add streak history timeline`
- `feat: add mood and productivity trend charts`

---

### Phase 8 — Polish & Launch (Week 7–8)
Landing page, email notifications (Resend), responsive design fixes, performance audit, Product Hunt prep, README.

**Commits in this phase:**
- `feat: add public landing page`
- `feat: add email notifications with resend`
- `fix: responsive design improvements`
- `chore: add readme and project documentation`
- `chore: production environment setup`

---

## Environment Variables

### server/.env
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d

ANTHROPIC_API_KEY=sk-ant-...

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

## VS Code Agent Master Prompt

Copy this entire prompt and paste it to your Claude Code agent in VS Code at the start of each phase. Replace `[PHASE NUMBER]` and `[PHASE NAME]` with the current phase.

---

```
You are helping me build GrowO — an AI-powered growth tracker for developers.
Tagline: "Grow every day. Go every day."
Stack: MERN (MongoDB, Express, React with Vite, Node.js) + Tailwind CSS + Claude AI API.

Project structure:
- /client  → React + Vite frontend
- /server  → Node.js + Express backend

Key rules for this project:
1. Always write clean, readable, well-commented code
2. Use async/await — never callbacks
3. All API responses follow this format:
   Success: { success: true, data: {...} }
   Error:   { success: false, message: "..." }
4. Always validate inputs on both frontend and backend
5. Never hardcode secrets — always use environment variables
6. Mobile-first responsive design with Tailwind
7. After completing each feature, remind me of the git commit message to use
8. If you create a new file, tell me its exact path
9. Keep the freemium logic always in mind:
   - Free users: max 5 habits, no AI features, 7-day analytics
   - Pro users: unlimited habits, AI coach, full analytics

Current phase: [PHASE NUMBER] — [PHASE NAME]

Task: [DESCRIBE EXACTLY WHAT YOU WANT BUILT IN THIS SESSION]

Start by reading the existing relevant files first, then implement the feature step by step.
```

---

## Phase 1 Specific Agent Prompt (Start Here)

```
You are helping me build GrowO — an AI-powered growth tracker for developers.
Tagline: "Grow every day. Go every day."
Stack: MERN (MongoDB, Express, React with Vite, Node.js) + Tailwind CSS + Claude AI API.

Project structure:
- /client  → React + Vite frontend
- /server  → Node.js + Express backend

Key rules:
1. Clean, readable, well-commented code
2. async/await only
3. API responses: { success: true, data: {} } or { success: false, message: "" }
4. Never hardcode secrets — always .env
5. Mobile-first Tailwind design
6. After each feature remind me of the git commit message
7. Tell me the exact path of every new file created

Current phase: Phase 1 — Foundation

Do the following steps one at a time and wait for my confirmation before moving to the next:

STEP 1: Initialize the /server folder
- Init package.json with npm
- Install: express mongoose dotenv cors helmet morgan
- Install dev: nodemon
- Create the full folder structure: config/, models/, routes/, controllers/, middleware/, services/, utils/
- Create server.js and app.js with basic Express setup
- Create config/db.js with MongoDB connection using mongoose
- Create .env.example with all required variables
- Create .gitignore
- Tell me the commit message when done

STEP 2: Initialize the /client folder
- Create React app with Vite
- Install: tailwindcss postcss autoprefixer axios zustand react-router-dom recharts
- Setup Tailwind config
- Clean up boilerplate files
- Create the full folder structure: components/ui/, components/layout/, components/habits/, components/dashboard/, components/ai/, components/auth/, pages/, hooks/, store/, services/, utils/, constants/
- Create a basic App.jsx with react-router-dom setup
- Tell me the commit message when done

STEP 3: Connect frontend to backend
- Add axios instance in client/src/services/api.js with base URL from .env
- Add a health check endpoint GET /api/health on the server
- Test the connection works
- Tell me the commit message when done

After all 3 steps are done, show me a summary of every file created.
```

---

## Daily Workflow as Solo Developer

1. Open VS Code
2. Pull latest from GitHub: `git pull origin main`
3. Start both servers: `cd server && npm run dev` + `cd client && npm run dev`
4. Paste the current phase prompt to Claude Code agent
5. Work feature by feature — one at a time
6. After each feature: review the code, then commit with the suggested message
7. Push to GitHub: `git push origin main`
8. Vercel auto-deploys frontend instantly

---

## Git Commit Convention

Format: `type: short description`

Types:
- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — setup, config, dependencies
- `style:` — UI/styling only
- `refactor:` — code restructure, no feature change
- `docs:` — documentation

Examples:
```
feat: add user authentication with JWT
fix: resolve streak not resetting at midnight
chore: add stripe dependency and config
style: improve dashboard mobile layout
```

---

## Launch Checklist (Phase 8)

- [ ] All features working on production URLs
- [ ] Environment variables set on Vercel and Railway
- [ ] Stripe in live mode (not test)
- [ ] Custom domain connected (when ready)
- [ ] README complete with screenshots
- [ ] Landing page live and compelling
- [ ] Product Hunt draft ready
- [ ] Reddit post drafted (r/webdev, r/SideProject, r/learnprogramming)
- [ ] Twitter/X announcement ready
- [ ] First 10 users invited personally

---

*Built by a solo developer. Powered by MERN + Claude AI.*  
*GrowO — Grow every day. Go every day.*
