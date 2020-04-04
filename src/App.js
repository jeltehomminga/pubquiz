import styled from "@emotion/styled";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import HighScores from "./components/HighScores";
import Login from "./components/Login";

const Layout = styled.main({
  width: "100%",
  height: "100vh",
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  backgroundColor: `var(--indigo)`
});

export default () => {
  const [name, setName] = useState("");
  const isReset = name.toUpperCase() === "RESET ALL";
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login {...{ name, setName }} />} />
        <Route path="game" element={<Game {...{ isReset, name }} />} />
        <Route path="highscores" element={<HighScores isReset={isReset} />} />
      </Routes>
    </Layout>
  );
};
