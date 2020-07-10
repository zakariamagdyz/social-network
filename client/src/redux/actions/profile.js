import { profile } from "../types/profile";
import { setAlert } from "./alert";
import axios from "axios";

export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/profiles/me");
    dispatch({ type: profile.PROFILE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: profile.PROFILE_FAIL });
  }
};

export const addProfile = (profileData, history, edit = false) => async (
  dispatch
) => {
  const body = JSON.stringify(profileData);

  try {
    const res = await axios.post("/api/v1/profiles", body, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: profile.PROFILE_SUCCESS, payload: res.data });
    dispatch(
      setAlert(`${edit ? "Profile updated" : "Profile created"}`, "success")
    );

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    dispatch({ type: profile.PROFILE_FAIL });
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(formData);

  try {
    const response = await axios.patch(
      "/api/v1/profiles/experience",
      body,
      config
    );

    dispatch({ type: profile.UPDATE_PROFILE, payload: response.data });
    dispatch(setAlert("Experiences Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    console.log(error);
    dispatch({ type: profile.PROFILE_FAIL });
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(formData);

  try {
    const response = await axios.patch(
      "/api/v1/profiles/education",
      body,
      config
    );

    dispatch({ type: profile.UPDATE_PROFILE, payload: response.data });
    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    dispatch({ type: profile.PROFILE_FAIL });
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/profiles/experience/${id}`);

    dispatch({ type: profile.UPDATE_PROFILE, payload: res.data });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/profiles/education/${id}`);

    dispatch({ type: profile.UPDATE_PROFILE, payload: res.data });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const deleteAccount = () => async (dispatch) => {
  try {
    await axios.delete("/api/v1/users/delete-me");
    dispatch({ type: profile.CLEAR_PROFILE });
    dispatch({ type: profile.DELETE_PROFILE });
    dispatch(setAlert("Account is removed"));
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const getProfiels = () => async (dispatch) => {
  dispatch({ type: profile.CLEAR_PROFILE });
  try {
    const res = await axios.get("api/v1/profiles");

    dispatch({ type: profile.GET_PROFILES, payload: res.data });
  } catch (error) {
    dispatch({ type: profile.GET_PROFILES_FAIL });
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const getProfileId = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/profiles/${id}`);
    dispatch({ type: profile.PROFILE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: profile.PROFILE_FAIL });
    dispatch({ type: profile.CLEAR_PROFILE });
    // dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const getRepos = (gitHubUserName) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/profiles/github/${gitHubUserName}`);

    dispatch({ type: profile.GET_REPOS, payload: res.data });
  } catch (error) {
    dispatch({ type: profile.PROFILE_FAIL });
    dispatch(setAlert(error.response.data.messge, "danger"));
  }
};
