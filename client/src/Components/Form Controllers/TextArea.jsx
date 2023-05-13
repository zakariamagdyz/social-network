import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./ErrorMessage";

import { InputContainer } from "./Input";

const TextArea = ({ label, name, ...rest }) => {
  return (
    <InputContainer>
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" name={name} id={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </InputContainer>
  );
};

export default TextArea;
