import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";


const ScoreRow = styled.div({
  fontSize: 24,
  margin: 16
});

const ResultContainer = styled.div({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
})

const UserResult = ({ score, correctAnswers, children }) => (
  <ResultContainer>
    <h2 style={{ maxWidth: "100%" }}>Your Result</h2>
    <ScoreRow>
      <span>Score: </span>
      {score}
    </ScoreRow>
    <ScoreRow>
      <span>Correct Answers: </span>
      {correctAnswers}
    </ScoreRow>
    {children}
  </ResultContainer>
);

UserResult.propTypes = {
    score : PropTypes.number,
    correctAnswers: PropTypes.number,
    children: PropTypes.array.isRequired
}

export default UserResult;
