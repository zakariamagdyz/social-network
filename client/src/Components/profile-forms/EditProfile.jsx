import React, { useEffect, useState, Fragment } from "react";
import { addProfile } from "../../redux/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProfile } from "../../redux/actions/profile";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { CSSTransition } from "react-transition-group";
import FormControl from "../Form Controllers/FormControl";
import * as Yup from "yup";
import ProfileHeader from "./ProfileHeader";
import { Formik, Field } from "formik";
import { StyledForm } from "./CreateProfile.style";

const EditProfile = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { profile, loadingProfile } = useSelector((state) => state.profile);
  const [init, setInit] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    gitHubUserName: "",
    bio: "",
    social: {
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
    },
  });

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    setInit({
      company: loadingProfile || !profile.company ? "" : profile.company,
      website: loadingProfile || !profile.website ? "" : profile.website,
      location: loadingProfile || !profile.location ? "" : profile.location,
      status: loadingProfile || !profile.status ? "" : profile.status,
      skills: loadingProfile || !profile.skills ? "" : profile.skills.join(","),
      gitHubUserName:
        loadingProfile || !profile.gitHubUserName ? "" : profile.gitHubUserName,
      bio: loadingProfile || !profile.bio ? "" : profile.bio,

      social: {
        twitter:
          loadingProfile || !profile.social.twitter
            ? ""
            : profile.social.twitter,
        facebook:
          loadingProfile || !profile.social.facebook
            ? ""
            : profile.social.facebook,
        linkedin:
          loadingProfile || !profile.social.linkedin
            ? ""
            : profile.social.linkedin,
        youtube:
          loadingProfile || !profile.social.youtube
            ? ""
            : profile.social.youtube,
        instagram:
          loadingProfile || !profile.social.instagram
            ? ""
            : profile.social.instagram,
      },
    });
  }, [loadingProfile]);

  const options = [
    { key: "* Select Professional Status", value: "" },
    { key: "Developer", value: "Developer" },
    { key: "Junior Developer", value: "Junior Developer" },
    { key: "Senior Developer", value: "Senior Developer" },
    { key: "Manager", value: "Manager" },
    { key: "Student or Learning", value: "Student or Learning" },
    { key: "Instructor", value: "Instructor" },
    { key: "Intern", value: "Intern" },
    { key: "Other", value: "Other" },
  ];

  const onSubmit = (values) => {
    dispatch(addProfile(values, history));
  };

  const validationSchema = Yup.object({
    skills: Yup.string().required(),
    status: Yup.string().required(),
  });

  const [showSocialLinks, setSocialLinks] = useState(true);

  const data = (
    <Fragment>
      <ProfileHeader>
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make
          your profile stand out
        </p>
      </ProfileHeader>

      <Formik
        initialValues={init}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <StyledForm>
              <FormControl control="select" name="status" options={options} />
              <small className="form-text">
                Give us an idea of where you are at in your career
              </small>

              <FormControl
                control="input"
                name="company"
                placeholder="Company"
              />
              <small className="form-text">
                Could be your own company or one you work for
              </small>

              <FormControl
                control="input"
                name="website"
                placeholder="Website"
              />

              <small className="form-text">
                Could be your own or a company website{" "}
              </small>

              <FormControl
                control="input"
                name="location"
                placeholder="Location"
              />
              <small className="form-text">
                City & state suggested (eg. Boston, MA)
              </small>

              <FormControl
                control="input"
                name="skills"
                placeholder="* Skills"
              />
              <small className="form-text">
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </small>

              <FormControl
                control="input"
                name="gitHubUserName"
                placeholder="Github Username"
              />
              <small className="form-text">
                If you want your latest repos and a Github link, include your
                username
              </small>

              <FormControl
                control="input"
                name="bio"
                placeholder="A short bio of yourself"
              />
              <small className="form-text">
                Tell us a little about yourself
              </small>

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
                    <Field
                      control="input"
                      placeholder="Twitter URL"
                      name="social.twitter"
                    />
                  </div>

                  <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x"></i>
                    <Field
                      control="input"
                      placeholder="Facebook URL"
                      name="social.facebook"
                    />
                  </div>

                  <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x"></i>
                    <Field
                      control="input"
                      placeholder="YouTube URL"
                      name="social.youtube"
                    />
                  </div>

                  <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x"></i>
                    <Field
                      control="input"
                      placeholder="Linkedin URL"
                      name="social.linkedin"
                    />
                  </div>

                  <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>
                    <Field
                      control="input"
                      placeholder="Instagram URL"
                      name="social.instagram"
                    />
                  </div>
                </div>
              </CSSTransition>

              <input type="submit" className="btn btn-primary my-1" />
              <a className="btn btn-light my-1" href="dashboard.html">
                Go Back
              </a>
            </StyledForm>
          );
        }}
      </Formik>
    </Fragment>
  );

  return !loadingProfile ? data : <Spinner />;
};

export default EditProfile;
