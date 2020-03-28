import styled from "@emotion/styled";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = styled.form({
  width: 200,
  margin: "25vw auto",
  display: "flex",
  flexDirection: "column"
});

const FormField = styled.input({
  fontSize: 16,
  padding: 8,
  width: 170,
  textAlign: "center",
  border: "0.1rem solid #1f1e32",
  marginBottom: "16px",
  color: "#1f1e32",
  textDecoration: "none"
});

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    navigate(`game/${name}`);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        type="text"
        placeholder="Name"
        onChange={({ target: { value } }) => setName(value)}
        value={name}
        required
      />
      <FormField type="submit" value="Play" readOnly />
    </Form>
  );
};

export default Login;
