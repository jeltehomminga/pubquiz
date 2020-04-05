import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Btn } from "./elements";

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
  margin: "16px auto",
  color: "#1f1e32",
  textDecoration: "none"
});

const Login = ({ name, setName }) => {
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    navigate(`game`);
  };

  // Since I want to keep the name available untill the name is set on the results at the end 
  //  I choose to reset the name when the user comes to the Login again
  useEffect(() => {
    setName(() => "");
  }, [setName]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        type="text"
        placeholder="Name"
        onChange={({ target: { value } }) => setName(value)}
        value={name}
        required
      />
      <Btn type="submit" value="Play">
        Play
      </Btn>
    </Form>
  );
};

Login.propTypes = {
  name: PropTypes.string,
  setName: PropTypes.func.isRequired
};

export default Login;
