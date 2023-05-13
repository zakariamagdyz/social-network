import React from "react";
import Datepicker from "react-datepicker";
import { Field, ErrorMessage } from "formik";
import TextError from "./ErrorMessage";
import "react-datepicker/dist/react-datepicker.css";
import { InputContainer } from "./Input";

const DatePickerController = ({ name, label, ...rest }) => {
  return (
    <InputContainer>
      <label htmlFor={name}>{label}</label>

      {/* alwayse name attach this field to formik */}
      <Field name={name} {...rest}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;

          return (
            <Datepicker
              {...rest}
              {...field}
              selected={value}
              relativeSize={true}
              onChange={(date) => setFieldValue(name, date)}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </InputContainer>
  );
};

export default DatePickerController;
