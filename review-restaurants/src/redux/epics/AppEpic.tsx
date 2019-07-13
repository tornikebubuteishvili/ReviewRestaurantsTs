import { combineEpics, Epic } from "redux-observable";
import AccountEpics from "./AccountEpics";
import RestaurantEpics from "./RestaurantEpics";
import ReviewEpics from "./ReviewEpics";
import { AppState } from "../types/StateTypes";
import { AppAction } from "../types/ActionTypes";

export const AppEpic = combineEpics(AccountEpics, RestaurantEpics, ReviewEpics);
