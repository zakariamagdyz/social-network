import { profile } from "../types/profile";
import { postType } from "../types/posts";

const INITAL_STATE = {
  profiles: [],
  loadingProfiles: true,
  profile: null,
  showProfile: null,
  loadingProfile: true,
  loadingShowProfile: true,
  repos: [],
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case profile.PROFILE_SUCCESS:
    case profile.UPDATE_PROFILE:
      return { ...state, profile: action.payload.data, loadingProfile: false };
    case profile.PROFILE_FAIL:
      return {
        ...state,
        profile: null,
        loadingProfile: false,
        showProfile: null,
        loadingShowProfile: false,
        repos: [],
      };
    case profile.PROFILE_SHOW_SUCCESS:
      return {
        ...state,
        loadingShowProfile: false,
        showProfile: action.payload.data,
      };
    case profile.CLEAR_PROFILE:
    case postType.FETCH_POSTS:
      return {
        ...state,
        repos: [],
        profile: null,
        loadingProfile: true,
        loadingShowProfile: true,
        showProfile: null,
      };

    case profile.GET_PROFILES:
      return {
        ...state,
        profiles: action.payload.data,
        loadingProfiles: false,
      };

    case profile.GET_PROFILES_FAIL:
      return { ...state, profiles: [], loadingProfiles: false };

    case profile.GET_REPOS:
      return { ...state, repos: action.payload.data };

    case profile.GET_REPOS_FAIL:
      return { ...state, repos: [] };

    default:
      return state;
  }
};
