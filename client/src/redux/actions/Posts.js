import { postType } from "../types/posts";
import axios from "axios";
import { setAlert } from "./alert";

export const fetchPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/posts");

    dispatch({ type: postType.FETCH_POSTS, payload: res.data });
  } catch (error) {
    dispatch({ type: postType.FETCH_POSTS_FAILED });
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const fetchAPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/posts/${id}`);

    dispatch({ type: postType.FETCH_A_POST, payload: res.data });
  } catch (error) {
    dispatch({ type: postType.FETCH_A_POST_FAILED });
  }
};

export const deleteAPost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/posts/${id}`);

    dispatch({ type: postType.DELETE_POST, payload: id });
  } catch (error) {
    dispatch({ type: postType.DELETE_POST_FAILED });
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const updateAPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/posts/${id}`);

    dispatch({ type: postType.UPDATE_POST, payload: res.data });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/posts/${id}/like`);

    dispatch({ type: postType.UPDATE_LIKES, payload: { id, data: res.data } });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const createPost = (post) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ text: post });
  try {
    const res = await axios.post("/api/v1/posts", body, config);
    dispatch({ type: postType.CREATE_POST, payload: res.data });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const AddComment = (postId, text) => async (dispatch) => {
  const body = JSON.stringify({ text });
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = await axios.post(
      `/api/v1/posts/${postId}/comments`,
      body,
      config
    );

    dispatch({ type: postType.ADD_COMMENT, payload: res.data });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/posts/${postId}/${commentId}`);

    dispatch({ type: postType.REMOVE_COMMENT, payload: commentId });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const getLikes = (id) => async (dispatch) => {
  try {
    dispatch({ type: postType.GET_LIKES_START });
    const res = await axios.get(`/api/v1/posts/${id}/likes`);

    dispatch({ type: postType.GET_LIKES, payload: res.data });
  } catch (error) {
    dispatch({ type: postType.GET_LIKES_FAILED });
  }
};
