"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, useT } from "@/lib/store";
import { SCENARIOS } from "@/lib/scenarios";
import { AgentSteps } from "@/components/AgentSteps";
import { LangToggle } from "@/components/LangToggle";

export default function ThinkingPage() {
  const t = useT();
  const router = useRouter();
  const lang = useStore((s) => s.lang);
  const uploadedFile = useStore((s) => s.uploadedFile);
  const status = useStore((s) => s.status);
  const setStatus = useStore((s) => s.setStatus);
  const setAssessment = useStore((s) => s.setAssessment);
  const setError = useStore((s) => s.setError);

  // We need to know which scenario was selected — derive it from store
  // (stored via a URL param or sessionStorage; here we use a simple approach:
  // read from a transient state that /upload set before navigation.)
  // For now: we check if there's an uploadedFile or fall back to reading
  // the scenario from URL searchParams.
  const [scenarioId, setScenarioId] = useState<string | null>(null);

  useEffect(() => {
    // Read scenario ID from URL query param (set by /upload page)
    const params = new URLSearchParams(window.location.search);
    const sid = params.get("scenario");
    if (sid) setScenarioId(sid);

    // If no file and no scenario, go back home
    if (!uploadedFile && !sid) {
      router.push("/");
      return;
    }
  }, [uploadedFile, router]);

  /* ── Fire API call on mount when we have context ── */
  useEffect(() => {
    if (!uploadedFile && !scenarioId) return;

    let cancelled = false;

    async function runCheck() {
      try {
        // For now: if file uploaded, use bank-phishing text as fallback
        // Real vision is Prompt #6
        const screenText = uploadedFile
          ? "[Screenshot uploaded] Please analyze this image for scam signals."
          : SCENARIOS.find((s) => s.id === scenarioId)?.screenText ?? "";

        if (!screenText || cancelled) return;

        const res = await fetch("/api/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ screenText, language: lang }),
        });

        const data = await res.json();

        if (cancelled) return;

        if (!data.ok) throw new Error(data.error ?? "Unknown error");
        setAssessment(data.assessment);
        router.push("/result");
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
        router.push("/");
      }
    }

    runCheck();

    return () => {
      cancelled = true;
    };
  }, [uploadedFile, scenarioId, lang, setAssessment, setError, router]);

  /* ── Determine what preview text to show ── */
  const activeScenario = scenarioId
    ? SCENARIOS.find((s) => s.id === scenarioId)
    : null;

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center pb-20">
      <div className="w-full max-w-md px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="font-semibold text-navy text-[17px] opacity-0">
            {/* Spacer for alignment */}
            ← Back
          </div>
          <LangToggle />
        </div>

        <h2 className="text-[24px] font-bold text-ink mb-4">
          {t("thinking.h1")}
        </h2>

        {/* ── PREVIEW of what's being analyzed ── */}
        {(activeScenario || uploadedFile) && (
          <div className="rounded-2xl bg-mist/40 p-4 border border-mist mb-6">
            <div className="text-sm uppercase tracking-wider text-stone font-semibold mb-2">
              {t("thinking.reading")}
            </div>
            {uploadedFile ? (
              <div className="flex items-center gap-3 rounded-lg bg-white border border-mist p-3">
                <span className="text-2xl">🖼️</span>
                <div>
                  <p className="text-[15px] font-semibold text-ink">{uploadedFile.name}</p>
                  <p className="text-xs text-stone mt-0.5">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-lg bg-white border border-mist p-3 text-[15px] text-ink leading-relaxed">
                {activeScenario?.screenText}
              </div>
            )}
          </div>
        )}

        {/* Animated loading dots */}
        <div className="flex justify-center gap-2 mb-6">
          <span className="pulse-dot w-3 h-3 rounded-full bg-navy animate-bounce" style={{ animationDelay: "0ms", animationDuration: "800ms" }}></span>
          <span className="pulse-dot w-3 h-3 rounded-full bg-navy animate-bounce" style={{ animationDelay: "150ms", animationDuration: "800ms" }}></span>
          <span className="pulse-dot w-3 h-3 rounded-full bg-navy animate-bounce" style={{ animationDelay: "300ms", animationDuration: "800ms" }}></span>
        </div>

        {/* Agent Steps: THINK → DECIDE → EXECUTE */}
        <AgentSteps />

        <p className="text-center text-[15px] text-stone mt-7 leading-relaxed whitespace-pre-line">
          {t("thinking.waiting")}
          {"\n"}
          {t("thinking.timing")}
        </p>
      </div>
    </main>
  );
}


