import { OwnerState } from "../types/StateTypes";
import { RestaurantAction, ReviewAction } from "../types/ActionTypes";
import * as RestaurantActions from "../actions/RestaurantActions";
import * as ReviewActions from "../actions/ReviewActions";
import { getType } from "typesafe-actions";
import { RestaurantLite, Review } from "../../api/types/Model";

export default function PostReducer(
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
    isAddingAnswer: false
  },
  action: RestaurantAction | ReviewAction
): OwnerState {
  switch (action.type) {
    case getType(RestaurantActions.fetchRestaurants.request): {
      return { ...state, isFetchingRestaurants: true };
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
        restaurantIds: [
          ...action.payload.items.map(restaurant => restaurant.uId)
        ],
        restaurants: { ...newRestaurants },
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
      const newRestaurant: RestaurantLite = {
        uId: action.payload.uId,
        name: state.newRestaurantName,
        average: 0,
        restaurantOwnerName: "",
        restaurantOwnerUId: ""
      };
      return {
        ...state,
        restaurantIds: [...state.restaurantIds, action.payload.uId],
        restaurants: { ...state.restaurants, newRestaurant },
        isAddingRestaurant: false
      };
    }
    case getType(RestaurantActions.addRestaurant.failure): {
      return { ...state, isAddingRestaurant: false };
    }
    case getType(ReviewActions.fetchReviews.request): {
      return { ...state, isFetchingPendingReviews: true };
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
        pendingReviewIds: [
          ...state.pendingReviewIds,
          ...action.payload.items.map(review => review.uId)
        ],
        pendingReviews: { ...state.pendingReviews, ...newReviews },
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
      const {
        [action.payload.uId]: {},
        ...newPendingReviews
      } = state.pendingReviews;
      return {
        ...state,
        pendingReviews: newPendingReviews,
        pendingReviewIds: state.pendingReviewIds.filter(
          id => id !== action.payload.uId
        ),
        isAddingAnswer: false
      };
    }
    case getType(ReviewActions.addReviewAnswer.failure): {
      return { ...state, isAddingAnswer: false };
    }
    default:
      return state;
  }
}
