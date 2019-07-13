import { createStore, applyMiddleware, compose } from "redux";
import AppReducer from "../reducers/AppReducer";
import EpicMiddleware from "../middleware/EpicMiddleware";
import LoggerMiddleware from "../../redux/middleware/LoggerMiddleware";
import { AppEpic } from "../epics/AppEpic";
import RoutingMiddleware from "../middleware/RoutingMiddleware";

const store = createStore(
  AppReducer,
  undefined,
  applyMiddleware(RoutingMiddleware, LoggerMiddleware, EpicMiddleware)
);

EpicMiddleware.run(AppEpic);

export default store;
