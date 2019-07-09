import { RestaurantLite, Restaurant, Review, User } from "./Model";

/* Account requests */
export interface LoginResponse {
  readonly uId: string;
  readonly token: string;
}

export interface LogoutResponse {}

export interface RegisterResponse {}

/* Fetch Responses */
export interface FetchRestaurantsResponse {
  readonly items: RestaurantLite[];
  readonly itemsCount: number;
}

export interface FetchRestaurantsResponse {
  readonly items: RestaurantLite[];
  readonly itemsCount: number;
}

export interface FetchRestaurantsResponse {
  readonly items: RestaurantLite[];
  readonly itemsCount: number;
}

export type FetchRestaurantResponse = Restaurant;

export type FetchReviewResponse = Review;

export type FerchUserResponse = User;

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
