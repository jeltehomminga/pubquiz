import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import GameQuestions from "../components/GameQuestions";
import UserResult from "../components/UserResult";
import useFetch from "../hooks/useFetch";
import { modifyResponseData, questionAmount } from "../utils";
import { Btn, FlexContainer } from './elements';
import "./game.css";
import QuestionLayout from './QuestionLayout';


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
        questions[questionCounter] && (
          <QuestionLayout questionCounter={questionCounter}>
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
          </QuestionLayout>
        )
      )}
    </>
  );
};

export default Game;
