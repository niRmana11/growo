import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// We use gemini-1.5-pro because it's highly capable of following precise coaching instructions
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

// ─── 1. Weekly Summary ───────────────────────────────────────────────────────────
export const generateWeeklySummary = async (user, habits, logs) => {
  // Format habit data for the prompt
  const habitSummary = habits
    .map((h) => {
      const weekLogs = logs.filter((l) => l.habitId.toString() === h._id.toString());
      const completed = weekLogs.filter((l) => l.completed).length;
      return `- ${h.name}: completed ${completed}/7 days`;
    })
    .join('\n');

  const prompt = `
You are a supportive AI growth coach for developers.
Tone: encouraging, specific, honest — like a senior dev mentor who genuinely cares.
Never be generic. Never say "great job" without a specific reason.

Developer: ${user.name}
This week's habit data:
${habitSummary || 'No habits tracked yet this week.'}

Write a weekly coaching summary that:
1. Acknowledges what they actually did (use specific numbers)
2. Identifies ONE pattern from their data — good or bad
3. Gives ONE specific actionable suggestion for next week
4. Ends with a genuine short encouragement (1 sentence, not cheesy)

Keep it under 150 words. Sound human, not robotic. Do not use markdown formatting.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

// ─── 2. Coach Chat ───────────────────────────────────────────────────────────────
export const generateCoachReply = async (user, habits, recentLogs, userMessage) => {
  const context = habits
    .map((h) => {
      const last7 = recentLogs.filter((l) => l.habitId.toString() === h._id.toString());
      const rate = Math.round((last7.filter((l) => l.completed).length / 7) * 100);
      return `${h.name}: ${rate}% completion last 7 days`;
    })
    .join('\n');

  const prompt = `
You are GrowO's AI coach for developers building daily growth habits.
You have this developer's real data. Use it. Be specific. Never give generic advice.

Developer: ${user.name}
Current habit performance:
${context || 'No recent habit data available.'}

Their message: "${userMessage}"

Respond as a coach who knows their numbers. Be direct, specific, and keep your answer under 100 words.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

// ─── 3. Pattern Insights ─────────────────────────────────────────────────────────
export const generateInsights = async (user, habits, logs) => {
  const summary = habits
    .map((h) => {
      const habitLogs = logs.filter((l) => l.habitId.toString() === h._id.toString());
      const completed = habitLogs.filter((l) => l.completed).length;
      const total = habitLogs.length || 1; // Prevent division by zero
      const rate = Math.round((completed / total) * 100);
      return `${h.name}: ${rate}% overall completion`;
    })
    .join('\n');

  const prompt = `
You are analyzing a developer's habit data to find meaningful patterns.

Developer: ${user.name}
Habit data:
${summary || 'No habit data tracked yet.'}

Generate exactly 3 specific insights about their patterns.
Each insight must be:
- Based on the actual data provided
- Actionable or meaningful
- Exactly one sentence each

Return as a JSON array of strings: ["insight1", "insight2", "insight3"]
Return ONLY the JSON array, no backticks, no markdown, no other text.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  // Clean up any markdown code blocks the AI might accidentally add
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
};
