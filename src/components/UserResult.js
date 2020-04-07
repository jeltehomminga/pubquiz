import React, { useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import useWindowSize from "../hooks/useWindowSize";
import Confetti from "react-confetti";
import { confettiColors as colors } from "../utils";
import useSound from "use-sound";
import yaaaySound from '../sounds/celebrate.mp3'

const ScoreRow = styled.div({
  fontSize: 18,
  display: "flex",
  justifyContent: "space-around",
  width: "200px",
  margin: "0 auto",
});

const UserResult = ({
  score,
  correctAnswers,
  children,
  isReset = false,
  position,
}) => {
  const { width, height } = useWindowSize();
  const [playYaaaySound] = useSound(yaaaySound)

  useEffect(() => {
    position && playYaaaySound()
  }, [playYaaaySound, position])
 
  return (
    <>
      {isReset ? (
        <h2>ALL RESET</h2>
      ) : (
        <>
          <h2>{position ? `You are number  ${position}` : "Your result"}</h2>
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
      <div style={{ margin: "0 auto", width: "min-content" }}>{children}</div>
      {position ? <Confetti {...{ width, height, colors }} /> : null}
    </>
  );
};

UserResult.propTypes = {
  score: PropTypes.number,
  correctAnswers: PropTypes.number,
  children: PropTypes.array.isRequired,
  isReset: PropTypes.bool,
  position: PropTypes.number
};

export default UserResult;
