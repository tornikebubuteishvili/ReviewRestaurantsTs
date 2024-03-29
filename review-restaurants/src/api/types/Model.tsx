import { Comparison, Role, FilterLogic } from "./Enum";

/* Account */
export interface LoginFormValues {
  readonly username: string;
  readonly password: string;
}

export interface RegisterFormValues {
  readonly username: string;
  readonly password: string;
  readonly repeatPassword: string;
  readonly role: Role;
}

/* Shared */
export interface Review {
  readonly uId: string;
  readonly star: number;
  readonly comment: string;
  readonly visitDate: Date;
  readonly restaurantOwnerUId: string;
  readonly restaurantUId: string;
  readonly restaurant: string;
  readonly reviewer: string;
  readonly answer: string;
  readonly hasAnswer: boolean;
}

export interface Restaurant {
  readonly uId: string;
  readonly name: string;
  readonly average: number;
  readonly lowestRatedReviewUId: string;
  readonly highestRatedReviewUId: string;
}

export interface RestaurantLite {
  readonly uId: string;
  readonly name: string;
  readonly average: number;
  readonly restaurantOwnerUId: string;
  readonly restaurantOwnerName: string;
}

export interface User {
  readonly uId: string;
  readonly username: string;
  readonly password: string;
  readonly role: Role;
}

/* Filter-Sort */
export interface FilterItem {
  readonly propertyName: string;
  readonly value: any;
  readonly comparison: Comparison;
}

export interface FilterModel {
  readonly filterItems: FilterItem[];
  readonly filterLogic: FilterLogic;
}

export interface SortItem {
  readonly sortBy: string;
  readonly desc: boolean;
}

export interface SortModel {
  readonly sortItems: SortItem[];
}
