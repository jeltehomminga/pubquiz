import styled from "@emotion/styled";
import { motion } from 'framer-motion'


export const Btn = styled.div({
    fontSize: 16,
    padding: 8,
    width: 170,
    textAlign: "center",
    border: "0.1rem solid #1f1e32",
    marginBottom: "16px",
    color: "#1f1e32",
    textDecoration: "none",
    backgroundColor: "white"
  });
  
  export const FlexContainer = styled.div(({ column }) => ({
    display: "flex",
    flexDirection: column ? "column" : "row",
    justifyContent: "center",
    alignItems: "center",
  }));

  export const CenteredDiv = styled(motion.div)({
    minWidth: "50%",
    minHeight: '50%',
    backgroundColor: "white",
    borderRadius: 30,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  });