import { authTypes } from "../types/auth";
import { profile } from "../types/profile";

const INITAL_STATE = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case authTypes.USER_LOADED:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        isAuthenticated: true,
      };

    case authTypes.REGESTIR_SUCCESS:
    case authTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", "123");
      return {
        ...state,
        user: action.payload.data,
        isAuthenticated: true,
        loading: false,
      };

    case authTypes.REGESTIR_FAIL:
    case authTypes.AUTH_ERROR:
    case authTypes.LOGIN_FAIL:
    case authTypes.LOGOUT:
    case profile.DELETE_PROFILE:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };

    case authTypes.UPDATE_AVATAR:
      return { ...state, user: action.payload.data };
    default:
      return state;
  }
};
