import { postType } from "../types/posts.js";
import { profile } from "../types/profile.js";
import { authTypes } from "../types/auth.js";

const INITAL_STATE = {
  allPosts: [],
  allLikes: [],
  onePost: null,
  loadingAllPosts: true,
  loadingOnePost: true,
  loadingLikes: true,
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case postType.FETCH_POSTS:
      return {
        ...state,
        loadingAllPosts: false,
        allPosts: action.payload.data,
        loadingOnePost: true,
      };

    case postType.FETCH_POSTS_FAILED:
      return { ...state, loadingAllPosts: false, allPosts: [] };

    case postType.FETCH_A_POST:
      return { ...state, onePost: action.payload.data, loadingOnePost: false };

    case postType.FETCH_A_POST_FAILED:
      return { ...state, onePost: null, loadingOnePost: false };

    case postType.DELETE_POST:
      return {
        ...state,
        allPosts: state.allPosts.filter((post) => post._id !== action.payload),
      };

    case postType.UPDATE_POST:
      return { ...state, OnePost: action.payload.data, loadingOnePost: false };

    case postType.UPDATE_LIKES:
      return {
        ...state,
        allPosts: state.allPosts.map((post) => {
          if (post._id === action.payload.id) {
            return { ...post, likes: action.payload.data.data };
          }
          return post;
        }),
      };

    case postType.GET_LIKES:
      return { ...state, allLikes: action.payload.data, loadingLikes: false };

    case postType.GET_LIKES_FAILED:
      return { ...state, allLikes: [], loadingLikes: false };

    case postType.GET_LIKES_START:
      return { ...state, allLikes: [], loadingLikes: true };

    case postType.INIT_LOADING:
    case profile.PROFILE_SUCCESS:
    case authTypes.LOGOUT:
      return { ...state, loadingAllPosts: true, loadingOnePost: true };
    case postType.CREATE_POST:
      return { ...state, allPosts: [action.payload.data, ...state.allPosts] };

    case postType.ADD_COMMENT:
      return { ...state, onePost: action.payload.data };

    case postType.REMOVE_COMMENT:
      return {
        ...state,
        onePost: {
          ...state.onePost,
          comments: state.onePost.comments.filter(
            (comm) => comm._id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};
