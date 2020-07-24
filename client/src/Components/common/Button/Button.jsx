import React from "react";
import { StyledButton } from "./Button.style";
import { Link } from "react-router-dom";

const Button = (props) => {
  if (props.href) {
    return (
      <StyledButton
        as="a"
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {props.children}
      </StyledButton>
    );
  }
  if (props.to) {
    return (
      <StyledButton as={Link} to={props.to} {...props}>
        {props.children}
      </StyledButton>
    );
  }
  return (
    <StyledButton
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      {...props}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
