import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./ErrorMessage";
import styled from "styled-components";

export const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  label {
    font-weight: bold;
    display: flex;
    margin-bottom: 5px;
  }
  input,
  textarea,
  select {
    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 4px;
  }
`;

const Input = ({ name, label, ...rest }) => {
  return (
    <InputContainer>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </InputContainer>
  );
};

export default Input;
