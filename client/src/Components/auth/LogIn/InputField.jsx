import React from "react";
import TextField from "@material-ui/core/TextField";
import { useField } from "formik";

function InputField({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <TextField
      {...props}
      {...field}
      label={label}
      error={meta.error && meta.touched}
      helperText={meta.error && meta.touched && meta.error}
    />
  );
}

export default InputField;
