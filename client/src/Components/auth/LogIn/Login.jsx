import React from "react";
import * as Yup from "yup";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "../../../redux/actions/auth";
import { Formik, Form } from "formik";
import {
  StyledForm,
  FormInput,
  FormCotnainer,
  FormButton,
} from "../../common/GlobalStyledComponents";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().max(55),
    password: Yup.string().min(6).max(55).required(),
  });
  const OnSubmit = (values, actions) => {
    const { email, password } = values;
    // send actions to not cause memory leak when component remove from dom
    dispatch(LogIn({ email, password, actions }));
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }
  return (
    <FormCotnainer margin="s">
      <h1>Sign In</h1>
      <p>
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={OnSubmit}
      >
        {({ errors, isSubmitting, touched }) => (
          <StyledForm margin="s">
            <FormInput name="email" label="Email"></FormInput>
            <FormInput
              name="password"
              type="password"
              label="Password"
            ></FormInput>
            <FormButton
              disabled={isSubmitting}
              variant="contained"
              size="large"
              type="submit"
            >
              {isSubmitting ? "loading..." : "Submit"}
            </FormButton>
          </StyledForm>
        )}
      </Formik>

      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </FormCotnainer>
  );
};
export default Login;
