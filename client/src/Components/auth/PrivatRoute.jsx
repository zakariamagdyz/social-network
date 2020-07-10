import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivatRoute = (props) => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  return (
    <Route {...props}>
      {isAuthenticated || token ? props.children : <Redirect to="/login" />}
    </Route>
  );
};

export default PrivatRoute;
