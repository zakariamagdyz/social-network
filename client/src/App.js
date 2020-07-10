import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Components/layouts/Navbar";
import Landing from "./Components/layouts/Landing";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import Alert from "./Components/layouts/Alert";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./Components/dashboards/Dashboard";
import PrivatRoute from "./Components/auth/PrivatRoute";
import CreateProfile from "./Components/profile-forms/CreateProfile.jsx";
import EditProfile from "./Components/profile-forms/EditProfile";
import AddExperience from "./Components/profile-forms/AddExperience";
import AddEducation from "./Components/profile-forms/AddEducation";
import Posts from "./Components/Posts/Posts";
import Post from "./Components/Posts/Post";

import { loadUser } from "./redux/actions/auth";
import { useDispatch } from "react-redux";

import "./app.css";
import Profiles from "./Components/profiels/Profiles";
import Profile from "./Components/profile/Profile";
import NotFound from "./Components/layouts/NotFound";

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
      <Route exact path="/">
        <Landing />
      </Route>
      <section className="container">
        <Alert />

        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/profiles">
            <Profiles />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <PrivatRoute path="/dashboard">
            <Dashboard />
          </PrivatRoute>

          <PrivatRoute path="/create-profile">
            <CreateProfile />
          </PrivatRoute>

          <PrivatRoute path="/edit">
            <EditProfile />
          </PrivatRoute>

          <PrivatRoute path="/add-expirence">
            <AddExperience />
          </PrivatRoute>

          <PrivatRoute path="/add-education">
            <AddEducation />
          </PrivatRoute>

          <PrivatRoute path="/profile/:id">
            <Profile />
          </PrivatRoute>

          <PrivatRoute path="/posts" exact>
            <Posts />
          </PrivatRoute>
          <PrivatRoute path="/posts/:id">
            <Post />
          </PrivatRoute>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </section>
    </Router>
  );
};

export default App;
