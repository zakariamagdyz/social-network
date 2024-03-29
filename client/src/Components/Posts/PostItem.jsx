import React, { Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAPost, addLike } from "../../redux/actions/Posts";
import { motion, AnimatePresence } from "framer-motion";

////////

const postItemVariants = {
  hidden: { x: "100vw", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring" } },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const PostItem = ({
  _id,
  text,
  likes,
  comments,
  date,
  user,
  showActions,
  toggleModal,
  postId,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <motion.div
      className="post bg-white p-1 my-1"
      variants={postItemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="post__user">
        <Link to={`/profile/${user._id}`}>
          <img className="round-img" src={`/${user && user.avatar}`} alt="" />
          <h4>{user && user.name}</h4>
        </Link>
      </div>

      <div className="post__data">
        <p className="my-1">{text}</p>
        <Moment format="YYYY-MM-DD h:mm a" className="time">
          {date}
        </Moment>
      </div>

      {showActions && (
        <div className="post__actions">
          <div className="post__actions__like">
            {likes.length > 0 && (
              <button
                type="button"
                className="btn btn-light free"
                onClick={() => {
                  toggleModal();
                  postId(_id);
                }}
              >
                <i className="fas fa-thumbs-up"></i>{" "}
                <span>{likes.length} </span>
              </button>
            )}

            {likes.find((like) => like.user === auth.user._id) ? (
              <button
                className="btn btn-liked"
                onClick={() => dispatch(addLike(_id))}
              >
                liked
              </button>
            ) : (
              <button
                className="btn btn-light btn-unliked"
                onClick={() => dispatch(addLike(_id))}
              >
                like
              </button>
            )}
          </div>

          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {(auth.isAuthenticated && auth.user._id === user._id) ||
          (auth.user && auth.user.role === "admin") ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => dispatch(deleteAPost(_id))}
            >
              <i className="fas fa-times"></i>
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </motion.div>
  );
};

export default PostItem;
