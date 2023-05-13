import React from "react";
import Spinner from "./Spinner";

const WithSpinner = (WrappedComponent) => {
  return ({ loading, ...props }) => {
    return loading ? <Spinner /> : <WrappedComponent {...props} />;
  };
};

export default WithSpinner;
