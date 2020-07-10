import React, { useEffect, Fragment } from "react";
import { fetchPosts } from "../../redux/actions/Posts";
import Spinner from "../common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = () => {
  const dispatch = useDispatch();
  const { allPosts, loadingAllPosts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return loadingAllPosts ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fa fa-users"></i> Welcome to the commuinity
      </p>
      <PostForm />
      <div className="posts">
        {allPosts.map((post) => (
          <PostItem key={post._id} {...post} showActions />
        ))}
      </div>
    </Fragment>
  );
};

export default Posts;
