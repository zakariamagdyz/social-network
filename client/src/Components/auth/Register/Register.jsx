import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import {
  StyledForm,
  FormInput,
  FormCotnainer,
  FormButton,
} from "../../common/GlobalStyledComponents";
import * as Yup from "yup";

const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).max(55),
    email: Yup.string().required().min(3).max(55),
    password: Yup.string().required().min(8).max(55),
    passwordConfirm: Yup.string()
      .required()
      .min(8)
      .max(55)
      .test("passwordConfirm", "Passwords Don't match", function (val) {
        return val === this.parent.password;
      }),
  });

  const onSubmit = async (values, actions) => {
    const { name, email, password, passwordConfirm } = values;
    try {
      await dispatch(
        register({ name, email, password, passwordConfirm }, actions)
      );
    } finally {
      actions.isSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <FormCotnainer margin="l">
      <h1>Sign Up</h1>
      <p>
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <StyledForm>
              <FormInput name="name" label="Name" />

              <FormInput name="email" label="Email Address" />
              <small>
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
              <FormInput name="password" label="Password" type="password" />

              <FormInput
                name="passwordConfirm"
                label="Password Confirm"
                type="password"
              />
              <FormButton
                type="submit"
                size="large"
                variant="contained"
                disabled={isSubmitting}
                margin="m"
              >
                {isSubmitting ? "loading" : "Submit"}
              </FormButton>
            </StyledForm>
          );
        }}
      </Formik>

      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </FormCotnainer>
  );
};

export default Register;
