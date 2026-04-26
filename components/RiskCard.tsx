"use client";

import type { RiskAssessment } from "@/lib/types";
import { useT } from "@/lib/store";

export function RiskCard({ assessment }: { assessment: RiskAssessment }) {
  const t = useT();
  const isHigh = assessment.riskLevel === "High" || assessment.riskLevel === "Very High";
  const isSafe = assessment.riskLevel === "Safe";

  return (
    <div className="space-y-4">
      {/* HERO VERDICT */}
      <div
        className={`rounded-3xl p-5 border-2 ${
          isHigh
            ? "bg-red-50 border-red-200 danger-stripe"
            : isSafe
            ? "bg-emerald-50 border-emerald-200"
            : "bg-amber-50 border-amber-300"
        }`}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div
              className={`text-sm uppercase tracking-widest font-bold mb-1 ${
                isHigh ? "text-red-700" : isSafe ? "text-emerald-700" : "text-amber-800"
              }`}
            >
              {t(`result.level.${assessment.riskLevel}` as `result.level.${typeof assessment.riskLevel}`)}
            </div>
            <div
              className={`text-[26px] leading-tight font-extrabold ${
                isHigh ? "text-red-700" : isSafe ? "text-emerald-800" : "text-amber-900"
              }`}
            >
              {assessment.summary}
            </div>
          </div>
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0 ${
              isHigh
                ? "bg-red-600 text-white badge-glow"
                : isSafe
                ? "bg-emerald-600 text-white"
                : "bg-amber-500 text-white"
            }`}
          >
            {isHigh ? "⚠" : isSafe ? "✓" : "!"}
          </div>
        </div>

        {isHigh && (
          <button className="w-full mt-2 py-3 rounded-xl bg-white border border-red-200 text-red-700 font-semibold text-base flex items-center justify-center gap-2">
            {t("result.audio")}
          </button>
        )}
      </div>

      {/* WHY */}
      {assessment.warningSigns.length > 0 && (
        <div className="rounded-2xl bg-paper border border-mist p-4">
          <div className="font-bold text-ink mb-3 text-[19px]">{t("result.why")}</div>
          <div className="space-y-3">
            {assessment.warningSigns.map((sign, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-red-600 mt-1 text-base">●</span>
                <span className="text-ink leading-snug text-[16px]">{sign}</span>
              </div>
            ))}
          </div>
          <p className="text-[16px] text-stone leading-relaxed mt-4">
            {assessment.plainExplanation}
          </p>
        </div>
      )}
      {assessment.warningSigns.length === 0 && (
        <div className="rounded-2xl bg-paper border border-mist p-4">
          <p className="text-[16px] text-ink leading-relaxed">
            {assessment.plainExplanation}
          </p>
        </div>
      )}

      {/* RECOMMENDED ACTIONS */}
      <div
        className={`rounded-2xl p-4 border ${
          isHigh
            ? "bg-emerald-50 border-emerald-200"
            : "bg-mist/40 border-mist"
        }`}
      >
        <div className="font-bold mb-3 text-[19px]">{t("result.do")}</div>
        <div className="space-y-2 text-[16px] leading-relaxed">
          {assessment.recommendedActions.map((action, i) => (
            <div key={i}>
              <span className="font-bold mr-1">{`${i + 1}.`}</span>
              {action}
            </div>
          ))}
        </div>
      </div>

      {/* CONFIDENCE FOOTNOTE */}
      <p className="text-xs text-stone text-center italic">
        Auntie AI confidence: {assessment.confidence} · scam type: {assessment.scamType}
      </p>
    </div>
  );
}
