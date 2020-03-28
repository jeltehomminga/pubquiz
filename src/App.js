import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Game from "./components/Game";
import HighScores from "./components/HighScores";
import styled from "@emotion/styled";

const Layout = styled.div({
  width: "100vw",
  height: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "> *": {
    width: "100%"
  }
});

export default () => (
  <Layout>
    <Routes>
      <Route exact path="/game/:name" element={<Game />} />
      <Route path="/" element={<Login />} />
      <Route path="highscores" element={<HighScores />} />
    </Routes>
  </Layout>
);
