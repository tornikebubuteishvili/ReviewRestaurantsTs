import { createAsyncAction } from "typesafe-actions";
import {
  AddRestaurantRequest,
  UpdateRestaurantRequest,
  DeleteRestaurantRequest,
  FetchRestaurantRequest,
  FetchListRequest
} from "../../api/types/Request";
import {
  AddRestaurantResponse,
  UpdateRestaurantResponse,
  DeleteRestaurantResponse,
  FetchRestaurantResponse,
  FetchRestaurantsResponse
} from "../../api/types/Response";

export const ADD_RESTAURANT_REQUEST = "Restaurant/ADD_RESTAURANT_REQUEST";
export const ADD_RESTAURANT_SUCCESS = "Restaurant/ADD_RESTAURANT_SUCCESS";
export const ADD_RESTAURANT_FAILURE = "Restaurant/ADD_RESTAURANT_FAILURE";
export const addRestaurant = createAsyncAction(
  ADD_RESTAURANT_REQUEST,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAILURE
)<AddRestaurantRequest, AddRestaurantResponse, any>();

export const UPDATE_RESTAURANT_REQUEST = "Restaurant/UPDATE_RESTAURANT_REQUEST";
export const UPDATE_RESTAURANT_SUCCESS = "Restaurant/UPDATE_RESTAURANT_SUCCESS";
export const UPDATE_RESTAURANT_FAILURE = "Restaurant/UPDATE_RESTAURANT_FAILURE";
export const updateRestaurant = createAsyncAction(
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE
)<UpdateRestaurantRequest, UpdateRestaurantRequest, any>();

export const DELETE_RESTAURANT_REQUEST = "Restaurant/DELETE_RESTAURANT_REQUEST";
export const DELETE_RESTAURANT_SUCCESS = "Restaurant/DELETE_RESTAURANT_SUCCESS";
export const DELETE_RESTAURANT_FAILURE = "Restaurant/DELETE_RESTAURANT_FAILURE";
export const deleteRestaurant = createAsyncAction(
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE
)<DeleteRestaurantRequest, DeleteRestaurantRequest, any>();

export const FETCH_RESTAURANTS_REQUEST = "Restaurant/FETCH_RESTAURANTS_REQUEST";
export const FETCH_RESTAURANTS_SUCCESS = "Restaurant/FETCH_RESTAURANTS_SUCCESS";
export const FETCH_RESTAURANTS_FAILURE = "Restaurant/FETCH_RESTAURANTS_FAILURE";
export const fetchRestaurants = createAsyncAction(
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE
)<FetchListRequest, FetchRestaurantsResponse, any>();

export const FETCH_RESTAURANT_REQUEST = "Restaurant/FETCH_RESTAURANT_REQUEST";
export const FETCH_RESTAURANT_SUCCESS = "Restaurant/FETCH_RESTAURANT_SUCCESS";
export const FETCH_RESTAURANT_FAILURE = "Restaurant/FETCH_RESTAURANT_FAILURE";
export const fetchRestaurant = createAsyncAction(
  FETCH_RESTAURANT_REQUEST,
  FETCH_RESTAURANT_SUCCESS,
  FETCH_RESTAURANT_FAILURE
)<FetchRestaurantRequest, FetchRestaurantResponse, any>();
