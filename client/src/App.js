import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Components/layouts/Navbar";
import Landing from "./Components/layouts/Landing";
import setAuthToken from "./utils/setAuthToken";
import Routes from "./Components/layouts/Routes";

import { loadUser } from "./redux/actions/auth";
import { useDispatch } from "react-redux";

import "./app.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route>
          <Routes />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
