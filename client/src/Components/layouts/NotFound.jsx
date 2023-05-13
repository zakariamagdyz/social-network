import React from "react";
import styled from "styled-components";

const NotFoundStyled = styled.div`
  display: flex;
  height: 60vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 7rem;
    color: var(--primary-color);
  }

  p {
    font-size: 3rem;
  }
`;

const NotFound = () => {
  return (
    <NotFoundStyled>
      <h1>
        <i className="fas fa-exclamation-triangle" /> Page Not Found
      </h1>
      <p>Sorry, this page does not exist</p>
    </NotFoundStyled>
  );
};

export default NotFound;
