import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const ScoreRow = styled.div({
  fontSize: 18,
  display: 'flex',
  justifyContent: 'space-around',
  width: '200px',
  margin: '0 auto'

});

const UserResult = ({ score, correctAnswers, children, isReset = false }) => (
  <>
    {isReset ? (
      <h2>ALL RESET</h2>
    ) : (
      <>
        <h2>Your Result</h2>
        <ScoreRow>
          <span>Score: </span>
          {score}
        </ScoreRow>
        <ScoreRow>
          <span>Correct Answers: </span>
          {correctAnswers}
        </ScoreRow>
      </>
    )}
    <div style={{ margin: "0 auto" }}>{children}</div>
  </>
);

UserResult.propTypes = {
  score: PropTypes.number,
  correctAnswers: PropTypes.number,
  children: PropTypes.array.isRequired,
  isReset: PropTypes.bool
};

export default UserResult;
