import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile, deleteAccount } from "../../redux/actions/profile";
import Spinner from "../common/Spinner";
import DashboardActions from "./DashboardActions";
import Experiences from "./Experience";
import Educations from "./Education";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const { user } = useSelector((state) => state.auth);
  const { loading, profile } = useSelector((state) => state.profile);

  const dashboardContent = (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome {user && user.name}
      </p>
      {profile === null ? (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <DashboardActions />

          {profile.experience && (
            <Experiences experiences={profile.experience} />
          )}
          {profile.education && <Educations educations={profile.education} />}

          <div className="my-2">
            <button
              className="btn bg-danger"
              onClick={() => dispatch(deleteAccount())}
            >
              Delete my account
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );

  return loading ? <Spinner /> : dashboardContent;
};

export default Dashboard;
