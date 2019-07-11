import { createSelector } from "reselect";
import { AppState } from "../types/StateTypes";

export const getRestaurant = createSelector(
  (state: AppState) => state.restaurantDetails.restaurant,
  value => value
);

export const getReviews = createSelector(
  (state: AppState) => state.restaurantDetails.reviews,
  value => value
);

export const getReviewIds = createSelector(
  (state: AppState) => state.restaurantDetails.reviewIds,
  value => value
);

export const getHasMoreReviews = createSelector(
  (state: AppState) => state.restaurantDetails.hasMoreReviews,
  value => value
);

export const getAnswer = createSelector(
  (state: AppState) => state.restaurantDetails.answer,
  value => value
);

export const getRequestState = createSelector(
  (state: AppState) => state.restaurantDetails.isFetchingRestaurant,
  (state: AppState) => state.restaurantDetails.isAddingReview,
  (state: AppState) => state.restaurantDetails.isAddingAnswer,
  (isFetchingRestaurant, isAddingReview, isAddingAnswer) => {
    return { isFetchingRestaurant, isAddingReview, isAddingAnswer };
  }
);
