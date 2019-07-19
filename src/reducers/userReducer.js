import { NEW_USER } from "../actions/types";

const initialState = {
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_USER:
    default:
      return state;
  }
}
