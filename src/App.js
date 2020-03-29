import styled from "@emotion/styled";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import HighScores from "./components/HighScores";
import Login from "./components/Login";

const Layout = styled.main({
  width: "100vw",
  height: "100vh",
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: `var(--indigo)`
});

export default () => (
  <Layout >
    <Routes>
      <Route exact path="/game/:name" element={<Game />} />
      <Route path="/" element={<Login />} />
      <Route path="highscores" element={<HighScores />} />
    </Routes>
  </Layout>
);
