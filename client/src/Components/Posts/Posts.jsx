import React, { useEffect, Fragment, useState } from "react";
import { fetchPosts } from "../../redux/actions/Posts";
import Spinner from "../common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import Modal from "../layouts/Modal/Modal";
import { motion, AnimatePresence } from "framer-motion";
//////////////

const postsVariants = {
  hidden: { x: "100vw", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring" } },
};

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
    <motion.div variants={postsVariants} initial="hidden" animate="visible">
      <AnimatePresence>
        {modal && <Modal toggleModal={toggleModal} postId={postId} />}
      </AnimatePresence>

      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fa fa-users"></i> Welcome to the commuinity
      </p>
      <PostForm />
      <AnimatePresence>
        {allPosts.map((post) => (
          <PostItem
            key={post._id}
            {...post}
            showActions
            toggleModal={toggleModal}
            postId={setPostI}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default Posts;
