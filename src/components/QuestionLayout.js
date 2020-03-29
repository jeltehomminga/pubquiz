import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FlexContainer } from "./elements";
import { colors } from "../utils";

const QuestionLayoutContainer = styled(FlexContainer)(({ bgColor }) => ({
  height: "100vh",
  width: "100%",
  flexDirection: "column",
  backgroundColor: `var(--${bgColor})`
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
      {children}
    </QuestionLayoutContainer>
  );
};

export default QuestionLayout;
