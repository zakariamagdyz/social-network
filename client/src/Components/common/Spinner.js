import React from "react";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  height: 30vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 70px;
  height: 70px;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export default () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};
