import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/actions/Posts";
import {
  CommentContainer,
  CommentImage,
  CommentName,
  CommentOwner,
  CommentData,
  CommentDelete,
} from "./CommentItem.style";

const CommentItem = ({ comment: { text, date, _id, user }, postId }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <CommentContainer>
      <CommentOwner to={`/profile/${user._id}`}>
        <CommentImage
          className="round-img"
          src={`/${user && user.avatar}`}
          alt=""
        />
        <CommentName>{user && user.name}</CommentName>
      </CommentOwner>
      <CommentData>
        <h4>{text}</h4>
        <Moment format="YYYY-MM-DD HH:mm">{date}</Moment>
      </CommentData>

      {(auth.isAuthenticated && auth.user._id === user._id) ||
      (auth.user && auth.user.role === "admin") ? (
        <CommentDelete onClick={() => dispatch(deleteComment(postId, _id))}>
          delete
        </CommentDelete>
      ) : (
        ""
      )}
    </CommentContainer>
  );
};

export default CommentItem;
