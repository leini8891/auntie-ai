"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useStore, useT } from "@/lib/store";
import { SCENARIOS } from "@/lib/scenarios";
import { LangToggle } from "@/components/LangToggle";
import type { ScenarioId } from "@/lib/types";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/heic", "image/heif"];
const MAX_SIZE_MB = 5;

export default function UploadPage() {
  const t = useT();
  const router = useRouter();
  const lang = useStore((s) => s.lang);
  const uploadedFile = useStore((s) => s.uploadedFile);
  const setUploadedFile = useStore((s) => s.setUploadedFile);
  const setImageDataUrl = useStore((s) => s.setImageDataUrl);
  const setStatus = useStore((s) => s.setStatus);
  const setAssessment = useStore((s) => s.setAssessment);

  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedScenarioId, setSelectedScenarioId] = useState<ScenarioId | null>(
    null,
  );
  const cameraInputRef = useRef<HTMLInputElement>(null);

  /* ── File validation & store ── */
  function handleFile(file: File) {
    setFileError(null);
    setSelectedScenarioId(null); // clear scenario selection

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError(t("upload.wrongType"));
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setFileError(t("upload.tooLarge"));
      return;
    }
    setUploadedFile(file);

    // Convert file to base64 data URL for vision API
    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave() {
    setIsDragging(false);
  }

  function onFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function onCameraClick() {
    cameraInputRef.current?.click();
  }

  /* ── Scenario selection ── */
  function pickScenario(id: ScenarioId) {
    setSelectedScenarioId(id);
    setUploadedFile(null); // clear file selection
    setImageDataUrl(null); // clear image data URL
    setFileError(null);
  }

  /* ── Navigate to /thinking ── */
  function goCheck() {
    if (!uploadedFile && !selectedScenarioId) return;

    setStatus("checking");
    const query = selectedScenarioId ? `?scenario=${selectedScenarioId}` : "";
    router.push(`/thinking${query}`);
  }

  const hasSelection = !!uploadedFile || !!selectedScenarioId;

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center pb-20">
      <div className="w-full max-w-md px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <a href="/" className="text-navy font-semibold text-[17px]">
            ← {t("common.back")}
          </a>
          <LangToggle />
        </div>

        <h1 className="text-[28px] leading-tight font-bold text-ink mb-2">
          {t("upload.h1")}
        </h1>
        <p className="text-stone text-[17px] mb-6">
          {lang === "zh"
            ? "拖入截图、拍照、或选一个示例场景"
            : "Drop a screenshot, take a photo, or pick a sample"}
        </p>

        {/* ── DROP ZONE ── */}
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-colors cursor-pointer ${
            isDragging
              ? "border-navy bg-navy/10"
              : "border-navy/40 bg-white hover:border-navy/60"
          } ${uploadedFile ? "border-emerald-400 bg-emerald-50/50" : ""}`}
          onClick={() =>
            document.getElementById("upload-file-input")?.click()
          }
        >
          <input
            id="upload-file-input"
            type="file"
            accept="image/*,.heic,.heif"
            onChange={onFileInput}
            className="hidden"
          />

          {uploadedFile ? (
            <div>
              <div className="text-3xl mb-2">✅</div>
              <p className="text-[19px] font-semibold text-ink">
                {t("upload.fileSelected")}{" "}
                <span className="font-normal">{uploadedFile.name}</span>
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadedFile(null);
                  setImageDataUrl(null);
                }}
                className="mt-2 text-sm text-red-600 underline"
              >
                {lang === "zh" ? "移除文件" : "Remove"}
              </button>
            </div>
          ) : (
            <>
              <div className="text-4xl mb-3">📸</div>
              <p className="text-[19px] font-semibold text-navy">
                {t("upload.dropLabel")}
              </p>
              <p className="text-stone mt-1">
                {t("upload.dropOr")}
              </p>
            </>
          )}
        </div>

        {/* File error */}
        {fileError && (
          <p className="mt-2 text-red-600 text-[15px]">{fileError}</p>
        )}

        {/* Camera button */}
        <button
          onClick={onCameraClick}
          className="w-full mt-3 py-3.5 rounded-xl border-2 border-mist bg-white text-navy font-semibold text-[18px] hover:bg-mist/30 transition"
        >
          {t("upload.cameraBtn")}
        </button>
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onFileInput}
          className="hidden"
        />

        {/* Divider */}
        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-px bg-mist"></div>
          <span className="text-sm text-stone uppercase tracking-wider font-semibold">
            {t("upload.samples")}
          </span>
          <div className="flex-1 h-px bg-mist"></div>
        </div>

        {/* ── SAMPLE SCENARIO GRID ── */}
        <div className="grid grid-cols-2 gap-2.5">
          {SCENARIOS.map((s, i) => {
            const isSelected = selectedScenarioId === s.id;
            const isFirst = i === 0; // electricity bill spans full width

            return (
              <button
                key={s.id}
                onClick={() => pickScenario(s.id)}
                className={`${
                  isFirst ? "col-span-2" : ""
                } flex items-center gap-3 p-4 rounded-xl text-left border-2 transition ${
                  isSelected
                    ? "border-navy bg-navy/10 shadow-sm"
                    : "bg-paper border-mist hover:border-navy/50"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center text-xl flex-shrink-0 ${
                    isSelected ? "bg-navy text-white" : "bg-mist"
                  }`}
                >
                  {s.emoji}
                </div>
                <div className="min-w-0">
                  <div className={`font-semibold truncate text-[15px] ${
                    isSelected ? "text-navy" : "text-ink"
                  }`}>
                    {lang === "zh" ? s.titleZh : s.titleEn}
                  </div>
                  <div className="text-sm text-stone truncate">
                    {lang === "zh" ? s.subTitleZh : s.subTitleEn}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── PRIMARY CTA ── */}
        <button
          onClick={goCheck}
          disabled={!hasSelection}
          className={`w-full mt-8 py-5 rounded-2xl font-bold text-[20px] text-center transition ${
            hasSelection
              ? "bg-navy text-white shadow-md hover:bg-navy/90 active:scale-[0.98]"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {hasSelection ? t("upload.cta") : t("upload.ctaDisabled")}
        </button>
      </div>
    </main>
  );
}
