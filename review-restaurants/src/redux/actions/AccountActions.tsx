import { createAsyncAction, createAction } from "typesafe-actions";
import {
  LoginResponse,
  UpdateUserResponse,
  FetchAccountsResponse,
  FetchUserResponse,
  DeleteUserResponse,
  LogoutResponse,
  RefreshTokenResponse,
  RegisterResponse
} from "../../api/types/Response";
import {
  LoginRequest,
  RegisterRequest,
  LogoutRequest,
  UpdateUserRequest,
  RefreshTokenRequest,
  DeleteUserRequest,
  FetchListRequest,
  FetchUserRequest
} from "../../api/types/Request";

export const LOGIN_USER_REQUEST = "Account/LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "Account/LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "Account/LOGIN_USER_FAILURE";
export const loginUser = createAsyncAction(
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE
)<LoginRequest, LoginResponse, any>();

export const REGISTER_USER_REQUEST = "Account/REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "Account/REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "Account/REGISTER_USER_FAILURE";
export const registerUser = createAsyncAction(
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE
)<RegisterRequest, RegisterRequest, any>();

export const UPDATE_USER_REQUEST = "Account/UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "Account/UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "Account/UPDATE_USER_FAILURE";
export const updateUser = createAsyncAction(
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
)<UpdateUserRequest, UpdateUserRequest, any>();

export const REFRESH_TOKEN_REQUEST = "Account/REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "Account/REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILURE = "Account/REFRESH_TOKEN_FAILURE";
export const refreshToken = createAsyncAction(
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE
)<RefreshTokenRequest, RefreshTokenResponse, any>();

export const LOGOUT_USER_REQUEST = "Account/LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "Account/LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILURE = "Account/LOGOUT_USER_FAILURE";
export const logoutUser = createAsyncAction(
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE
)<LogoutRequest, LogoutResponse, any>();

export const DELETE_USER_REQUEST = "Account/DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "Account/DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "Account/DELETE_USER_FAILURE";
export const deleteUser = createAsyncAction(
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
)<DeleteUserRequest, DeleteUserRequest, any>();

export const FETCH_ACCOUNTS_REQUEST = "Account/FETCH_ACCOUNTS_REQUEST";
export const FETCH_ACCOUNTS_SUCCESS = "Account/FETCH_ACCOUNTS_SUCCESS";
export const FETCH_ACCOUNTS_FAILURE = "Account/FETCH_ACCOUNTS_FAILURE";
export const fetchAccounts = createAsyncAction(
  FETCH_ACCOUNTS_REQUEST,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILURE
)<FetchListRequest, FetchAccountsResponse, any>();

export const FETCH_ACCOUNT_REQUEST = "Account/FETCH_ACCOUNT_REQUEST";
export const FETCH_ACCOUNT_SUCCESS = "Account/FETCH_ACCOUNT_SUCCESS";
export const FETCH_ACCOUNT_FAILURE = "Account/FETCH_ACCOUNT_FAILURE";
export const fetchAccount = createAsyncAction(
  FETCH_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAILURE
)<FetchUserRequest, FetchUserResponse, any>();
