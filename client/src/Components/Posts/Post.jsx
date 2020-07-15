import React, { useEffect, Fragment } from "react";
import Spinner from "../common/Spinner";
import { fetchAPost } from "../../redux/actions/Posts";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Post = () => {
  const id = useParams().id;
  const dispatch = useDispatch();

  const post = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchAPost(id));
  }, [dispatch]);

  if (!post.onePost && !post.loadingOnePost) {
    return <Redirect to="/error" />;
  }

  return post.loadingOnePost ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn btn-light">
        Back to posts
      </Link>
      <PostItem {...post.onePost}></PostItem>
      <CommentForm postId={post.onePost._id} />
      <TransitionGroup className="comments">
        {post.onePost.comments.map((comment) => (
          <CSSTransition
            key={comment._id}
            timeout={1000}
            classNames="comment-"
            appear
          >
            <CommentItem comment={comment} postId={post.onePost._id} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Post;
