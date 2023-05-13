import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";

const AdminRoute = (props) => {
  const { isAuthenticated, token, user, loading } = useSelector(
    (state) => state.auth
  );
  return (
    <Route {...props}>
      {loading && token ? (
        <Spinner />
      ) : isAuthenticated && user.role === "admin" ? (
        props.children
      ) : (
        <Redirect to="/error" />
      )}
    </Route>
  );
};

export default AdminRoute;
