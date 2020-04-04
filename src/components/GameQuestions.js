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
  answers,
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
  answers: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  isReset: PropTypes.bool
};

export default GameQuestions;
