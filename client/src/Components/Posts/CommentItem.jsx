import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/actions/Posts";

const CommentItem = ({
  comment: { text, date, name, avatar, _id, user },
  postId,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <div className="comments">
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

          {(auth.isAuthenticated && auth.user._id === user) ||
          auth.user.role === "admin" ? (
            <button
              className="btn btn-danger"
              onClick={() => dispatch(deleteComment(postId, _id))}
            >
              delete
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
