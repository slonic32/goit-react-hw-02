import { useState, useEffect } from "react";
import "modern-normalize";

import Options from "./Options/Options";
import Description from "./Description/Description";
import Feedback from "./Feedback/Feedback";
import Notification from "./Notification/Notification";

const SAVEDFEEDBACKS = "saved-feedbacks";

function readFeedbacks() {
  const feedbacks = window.localStorage.getItem(SAVEDFEEDBACKS);

  if (feedbacks !== null) {
    return JSON.parse(feedbacks);
  }

  return {
    good: 0,
    neutral: 0,
    bad: 0,
  };
}

export default function App() {
  const [feedbacks, setFeedbacks] = useState(readFeedbacks);

  function handleFeedback({ good, neutral, bad }) {
    if (good + neutral + bad > 0) {
      setFeedbacks({
        good: feedbacks.good + good,
        neutral: feedbacks.neutral + neutral,
        bad: feedbacks.bad + bad,
      });
    } else {
      setFeedbacks({
        good: 0,
        neutral: 0,
        bad: 0,
      });
    }
  }

  useEffect(() => {
    window.localStorage.setItem(SAVEDFEEDBACKS, JSON.stringify(feedbacks));
  }, [feedbacks]);

  return (
    <>
      <Description></Description>
      <Options
        handleFeedback={handleFeedback}
        totalFeedback={feedbacks.good + feedbacks.neutral + feedbacks.bad}
      ></Options>
      {feedbacks.good + feedbacks.neutral + feedbacks.bad > 0 ? (
        <Feedback
          feedbacks={feedbacks}
          totalFeedback={feedbacks.good + feedbacks.neutral + feedbacks.bad}
          positiveFeedback={Math.round(
            ((feedbacks.good + feedbacks.neutral) /
              (feedbacks.good + feedbacks.neutral + feedbacks.bad)) *
              100
          )}
        ></Feedback>
      ) : (
        <Notification />
      )}
    </>
  );
}
