import styled from "styled-components";
import { motion } from "framer-motion";

export const NavBar = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  background: var(--dark-color);
  padding: 1rem;
  align-items: center;

  a {
    color: #fff;
    transition: color 0.3s;
  }

  a:hover {
    color: var(--primary-color);
  }

  ul {
    display: flex;
  }
  li:not(:last-child) {
    margin-right: 2rem;
  }
`;
