import React from "react";
import { useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Alert = () => {
  const alerts = useSelector((state) => state.alert);

  return (
    <TransitionGroup component={null}>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <CSSTransition
            key={alert.id}
            timeout={{ exit: 500, enter: 1000 }}
            classNames="alert-"
          >
            <div className={`alert alert-${alert.type}`}>{alert.message}</div>
          </CSSTransition>
        ))}
    </TransitionGroup>
  );
};

export default Alert;
