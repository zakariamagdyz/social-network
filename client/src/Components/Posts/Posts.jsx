import React, { useEffect, Fragment, useState } from "react";
import { fetchPosts } from "../../redux/actions/Posts";
import Spinner from "../common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import Modal from "../layouts/Modal/Modal";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Posts = () => {
  const [modal, setModal] = useState(false);
  const [postId, setPostId] = useState(null);

  const toggleModal = () => setModal(!modal);
  const setPostI = (id) => setPostId(id);
  const dispatch = useDispatch();
  const { allPosts, loadingAllPosts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return loadingAllPosts ? (
    <Spinner />
  ) : (
    <Fragment>
      <CSSTransition
        in={modal}
        timeout={1000}
        mountOnEnter
        unmountOnExit
        classNames="model-"
      >
        <Modal toggleModal={toggleModal} postId={postId} />
      </CSSTransition>

      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fa fa-users"></i> Welcome to the commuinity
      </p>
      <PostForm />
      <TransitionGroup className="posts">
        {allPosts.map((post) => (
          <CSSTransition
            key={post._id}
            timeout={{ enter: 1500, exit: 500 }}
            classNames="post-"
            appear
          >
            <PostItem
              {...post}
              showActions
              toggleModal={toggleModal}
              postId={setPostI}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Posts;
