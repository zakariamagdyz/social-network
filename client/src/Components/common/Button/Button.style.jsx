import styled, { css } from "styled-components";
import Button from "@material-ui/core/Button";

const commonStyle = css`
  color: ${(props) => props.color && props.color};
  display: inline-block;
  background: ${(props) => props.bgcolor && props.bgcolor};
  margin: 1rem;
  padding: 0.5rem 2rem;
  transition: opacity 0.5s;
  font-size: 2.1rem;
  border-radius: 0.3rem;
  :hover {
    opacity: 0.8;
  }
`;

const isLink = css`
  ${commonStyle}
`;
const isAnchor = css`
  ${commonStyle}
`;

export const StyledButton = styled(Button)`
  ${(props) => props.to && isLink}
  ${(props) => props.href && isAnchor}
`;
