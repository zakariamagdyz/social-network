import React, { useEffect, Fragment } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileId } from "../../redux/actions/profile";
import Spinner from "../common/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileRepos from "./ProfileRepos";

const Profile = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const { showProfile, loadingShowProfile } = useSelector(
    (state) => state.profile
  );
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getProfileId(id));
  }, [dispatch]);

  if (!loadingShowProfile && showProfile === null) {
    return <Redirect to="/error" />;
  }

  return loadingShowProfile ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <Link to="/profiles" className="btn btn-light">
        back to profiles
      </Link>
      {isAuthenticated && user._id === showProfile.user._id && (
        <Link to="/edit" className="btn btn-dark">
          edit
        </Link>
      )}

      <div className="profile-grid my-1">
        <ProfileTop profile={showProfile} />
        <ProfileAbout profile={showProfile} />
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {showProfile.experience.length > 0 ? (
            <ProfileExperience experiences={showProfile.experience} />
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>

        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {showProfile.education.length > 0 ? (
            <ProfileEducation educations={showProfile.education} />
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>
      </div>

      {showProfile.gitHubUserName && (
        <ProfileRepos username={showProfile.gitHubUserName} />
      )}
    </Fragment>
  );
};

export default Profile;
