import styled from "styled-components";
import { motion } from "framer-motion";

const alertType = (props) => {
  if (props.success === true) {
    return "#28a745";
  }
  if (props.danger === true) {
    return "#dc3545";
  }
};

export const StyledAlert = styled(motion.div)`
  text-align: center;
  right: 2rem;
  top: 2rem;
  font-size: 2rem;
  padding: 1rem 4rem;
  margin: 2rem 0rem;
  background: ${(props) => alertType(props)};
  color: #fff;
  opacity: 0.9;
`;

export const AlertContainer = styled.div`
  position: fixed;
  top: 60px;
  right: 10px;
  margin: 1rem 0rem;
  padding: 0.8rem;
  z-index: 999;
`;
