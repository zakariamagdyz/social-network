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

const CommentItem = ({
  comment: { text, date, name, avatar, _id, user },
  postId,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <CommentContainer>
      <CommentOwner to={`/profile/${user}`}>
        <CommentImage className="round-img" src={avatar} alt="" />
        <CommentName>{name}</CommentName>
      </CommentOwner>
      <CommentData>
        <h4>{text}</h4>
        <Moment format="YYYY/MM/DD">{date}</Moment>
      </CommentData>

      {(auth.isAuthenticated && auth.user._id === user) ||
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
