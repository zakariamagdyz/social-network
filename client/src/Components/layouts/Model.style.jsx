import styled from "styled-components";

export const ModalBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 70vh;
  margin: 15vh auto;
  display: flex;
  z-index: 999;
  background: #fff;
  overflow: auto;
`;

export const ModalHeader = styled.div`
  background: #343a40;
  height: 65px;
  width: 100%;
  padding: 10px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const ModalFooter = styled.div`
  height: 60px;
  display: flex;
  margin-top: auto;
  align-items: center;
  flex-direction: row-reverse;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  &.model--enter {
    opacity: 0;
  }
  &.model--enter-active {
    opacity: 1;
    transition: opacity 1s;
  }

  &.model--enter > ${ModalBox} {
    transform: scale(0.2);
  }

  &.model--enter-active > ${ModalBox} {
    transform: scale(1);
    transition: transform 1s;
  }

  &.model--exit {
    opacity: 1;
  }
  &.model--exit-active {
    opacity: 0;
    transition: opacity 1s;
  }

  &.model--exit-active > ${ModalBox} {
    transform: scale(0);
    transition: transform 1s;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  opacity: 0.6;
  z-index: 20;
`;

export const LikerContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-top: 15px;
`;

export const LikerImageContainer = styled.figure`
  margin-right: 20px;
`;

export const LikerImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

export const Liker = styled.h4`
  text-transform: capitalize;
`;
