import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Btn = styled.button({
  fontSize: 16,
  padding: 8,
  width: 170,
  textAlign: "center",
  border: "0.1rem solid #1f1e32",
  marginBottom: "16px",
  color: "#1f1e32",
  textDecoration: "none",
  backgroundColor: "white",

  ":hover": {
    cursor: "pointer",
    boxShadow: "0 0.4rem 1.4rem 0 rgba(13, 36, 48, 0.5)",
    transform: "translateY(-0.1rem)",
    transition: "transform 150ms"
  }
});

export const LinkButton = styled(Link)({
  margin: "0 auto",
  fontSize: 16,
  padding: 8,
  width: 170,
  textAlign: "center",
  border: "0.1rem solid #1f1e32",
  marginBottom: "16px",
  color: "#1f1e32",
  textDecoration: "none",
  backgroundColor: "white",

  ":hover": {
    cursor: "pointer",
    boxShadow: "0 0.4rem 1.4rem 0 rgba(13, 36, 48, 0.5)",
    transform: "translateY(-0.1rem)",
    transition: "transform 150ms"
  }
});

export const FlexContainer = styled.div(({ column }) => ({
  display: "flex",
  flexDirection: column ? "column" : "row",
  justifyContent: "center",
  alignItems: "center"
}));

export const CenteredDiv = styled(motion.div)({
  minWidth: "50%",
  maxWidth: "540px",
  minHeight: "50%",
  backgroundColor: "white",
  borderRadius: 30,
  padding: 30,
  margin: 15,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around"
});
