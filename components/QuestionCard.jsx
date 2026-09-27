export default function QuestionCard({ number, question }) {
  return (
    <div className="question-content">
      <p className="question-number">
        QUESTION NO. {number}
      </p>

      <h2>{question}</h2>
    </div>
  );
}