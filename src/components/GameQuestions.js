import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { colors } from "../utils";
import { FlexContainer } from "./elements";

const ChoiceContainer = styled.li(({ bgColor }) => ({
  display: "flex",
  margin: "10px",
  fontSize: 12,
  border: `1px solid var(--${bgColor})`,
  background: `linear-gradient(to right, var(--${bgColor}), white)`,
  borderRadius: "10px",

  // I used the media to prevent unwanted hover effects on mobile, 
  // alternatively it would be possible to use the onMouseOver onMouseOut events
  "@media (min-width: 1200px)": {
    ":hover": {
      cursor: "pointer",
      borderRadius: "10px",
      boxShadow: "1px 4px 8px 0 rgba(13, 36, 48, 0.5)",
      transform: "translateY(-0.1rem)",
      transition: "transform 150ms"
    }
  }
}));

const CounterContainer = styled(FlexContainer)({
  width: "100%",
  justifyContent: "space-around",
  fontSize: 24,
  lineHeight: "24px"
});

const ChoicePrefix = styled.p({
  padding: "1.5rem 2rem",
  color: "white"
});


const GameQuestions = ({
  isReset,
  questionCounter,
  finishQuestion,
  answers = [],
  question
}) => {
  const [count, setCount] = useState(30);
  const isSireneCount = count % 2 !== 0 && count < 6;
  const colorIndex = questionCounter % colors.length;
  const bgColor = colors[colorIndex];

  useEffect(() => {
    if (questionCounter !== null && questionCounter < 10) {
      const delay = isReset ? 50 : 1000;
      setCount(() => 30);
      var id = setInterval(() => setCount(count => count - 1), delay);
      return () => clearInterval(id);
    } else clearInterval(id);
  }, [questionCounter, isReset]);

  useEffect(() => {
    count === -1 && finishQuestion();
  }, [count, finishQuestion]);

  return (
    <>
      <CounterContainer>
        <span role="img" aria-label="siren-emoji">
          {isSireneCount && "🚨"}
        </span>
        {count}
        <span role="img" aria-label="siren-emoji">
          {isSireneCount && "🚨"}
        </span>
      </CounterContainer>
        {/* The finishQuestion here uses the count. 
        Although it was no requirement to use the count to determine the score 
        I think it's better to differentiate the score bases on time left 
        This however has the effect that Questions will render each count
        If the count is deifnitely not needed 
        I would pass the question and answers as Children to the component
        */}
      <h2 style={{ margin: "25px 0" }}>{question}</h2>
      <div>
        {answers?.map((answer, index) => (
          <ChoiceContainer
            key={`li-answer-${index}`}
            onClick={() => finishQuestion(index, count)}
            bgColor={bgColor}
          >
            <ChoicePrefix>{String.fromCharCode(65 + index)}</ChoicePrefix>
            <p style={{ padding: "1.5rem 2.5rem" }}>{answer}</p>
          </ChoiceContainer>
        ))}
      </div>
    </>
  );
};

GameQuestions.propTypes = {
  questionCounter: PropTypes.number.isRequired,
  finishQuestion: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  isReset: PropTypes.bool
};

export default GameQuestions;
