import { AdminState } from "../types/StateTypes";
import {
  AccountAction,
  RestaurantAction,
  ReviewAction
} from "../types/ActionTypes";
import * as AccountActions from "../actions/AccountActions";
import * as RestaurantActions from "../actions/RestaurantActions";
import * as ReviewActions from "../actions/ReviewActions";
import { getType } from "typesafe-actions";
import { User, RestaurantLite } from "../../api/types/Model";

export default function AdminReducer(
  state: AdminState = {
    restaurants: {},
    restaurantIds: [],
    hasMoreRestaurants: false,
    users: {},
    userIds: [],
    hasMoreUsers: false,
    isFetchingRestaurants: false,
    isFetchingUsers: false,
    isUpdatingUser: false,
    isUpdatingRestaurant: false,
    isUpdatingReview: false,
    isDeletingUser: false,
    isDeletingRestaurant: false,
    isDeletingReview: false,
    error: ""
  },
  action: AccountAction | RestaurantAction | ReviewAction
): AdminState {
  switch (action.type) {
    case getType(RestaurantActions.clearError):
      return { ...state, error: "" };
    case getType(RestaurantActions.setError):
      return { ...state, error: action.payload };
    case getType(AccountActions.fetchAccounts.request): {
      return { ...state, users: {}, userIds: [], isFetchingUsers: true };
    }
    case getType(AccountActions.fetchAccounts.success): {
      let newUsers: { [id: string]: User } = {};
      action.payload.items.forEach(user => {
        newUsers = {
          ...newUsers,
          [user.uId]: user
        };
      });
      return {
        ...state,
        userIds: action.payload.items.map(user => user.uId),
        users: newUsers,
        isFetchingUsers: false
      };
    }
    case getType(AccountActions.fetchAccounts.failure): {
      return { ...state, isFetchingUsers: false };
    }
    case getType(AccountActions.updateUser.request): {
      return { ...state, isUpdatingUser: true };
    }
    case getType(AccountActions.updateUser.success): {
      const user = state.users[action.payload.uId];
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.uId]: {
            ...user,
            username: action.payload.username,
            password: action.payload.password
          }
        },
        isUpdatingUser: false
      };
    }
    case getType(AccountActions.updateUser.failure): {
      return { ...state, error: action.payload, isUpdatingUser: false };
    }
    case getType(AccountActions.deleteUser.request): {
      return { ...state, isDeletingUser: true };
    }
    case getType(AccountActions.deleteUser.success): {
      const {
        [action.payload.uId]: {},
        ...newUsers
      } = state.users;
      return {
        ...state,
        users: newUsers,
        userIds: state.userIds.filter(id => id !== action.payload.uId),
        isDeletingUser: false
      };
    }
    case getType(AccountActions.deleteUser.failure): {
      return { ...state, error: action.payload, isDeletingUser: false };
    }
    case getType(RestaurantActions.fetchRestaurants.request): {
      return {
        ...state,
        restaurantIds: [],
        restaurants: {},
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
    case getType(RestaurantActions.updateRestaurant.request): {
      return { ...state, isUpdatingRestaurant: true };
    }
    case getType(RestaurantActions.updateRestaurant.success): {
      return { ...state, isUpdatingRestaurant: false };
    }
    case getType(RestaurantActions.updateRestaurant.failure): {
      return { ...state, isUpdatingRestaurant: false };
    }
    case getType(RestaurantActions.deleteRestaurant.request): {
      return { ...state, isDeletingRestaurant: true };
    }
    case getType(RestaurantActions.deleteRestaurant.success): {
      return { ...state, isDeletingRestaurant: false };
    }
    case getType(RestaurantActions.deleteRestaurant.failure): {
      return { ...state, isDeletingRestaurant: false };
    }
    case getType(ReviewActions.updateReview.request): {
      return { ...state, isUpdatingReview: true };
    }
    case getType(ReviewActions.updateReview.success): {
      return { ...state, isUpdatingReview: false };
    }
    case getType(ReviewActions.updateReview.failure): {
      return { ...state, isUpdatingReview: false };
    }
    case getType(ReviewActions.deleteReview.request): {
      return { ...state, isDeletingRestaurant: true };
    }
    case getType(ReviewActions.deleteReview.success): {
      return { ...state, isDeletingRestaurant: false };
    }
    case getType(ReviewActions.deleteReview.failure): {
      return { ...state, isDeletingRestaurant: false };
    }
    default:
      return state;
  }
}
