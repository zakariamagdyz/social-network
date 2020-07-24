import React from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { AlertContainer, StyledAlert } from "./Alert.style";

const AlertMessage = () => {
  const alerts = useSelector((state) => state.alert);

  return (
    <AlertContainer>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <CSSTransition
            key={alert.id}
            timeout={{ exit: 500, enter: 1000 }}
            classNames="alert-"
          >
            <StyledAlert
              success={alert.type === "success" && true}
              danger={alert.type === "danger" && true}
            >
              {alert.message}
            </StyledAlert>
          </CSSTransition>
        ))}
    </AlertContainer>
  );
};

export default AlertMessage;
