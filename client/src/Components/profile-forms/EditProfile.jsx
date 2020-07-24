import React, { useEffect, useState, Fragment } from "react";
import { addProfile } from "../../redux/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProfile } from "../../redux/actions/profile";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { CSSTransition } from "react-transition-group";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { profile, loadingProfile } = useSelector((state) => state.profile);

  // check if profile not contain to eny social links
  // if (profile && !profile.social) profile.social = {};

  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    gitHubUserName: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    setFormData({
      company: loadingProfile || !profile.company ? "" : profile.company,
      website: loadingProfile || !profile.website ? "" : profile.website,
      location: loadingProfile || !profile.location ? "" : profile.location,
      status: loadingProfile || !profile.status ? "" : profile.status,
      skills: loadingProfile || !profile.skills ? "" : profile.skills.join(","),
      gitHubUserName:
        loadingProfile || !profile.gitHubUserName ? "" : profile.gitHubUserName,
      bio: loadingProfile || !profile.bio ? "" : profile.bio,
      twitter:
        loadingProfile || !profile.social.twitter ? "" : profile.social.twitter,
      facebook:
        loadingProfile || !profile.social.facebook
          ? ""
          : profile.social.facebook,
      linkedin:
        loadingProfile || !profile.social.linkedin
          ? ""
          : profile.social.linkedin,
      youtube:
        loadingProfile || !profile.social.youtube ? "" : profile.social.youtube,
      instagram:
        loadingProfile || !profile.social.instagram
          ? ""
          : profile.social.instagram,
    });
  }, [loadingProfile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    gitHubUserName,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const [showSocialLinks, setSocialLinks] = useState(false);

  const history = useHistory();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addProfile(formData, history, true));
  };

  const formEdit = (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onChange}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            onChange={onChange}
            value={website}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            onChange={onChange}
            value={location}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            onChange={onChange}
            value={skills}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="gitHubUserName"
            value={gitHubUserName}
            onChange={onChange}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => setSocialLinks(!showSocialLinks)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        <CSSTransition
          in={showSocialLinks}
          mountOnEnter
          unmountOnExit
          timeout={500}
          classNames="social-"
        >
          <div className="social">
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
          </div>
        </CSSTransition>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );

  return !loadingProfile ? formEdit : <Spinner />;
};

export default EditProfile;
