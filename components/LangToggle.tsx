"use client";

import { useStore } from "@/lib/store";

export function LangToggle() {
  const lang = useStore((s) => s.lang);
  const setLang = useStore((s) => s.setLang);
  const base =
    "px-4 py-1.5 rounded-full transition text-sm font-semibold";
  const active = "bg-navy text-white";
  const inactive = "text-stone";
  return (
    <div className="inline-flex rounded-full border border-mist bg-paper p-1">
      <button
        onClick={() => setLang("zh")}
        className={`${base} ${lang === "zh" ? active : inactive}`}
      >
        中
      </button>
      <button
        onClick={() => setLang("en")}
        className={`${base} ${lang === "en" ? active : inactive}`}
      >
        EN
      </button>
    </div>
  );
}
