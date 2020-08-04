import React from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { AlertContainer, StyledAlert } from "./Alert.style";

const alertVariants = {
  hidden: { x: "100vw", opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: {
    x: "100vw",
    transition: { ease: "easeInOut" },
  },
};
const AlertMessage = () => {
  const alerts = useSelector((state) => state.alert);

  return (
    <AlertContainer>
      <AnimatePresence>
        {alerts !== null &&
          alerts.length > 0 &&
          alerts.map((alert) => (
            <StyledAlert
              key={alert.id}
              success={alert.type === "success" && true}
              danger={alert.type === "danger" && true}
              variants={alertVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {alert.message}
            </StyledAlert>
          ))}
      </AnimatePresence>
    </AlertContainer>
  );
};

export default AlertMessage;
