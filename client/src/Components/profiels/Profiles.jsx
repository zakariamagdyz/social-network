import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiels } from "../../redux/actions/profile";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  const dispatch = useDispatch();
  const { loadingProfiles, profiles } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfiels());
  }, [dispatch]);

  const profile = (
    <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <ProfileItem key={profile._id} {...profile} />
          ))
        ) : (
          <h4>There is no profiels to show</h4>
        )}
      </div>
    </Fragment>
  );
  return loadingProfiles ? <Spinner /> : profile;
};

export default Profiles;
