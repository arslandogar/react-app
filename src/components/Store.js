import { createStore, applyMiddleware } from "react";
import thunk from "redux-thunk";
import rootRuducer from "../reducers";

const initialState = {};

const middleware = [thunk];
