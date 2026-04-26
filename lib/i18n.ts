import type { Lang } from "./types";

/**
 * Minimal i18n. Replace with next-intl if scope grows.
 * Used everywhere via the `useT()` helper hook in `lib/store.ts`.
 */
const DICT = {
  en: {
    "home.h1.line1": "Before you click,",
    "home.h1.line2": "let Auntie check it.",
    "home.sub": "Got a suspicious SMS, payment page, or investment invite? Snap a screenshot — Auntie will look at it for you.",
    "home.cta1": "📷 Let Auntie Take a Look",
    "home.cta2": "Try a Sample →",
    "home.recent": "Try a Sample",
    "home.privacy.line1": "🛡️ No saving · No public sharing · Used only for this safety check",
    "home.privacy.line2": "Screenshot is sent to AI model and discarded after analysis",
    "home.checking": "Auntie is reading the screen…",

    "result.h2": "Result",
    "result.level.Safe": "SAFE",
    "result.level.Low": "LOW RISK",
    "result.level.Medium": "MEDIUM RISK",
    "result.level.High": "HIGH RISK",
    "result.level.Very High": "VERY HIGH RISK",
    "result.audio": "🔊 Hear the Hokkien warning",
    "result.why": "Why?",
    "result.do": "What to do now",
    "result.cta1": "📤 Send to Family to Confirm",
    "result.cta2": "Check Another Screen",

    "common.back": "Back",

    "upload.h1": "What should Auntie look at?",
    "upload.dropLabel": "Drop a screenshot here",
    "upload.dropOr": "or",
    "upload.cameraBtn": "📷 Take a photo",
    "upload.samples": "Or try a sample scenario",
    "upload.cta": "Check this screen with AI →",
    "upload.ctaDisabled": "Select a file or sample above first",
    "upload.fileSelected": "File selected:",
    "upload.tooLarge": "File too large (max 5 MB)",
    "upload.wrongType": "Please use JPG, PNG, or HEIC",

    "thinking.h1": "Auntie is checking…",
    "thinking.reading": "Now reading",
    "thinking.waiting": "Auntie is taking a careful look",
    "thinking.timing": "Usually 5–15 seconds",

    "result.familyAlertTitle": "Pre-written message for family",
    "result.familyAlertHelp": "Tapping opens WhatsApp with the message pre-filled — just confirm to send",
    "result.checkAnother": "Check Another Screen",
  },
  zh: {
    "home.h1.line1": "在你点击之前，",
    "home.h1.line2": "先让 Auntie 看一眼。",
    "home.sub": "收到可疑短信、付款页、投资邀请？拍一张截图，AI 替你看清楚。",
    "home.cta1": "📷 让 Auntie 看一眼",
    "home.cta2": "试试示例 →",
    "home.recent": "试试示例",
    "home.privacy.line1": "🛡️ 不保存 · 不公开分享 · 仅用于本次安全检查",
    "home.privacy.line2": "截图会发送至 AI 模型，处理完不留底",
    "home.checking": "Auntie 正在看一眼…",

    "result.h2": "检查结果",
    "result.level.Safe": "看起来安全",
    "result.level.Low": "低风险",
    "result.level.Medium": "中等风险",
    "result.level.High": "高风险",
    "result.level.Very High": "非常高风险",
    "result.audio": "🔊 听一下福建话提醒",
    "result.why": "为什么？",
    "result.do": "现在该做什么？",
    "result.cta1": "📤 发给家人确认",
    "result.cta2": "再检查另一屏",

    "common.back": "返回",

    "upload.h1": "要让 Auntie 看什么？",
    "upload.dropLabel": "把截图拖到这里",
    "upload.dropOr": "或",
    "upload.cameraBtn": "📷 拍一张照片",
    "upload.samples": "或者试试示例场景",
    "upload.cta": "用 AI 检查这一屏 →",
    "upload.ctaDisabled": "请先选择文件或点击上方示例",
    "upload.fileSelected": "已选择文件：",
    "upload.tooLarge": "文件太大（最大 5 MB）",
    "upload.wrongType": "请使用 JPG、PNG 或 HEIC 格式",

    "thinking.h1": "Auntie 正在看一眼…",
    "thinking.reading": "正在分析的画面",
    "thinking.waiting": "Auntie 正在仔细看清楚",
    "thinking.timing": "通常 5–15 秒",

    "result.familyAlertTitle": "已为你写好的消息",
    "result.familyAlertHelp": "点击后打开 WhatsApp，消息已填好，确认即可发送",
    "result.checkAnother": "再检查另一屏",
  },
} as const;

export type DictKey = keyof typeof DICT.en;

export function t(lang: Lang, key: DictKey): string {
  return DICT[lang][key] ?? DICT.en[key] ?? key;
}
