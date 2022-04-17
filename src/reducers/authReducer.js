import { SIGN_IN, SIGN_OUT } from "../actions/types";

export default (state = { isSignedIn: null, userId: null }, action) => {
  switch (action.type) {
    case SIGN_IN:
      return (state = { ...state, isSignedIn: true, userId: action.payload });
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
