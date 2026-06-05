# Auntie AI · Before You Click

> A senior-friendly AI co-pilot that catches scams before money is lost.
> Built for the **Global AI Hackathon Singapore 2026** (CodeBuddy × GLM).

**Build started: 2026-04-25** · Solo MVP · 5-day sprint

## 🌐 Live Demo

👉 **[Try Auntie AI now](https://auntie-ai.vercel.app/)** — deployed on Vercel
👉 **[Try Auntie AI now](http://7f5513995d664d838d7926fef9d60988.ap-singapore.myide.io)** — deployed on CloudStudio

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

## Day 2 Features (All Completed ✅)

| Feature | Prompt | Status |
|---|---|---|
| Hokkien warning audio (play/pause/auto-play) | #1 | ✅ |
| Upload page (drag-drop + camera + sample grid) | #2 | ✅ |
| Thinking page (agent steps + API call) | #3 | ✅ |
| Result page (RiskCard + FamilyAlertCallout) | #4 | ✅ |
| Family Alert page (recipient card + copy + WhatsApp) | #5 | ✅ |
| Vision API (multimodal screenshot analysis) | #6 | ✅ |
| Ambiguous case handling (4 few-shot examples) | #7 | ✅ |
| Live deployment + smoke test | #8 | ✅ |

---

## Architecture

```
Home (/) → Upload (/upload) or pick a scenario
        ↓
Upload: drag-drop/camera → FileReader → base64 dataURL in Zustand
        ↓
Thinking (/thinking) — shows AgentSteps (THINK · DECIDE · EXECUTE)
        ↓
POST /api/check { screenText OR imageDataUrl, language }
        ↓
route.ts routes to assessText() or assessImage() (multimodal vision)
        ↓
OpenAI gpt-4o-mini with tuned system prompt + 4 few-shot examples
        ↓
Zod validates RiskAssessment JSON → store.setAssessment()
        ↓
Result (/result) — <RiskCard> + <FamilyAlertCallout> + audio button
        ↓
[High/Very High] Alert (/alert) — recipient card, copy, WhatsApp CTA
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

- [x] CodeBuddy deployment URL — **[Live Demo](http://7f5513995d664d838d7926fef9d60988.ap-singapore.myide.io)**
- [ ] Vercel backup URL (insurance)
- [ ] 90-second demo video
- [ ] 7-slide pitch deck
- [x] GitHub repo public + clean commit history starting 2026-04-25
- [x] README first line shows date stamp

---

## Tech Stack

- **Next.js 14** (App Router) + TypeScript + Tailwind CSS
- **Zustand** for client state
- **Zod** for runtime schema validation
- **OpenAI gpt-4o-mini** (text + vision/multimodal) — API key required
- **CloudStudio** for deployment

---

## License

Copyright (c) 2026 Elena. All rights reserved.

This source code is shared publicly for educational and competitive review purposes only (CodeBuddy × GLM Global AI Hackathon Singapore 2026). Commercial use, redistribution, or derivative products require written permission. Contact: leini8891@gmail.com
