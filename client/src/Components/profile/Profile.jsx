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
  const { profile, loading } = useSelector((state) => state.profile);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getProfileId(id));
  }, [dispatch]);

  if (!loading && profile === null) {
    return <Redirect to="/error" />;
  }

  return loading ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <Link to="/profiles" className="btn btn-light">
        back to profiles
      </Link>
      {isAuthenticated && user._id === profile.user._id && (
        <Link to="/edit" className="btn btn-dark">
          edit
        </Link>
      )}

      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.experience.length > 0 ? (
            <ProfileExperience experiences={profile.experience} />
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>

        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.length > 0 ? (
            <ProfileEducation educations={profile.education} />
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>
      </div>

      {profile.gitHubUserName && (
        <ProfileRepos username={profile.gitHubUserName} />
      )}
    </Fragment>
  );
};

export default Profile;
