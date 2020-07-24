import styled from "styled-components";
import { Link } from "react-router-dom";

export const CommentContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  border: 2px dashed #ccc;
  margin-top: 15px;
  background: #eee;

  &.comment--appear {
    transform: translateY(200px);
    opacity: 0.5;
  }
  &.comment--appear-active {
    transform: translateY(0px);
    opacity: 1;
    transition: all 1s;
  }
  &.comment--enter {
    transform: translateY(200px);
    opacity: 0.5;
  }
  &.comment--enter-active {
    transform: translateY(0px);
    opacity: 1;
    transition: all 1s;
  }
  &.comment--exit {
  }
  &.comment--exit-active {
    transform: translateY(-100px) rotate(45deg);
    opacity: 0;
    transition: all 0.5s;
  }
`;

export const CommentOwner = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CommentImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const CommentName = styled.p`
  text-transform: capitalize;

  font-size: 12px;
`;

export const CommentData = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  & > time {
    font-size: 12px;
    opacity: 0.7;
    margin-top: 15px;
  }
`;

export const CommentDelete = styled.button`
  margin-left: auto;
  padding: 5px;
  background: #dc3545;
  border: none;
  cursor: pointer;
  color: #fff;
`;
