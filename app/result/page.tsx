"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore, useT } from "@/lib/store";
import { RiskCard } from "@/components/RiskCard";
import { FamilyAlertCallout } from "@/components/FamilyAlertCallout";
import { LangToggle } from "@/components/LangToggle";

export default function ResultPage() {
  const t = useT();
  const router = useRouter();
  const assessment = useStore((s) => s.assessment);
  const reset = useStore((s) => s.reset);

  // Redirect to home if no assessment
  useEffect(() => {
    if (!assessment) {
      router.push("/");
    }
  }, [assessment, router]);

  // Show nothing while redirecting
  if (!assessment) return null;

  function goHome() {
    reset();
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center pb-20">
      <div className="w-full max-w-md px-4 pt-4">
        {/* Sticky header */}
        <div className="sticky top-0 bg-cream/95 backdrop-blur z-10 -mx-4 px-4 pt-4 pb-3 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              goHome();
            }}
            className="text-navy font-semibold text-[17px]"
          >
            ← {t("common.back")}
          </a>
          <LangToggle />
        </div>

        {/* Page title */}
        <h2 className="text-[24px] font-bold text-ink mb-4">{t("result.h2")}</h2>

        {/* Risk verdict card */}
        <RiskCard assessment={assessment} />

        {/* Family alert callout (High/Very High only) */}
        {(assessment.riskLevel === "High" ||
          assessment.riskLevel === "Very High") && (
          <FamilyAlertCallout assessment={assessment} />
        )}

        {/* Check another button */}
        <button
          onClick={goHome}
          className="w-full mt-6 py-3 rounded-2xl border border-mist text-stone font-medium text-[16px] hover:bg-paper transition"
        >
          {t("result.checkAnother")}
        </button>
      </div>
    </main>
  );
}
