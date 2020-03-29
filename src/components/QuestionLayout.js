import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FlexContainer, CenteredDiv } from "./elements";
import { colors } from "../utils";

const QuestionLayoutContainer = styled(FlexContainer)(({ bgColor }) => ({
  height: "100vh",
  width: "100%",
  flexDirection: "column",
  backgroundColor: `var(--${bgColor})`,
  textAlign: 'center'
}));

const QuestionLayout = ({ children, questionCounter }) => {
  const [bgColor, setBgColor] = useState(colors[0]);
  useEffect(() => {
    setBgColor(bgColor => {
      const currenColorIndex = colors.indexOf(bgColor);
      const newColorIndex =
        currenColorIndex >= colors.length - 1 ? 0 : currenColorIndex + 1;
      const selectedColor = colors[newColorIndex];
      return selectedColor;
    });
  }, [questionCounter]);

  return (
    <QuestionLayoutContainer bgColor={bgColor}>
      <CenteredDiv
        initial={{ opacity: 0, scale: 0.7 , x: 100, y: -100}}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </CenteredDiv>
    </QuestionLayoutContainer>
  );
};

export default QuestionLayout;
