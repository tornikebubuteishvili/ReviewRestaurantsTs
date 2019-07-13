import { RestaurantDetailsState } from "../types/StateTypes";
import { RestaurantAction, ReviewAction } from "../types/ActionTypes";
import * as RestaurantActions from "../actions/RestaurantActions";
import * as ReviewActions from "../actions/ReviewActions";
import { getType } from "typesafe-actions";

export default function PostReducer(
  state: RestaurantDetailsState = {
    restaurant: {
      average: -1,
      name: "",
      uId: "",
      highestRatedReviewUId: "",
      lowestRatedReviewUId: ""
    },
    reviews: {},
    reviewIds: [],
    hasMoreReviews: false,
    answer: "",

    isFetchingRestaurant: false,
    isAddingReview: false,
    isAddingAnswer: false
  },
  action: RestaurantAction | ReviewAction
): RestaurantDetailsState {
  switch (action.type) {
    case getType(RestaurantActions.fetchRestaurant.request): {
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          name: action.payload.name,
          average: action.payload.average
        },
        isFetchingRestaurant: true
      };
    }
    case getType(RestaurantActions.fetchRestaurant.success): {
      return {
        ...state,
        restaurant: { ...action.payload },
        isFetchingRestaurant: false
      };
    }
    case getType(RestaurantActions.fetchRestaurant.failure): {
      return { ...state, isFetchingRestaurant: false };
    }
    case getType(ReviewActions.addReview.request): {
      return { ...state, isAddingReview: true };
    }
    case getType(ReviewActions.addReview.success): {
      return {
        ...state,
        reviewIds: [...state.reviewIds, "new"],
        reviews: {
          ...state.reviews,
          ["new"]: {
            uId: "new",
            restaurant: state.restaurant.name,
            reviewer: "You",
            answer: "",
            hasAnswer: false,
            ...action.payload
          }
        },
        isAddingReview: false
      };
    }
    case getType(ReviewActions.addReview.failure): {
      return { ...state, isAddingReview: false };
    }
    case getType(ReviewActions.addReviewAnswer.request): {
      return { ...state, isAddingAnswer: true };
    }
    case getType(ReviewActions.addReviewAnswer.success): {
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.payload.uId]: {
            ...state.reviews[action.payload.uId],
            hasAnswer: true,
            answer: state.answer
          }
        },
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
