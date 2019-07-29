import { NEW_USER, LOGIN_USER } from "../actions/types";

const initialState = {
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        items: action.payload
      };
    case NEW_USER:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
