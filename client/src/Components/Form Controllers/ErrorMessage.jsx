import React from "react";
import styled from "styled-components";

const Text = styled.p`
  color: red;
  text-transform: capitalize;
  font-size: 12px;
`;

const TextError = (props) => {
  return <Text>{props.children}</Text>;
};

export default TextError;
