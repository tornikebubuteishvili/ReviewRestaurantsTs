import { createSelector } from "reselect";
import { AppState } from "../types/StateTypes";

export const getRestaurants = createSelector(
  (state: AppState) => state.admin.restaurants,
  value => value
);

export const getRestaurantIds = createSelector(
  (state: AppState) => state.admin.restaurantIds,
  value => value
);

export const getHasMoreRestaurants = createSelector(
  (state: AppState) => state.admin.hasMoreRestaurants,
  value => value
);

export const getUsers = createSelector(
  (state: AppState) => state.admin.users,
  value => value
);

export const getUserIds = createSelector(
  (state: AppState) => state.admin.userIds,
  value => value
);

export const getHasMoreUsers = createSelector(
  (state: AppState) => state.admin.hasMoreUsers,
  value => value
);

export const getRequestState = createSelector(
  (state: AppState) => state.admin.isFetchingRestaurants,
  (state: AppState) => state.admin.isFetchingUsers,
  (state: AppState) => state.admin.isUpdatingUser,
  (state: AppState) => state.admin.isUpdatingRestaurant,
  (state: AppState) => state.admin.isUpdatingReview,
  (state: AppState) => state.admin.isDeletingUser,
  (state: AppState) => state.admin.isDeletingRestaurant,
  (state: AppState) => state.admin.isDeletingReview,
  (
    isFetchingRestaurants,
    isFetchingUsers,
    isUpdatingUser,
    isUpdatingRestaurant,
    isUpdatingReview,
    isDeletingUser,
    isDeletingRestaurant,
    isDeletingReview
  ) => {
    return {
      isFetchingRestaurants,
      isFetchingUsers,
      isUpdatingUser,
      isUpdatingRestaurant,
      isUpdatingReview,
      isDeletingUser,
      isDeletingRestaurant,
      isDeletingReview
    };
  }
);

export const getError = createSelector(
  (state: AppState) => state.admin.error,
  value => value
);
