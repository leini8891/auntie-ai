import { z } from "zod";

/**
 * The structured response we expect from GLM. Validated with Zod
 * so a malformed model output fails loudly and we can fall back.
 */
export const RiskAssessmentSchema = z.object({
  riskLevel: z.enum(["Safe", "Low", "Medium", "High", "Very High"]),
  scamType: z.enum([
    "bank-phishing",
    "crypto-scam",
    "advance-fee",
    "gov-impersonation",
    "package-scam",
    "romance",
    "investment",
    "none",
  ]),
  summary: z.string().min(1).max(200),
  warningSigns: z.array(z.string()).max(8),
  plainExplanation: z.string().min(1).max(800),
  recommendedActions: z.array(z.string()).min(1).max(5),
  familyAlertDraft: z.string().nullable(),
  confidence: z.enum(["Low", "Medium", "High"]),
  language: z.enum(["en", "zh"]),
});

export type RiskAssessment = z.infer<typeof RiskAssessmentSchema>;

export type Lang = "en" | "zh";

export type ScenarioId =
  | "bill"
  | "bank-phishing"
  | "crypto-scam"
  | "advance-fee"
  | "gov-impersonation";

export interface Scenario {
  id: ScenarioId;
  emoji: string;
  titleZh: string;
  titleEn: string;
  subTitleZh: string;
  subTitleEn: string;
  /** The text we send to GLM as the "screen content" */
  screenText: string;
}
