"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    fetch("/api/quiz")
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
      })
      .catch((error) => {
        console.error("Failed to load quiz:", error);
      });
  }, []);

  if (!quiz) {
    return (
      <main className="home-page">
        <div className="home-card">
          <p>Loading quiz...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="home-page">
      <div className="home-card">
        <p className="label">WELCOME TO</p>

        {/* APP TITLE */}
        <h1>Quiezy</h1>

        <p className="home-description">
          Easy peasy, questions easy!
        </p>
        <p>
          Test your knowledge by answering multiple-choice easy
          questions and see your final score at the end.
          
        </p>

        <div className="home-info">
          <span>{quiz.question.length} Questions</span>
          <span>•</span>
          <span>Multiple Choice</span>
        </div>

        <button
          className="start-button"
          onClick={() => router.push("/quiz")}
        >
          Start Quiz →
        </button>
      </div>
    </main>
  );
}