import { Restaurant, Review } from "../../api/types/Model";
import { Role } from "../../api/types/Enum";

export type AccountState = {
  readonly id: string;
  readonly token: string;
  readonly username: string;
  readonly role: Role;
  readonly isLoggedIn: boolean;

  readonly isLoggingIn: boolean;
  readonly isLoggingOut: boolean;
  readonly isRegistering: boolean;
};

export type UserFeedState = {
  readonly restaurants: { [id: string]: Restaurant };
  readonly restaurantIds: string[];
  readonly hasMoreRestaurants: boolean;

  readonly isFetchingRestaurants: boolean;
};

export type OwnerFeedState = {
  readonly restaurants: { [id: string]: Restaurant };
  readonly restaurantIds: string[];
  readonly hasMoreRestaurants: boolean;
  readonly pendingReviews: { [id: string]: Review };
  readonly pendingReviewIds: string[];
  readonly hasMorePendingReviews: boolean;

  readonly isFetchingRestaurants: boolean;
  readonly isFetchingPendingReviews: boolean;
};

export type AdminFeedState = {
  readonly restaurants: { [id: string]: Restaurant };
  readonly restaurantIds: string[];
  readonly hasMoreRestaurants: boolean;
  readonly users: { [id: string]: Review };
  readonly userIds: string[];
  readonly hasMoreusers: boolean;

  readonly isFetchingRestaurants: boolean;
  readonly isFetchingUsers: boolean;
};

export type RestaurantDetailsState = {
  readonly restaurant: Restaurant;
  readonly reviews: { [id: string]: Review };
  readonly reviewIds: string[];
};

export type AddReviewState = {
  readonly comment: string;
  readonly rating: number;

  readonly isAddingReview: boolean;
};

export type AddRestaurantState = {
  readonly name: string;

  readonly isAddingRestaurant: boolean;
};

export type AnswerReviewState = {
  readonly comment: string;

  readonly isAddingAnswer: boolean;
};

export type AppState = {
  readonly account: AccountState;
  readonly userFeed: UserFeedState;
  readonly ownerFeed: OwnerFeedState;
  readonly adminFeed: AdminFeedState;
  readonly restaurantDetails: RestaurantDetailsState;
  readonly addReview: AddReviewState;
  readonly addRestaurant: AddRestaurantState;
  readonly answerReview: AnswerReviewState;
};
