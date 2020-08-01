import React from "react";

import { Formik, Field } from "formik";
import * as Yup from "yup";
import { addExperience } from "../../redux/actions/profile";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DataContainer, DataForm, CurrentContainer } from "./Education.style";
import ProfileHeader from "./ProfileHeader";
import FormControl from "../Form Controllers/FormControl";

const AddEducation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const initalValues = {
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  };

  const validationSchema = Yup.object({
    company: Yup.string().required(),
    title: Yup.string().required(),
    location: Yup.string().required(),
    from: Yup.date().required(),
  });

  const onSubmit = (values) => {
    dispatch(addExperience(values, history));
  };

  return (
    <DataContainer>
      <ProfileHeader>
        <h1 className="large text-primary">Add An Experience</h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
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
                name="title"
                placeholder="* Job Title"
              />
              <FormControl
                control="input"
                name="company"
                placeholder="* company"
              />

              <FormControl
                control="input"
                name="location"
                placeholder="Location"
              />

              <FormControl control="datepicker" name="from" label="From Date" />

              <Field name="current">
                {({ field }) => {
                  return (
                    <CurrentContainer>
                      <input type="checkbox" id="current" {...field} />
                      <label htmlFor={"current"}>Current Job</label>
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
                placeholder="Job Description"
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
