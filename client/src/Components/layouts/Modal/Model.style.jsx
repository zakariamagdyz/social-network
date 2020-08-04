import styled from "styled-components";
import { motion } from "framer-motion";

export const ModalBox = styled(motion.div)`
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

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
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
