import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";


const ChoiceContainer = styled.li ({
  display: "flex",
  marginBottom: "0.5rem",
  width: "92%",
  fontSize: "12px",
  border: "0.1rem solid rgba(86, 165, 235, 0.3)",
  backgroundColor: "white"
});

const ChoicePrefix = styled.p({
  padding: "1.5rem 2.5rem",
  backgroundColor: "#1f1e32",
  color: "white"
});

const GameQuestions = ({
  questionCounter,
  setQuestionCounter,
  finishQuestion,
  answers,
  question
}) => {
  const [count, setCount] = useState(30);

  useEffect(() => {
    if (questionCounter !== null && questionCounter < 10) {
      setCount(() => 30);
      var id = setInterval(() => setCount(count => count - 1), 1000);
      return () => clearInterval(id);
    } else clearInterval(id);
  }, [questionCounter]);

  useEffect(() => {
    count < 1 && setQuestionCounter(qc => qc + 1);
  }, [count, setQuestionCounter]);

  return (
    <>
      <div className="timer">{count}</div>
      <h2>{question}</h2>
      {answers?.map((answer, index) => (
        <ChoiceContainer
          key={`li-answer-${index}`}
          onClick={() => finishQuestion(index, count)}
        >
          <ChoicePrefix className="choice-prefix">
            {String.fromCharCode(65 + index)}
          </ChoicePrefix>
          <p style={{ padding: "1.5rem 2.5rem" }}>{answer}</p>
        </ChoiceContainer>
      ))}
    </>
  );
};

GameQuestions.propTypes = {
    questionCounter: PropTypes.number.isRequired,
    setQuestionCounter: PropTypes.func.isRequired,
    finishQuestion: PropTypes.func.isRequired,
    answers: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired
}

export default GameQuestions;
