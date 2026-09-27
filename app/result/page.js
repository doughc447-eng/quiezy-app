"use client";

import { useSearchParams } from "next/navigation";

import ResultCard from "@/components/ResultCard";

export default function ResultPage() {
  const searchParams = useSearchParams();

  const score = Number(searchParams.get("score")) || 0;
  const total = Number(searchParams.get("total")) || 0;
  const incorrect = Number(searchParams.get("incorrect")) || 0;
  const percentage = Number(searchParams.get("percentage")) || 0;

  return (
    <main className="result-page">
      <ResultCard
        total={total}
        correct={score}
        incorrect={incorrect}
        percentage={percentage}
      />
    </main>
  );
}