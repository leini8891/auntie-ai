import type { Scenario } from "./types";

/**
 * The 5 demo scenarios. Sent to GLM as the "screen text" input.
 * Order matters for Demo Day: bill (warm-up) → bank (high) → crypto (very high).
 */
export const SCENARIOS: Scenario[] = [
  {
    id: "bill",
    emoji: "🌱",
    titleZh: "电费账单",
    titleEn: "Electricity Bill",
    subTitleZh: "SP Group · S$87.40",
    subTitleEn: "SP Group · S$87.40",
    screenText:
      "SP Group invoice. Account: 9012345678. Amount due: S$87.40. Due date: 15 May 2026. Pay via PayLah!, AXS, or AutoPay. Thank you for using SP services.",
  },
  {
    id: "bank-phishing",
    emoji: "🪤",
    titleZh: "DBS 账户验证短信",
    titleEn: "DBS Verification SMS",
    subTitleZh: "紧迫话术 · 短链",
    subTitleEn: "Urgency · short link",
    screenText:
      "Your DBS account will be suspended due to suspicious activity. Please verify within 10 minutes: bit.ly/dbs-verify-x9k. Failure to verify will result in permanent account closure. — DBS Bank",
  },
  {
    id: "crypto-scam",
    emoji: "💸",
    titleZh: "USDT 5% 日息邀请",
    titleEn: "USDT 5% Daily Return",
    subTitleZh: "保证收益 · 不可逆",
    subTitleEn: "Guaranteed return · irreversible",
    screenText:
      "Hi auntie, exclusive crypto group invites you. Guaranteed 5% daily return on USDT — that's S$25 a day on a S$500 investment. Transfer 500 USDT to wallet 0xAB123F4C9D8E7B6A5C4D3E2F1A0B9C8D7E6F5A4B today only. Limited to 10 spots.",
  },
  {
    id: "advance-fee",
    emoji: "🎁",
    titleZh: "预付费骗局",
    titleEn: "Advance-Fee Scam",
    subTitleZh: "解锁手续费",
    subTitleEn: "Unlock fee",
    screenText:
      "Congratulations! Your investment of S$50,000 has matured to S$58,000. To unlock and withdraw your S$8,000 profit, please first send a S$3,000 processing fee to OCBC account 567-XXXX-XXXX-3 (name: Goh K.M.). Funds will be released within 24 hours.",
  },
  {
    id: "gov-impersonation",
    emoji: "⏱️",
    titleZh: "SingPass 紧急验证",
    titleEn: "SingPass Urgent Verification",
    subTitleZh: "10 分钟内点击",
    subTitleEn: "Click within 10 min",
    screenText:
      "Your SingPass account requires urgent re-verification due to a suspected breach. Click within 10 minutes to avoid permanent suspension: spass-gov.com/verify-now. Enter your NRIC and 2FA code to confirm.",
  },
];

export const getScenario = (id: string): Scenario | undefined =>
  SCENARIOS.find((s) => s.id === id);
