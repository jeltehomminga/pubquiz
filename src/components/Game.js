import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameQuestions from "../components/GameQuestions";
import UserResult from "../components/UserResult";
import useFetch from "../hooks/useFetch";
import { modifyResponseData, questionAmount } from "../utils";
import { Btn, FlexContainer } from "./elements";
import QuestionLayout from "./QuestionLayout";
import useSound from "use-sound";
import correctSound from "../sounds/correct.mp3";
import wrongSound from "../sounds/toolatebuzz.mp3";

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
  // score and correctAnswers are always uodated together therefor it makes most sense to put them in one object
  const [userScore, setUserScore] = useState({
    score: 0,
    correctAnswers: 0,
  });

  // some sound for fun 
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound, { volume: 0.4 });

  const gameId = useRef(name + Math.random());
  const { score, correctAnswers } = userScore;
  const [questionCounter, setQuestionCounter] = useState(0);
  const navigate = useNavigate();
  const lastQuestionNumber = questionAmount - 1;
  const isLastQuestion = questionCounter === lastQuestionNumber;
  const position = userResults.findIndex((el) => el.id === gameId.current) + 1;
  const url = `https://opentdb.com/api.php?amount=${questionAmount}&encode=url3986`;

  // I do the useFetch in this component because it makes more sense to me to fetch all the needed questions at once
  // instead per question. Otherwise there is a risk there is an error halfway the questions and the quiz cannot be finished
  // Also I think it's better to not have a loading time between questions, although this could be prevented with fetching earlier
  const { data: questions, isLoading, isError } = useFetch(
    url,
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
      { name, ...userScore, id: gameId.current },
    ].sort((a, b) => b.score - a.score);
    newUserResults.splice(10, 1);
    setUserResults(newUserResults);
  };

  const registerQuestionResults = () =>
    isReset ? resetResults() : setNewResults();

  const handleCorrectAnswer = (count) => {
    playCorrect();
    setUserScore({
      score: score + 100 + count,
      correctAnswers: correctAnswers + 1,
    });
  };

  const finishQuestion = (value, count) => {
    value === correctAnswerIndex ? handleCorrectAnswer(count) : playWrong();
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
              <UserResult {...{ score, correctAnswers, isReset, position }}>
                <Btn onClick={() => navigate("/")}>New Game</Btn>
                <Btn
                  onClick={() =>
                    navigate("/highscores", {
                      state: { userResults, id: gameId.current },
                    })
                  }
                >
                  High Scores
                </Btn>
              </UserResult>
            </>
          ) : (
            <GameQuestions
              // Although I think it's better to prevent spreading props unless you are using High Order Components
              // Here I spread specific props I want to pass as an alternative to repeating prop={prop}, prop={prop}
              {...{
                questionCounter,
                answers,
                question,
                finishQuestion,
                isReset,
              }}
            />
          )}
        </QuestionLayout>
      )}
    </>
  );
};

export default Game;
