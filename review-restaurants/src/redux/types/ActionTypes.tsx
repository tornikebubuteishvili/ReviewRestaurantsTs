import { ActionType } from "typesafe-actions";

import * as AccountActions from "../actions/AccountActions";
export type AccountAction = ActionType<typeof AccountActions>;

import * as RestaurantActions from "../actions/RestaurantActions";
export type RestaurantAction = ActionType<typeof RestaurantActions>;

import * as ReviewActions from "../actions/ReviewActions";
export type ReviewAction = ActionType<typeof ReviewActions>;

export type AppAction = AccountAction | RestaurantAction | ReviewAction;
