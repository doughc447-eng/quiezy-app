"use client";

import { useRouter } from "next/navigation";

export default function ResultCard({
  total,
  correct,
  incorrect,
  percentage,
}) {
  const router = useRouter();

  return (
    <div className="result-card">
      <div className="result-icon">✓</div>

      <p className="label">QUIZ COMPLETE</p>

      <h1>Your Result</h1>

      <div className="final-score">
        {correct}
        <span> / {total}</span>
      </div>

      <div className="result-details">
        <div>
          <span>Total Questions</span>
          <strong>{total}</strong>
        </div>

        <div>
          <span>Correct Answers</span>
          <strong>{correct}</strong>
        </div>

        <div>
          <span>Incorrect Answers</span>
          <strong>{incorrect}</strong>
        </div>

        <div>
          <span>Percentage</span>
          <strong>{percentage}%</strong>
        </div>
      </div>

      <div className="result-actions">
        <button
          className="restart-button"
          onClick={() => router.push("/quiz")}
        >
          Retake Quiz
        </button>

        <button
          className="home-button"
          onClick={() => router.push("/")}
        >
          Return Home
        </button>
      </div>
    </div>
  );
}