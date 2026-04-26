"use client";

/**
 * STUB — see CodeBuddy_Prompts.md prompt #2 to fill this in.
 *
 * Goal: dedicated upload screen with drag-drop / camera / sample picker.
 * For Day 1, the Home page (app/page.tsx) handles scenario picking inline,
 * so this page is reserved for Day 2 polish.
 */

import Link from "next/link";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-navy mb-3">Upload page · TODO</h1>
        <p className="text-stone mb-6">
          To be filled in Day 2. See CodeBuddy_Prompts.md → Prompt #2.
        </p>
        <Link href="/" className="text-navy underline">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
