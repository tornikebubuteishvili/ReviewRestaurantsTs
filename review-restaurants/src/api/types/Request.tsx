import { Role } from "./Enum";
import { FilterModel, SortModel } from "./Model";
import { History } from "history";

/* Account requests */
export interface LoginRequest {
  readonly username: string;
  readonly password: string;
  readonly history: History;
}

export interface LogoutRequest {}

export interface RegisterRequest {
  readonly username: string;
  readonly password: string;
  readonly role: Role;
  readonly history: History;
}

export interface RefreshTokenRequest {
  readonly olderToken: string;
  readonly refreshToken: string;
}

/* Fetch requests */
export interface FetchListRequest {
  readonly pageSize: number;
  readonly page: number;
  readonly filterModel: FilterModel;
  readonly sortModel: SortModel;
}

export interface FetchRestaurantRequest {
  readonly uId: string;
}

export interface FetchReviewRequest {
  readonly uId: string;
}

export interface FetchUserRequest {
  readonly uId: string;
}

/* Add requests */
export interface AddRestaurantRequest {
  readonly ownerUId: string;
  readonly name: string;
}

export interface AddReviewRequest {
  readonly star: number;
  readonly comment: string;
  readonly visitDate: Date;
  readonly restaurantUId: string;
}

export interface AddReviewAnswerRequest {
  readonly reviewUId: string;
  readonly answer: string;
  readonly ownerUId: string;
  readonly restaurantUId: string;
}

/* Update requests */
export interface UpdateRestaurantRequest {
  readonly uId: string;
  readonly name: string;
}

export interface UpdateReviewRequest {
  readonly uId: string;
  readonly star: number;
  readonly comment: string;
  readonly answer: string;
  readonly visitDate: Date;
}

export interface UpdateUserRequest {
  readonly uId: string;
  readonly username: string;
  readonly password: string;
}

/* Delete requests */
export interface DeleteRestaurantRequest {
  readonly uId: string;
}

export interface DeleteReviewRequest {
  readonly uId: string;
}

export interface DeleteUserRequest {
  readonly uId: string;
}
