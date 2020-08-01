import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./ErrorMessage";

const RadioButtons = ({ label, name, options, ...rest }) => {
  return (
    <div>
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => (
            <React.Fragment key={option.key}>
              <input
                type="radio"
                id={option.key}
                {...field}
                value={option.value}
                checked={field.value === option.value}
              />
              <label htmlFor={option.key}>{option.value}</label>
            </React.Fragment>
          ));
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default RadioButtons;
