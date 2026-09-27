export default function AnswerOption({
  letter,
  text,
  selected,
  onClick,
  disabled,
}) {
  return (
    <button
      className={`option ${selected ? "selected" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="radio">
        {selected ? "●" : ""}
      </span>

      <span className="option-letter">
        {letter}
      </span>

      <span>{text}</span>
    </button>
  );
}