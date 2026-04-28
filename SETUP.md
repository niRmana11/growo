# GrowO Setup Guide - Initial Foundation

## 📋 What's Been Created

This first commit initializes the complete monorepo structure for GrowO.

### Folder Structure
```
growo/
├── client/              # React + Vite frontend
├── server/              # Node.js + Express backend
├── package.json         # Root workspace config
├── .env.example         # Environment template
├── .gitignore          # Git ignore rules
├── .prettierrc          # Code formatter config
└── .eslintrc.json      # Linter config
```

## 🚀 Next Steps

### 1. Install Dependencies

```bash
# From root folder
npm install

# This installs dependencies for both client and server via npm workspaces
```

### 2. Setup Environment Variables

```bash
# Create server/.env from template
cp .env.example server/.env

# Edit server/.env and add:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Start Development Servers

```bash
# Terminal 1: Start both servers (from root)
npm run dev

# Or start them separately:
npm run server    # Terminal 1
npm run client    # Terminal 2
```

### 4. Verify Connection

```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Check frontend is running
open http://localhost:5173
```

## 📦 Tech Stack Installed

**Server:**
- express ^4.18.2
- mongoose ^8.0.0
- dotenv ^16.3.1
- cors, helmet, morgan (middleware)
- bcryptjs, jsonwebtoken (auth)
- stripe, resend (@google/generative-ai (AI)

**Client:**
- react ^18.2.0
- react-router-dom ^6.20.0
- axios, zustand (state)
- recharts (charts)
- tailwindcss ^3.3.6
- vite ^5.0.0

## 🎨 Key Files

**Single Source of Truth:**
- `client/src/constants/plans.js` - Feature limits for free/pro
- `server/config/constants.js` - Must mirror client exactly

**Developer Templates:**
- `client/src/constants/habits.js` - 5 habit templates

**API:**
- `client/src/services/api.js` - Axios instance with auth interceptors

**Config:**
- `client/vite.config.js` - Vite build config
- `client/tailwind.config.js` - Tailwind with brand colors
- `server/config/db.js` - MongoDB connection

## 🎯 Brand Colors (In Tailwind)

- Primary Green: `#7ED957` (growo-500)
- Success Green: `#22C55E`
- Dark Green: `#15803D`
- Dark Nav: `#0D1117`
- Gray: `#6B7280`

Use in components:
```jsx
<div className="bg-[#7ED957]">Primary Green</div>
<div className="text-[#0D1117]">Dark Nav</div>
```

## 📝 Commit History So Far

```
[main 9e7d790] chore: initialize project structure with client and server monorepo
```

## 🔄 Next Phase: Authentication System

Phase 2 will include:
- User model with JWT + bcrypt
- Register & login endpoints
- Auth UI (Login/Register forms)
- Protected routes
- Zustand auth store

Ready to proceed? Command:
```bash
npm install  # Then start development
```

---

_GrowO — Grow every day. Go every day._
