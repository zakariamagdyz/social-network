import styled from "styled-components";
import { TransitionGroup } from "react-transition-group";

const alertType = (props) => {
  if (props.success === true) {
    return "#28a745";
  }
  if (props.danger === true) {
    return "#dc3545";
  }
};

export const StyledAlert = styled.div`
  text-align: center;
  right: 2rem;
  top: 2rem;
  font-size: 2rem;
  padding: 1rem 4rem;
  margin: 2rem 0rem;
  background: ${(props) => alertType(props)};
  color: #fff;
  opacity: 0.9;
  &.alert--enter {
    opacity: 0;
    transform: translateY(-10px);
  }
  &.alert--enter-active {
    opacity: 0.9;
    transform: translateY(2px);
    transition: all 0.8s ease;
  }

  &.alert--enter-done {
    transform: translateY(0px);
    transition: all 0.1s ease;
  }

  &.alert--exit-active {
    opacity: 0;
    transform: translateY(-30px);
    transition: all 0.5s;
  }
`;

export const AlertContainer = styled(TransitionGroup)`
  position: fixed;
  top: 60px;
  right: 10px;
  margin: 1rem 0rem;
  padding: 0.8rem;
  z-index: 999;
`;
