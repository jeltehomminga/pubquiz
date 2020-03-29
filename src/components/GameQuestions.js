import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FlexContainer } from "./elements";

const ChoiceContainer = styled.li({
  display: "flex",
  marginBottom: "0.5rem",
  fontSize: "12px",
  border: "0.1rem solid rgba(86, 165, 235, 0.3)",
  backgroundColor: "white",

  ":hover": {
    cursor: "pointer",
    boxShadow: "0 0.4rem 1.4rem 0 rgba(13, 36, 48, 0.5)",
    transform: "translateY(-0.1rem)",
    transition: "transform 150ms"
  }
});

const ChoicePrefix = styled.p({
  padding: "1.5rem 2.5rem",
  backgroundColor: "#1f1e32",
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
      <FlexContainer
        style={{
          width: "100%",
          justifyContent: "space-around",
          fontSize: "24px"
        }}
      >
        {count < 6 && (
          <span role="img" aria-label="siren-emoji">
            🚨
          </span>
        )}
        {count}
        {count < 6 && (
          <span role="img" aria-label="siren-emoji">
            🚨
          </span>
        )}
      </FlexContainer>
      <h2 style={{ margin: "25px 0" }}>{question}</h2>
      <div>
        {answers?.map((answer, index) => (
          <ChoiceContainer
            key={`li-answer-${index}`}
            onClick={() => finishQuestion(index, count)}
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
