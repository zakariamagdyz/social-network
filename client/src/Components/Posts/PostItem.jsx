import React, { Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAPost, addLike } from "../../redux/actions/Posts";

const PostItem = ({
  _id,
  text,
  name,
  avatar,
  likes,
  comments,
  date,
  user,
  showActions,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <Moment format="YYYY/MM/DD">{date}</Moment>

        {showActions && (
          <Fragment>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => dispatch(addLike(_id))}
            >
              <i className="fas fa-thumbs-up"></i>{" "}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>

            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {(auth.isAuthenticated && auth.user._id === user) ||
            auth.user.role === "admin" ? (
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
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default PostItem;
