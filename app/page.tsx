"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore, useT } from "@/lib/store";
import { SCENARIOS } from "@/lib/scenarios";
import { LangToggle } from "@/components/LangToggle";
import type { ScenarioId } from "@/lib/types";

export default function HomePage() {
  const t = useT();
  const router = useRouter();
  const lang = useStore((s) => s.lang);
  const status = useStore((s) => s.status);
  const errorMessage = useStore((s) => s.errorMessage);
  const setStatus = useStore((s) => s.setStatus);
  const setError = useStore((s) => s.setError);
  const reset = useStore((s) => s.reset);

  function checkScenario(id: ScenarioId) {
    setStatus("checking");
    router.push(`/thinking?scenario=${id}`);
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
              onClick={() => reset()}
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
