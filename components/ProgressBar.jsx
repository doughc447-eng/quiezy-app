export default function ProgressBar({
  questions,
  current,
  answers,
}) {
  function getStatus(index) {
    if (answers[index] === undefined) {
      return "";
    }

    return answers[index] === questions[index].answer
      ? "correct"
      : "wrong";
  }

  return (
    <div className="progress-wrapper">
      <p className="progress-title">YOUR PROGRESS</p>

      <div
        className="progress-items"
        style={{
          gridTemplateColumns: `repeat(${questions.length}, minmax(0, 1fr))`,
        }}
      >
        {questions.map((question, index) => {
          const status = getStatus(index);

          return (
            <div
              key={question.id}
              className={`progress-item ${status} ${
                index === current ? "active" : ""
              }`}
            >
              {status === "correct"
                ? "✓"
                : status === "wrong"
                ? "✕"
                : ""}
            </div>
          );
        })}
      </div>

      <span className="question-count">
        {current + 1} / {questions.length}
      </span>
    </div>
  );
}