import { combineEpics } from "redux-observable";
import AccountEpics from "./AccountEpics";
import RestaurantEpics from "./RestaurantEpics";
import ReviewEpics from "./ReviewEpics";

export const AppEpic = combineEpics(AccountEpics, RestaurantEpics, ReviewEpics);
