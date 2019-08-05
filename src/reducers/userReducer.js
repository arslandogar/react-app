import {
  NEW_USER,
  LOGIN_USER,
  SIGN_UP_FAILED,
  SUBMITTING,
  LOGIN_FAILED
} from "../actions/types";

const initialState = {
  userAdded: false,
  emailError: false,
  submitting: false,
  loginFailed: false,
  authUser: { data: localStorage.getItem("token") }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBMITTING:
      return {
        ...state,
        submitting: true,
        userAdded: false,
        emailError: false
      };
    case LOGIN_USER:
      return {
        ...state,
        authUser: action.payload,
        submitting: false,
        loginFailed: false
      };
    case NEW_USER:
      return {
        ...state,
        success: action.payload,
        userAdded: true,
        emailError: false,
        submitting: false
      };

    case SIGN_UP_FAILED:
      return {
        ...state,
        error: action.error,
        userAdded: false,
        emailError: true,
        submitting: false
      };

    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
        submitting: false,
        loginFailed: true
      };

    default:
      return state;
  }
}
