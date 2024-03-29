import { OwnerState } from "../types/StateTypes";
import { RestaurantAction, ReviewAction } from "../types/ActionTypes";
import * as RestaurantActions from "../actions/RestaurantActions";
import * as ReviewActions from "../actions/ReviewActions";
import { getType } from "typesafe-actions";
import { RestaurantLite, Review } from "../../api/types/Model";

export default function OwnerReducer(
  state: OwnerState = {
    restaurants: {},
    restaurantIds: [],
    hasMoreRestaurants: false,
    pendingReviews: {},
    pendingReviewIds: [],
    hasMorePendingReviews: false,
    newRestaurantName: "",
    answer: "",

    isFetchingRestaurants: false,
    isFetchingPendingReviews: false,
    isAddingRestaurant: false,
    isAddingAnswer: false,
    error: ""
  },
  action: RestaurantAction | ReviewAction
): OwnerState {
  switch (action.type) {
    case getType(RestaurantActions.clearError):
      return { ...state, error: "" };

    case getType(RestaurantActions.setError):
      return { ...state, error: action.payload };

    case getType(RestaurantActions.fetchRestaurants.request): {
      return {
        ...state,
        restaurants: {},
        restaurantIds: [],
        isFetchingRestaurants: true
      };
    }
    case getType(RestaurantActions.fetchRestaurants.success): {
      let newRestaurants: { [id: string]: RestaurantLite } = {};
      action.payload.items.forEach(restaurant => {
        newRestaurants = {
          ...newRestaurants,
          [restaurant.uId]: restaurant
        };
      });
      return {
        ...state,
        restaurantIds: action.payload.items.map(restaurant => restaurant.uId),
        restaurants: newRestaurants,
        isFetchingRestaurants: false
      };
    }
    case getType(RestaurantActions.fetchRestaurants.failure): {
      return { ...state, isFetchingRestaurants: false };
    }
    case getType(RestaurantActions.addRestaurant.request): {
      return { ...state, isAddingRestaurant: true };
    }
    case getType(RestaurantActions.addRestaurant.success): {
      return {
        ...state,
        isAddingRestaurant: false
      };
    }
    case getType(RestaurantActions.addRestaurant.failure): {
      return { ...state, isAddingRestaurant: false };
    }
    case getType(ReviewActions.fetchReviews.request): {
      return {
        ...state,
        pendingReviewIds: [],
        pendingReviews: {},
        isFetchingPendingReviews: true
      };
    }
    case getType(ReviewActions.fetchReviews.success): {
      let newReviews: { [id: string]: Review } = {};
      action.payload.items.forEach(review => {
        newReviews = {
          ...newReviews,
          [review.uId]: review
        };
      });
      return {
        ...state,
        pendingReviewIds: action.payload.items.map(review => review.uId),
        pendingReviews: newReviews,
        isFetchingPendingReviews: false
      };
    }
    case getType(ReviewActions.fetchReviews.failure): {
      return { ...state, isFetchingPendingReviews: false };
    }
    case getType(ReviewActions.addReviewAnswer.request): {
      return { ...state, isAddingAnswer: true };
    }
    case getType(ReviewActions.addReviewAnswer.success): {
      return { ...state, isAddingAnswer: false };
    }
    case getType(ReviewActions.addReviewAnswer.failure): {
      return { ...state, isAddingAnswer: false };
    }
    default:
      return state;
  }
}
