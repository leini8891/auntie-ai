"use client";

import type { RiskAssessment } from "@/lib/types";
import { useT } from "@/lib/store";
import { useStore } from "@/lib/store";

interface FamilyAlertCalloutProps {
  assessment: RiskAssessment;
}

export function FamilyAlertCallout({ assessment }: FamilyAlertCalloutProps) {
  const t = useT();
  const lang = useStore((s) => s.lang);

  if (!assessment.familyAlertDraft) return null;

  return (
    <div className="mt-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-4">
      <div className="font-bold text-ink mb-2 text-[18px]">
        {t("result.familyAlertTitle")}
      </div>
      <div className="text-[15px] leading-relaxed text-ink whitespace-pre-line bg-white rounded-lg border border-mist p-3 mb-3">
        {assessment.familyAlertDraft}
      </div>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(assessment.familyAlertDraft)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-[18px] text-center hover:bg-emerald-700 transition"
      >
        {lang === "zh" ? "用 WhatsApp 发出去" : "Send via WhatsApp"}
      </a>
      <p className="text-[13px] text-stone mt-2 text-center">
        {t("result.familyAlertHelp")}
      </p>
    </div>
  );
}
