import { RestaurantLite, Restaurant, Review, User } from "./Model";

/* Account requests */
export interface LoginResponse {
  readonly uId: string;
  readonly username: string;
  readonly token: string;
}

export interface LogoutResponse {}

export interface RegisterResponse {}

export interface RefreshTokenResponse {
  readonly token: string;
}

/* Fetch Responses */
export interface FetchRestaurantsResponse {
  readonly items: RestaurantLite[];
  readonly itemsCount: number;
}

export interface FetchReviewsResponse {
  readonly items: Review[];
  readonly itemsCount: number;
}

export interface FetchAccountsResponse {
  readonly items: User[];
  readonly itemsCount: number;
}

export type FetchRestaurantResponse = Restaurant;

export type FetchReviewResponse = Review;

export type FetchUserResponse = User;

/* Add Responses */
export interface AddRestaurantResponse {
  readonly uId: string;
}

export interface AddReviewResponse {
  readonly uId: string;
}

export interface AddReviewAnswerResponse {
  readonly uId: string;
}

/* Update Responses */
export interface UpdateRestaurantResponse {
  readonly uId: string;
}

export interface UpdateReviewResponse {
  readonly uId: string;
}

export interface UpdateUserResponse {
  readonly uId: string;
}

/* Delete Responses */
export interface DeleteRestaurantResponse {}

export interface DeleteReviewResponse {}

export interface DeleteUserResponse {}
