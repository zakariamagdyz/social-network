import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Field, ErrorMessage } from "formik";
import TextError from "./ErrorMessage";
import "react-datepicker/dist/react-datepicker.css";

const DateRange = ({ startName, endName, label, ...rest }) => {
  return (
    <div>
      <label>pickRange</label>
      <Field name={startName}>
        {({ field, form }) => {
          const { setFieldValue, values } = form;
          const { value } = field;
          return (
            <DatePicker
              selected={value}
              onChange={(date) => setFieldValue(startName, date)}
              {...rest}
              selectsStart
              startDate={value}
              endDate={values.endDate}
            />
          );
        }}
      </Field>

      <Field name={endName} {...rest}>
        {({ field, form }) => {
          const { setFieldValue, values } = form;
          const { value } = field;
          return (
            <DatePicker
              selected={value}
              onChange={(date) => setFieldValue(endName, date)}
              selectsEnd
              {...rest}
              startDate={values.startDate}
              endDate={value}
              minDate={value}
            />
          );
        }}
      </Field>
      <ErrorMessage name={startName} component={TextError} />
      <ErrorMessage name={endName} component={TextError} />
    </div>
  );
};

export default DateRange;
