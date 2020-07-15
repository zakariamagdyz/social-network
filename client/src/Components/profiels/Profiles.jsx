import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiels } from "../../redux/actions/profile";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
      <TransitionGroup className="profiles">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <CSSTransition
              key={profile._id}
              classNames="profiles-"
              appear
              timeout={1500}
            >
              <ProfileItem {...profile} />
            </CSSTransition>
          ))
        ) : (
          <h4>There is no profiels to show</h4>
        )}
      </TransitionGroup>
    </Fragment>
  );
  return loadingProfiles ? <Spinner /> : profile;
};

export default Profiles;
