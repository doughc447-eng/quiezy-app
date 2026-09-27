"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import QuizHeader from "@/components/QuizHeader";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import AnswerOption from "@/components/AnswerOption";

export default function QuizPage() {
  const router = useRouter();

  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [saving, setSaving] = useState(false);

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
      <main className="quiz-page">
        <div className="loading">
          Loading quiz...
        </div>
      </main>
    );
  }

  const questions = quiz.question;
  const question = questions[current];

  const options = [
    {
      letter: "A",
      text: question.optionA,
    },
    {
      letter: "B",
      text: question.optionB,
    },
    {
      letter: "C",
      text: question.optionC,
    },
    {
      letter: "D",
      text: question.optionD,
    },
  ];

  function selectAnswer(answer) {
    setSelected(answer);
  }

  async function nextQuestion() {
    if (selected === null || saving) {
      return;
    }

    const updatedAnswers = [...answers];

    updatedAnswers[current] = selected;

    setAnswers(updatedAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      return;
    }

    const finalScore = updatedAnswers.reduce(
      (total, answer, index) => {
        return answer === questions[index].answer
          ? total + 1
          : total;
      },
      0
    );

    const total = questions.length;
    const incorrect = total - finalScore;
    const percentage = Math.round((finalScore / total) * 100);

    setSaving(true);

    try {
      const response = await fetch("/api/quiz/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId: quiz.id,
          score: finalScore,
          total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to save result:", data);
        alert("Failed to save quiz result.");
        setSaving(false);
        return;
      }

      router.push(
        `/result?score=${finalScore}&total=${total}&incorrect=${incorrect}&percentage=${percentage}`
      );
    } catch (error) {
      console.error("Error saving quiz result:", error);
      alert("There was a problem saving your quiz result.");
      setSaving(false);
    }
  }

  return (
    <main className="quiz-page">
      <div className="quiz-container">

        <QuizHeader title={quiz.title} />

        <section className="question-container">
          <div className="question-top">

            <p className="section-label">
              QUESTIONS
            </p>

            <ProgressBar
              questions={questions}
              current={current}
              answers={answers}
            />

          </div>

          <QuestionCard
            number={current + 1}
            question={question.question}
          />
        </section>

        <section className="answers-container">

          <p className="section-label">
            OPTIONS
          </p>

          <div className="options">
            {options.map((option) => (
              <AnswerOption
                key={option.letter}
                letter={option.letter}
                text={option.text}
                selected={selected === option.text}
                onClick={() => selectAnswer(option.text)}
                disabled={saving}
              />
            ))}
          </div>

          <div className="quiz-footer">

            <span>
              {saving
                ? "Saving result..."
                : selected
                ? "Answer selected"
                : "Choose an answer"}
            </span>

            <button
              className="next-button"
              onClick={nextQuestion}
              disabled={selected === null || saving}
            >
              {saving
                ? "Saving..."
                : current === questions.length - 1
                ? "Finish"
                : "Next →"}
            </button>

          </div>

        </section>

      </div>
    </main>
  );
}