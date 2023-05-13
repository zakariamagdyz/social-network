import styled from "styled-components";
import img from "../../../img/showcase.jpg";

export const LandingContainer = styled.section`
  background: ${`url(${img})`} no-repeat center/cover;
  position: relative;
  height: 100vh;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  height: 100vh;
`;

export const LandingContent = styled.div`
  width: 80%;
  height: 100%;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  h1 {
    font-size: 5rem;
    letter-spacing: 0.3rem;
    word-spacing: 1rem;
  }
  p {
    margin: 2rem 0;
    font-size: 2.2rem;
  }
`;
