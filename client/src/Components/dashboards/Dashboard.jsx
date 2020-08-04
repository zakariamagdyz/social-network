import React, { useEffect, useRef, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile, deleteAccount } from "../../redux/actions/profile";
import { updateAvatar } from "../../redux/actions/auth";
import Spinner from "../common/Spinner";
import DashboardActions from "./DashboardActions";
import Experiences from "./Experience";
import Educations from "./Education";
import {
  StyledDashboard,
  DashboardContent,
  DashboardAvatar,
} from "./Dashboard.style";

////////////////////////////////////////////////////////////////

const dashboardVariants = {
  hidden: { x: "100vw", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring" } },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const [image, setImage] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { loadingProfile, profile } = useSelector((state) => state.profile);

  const avatarFile = useRef();
  const avatarButton = () => {
    avatarFile.current.click();
  };

  const avatarForm = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    dispatch(updateAvatar(e.target.files[0]));
  };
  const dashboardContent = (
    <StyledDashboard
      variants={dashboardVariants}
      initial="hidden"
      animate="visible"
    >
      <h1>Dashboard</h1>
      <DashboardContent>
        <DashboardAvatar>
          <form onSubmit={avatarForm}>
            <img src={user && user.avatar} />
            <input
              type="file"
              style={{ display: "none" }}
              ref={avatarFile}
              onChange={onChange}
            />
            <button onClick={avatarButton}>Upload Image</button>
          </form>
        </DashboardAvatar>
        <p className="lead">Welcome {user && user.name}</p>
      </DashboardContent>
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
    </StyledDashboard>
  );

  return loadingProfile ? <Spinner /> : dashboardContent;
};

export default Dashboard;
