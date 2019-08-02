import { NEW_USER, LOGIN_USER, FAILED } from "./types";
const axios = require("axios");

const createUser = userData => dispatch => {
  const { name, email, password } = userData;
  axios
    .post("http://localhost:5000/api/users", {
      name: name,
      email: email,
      password: password
    })
    .then(response => dispatch({ type: NEW_USER, payload: response }))
    .catch(error => dispatch({ type: FAILED, payload: error }));
};

export default createUser;
