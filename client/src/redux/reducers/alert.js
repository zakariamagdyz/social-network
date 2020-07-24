import { alertTypes } from "../types/alert";
const INITAL_STATE = [];

/*
{
    id:1, message:"adasd",type:error
}
*/
export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case alertTypes.SET_ALERT:
      return [...state, action.payload];

    case alertTypes.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);

    case alertTypes.CLEAR_ALERTS:
      return [];
    default:
      return state;
  }
};
