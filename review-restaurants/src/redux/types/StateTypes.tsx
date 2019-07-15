import {
  Restaurant,
  Review,
  User,
  RestaurantLite
} from "../../api/types/Model";
import { Role } from "../../api/types/Enum";

export type AccountState = {
  readonly id: string;
  readonly token: string;
  readonly username: string;
  readonly role: Role;
  readonly isLoggedIn: boolean;

  readonly error: string;

  readonly isLoggingIn: boolean;
  readonly isLoggingOut: boolean;
  readonly isRegistering: boolean;
};

export type UserState = {
  readonly restaurants: { [id: string]: RestaurantLite };
  readonly restaurantIds: string[];
  readonly hasMoreRestaurants: boolean;

  readonly isFetchingRestaurants: boolean;

  readonly error: string;
};

export type OwnerState = {
  readonly restaurants: { [id: string]: RestaurantLite };
  readonly restaurantIds: string[];
  readonly hasMoreRestaurants: boolean;
  readonly pendingReviews: { [id: string]: Review };
  readonly pendingReviewIds: string[];
  readonly hasMorePendingReviews: boolean;
  readonly newRestaurantName: string;
  readonly answer: string;

  readonly isFetchingRestaurants: boolean;
  readonly isFetchingPendingReviews: boolean;
  readonly isAddingRestaurant: boolean;
  readonly isAddingAnswer: boolean;

  readonly error: string;
};

export type AdminState = {
  readonly restaurants: { [id: string]: RestaurantLite };
  readonly restaurantIds: string[];
  readonly hasMoreRestaurants: boolean;
  readonly users: { [id: string]: User };
  readonly userIds: string[];
  readonly hasMoreUsers: boolean;

  readonly isFetchingRestaurants: boolean;
  readonly isFetchingUsers: boolean;
  readonly isUpdatingUser: boolean;
  readonly isUpdatingRestaurant: boolean;
  readonly isUpdatingReview: boolean;
  readonly isDeletingUser: boolean;
  readonly isDeletingRestaurant: boolean;
  readonly isDeletingReview: boolean;

  readonly error: string;
};

export type RestaurantDetailsState = {
  readonly restaurant: Restaurant;
  readonly reviews: { [id: string]: Review };
  readonly reviewIds: string[];
  readonly hasMoreReviews: boolean;
  readonly answer: string;

  readonly isFetchingRestaurant: boolean;
  readonly isFetchingReviews: boolean;
  readonly isAddingReview: boolean;
  readonly isAddingAnswer: boolean;

  readonly error: string;
};

export type AppState = {
  readonly account: AccountState;
  readonly user: UserState;
  readonly owner: OwnerState;
  readonly admin: AdminState;
  readonly restaurantDetails: RestaurantDetailsState;
};
