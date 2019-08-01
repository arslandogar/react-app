import { NEW_USER, LOGIN_USER } from "./types";
const axios = require("axios");

const createUser = userData => dispatch => {
  const { name, email, password } = userData;
  axios
    .post("http://localhost:5000/api/users", {
      name: name,
      email: email,
      password: password
    })
    .then(user =>
      dispatch({
        type: NEW_USER,
        payload: user
      })
    )
    .catch(function(error) {
      console.log(error);
    });
};

export default createUser;
