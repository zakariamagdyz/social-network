import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Spinner from "../common/Spinner";

const Register = lazy(() => import("../auth/Register"));
const Login = lazy(() => import("../auth/Login"));
const Alert = lazy(() => import("./Alert"));
const Dashboard = lazy(() => import("../dashboards/Dashboard"));
const PrivatRoute = lazy(() => import("../auth/PrivatRoute"));
const CreateProfile = lazy(() => import("../profile-forms/CreateProfile.jsx"));
const EditProfile = lazy(() => import("../profile-forms/EditProfile"));
const AddExperience = lazy(() => import("../profile-forms/AddExperience"));
const AddEducation = lazy(() => import("../profile-forms/AddEducation"));
const Posts = lazy(() => import("../Posts/Posts"));
const Post = lazy(() => import("../Posts/Post"));
const Profiles = lazy(() => import("../profiels/Profiles"));
const Profile = lazy(() => import("../profile/Profile"));
const NotFound = lazy(() => import("./NotFound"));

//

const Routes = () => {
  return (
    <section className="container">
      <Suspense fallback={<Spinner />}>
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
      </Suspense>
    </section>
  );
};

export default Routes;
