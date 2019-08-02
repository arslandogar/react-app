import { NEW_USER, LOGIN_USER, FAILED } from "../actions/types";

const initialState = { userAdded: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        authUser: action.payload
      };
    case NEW_USER:
      return {
        ...state,
        success: action.payload,
        userAdded: true
      };
    case FAILED:
      return {
        ...state,
        error: action.error,
        userAdded: false
      };

    default:
      return state;
  }
}
