import { createStore, applyMiddleware, compose } from "redux";
import AppReducer from "../reducers/AppReducer";
import EpicMiddleware from "../middleware/EpicMiddleware";
import LoggerMiddleware from "../../redux/middleware/LoggerMiddleware";

const store = createStore(
  AppReducer,
  undefined,
  applyMiddleware(LoggerMiddleware, EpicMiddleware)
);

export default store;
