import styled from "@emotion/styled";
import React from "react";
import { colors } from "../utils";
import { CenteredDiv, FlexContainer } from "./elements";

const QuestionLayoutContainer = styled(FlexContainer)(({ bgColor }) => ({
  height: "100vh",
  width: "100%",
  flexDirection: "column",
  backgroundColor: `var(--${bgColor})`,
  textAlign: "center"
}));

const QuestionLayout = ({ children, questionCounter }) => {
  const colorIndex = questionCounter % colors.length;
  const bgColor = colors[colorIndex];
  return (
    <QuestionLayoutContainer bgColor={bgColor}>
      <CenteredDiv
        initial={{ opacity: 0, scale: 0.7, x: 100, y: -100 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </CenteredDiv>
    </QuestionLayoutContainer>
  );
};

export default QuestionLayout;
