import { createAsyncAction, createAction } from "typesafe-actions";
import {
  AddReviewRequest,
  UpdateReviewRequest,
  DeleteReviewRequest,
  FetchListRequest,
  FetchReviewRequest
} from "../../api/types/Request";
import {
  AddReviewResponse,
  UpdateReviewResponse,
  DeleteReviewResponse,
  FetchReviewsResponse,
  FetchReviewResponse
} from "../../api/types/Response";

export const CLEAR_REVIEWS = "Comment/CLEAR_REVIEWS";
export const clearReviews = createAction(CLEAR_REVIEWS, resolve => {
  return () => resolve();
});

export const ADD_REVIEW_REQUEST = "Review/ADD_REVIEW_REQUEST";
export const ADD_REVIEW_SUCCESS = "Review/ADD_REVIEW_SUCCESS";
export const ADD_REVIEW_FAILURE = "Review/ADD_REVIEW_FAILURE";
export const addReview = createAsyncAction(
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE
)<AddReviewRequest, AddReviewResponse, any>();

export const UPDATE_REVIEW_REQUEST = "Review/UPDATE_REVIEW_REQUEST";
export const UPDATE_REVIEW_SUCCESS = "Review/UPDATE_REVIEW_SUCCESS";
export const UPDATE_REVIEW_FAILURE = "Review/UPDATE_REVIEW_FAILURE";
export const updateReview = createAsyncAction(
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAILURE
)<UpdateReviewRequest, UpdateReviewResponse, any>();

export const DELETE_REVIEW_REQUEST = "Review/DELETE_REVIEW_REQUEST";
export const DELETE_REVIEW_SUCCESS = "Review/DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_FAILURE = "Review/DELETE_REVIEW_FAILURE";
export const deleteReview = createAsyncAction(
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE
)<DeleteReviewRequest, DeleteReviewResponse, any>();

export const FETCH_REVIEWS_REQUEST = "Review/FETCH_REVIEWS_REQUEST";
export const FETCH_REVIEWS_SUCCESS = "Review/FETCH_REVIEWS_SUCCESS";
export const FETCH_REVIEWS_FAILURE = "Review/FETCH_REVIEWS_FAILURE";
export const fetchReviews = createAsyncAction(
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE
)<FetchListRequest, FetchReviewsResponse, any>();

export const FETCH_REVIEW_REQUEST = "Review/FETCH_REVIEW_REQUEST";
export const FETCH_REVIEW_SUCCESS = "Review/FETCH_REVIEW_SUCCESS";
export const FETCH_REVIEW_FAILURE = "Review/FETCH_REVIEW_FAILURE";
export const fetchReview = createAsyncAction(
  FETCH_REVIEW_REQUEST,
  FETCH_REVIEW_SUCCESS,
  FETCH_REVIEW_FAILURE
)<FetchReviewRequest, FetchReviewResponse, any>();