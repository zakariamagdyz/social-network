import React, { useState } from "react";
import { Formik, Form } from "formik";
import FormControl from "./FormControl";
import Date from "./DateRange";

import * as Yup from "yup";

const FormContainer = () => {
  const initialValue = {
    name: "",
    email: "",
    password: "",
    description: "",
    cource: "",
    skills: [],
    birthDate: "",
    startDate: "",
    endDate: "",
  };
  const courceOptions = [
    { key: "Select a Cource", value: "" },
    { key: "Node", value: "node" },
    { key: "React", value: "express" },
    { key: "Mongo", value: "mongo" },
  ];

  const radioOptions = [
    { key: "gender", value: "mail" },
    { key: "gender2", value: "femail" },
  ];

  const checkOptions = [
    { key: "Node", value: "node" },
    { key: "React", value: "express" },
    { key: "Mongo", value: "mongo" },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8),
    cource: Yup.string().required(),
    skills: Yup.array().required(),
    startDate: Yup.date().required(),
    endDate: Yup.date().required(),
  });
  const onSubmit = (values, formik) => {
    console.log({
      ...values,
      startDate: values.startDate.getTime(),
      endDate: values.endDate.getTime(),
    });
  };
  return (
    <Formik
      initialValues={initialValue}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <FormControl name="name" label="Name" control="input" type="text" />
            <FormControl
              name="email"
              label="Email"
              control="input"
              type="text"
            />
            <FormControl
              name="password"
              label="Password"
              control="input"
              type="password"
            />

            <FormControl
              name="description"
              label="Description"
              control="textarea"
              rows="3"
            />

            <FormControl
              name="cource"
              label="Cource"
              control="select"
              options={courceOptions}
            />
            <FormControl
              name="sex"
              control="radio"
              label="choose your sex"
              options={radioOptions}
            />

            <FormControl
              name="skills"
              control="checkbox"
              label="your skills"
              options={checkOptions}
            />

            <FormControl
              name="birthDate"
              control="datepicker"
              label="Date Of Birth"
            />

            <FormControl
              control="daterange"
              label="pick Range"
              startName="startDate"
              endName="endDate"
            />

            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormContainer;
