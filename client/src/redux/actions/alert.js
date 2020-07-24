import { alertTypes } from "../types/alert";
import { v4 } from "uuid";

export const removeAlert = (id) => (dispatch) =>
  dispatch({ type: alertTypes.REMOVE_ALERT, payload: id });

export const setAlert = (message, type, timeout = 5000) => (dispatch) => {
  const id = v4();
  dispatch({
    type: alertTypes.SET_ALERT,
    payload: { id, message, type },
  });

  setTimeout(
    () => dispatch({ type: alertTypes.REMOVE_ALERT, payload: id }),
    timeout
  );
};

export const clearAlerts = () => (dispatch) =>
  dispatch({ type: alertTypes.CLEAR_ALERTS });
