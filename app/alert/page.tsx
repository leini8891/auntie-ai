"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, useT } from "@/lib/store";
import { LangToggle } from "@/components/LangToggle";

export default function AlertPage() {
  const t = useT();
  const router = useRouter();
  const assessment = useStore((s) => s.assessment);
  const lang = useStore((s) => s.lang);
  const [copied, setCopied] = useState(false);

  // Redirect to home if no assessment or no familyAlertDraft
  useEffect(() => {
    if (!assessment || !assessment.familyAlertDraft) {
      router.push("/");
    }
  }, [assessment, router]);

  // Show nothing while redirecting
  if (!assessment || !assessment.familyAlertDraft) return null;

  const message = assessment.familyAlertDraft;
  const waHref = `https://wa.me/?text=${encodeURIComponent(message)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may not be available — silently fail
    }
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center pb-20">
      <div className="w-full max-w-md px-4 pt-4">
        {/* Sticky header */}
        <div className="sticky top-0 bg-cream/95 backdrop-blur z-10 -mx-4 px-4 pt-4 pb-3 flex items-center justify-between">
          <a
            href="/result"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            className="text-navy font-semibold text-[17px]"
          >
            ← {t("common.back")}
          </a>
          <LangToggle />
        </div>

        {/* Page title */}
        <h2 className="text-[24px] font-bold text-ink mb-5">{t("alert.h1")}</h2>

        {/* Recipient card */}
        <div className="rounded-2xl border border-mist bg-white p-4 mb-5 flex items-center gap-3">
          {/* Avatar circle */}
          <div className="w-12 h-12 rounded-full bg-teal/15 flex items-center justify-center shrink-0">
            <span className="text-[22px]">👩</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[17px] text-ink">
              {lang === "zh" ? "小芳" : "Xiaofang"}
              {" · "}
              {lang === "zh" ? "女儿" : "Daughter"}
            </div>
            <div className="text-[14px] text-stone">+65 9XXX XXXX</div>
          </div>
          <button
            onClick={() => {}}
            className="text-[14px] text-navy font-medium shrink-0 hover:underline"
          >
            ✏️ {t("alert.edit")}
          </button>
        </div>

        {/* Message card */}
        <div className="rounded-2xl border border-mist bg-white overflow-hidden mb-2">
          <div className="px-4 py-2 bg-paper border-b border-mist">
            <span className="text-[14px] font-semibold text-stone">
              {t("alert.messageLabel")}
            </span>
          </div>
          <div
            className="p-4 text-[16px] leading-[1.65] text-ink whitespace-pre-wrap font-mono"
            style={{ fontFamily: "'SF Mono', 'Menlo', 'Consolas', monospace" }}
          >
            {message}
          </div>
          <div className="px-4 py-2 bg-emerald-50/50 border-t border-mist">
            <span className="text-[13px] text-emerald-800">
              {t("alert.redactedNote")}
            </span>
          </div>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`w-full mt-3 py-3.5 rounded-2xl border-2 font-semibold text-[17px] transition ${
            copied
              ? "border-emerald-400 bg-emerald-50 text-emerald-700"
              : "border-navy/25 bg-white text-navy hover:bg-navy/5"
          }`}
        >
          {copied ? t("alert.copied") : t("alert.copy")}
        </button>

        {/* WhatsApp CTA */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-4 py-4 rounded-2xl bg-emerald-600 text-white font-bold text-[18px] text-center hover:bg-emerald-700 transition"
        >
          📱 {t("alert.sendWhatsapp")}
        </a>

        {/* Help text */}
        <p className="text-[13px] text-stone mt-3 text-center">
          {t("alert.helpText")}
        </p>

        {/* Copy tip */}
        <p className="text-[13px] text-stone/70 mt-6 text-center">
          {t("alert.copyTip")}
        </p>
      </div>
    </main>
  );
}
