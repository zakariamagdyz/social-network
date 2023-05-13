import styled, { css } from "styled-components";
import { Form } from "formik";
import InputField from "../auth/LogIn/InputField";
import Button from "@material-ui/core/Button";

const selectSize = (size) => {
  switch (size) {
    case "xs":
      return "1.5rem 0";
    case "s":
      return "2.5rem 0";
    case "m":
      return "3rem 0";
    case "l":
      return "3.5rem 0";
    case "xl":
      return "5rem 0";

    default:
      return "1rem 0";
  }
};

export const FormCotnainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: ${(props) => {
    return props.margin && selectSize(props.margin);
  }};

  & > h1 {
    color: var(--primary-color);
    font-size: 5rem;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 2rem;
  }
`;

export const StyledForm = styled(Form)`
  margin: ${(props) => {
    return selectSize(props.margin);
  }};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > small {
    font-size: 1.1rem;
    margin: 1rem 0;
  }
`;

export const FormInput = styled(InputField)`
  input {
    padding: 1rem;
    font-size: 2rem;
  }
  label {
    font-size: 1.7rem;
  }
  p {
    font-size: 1.4rem;
  }
  && {
    margin: ${(props) => {
      return selectSize(props.margin);
    }};
  }
`;

export const FormButton = styled(Button)`
  align-self: flex-start;
  && {
    margin: ${(props) => {
      return selectSize(props.margin);
    }};
  }
  && {
    background: #343a40;
    color: #fff;
    font-size: 1.8rem;
  }
  &&:hover {
    background: #17a2b8;
  }
`;
