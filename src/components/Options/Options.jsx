import css from "./Options.module.css";

export default function Options({ handleFeedback, totalFeedback }) {
  return (
    <div className={css.options}>
      <button onClick={() => handleFeedback({ good: 1, neutral: 0, bad: 0 })}>
        Good
      </button>
      <button onClick={() => handleFeedback({ good: 0, neutral: 1, bad: 0 })}>
        Neutral
      </button>
      <button onClick={() => handleFeedback({ good: 0, neutral: 0, bad: 1 })}>
        Bad
      </button>
      {totalFeedback > 0 && (
        <button onClick={() => handleFeedback({ good: 0, neutral: 0, bad: 0 })}>
          Reset
        </button>
      )}
    </div>
  );
}
