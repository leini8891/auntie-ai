"use client";

/**
 * STUB — see CodeBuddy_Prompts.md prompt #4.
 * Day 1: Home page renders results inline. Day 2: split into dedicated /result.
 */
import Link from "next/link";

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-navy mb-3">Result page · TODO</h1>
        <p className="text-stone mb-6">
          Day 1 renders the result inline on the Home page. Day 2 will move it here
          for routing + sharable links. See CodeBuddy_Prompts.md → Prompt #4.
        </p>
        <Link href="/" className="text-navy underline">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
