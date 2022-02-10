import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEducation } from "../../redux/actions/profile";
import { DataContainer, DataForm, CurrentContainer } from "./Education.style";
import ProfileHeader from "./ProfileHeader";

import { Formik, Field } from "formik";
import * as Yup from "yup";
import FormControl from "../Form Controllers/FormControl";

const AddEducation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const initalValues = {
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  };

  const validationSchema = Yup.object({
    school: Yup.string().required(),
    degree: Yup.string().required(),
    fieldOfStudy: Yup.string().required(),
    from: Yup.date().required(),
  });

  const onSubmit = (values) => {
    dispatch(addEducation(values, history));
  };

  return (
    <DataContainer>
      <ProfileHeader>
        <h1>Add Your Education</h1>
        <p>
          <i className="fas fa-code-branch"></i> Add any School or bootcamp that
          you have attended positions that you have had in the past
        </p>
      </ProfileHeader>
      <Formik
        initialValues={initalValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <DataForm>
              <FormControl
                control="input"
                name="school"
                placeholder="* School or Bootcamp"
              />
              <FormControl
                control="input"
                name="degree"
                placeholder="* Degree or Certificate"
              />

              <FormControl
                control="input"
                name="fieldOfStudy"
                placeholder="Field Of Study"
              />

              <FormControl control="datepicker" name="from" label="From Date" />

              <Field name="current">
                {({ field, meta }) => {
                  return (
                    <CurrentContainer>
                      <input type="checkbox" id="current" {...field} />
                      <label htmlFor={"current"}>Current</label>
                    </CurrentContainer>
                  );
                }}
              </Field>

              <FormControl
                control="datepicker"
                name="to"
                label="To Date"
                disabled={formik.values.current}
              />
              <FormControl
                control="textarea"
                name="description"
                placeholder="Program Description"
                rows="4"
              />
              <input type="submit" className="btn btn-primary my-1" />
              <Link className="btn btn-light my-1" to="/dashboard">
                Go Back
              </Link>
            </DataForm>
          );
        }}
      </Formik>
    </DataContainer>
  );
};

export default AddEducation;
