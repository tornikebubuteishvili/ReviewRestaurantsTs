import { createEpicMiddleware } from "redux-observable";
import { AppAction } from "../types/ActionTypes";
import { AppState } from "../types/StateTypes";

const EpicMiddleware = createEpicMiddleware<AppAction, AppAction, AppState>();

export default EpicMiddleware;
