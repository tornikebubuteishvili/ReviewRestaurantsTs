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

export const getPendingReviews = createSelector(
  (state: AppState) => state.owner.pendingReviews,
  value => value
);

export const getPendingReviewIds = createSelector(
  (state: AppState) => state.owner.pendingReviewIds,
  value => value
);

export const getHasMorePendingReviews = createSelector(
  (state: AppState) => state.owner.hasMorePendingReviews,
  value => value
);

export const getNewRestaurantName = createSelector(
  (state: AppState) => state.owner.newRestaurantName,
  value => value
);

export const getAnswer = createSelector(
  (state: AppState) => state.owner.answer,
  value => value
);

export const getRequestState = createSelector(
  (state: AppState) => state.owner.isFetchingRestaurants,
  (state: AppState) => state.owner.isFetchingPendingReviews,
  (state: AppState) => state.owner.isAddingRestaurant,
  (state: AppState) => state.owner.isAddingAnswer,
  (
    isFetchingRestaurants,
    isFetchingPendingReviews,
    isAddingRestaurant,
    isAddingAnswer
  ) => {
    return {
      isFetchingRestaurants,
      isFetchingPendingReviews,
      isAddingRestaurant,
      isAddingAnswer
    };
  }
);
