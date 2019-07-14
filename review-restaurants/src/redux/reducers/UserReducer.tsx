import { UserState } from "../types/StateTypes";
import { RestaurantAction } from "../types/ActionTypes";
import * as RestaurantActions from "../actions/RestaurantActions";
import { getType } from "typesafe-actions";
import { RestaurantLite } from "../../api/types/Model";

export default function UserReducer(
  state: UserState = {
    restaurants: {},
    restaurantIds: [],
    hasMoreRestaurants: false,

    isFetchingRestaurants: false
  },
  action: RestaurantAction
): UserState {
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
          ...state.restaurantIds,
          ...action.payload.items.map(restaurant => restaurant.uId)
        ],
        restaurants: { ...state.restaurants, ...newRestaurants },
        isFetchingRestaurants: false
      };
    }
    case getType(RestaurantActions.fetchRestaurants.failure): {
      return { ...state, isFetchingRestaurants: false };
    }
    default:
      return state;
  }
}
