import React from "react";
import { InputContainer } from "./Input";
import TextError from "./ErrorMessage";
import { Field, ErrorMessage } from "formik";

const Select = ({ name, label, options, ...rest }) => {
  return (
    <InputContainer>
      <label htmlFor={name}>{label}</label>
      <Field as="select" name={name} id={name} {...rest}>
        {options.map((opt) => (
          <option key={opt.key} value={opt.value}>
            {opt.key}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </InputContainer>
  );
};

export default Select;
