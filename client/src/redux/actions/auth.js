import axios from "axios";
import { authTypes } from "../types/auth";
import { setAlert } from "../actions/alert";
import setAuthToken from "../../utils/setAuthToken";
import { profile } from "../types/profile";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/v1/users/auth");
    dispatch({ type: authTypes.USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: authTypes.AUTH_ERROR });
  }
};

export const register = (
  { name, email, password, passwordConfirm },
  setErrors
) => async (dispatch) => {
  const body = JSON.stringify({ name, email, password, passwordConfirm });

  try {
    const res = await axios.post("/api/v1/users/sign-up", body, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: authTypes.REGESTIR_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: authTypes.REGESTIR_FAIL });
    if (err.response.data.message.includes("duplicate")) {
      setErrors({ email: "Email already exists, Please use another Email" });
    } else {
      dispatch(setAlert(err.response.data.message, "danger"));
    }
  }
};

export const LogIn = ({ email, password }) => async (dispatch) => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/v1/users/log-in", body, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: authTypes.LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: authTypes.LOGIN_FAIL });
    dispatch(setAlert(err.response.data.message, "danger"));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: profile.CLEAR_PROFILE });
  dispatch({ type: authTypes.LOGOUT });
};

export const updateAvatar = (file) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await axios.patch("/api/v1/users/update-me", formData);

    dispatch({ type: authTypes.UPDATE_AVATAR, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"));
  }
};
