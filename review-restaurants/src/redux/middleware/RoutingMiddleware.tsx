import { Action, Dispatch } from "redux";
import { getType } from "typesafe-actions";
import * as AccountActions from "../actions/AccountActions";
import * as RestaurantActions from "../actions/RestaurantActions";
import { AppAction } from "../types/ActionTypes";

const RoutingMiddleware = () => (dispatch: Dispatch) => (action: AppAction) => {
  switch (action.type) {
    case getType(AccountActions.loginUser.success): {
      action.payload.history.push("/" + action.payload.role);
      return dispatch(action);
    }
    case getType(AccountActions.registerUser.success): {
      action.payload.history.push("/");
      return dispatch(action);
    }
    // case getType(RestaurantActions.deleteRestaurant.success): {
    //   // action.payload.history.push("/admin");
    //   return;
    // }
    default:
      return dispatch(action);
  }
};

export default RoutingMiddleware;
