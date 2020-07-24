import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLikes } from "../../../redux/actions/Posts";
import Spinner from "../../common/Spinner";
import {
  ModalContainer,
  Overlay,
  ModalBox,
  ModalHeader,
  ModalContent,
  ModalFooter,
  LikerContainer,
  LikerImageContainer,
  LikerImage,
  Liker,
} from "./Model.style";

const Modal = ({ postId, toggleModal }) => {
  const dispatch = useDispatch();
  const { allLikes, loadingLikes } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getLikes(postId));
  }, []);
  const content = (
    <ModalContainer>
      <Overlay onClick={toggleModal} />
      <ModalBox>
        <ModalHeader>
          <h1 style={{ color: "#fff" }}>People who likes the post</h1>
        </ModalHeader>

        <ModalContent>
          {loadingLikes ? (
            <Spinner />
          ) : (
            allLikes
              .filter((like) => !!like.user)
              .map((like) => (
                <LikerContainer key={like.id}>
                  <LikerImageContainer>
                    <LikerImage src={like.user.avatar} alt="" />
                  </LikerImageContainer>
                  <Liker>{like.user.name}</Liker>
                </LikerContainer>
              ))
          )}
        </ModalContent>

        <ModalFooter>
          <button className="btn btn-info" onClick={toggleModal}>
            Close
          </button>
        </ModalFooter>
      </ModalBox>
    </ModalContainer>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

export default Modal;
