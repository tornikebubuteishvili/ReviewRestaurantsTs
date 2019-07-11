import { createSelector } from "reselect";
import { AppState } from "../types/StateTypes";

export const getRestaurants = createSelector(
  (state: AppState) => state.owner.restaurants,
  value => value
);

export const getRestaurantIds = createSelector(
  (state: AppState) => state.owner.restaurantIds,
  value => value
);

export const getHasMoreRestaurants = createSelector(
  (state: AppState) => state.owner.hasMoreRestaurants,
  value => value
);

export const getRequestState = createSelector(
  (state: AppState) => state.user.isFetchingRestaurants,
  isFetchingRestaurants => {
    return { isFetchingRestaurants };
  }
);
