"use client";

import { create } from "zustand";
import type { Lang, RiskAssessment } from "./types";
import { t, type DictKey } from "./i18n";

type Status = "idle" | "checking" | "result" | "error";

interface AppState {
  lang: Lang;
  status: Status;
  assessment: RiskAssessment | null;
  errorMessage: string | null;
  /** File uploaded via drag-drop or camera on /upload page */
  uploadedFile: File | null;
  /** Base64 data URL of the uploaded image (for vision API) */
  imageDataUrl: string | null;
  setLang: (lang: Lang) => void;
  setStatus: (status: Status) => void;
  setAssessment: (a: RiskAssessment) => void;
  setError: (msg: string) => void;
  setUploadedFile: (file: File | null) => void;
  setImageDataUrl: (url: string | null) => void;
  reset: () => void;
}

export const useStore = create<AppState>((set) => ({
  lang: "en",
  status: "idle",
  assessment: null,
  errorMessage: null,
  uploadedFile: null,
  imageDataUrl: null,
  setLang: (lang) => set({ lang }),
  setStatus: (status) => set({ status }),
  setAssessment: (assessment) =>
    set({ assessment, status: "result", errorMessage: null }),
  setError: (errorMessage) => set({ errorMessage, status: "error" }),
  setUploadedFile: (uploadedFile) => set({ uploadedFile }),
  setImageDataUrl: (imageDataUrl) => set({ imageDataUrl }),
  reset: () => set({ status: "idle", assessment: null, errorMessage: null, uploadedFile: null, imageDataUrl: null }),
}));

/** Hook for translated strings — pulls language from store. */
export function useT() {
  const lang = useStore((s) => s.lang);
  return (key: DictKey) => t(lang, key);
}
