import { RestaurantLite, Restaurant, Review, User } from "./Model";

/* Account requests */
export interface LoginResponse {
  readonly uId: string;
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
export interface AddRestaurantResponse {}

export interface AddReviewResponse {}

export interface AddReviewAnswerResponse {}

/* Update Responses */
export interface UpdateRestaurantResponse {}

export interface UpdateReviewResponse {}

export interface UpdateUserResponse {}

/* Delete Responses */
export interface DeleteRestaurantResponse {}

export interface DeleteReviewResponse {}

export interface DeleteUserResponse {}
