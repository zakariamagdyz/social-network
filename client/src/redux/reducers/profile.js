import { profile } from "../types/profile";

const INITAL_STATE = {
  profiles: [],
  loadingProfiles: true,
  profile: null,
  loading: true,
  repos: [],
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case profile.PROFILE_SUCCESS:
    case profile.UPDATE_PROFILE:
      return { ...state, profile: action.payload.data, loading: false };
    case profile.PROFILE_FAIL:
      return { ...state, profile: null, loading: false, repos: [] };
    case profile.CLEAR_PROFILE:
      return { ...state, repos: [], profile: null, loading: true };

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
