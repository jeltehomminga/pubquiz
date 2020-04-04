import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameQuestions from "../components/GameQuestions";
import UserResult from "../components/UserResult";
import useFetch from "../hooks/useFetch";
import { modifyResponseData, questionAmount } from "../utils";
import { Btn, FlexContainer } from "./elements";
import QuestionLayout from "./QuestionLayout";

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

const Game = ({ isReset, name }) => {
  const initialUserResult = () =>
    JSON.parse(localStorage.getItem("userResults")) || [];
  const [userResults, setUserResults] = useState([...initialUserResult()]);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionCounter, setQuestionCounter] = useState(0);
  const navigate = useNavigate();
  const lastQuestionNumber = questionAmount - 1;
  const isLastQuestion = questionCounter === lastQuestionNumber - 1;
  const url = `https://opentdb.com/api.php?amount=${questionAmount}&encode=url3986`;
  const { data: questions, isLoading, isError } = useFetch(
    url,
    {},
    modifyResponseData
  );
  const { answers, question, correctAnswerIndex } =
    questions[questionCounter] || {};

  useEffect(() => {
    window.localStorage.setItem("userResults", JSON.stringify(userResults));
  }, [userResults]);

  const resetResults = () => {
    localStorage.clear("userResults");
    setUserResults([]);
  };

  const setNewResults = () => {
    const newUserResults = [
      ...userResults,
      { name, score, correctAnswers }
    ].sort((a, b) => b.score - a.score);
    setUserResults(newUserResults.splice(10, 1));
  };

  const registerQuestionResults = () =>
    isReset ? resetResults() : setNewResults();

  const handleCorrectAnswer = count => {
    setScore(score + 100 + count);
    setCorrectAnswers(correctAnswers + 1);
  };

  const finishQuestion = (value, count) => {
    if (value === correctAnswerIndex) handleCorrectAnswer(count);
    if (isLastQuestion) registerQuestionResults();
    setQuestionCounter(questionCounter + 1);
  };

  return (
    <>
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
        <QuestionLayout questionCounter={questionCounter}>
          {questionCounter > lastQuestionNumber ? (
            <>
              <h1>test</h1>
              <UserResult {...{ score, correctAnswers, isReset }}>
                <Btn onClick={() => navigate("/")}>New Game</Btn>
                <Btn
                  onClick={() =>
                    navigate("/highscores", { state: { userResults } })
                  }
                >
                  High Scores
                </Btn>
              </UserResult>
            </>
          ) : (
            <GameQuestions
              {...{
                questionCounter,
                answers,
                question,
                finishQuestion,
                isReset
              }}
            />
          )}
        </QuestionLayout>
      )}
    </>
  );
};

export default Game;
