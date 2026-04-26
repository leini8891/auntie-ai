# Auntie AI · Before You Click

> A senior-friendly AI co-pilot that catches scams before money is lost.
> Built for the **Global AI Hackathon Singapore 2026** (CodeBuddy × GLM).

**Build started: 2026-04-25** · Solo MVP · 5-day sprint

---

## What This Is

When a senior receives a suspicious SMS, payment request, or investment invite, they tap one button. Auntie AI:

1. **THINK** — reads the screen content with GLM-4.5V (multimodal vision) or GLM-4.5 (text)
2. **DECIDE** — classifies risk across 7 scam dimensions, assigns Safe / Low / Medium / High / Very High
3. **EXECUTE** — generates a plain-language explanation, recommended safe actions, and (for High+) a redacted message draft to share with family via WhatsApp

The whole agent loop runs in 5–15 seconds and is visible to judges on Demo Day.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Then edit .env.local and paste your ZAI_API_KEY

# 3. Run dev server
npm run dev
# Open http://localhost:3000
```

Click any of the **5 sample scenarios** on the home page — they call the real Z.ai GLM API and return a structured risk assessment.

---

## What Day 1 Ships

| File | Status | Purpose |
|---|---|---|
| `app/api/check/route.ts` | ✅ | Real Z.ai GLM-4.5 call returning validated JSON |
| `lib/prompts.ts` | ✅ | Tuned system prompt with 3 few-shot examples |
| `lib/scenarios.ts` | ✅ | 5 demo scenarios (bill + 4 scam types) |
| `lib/types.ts` | ✅ | Zod schema for `RiskAssessment` |
| `lib/i18n.ts` | ✅ | en/zh translations |
| `lib/store.ts` | ✅ | Zustand store + `useT()` hook |
| `app/page.tsx` | ✅ | Home page with end-to-end demo flow |
| `components/RiskCard.tsx` | ✅ | Result card with risk badge, signs, actions |
| `components/AgentSteps.tsx` | ✅ | Think · Decide · Execute loading state |
| `components/LangToggle.tsx` | ✅ | EN/中 switch |

---

## What's Stubbed for Day 2

| File | Status | Next Step |
|---|---|---|
| `app/upload/page.tsx` | 🚧 | Drag-drop + camera input — see `CodeBuddy_Prompts.md` #2 |
| `app/thinking/page.tsx` | 🚧 | Dedicated route variant — see Prompt #3 |
| `app/result/page.tsx` | 🚧 | Standalone result route — see Prompt #4 |
| `app/alert/page.tsx` | 🚧 | Standalone family alert route — see Prompt #5 |
| Hokkien audio | 🚧 | Drop `public/audio/hokkien-warning.mp3` and uncomment the play button hook |
| Vision input | 🚧 | Switch to `glm-4.5v` for screenshot upload — see Prompt #6 |

---

## Architecture

```
User taps a sample scenario on /
        ↓
useStore.setStatus('checking')
        ↓
fetch POST /api/check { screenText, language }
        ↓
app/api/check/route.ts → assessText() → Z.ai GLM-4.5
        ↓
Zod validates RiskAssessment JSON
        ↓
useStore.setAssessment(result) → status='result'
        ↓
<RiskCard /> renders verdict + actions + family alert
        ↓
[High Risk only] <a href="wa.me/..."> opens WhatsApp prefilled
```

---

## Testing the GLM Call Manually

```bash
curl -X POST http://localhost:3000/api/check \
  -H "Content-Type: application/json" \
  -d '{
    "screenText": "Your DBS account will be suspended. Click bit.ly/x to verify in 10 min.",
    "language": "en"
  }'
```

Expect a response like:

```json
{
  "ok": true,
  "assessment": {
    "riskLevel": "Very High",
    "scamType": "bank-phishing",
    "summary": "This is a scam. Do not click the link.",
    "warningSigns": ["10-minute deadline", "shortened bit.ly link", "account threat"],
    "plainExplanation": "Real banks do not ask you to verify through random short links...",
    "recommendedActions": ["Do not click the link", "..."],
    "familyAlertDraft": "Hi 小芳, mum just got an SMS...",
    "confidence": "High",
    "language": "en"
  }
}
```

---

## Submission Checklist

- [ ] CodeBuddy deployment URL (required — submit form will reject without)
- [ ] Vercel backup URL (insurance)
- [ ] 90-second demo video
- [ ] 7-slide pitch deck
- [ ] GitHub repo public + clean commit history starting 2026-04-25
- [ ] README first line shows date stamp

---

## Tech Stack

- **Next.js 14** (App Router) + TypeScript + Tailwind
- **Zustand** for client state
- **Zod** for runtime schema validation
- **Z.ai GLM-4.5** (text reasoning) — API key required
- **Z.ai GLM-4.5V** (vision) — for screenshot upload (Day 2)

---

## License

MIT — but seriously, build something kind with it.
