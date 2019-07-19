import { createStore, applyMiddleware } from "react";
import thunk from "redux-thunk";
import rootRuducer from "../reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootRuducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
