import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

const HighScoreContainer = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column"
});

const HighScore = styled.div({
  display: "flex",
  fontSize: "80%",
  justifyContent: "space-between",
  marginBottom: 10,
  "> div": {
    width: "30%"
  }
});

const Btn = styled(Link)({
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

const HighScores = () => {
  const location = useLocation();
  let userResults =
    location?.state?.userResults ||
    JSON.parse(localStorage.getItem("userResults")) ||
    [];
  return (
    <HighScoreContainer>
      <h1>high scores</h1>
      {userResults.length > 0 ? (
        <div className="top3">
          {userResults.map(({ score, correctAnswers, name }, index) => (
            <HighScore key={`high-score-${index}`}>
              <div>
                <span>Score: </span>
                <span>{score}</span>
              </div>
              <div>
                <span>Correct: </span>
                <span>{correctAnswers}</span>
              </div>
              <div>
                <span>Name: </span>
                <span>{name}</span>
              </div>
            </HighScore>
          ))}
        </div>
      ) : (
        <h2>Not enough scores yet</h2>
      )}
      <Btn to="/">New Game</Btn>
    </HighScoreContainer>
  );
};

export default HighScores;
