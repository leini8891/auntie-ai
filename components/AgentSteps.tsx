"use client";

import { useStore } from "@/lib/store";

export function AgentSteps() {
  const lang = useStore((s) => s.lang);
  const labels = lang === "zh"
    ? ["看懂这屏的内容", "检查诈骗信号", "准备安全建议"]
    : ["Reading the screen", "Checking scam signals", "Preparing safe actions"];

  return (
    <div className="space-y-3">
      {[
        { tag: "THINK", color: "#0E7C7B" },
        { tag: "DECIDE", color: "#0E7C7B" },
        { tag: "EXECUTE", color: "#0F4C81" },
      ].map((step, i) => {
        const isCurrent = i === 2;
        return (
          <div
            key={step.tag}
            className={`flex items-start gap-3 px-4 py-3 rounded-xl ${
              isCurrent
                ? "bg-mist border-2 border-navy"
                : "bg-paper border border-mist"
            }`}
          >
            <span
              className={`text-xl mt-0.5 ${
                isCurrent ? "text-navy animate-spin" : "text-emerald-600"
              }`}
            >
              {isCurrent ? "⟳" : "✓"}
            </span>
            <div className="flex-1">
              <div className="agent-tag text-sm mb-0.5" style={{ color: step.color }}>
                {step.tag}
              </div>
              <div
                className={`font-semibold text-[17px] ${
                  isCurrent ? "text-navy font-bold" : "text-ink"
                }`}
              >
                {labels[i]}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
