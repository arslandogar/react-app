import {
  NEW_USER,
  LOGIN_USER,
  SIGN_UP_FAILED,
  SUBMITTING,
  LOGIN_FAILED
} from "./types";
const axios = require("axios");

const createUser = userData => dispatch => {
  dispatch({ type: SUBMITTING });
  const { name, email, password } = userData;
  axios
    .post("http://localhost:5000/api/users", {
      name: name,
      email: email,
      password: password
    })
    .then(response => dispatch({ type: NEW_USER, payload: response }))
    .catch(error => dispatch({ type: SIGN_UP_FAILED, payload: error }));
};

export const authUser = userData => dispatch => {
  dispatch({ type: SUBMITTING });
  const { email, password } = userData;
  axios
    .post("http://localhost:5000/api/logins", {
      email: email,
      password: password
    })
    .then(response => dispatch({ type: LOGIN_USER, payload: response }))
    .catch(error => dispatch({ type: LOGIN_FAILED, payload: error }));
};

export default createUser;
