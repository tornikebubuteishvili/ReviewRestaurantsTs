import { Action, Dispatch } from "redux";

const LoggerMiddleware = () => (next: Dispatch) => (action: Action) => {
  console.info("dispatching", action);
  let result = next(action);
  return result;
};

export default LoggerMiddleware;
