"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore, useT } from "@/lib/store";
import { SCENARIOS } from "@/lib/scenarios";
import { LangToggle } from "@/components/LangToggle";
import { AgentSteps } from "@/components/AgentSteps";
import { RiskCard } from "@/components/RiskCard";
import type { ScenarioId } from "@/lib/types";

export default function HomePage() {
  const t = useT();
  const lang = useStore((s) => s.lang);
  const status = useStore((s) => s.status);
  const assessment = useStore((s) => s.assessment);
  const errorMessage = useStore((s) => s.errorMessage);
  const setStatus = useStore((s) => s.setStatus);
  const setAssessment = useStore((s) => s.setAssessment);
  const setError = useStore((s) => s.setError);
  const reset = useStore((s) => s.reset);

  const [activeScenario, setActiveScenario] = useState<ScenarioId | null>(null);

  async function checkScenario(id: ScenarioId) {
    const scenario = SCENARIOS.find((s) => s.id === id);
    if (!scenario) return;
    setActiveScenario(id);
    setStatus("checking");
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ screenText: scenario.screenText, language: lang }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "Unknown");
      setAssessment(data.assessment);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center pb-20">
      <div className="w-full max-w-md px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-navy text-white flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <div className="font-bold text-navy text-lg leading-none">Auntie AI</div>
              <div className="text-xs text-stone italic mt-0.5">Before You Click</div>
            </div>
          </div>
          <LangToggle />
        </div>

        {/* Status: idle = main home page */}
        {status === "idle" && (
          <>
            <h1 className="text-[30px] leading-[1.2] font-bold text-ink mb-3">
              {t("home.h1.line1")}
              <br />
              {t("home.h1.line2")}
            </h1>
            <p className="text-stone text-[19px] leading-relaxed mb-6">{t("home.sub")}</p>

            <Link
              href="/upload"
              className="block w-full py-5 rounded-2xl bg-navy text-white font-bold text-[20px] mb-3 text-center hover:bg-navy/90 transition shadow-md active:scale-[0.98]"
            >
              {t("home.cta1")}
              <span className="block text-[12px] font-normal opacity-80 mt-1">
                {lang === "zh" ? "(拍照或上传截图)" : "(Take photo or upload screenshot)"}
              </span>
            </Link>

            <div className="text-sm font-semibold text-stone uppercase tracking-wide mb-3 mt-6">
              {t("home.recent")}
            </div>
            <div className="space-y-2.5">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => checkScenario(s.id)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-paper border border-mist hover:border-navy transition text-left"
                >
                  <div className="w-11 h-11 rounded-lg bg-mist flex items-center justify-center text-xl">
                    {s.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-ink truncate text-[17px]">
                      {lang === "zh" ? s.titleZh : s.titleEn}
                    </div>
                    <div className="text-sm text-stone">
                      {lang === "zh" ? s.subTitleZh : s.subTitleEn}
                    </div>
                  </div>
                  <span className="text-stone text-xl">›</span>
                </button>
              ))}
            </div>

            <div className="mt-8 px-2 text-center text-[13px] text-stone leading-relaxed">
              {t("home.privacy.line1")}
              <br />
              {t("home.privacy.line2")}
            </div>
          </>
        )}

        {/* Status: checking — show Agent Loop */}
        {status === "checking" && (
          <div>
            <h2 className="text-[24px] font-bold text-ink mb-4">{t("home.checking")}</h2>
            {activeScenario && (
              <div className="rounded-2xl bg-mist/40 p-4 border border-mist mb-6">
                <div className="text-sm uppercase tracking-wider text-stone font-semibold mb-2">
                  {lang === "zh" ? "正在分析的画面" : "Now reading"}
                </div>
                <div className="rounded-lg bg-white border border-mist p-3 text-[15px] text-ink leading-relaxed">
                  {SCENARIOS.find((s) => s.id === activeScenario)?.screenText}
                </div>
              </div>
            )}
            <div className="flex justify-center gap-2 mb-6">
              <span className="pulse-dot w-3 h-3 rounded-full bg-navy"></span>
              <span className="pulse-dot w-3 h-3 rounded-full bg-navy"></span>
              <span className="pulse-dot w-3 h-3 rounded-full bg-navy"></span>
            </div>
            <AgentSteps />
            <p className="text-center text-[15px] text-stone mt-7 leading-relaxed">
              {lang === "zh"
                ? "Auntie 正在仔细看清楚\n通常 5-15 秒"
                : "Auntie is taking a careful look\nUsually 5-15 seconds"}
            </p>
          </div>
        )}

        {/* Status: result */}
        {status === "result" && assessment && (
          <div>
            <h2 className="text-[24px] font-bold text-ink mb-4">{t("result.h2")}</h2>
            <RiskCard assessment={assessment} />

            {(assessment.riskLevel === "High" ||
              assessment.riskLevel === "Very High") &&
              assessment.familyAlertDraft && (
                <div className="mt-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-4">
                  <div className="font-bold text-ink mb-2 text-[18px]">
                    {lang === "zh" ? "已为你写好的消息" : "Pre-written message for family"}
                  </div>
                  <div className="text-[15px] leading-relaxed text-ink whitespace-pre-line bg-white rounded-lg border border-mist p-3 mb-3">
                    {assessment.familyAlertDraft}
                  </div>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(assessment.familyAlertDraft)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-[18px] text-center"
                  >
                    {lang === "zh" ? "用 WhatsApp 发出去" : "Send via WhatsApp"}
                  </a>
                </div>
              )}

            <button
              onClick={reset}
              className="w-full mt-6 py-3 rounded-2xl border border-mist text-stone font-medium text-[16px]"
            >
              {t("result.cta2")}
            </button>
          </div>
        )}

        {/* Status: error */}
        {status === "error" && (
          <div className="rounded-2xl bg-red-50 border-2 border-red-200 p-5">
            <div className="font-bold text-red-800 mb-2 text-[19px]">
              {lang === "zh" ? "出了点问题" : "Something went wrong"}
            </div>
            <div className="text-[15px] text-red-900 mb-3 break-words">
              {errorMessage}
            </div>
            <button
              onClick={reset}
              className="w-full py-3 rounded-xl bg-white border border-red-200 text-red-700 font-semibold"
            >
              {lang === "zh" ? "重试" : "Try again"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
