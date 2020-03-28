import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import GameQuestions from "../components/GameQuestions";
import UserResult from "../components/UserResult";
import useFetch from "../hooks/useFetch";
import { modifyResponseData, questionAmount } from "../utils";
import "./game.css";

const Btn = styled.div({
  fontSize: 16,
  padding: 8,
  width: 170,
  textAlign: "center",
  border: "0.1rem solid #1f1e32",
  marginBottom: "16px",
  color: "#1f1e32",
  textDecoration: "none",
  backgroundColor: "white"
});

const FlexContainer = styled.div(({ column }) => ({
  display: "flex",
  flexDirection: column ? "column" : "row",
  justifyContent: "center",
  alignItems: "center"
}));

const ErrorView = () => (
  <FlexContainer column>
    <h1>
      <span role="img" aria-label="beer-emoji">
        🍺
      </span>
      <span>Pub Quiz</span>
      <span role="img" aria-label="beer-emoji">
        🍺
      </span>
    </h1>
    <h1>
      <span role="img" aria-label="beer-emoji">
        🐒
      </span>
      API on break
    </h1>
    <Btn>
      <Link type="submit" to="/">
        Back
      </Link>
    </Btn>
  </FlexContainer>
);

const Game = () => {
  const initialUserResult = () =>
    JSON.parse(localStorage.getItem("userResults")) || [];
  const [userResults, setUserResults] = useState([...initialUserResult()]);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionCounter, setQuestionCounter] = useState(0);
  const { name = "Anonymous" } = useParams();
  const navigate = useNavigate();
  const lastQuestion = questionAmount - 1;
  const url = `https://opentdb.com/api.php?amount=${questionAmount}&encode=url3986`;
  const { data: questions, isLoading, isError } = useFetch(
    url,
    {},
    modifyResponseData
  );
  const { answers, question } = questions[questionCounter] || {};

  useEffect(() => {
    window.localStorage.setItem("userResults", JSON.stringify(userResults));
  }, [userResults]);

  const finishQuestion = (value, count) => {
    const { correctAnswerIndex } = questions[questionCounter];
    if (count && value === correctAnswerIndex) {
      setScore(score + 100 + count);
      setCorrectAnswers(correctAnswers + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (questionCounter < lastQuestion) setQuestionCounter(questionCounter + 1);
    if (questionCounter >= lastQuestion - 1) {
      const userResult = { name, score, correctAnswers };
      const newUserResults = [...userResults, { ...userResult }].sort(
        (a, b) => b.score - a.score
      );
      newUserResults.splice(10, newUserResults.length);
      setUserResults(newUserResults);
    }
  };

  return (
    <div style={{width: '65%'}}>
      {isLoading ? (
        <FlexContainer>
          <span
            role="img"
            aria-label="hourglass-emoji"
            style={{ fontSize: 48 }}
          >
            ⏳
          </span>
        </FlexContainer>
      ) : isError ? (
        <ErrorView />
      ) : (
        questions[questionCounter] && (
          <FlexContainer column>
            {questionCounter > questionAmount - 2 && userResults.length > 0 ? (
              <UserResult {...{ score, correctAnswers }}>
                <Btn onClick={() => navigate("/")}>New Game</Btn>
                <Btn
                  onClick={() =>
                    navigate("/highscores", { state: { userResults } })
                  }
                >
                  High Scores
                </Btn>
              </UserResult>
            ) : (
              <GameQuestions
                {...{
                  questionCounter,
                  setQuestionCounter,
                  answers,
                  question,
                  finishQuestion
                }}
              />
            )}
          </FlexContainer>
        )
      )}
    </div>
  );
};

export default Game;
