export default function QuizHeader({ title }) {
  return (
    <header className="quiz-header">
      <p className="label">QUIZ</p>
      <h1>{title}</h1>
    </header>
  );
}