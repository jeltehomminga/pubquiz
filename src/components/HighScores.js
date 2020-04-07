import styled from "@emotion/styled";
import React from "react";
import { useLocation } from "react-router-dom";
import { CenteredDiv, LinkButton } from "./elements";

const HighScore = styled.table({
  fontSize: 16,
  margin: "16px 0",
});

const HighScores = () => {
  const location = useLocation();
  let userResults =
    location.state?.userResults ||
    JSON.parse(localStorage.getItem("userResults")) ||
    [];
  let gameId = location?.state?.id;
  return (
    <CenteredDiv
      style={{ textAlign: "center", justifyContent: "space-between" }}
      initial={{ opacity: 0, scale: 0.7, x: -200, y: 100 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1>HIGH SCORES</h1>
      {userResults.length > 0 ? (
        <HighScore>
          <thead>
            <tr style={{ lineHeight: "32px" }}>
              <th>Score</th>
              <th>Correct</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {userResults.map(({ score, correctAnswers, name, id }, index) => (
              <tr
                key={`high-score-${index}`}
                style={{
                  lineHeight: "24px",
                  fontWeight: gameId === id ? "bold" : "normal",
                }}
              >
                <td>{score}</td>
                <td>{correctAnswers}</td>
                <td>{name}</td>
              </tr>
            ))}
          </tbody>
        </HighScore>
      ) : (
        <h2>Not enough scores yet</h2>
      )}
      <LinkButton to="/">New Game</LinkButton>
    </CenteredDiv>
  );
};

export default HighScores;
