import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledDashboard = styled(motion.div)`
  h1:first-child {
    font-size: 4rem;
    color: var(--primary-color);
  }
`;

export const DashboardContent = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;

  p {
    margin-left: 2rem;
    font-size: 2rem;
  }
`;

export const DashboardAvatar = styled.figure`
  position: relative;
  overflow: hidden;
  width: 15rem;
  height: 15rem;
  img {
    width: 100%;
    border-radius: 50%;
  }

  button {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, 150%);
    background: var(--primary-color);
    border: none;
    border-bottom: 1px solid #fff;
    color: #fff;
    cursor: pointer;
    outline: none;
    padding: 0.1rem 0.5rem;
    font-size: 1.2rem;
    opacity: 0.6;
    border-radius: 0.5rem;
    transition: transform 0.5s ease;
  }

  :hover button {
    transform: translate(-50%, -50%);
    opacity: 0.8;
  }
`;
