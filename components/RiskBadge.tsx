"use client";

import type { RiskAssessment } from "@/lib/types";
import { useT } from "@/lib/store";

const STYLES: Record<RiskAssessment["riskLevel"], string> = {
  Safe: "bg-emerald-50 border-emerald-200 text-emerald-800",
  Low: "bg-blue-50 border-blue-200 text-blue-800",
  Medium: "bg-amber-50 border-amber-300 text-amber-900",
  High: "bg-red-50 border-red-200 text-red-800",
  "Very High": "bg-red-50 border-red-300 text-red-700",
};

const ICONS: Record<RiskAssessment["riskLevel"], string> = {
  Safe: "✓",
  Low: "ℹ",
  Medium: "!",
  High: "⚠",
  "Very High": "⚠",
};

export function RiskBadge({ level }: { level: RiskAssessment["riskLevel"] }) {
  const t = useT();
  const cls = STYLES[level];
  const isHigh = level === "High" || level === "Very High";
  return (
    <div
      className={`mt-2 mb-5 rounded-3xl border-2 p-5 ${cls} ${
        isHigh ? "danger-stripe" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="text-sm uppercase tracking-widest font-bold mb-1 opacity-80">
            {t(`result.level.${level}` as `result.level.${typeof level}`)}
          </div>
        </div>
        <div className="w-14 h-14 rounded-full bg-current text-white flex items-center justify-center text-2xl flex-shrink-0 badge-glow">
          <span style={{ color: "white" }}>{ICONS[level]}</span>
        </div>
      </div>
    </div>
  );
}
