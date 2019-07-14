import { createAsyncAction, createAction } from "typesafe-actions";
import {
  AddReviewRequest,
  UpdateReviewRequest,
  DeleteReviewRequest,
  FetchListRequest,
  FetchReviewRequest,
  AddReviewAnswerRequest
} from "../../api/types/Request";
import {
  AddReviewResponse,
  UpdateReviewResponse,
  DeleteReviewResponse,
  FetchReviewsResponse,
  FetchReviewResponse,
  AddReviewAnswerResponse
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
)<AddReviewRequest, AddReviewRequest, any>();

export const ADD_REVIEW_ANSWER_REQUEST = "Review/ADD_REVIEW_ANSWER_REQUEST";
export const ADD_REVIEW_ANSWER_SUCCESS = "Review/ADD_REVIEW_ANSWER_SUCCESS";
export const ADD_REVIEW_ANSWER_FAILURE = "Review/ADD_REVIEW_ANSWER_FAILURE";
export const addReviewAnswer = createAsyncAction(
  ADD_REVIEW_ANSWER_REQUEST,
  ADD_REVIEW_ANSWER_SUCCESS,
  ADD_REVIEW_ANSWER_FAILURE
)<AddReviewAnswerRequest, AddReviewAnswerRequest, any>();

export const UPDATE_REVIEW_REQUEST = "Review/UPDATE_REVIEW_REQUEST";
export const UPDATE_REVIEW_SUCCESS = "Review/UPDATE_REVIEW_SUCCESS";
export const UPDATE_REVIEW_FAILURE = "Review/UPDATE_REVIEW_FAILURE";
export const updateReview = createAsyncAction(
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAILURE
)<UpdateReviewRequest, UpdateReviewRequest, any>();

export const DELETE_REVIEW_REQUEST = "Review/DELETE_REVIEW_REQUEST";
export const DELETE_REVIEW_SUCCESS = "Review/DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_FAILURE = "Review/DELETE_REVIEW_FAILURE";
export const deleteReview = createAsyncAction(
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE
)<DeleteReviewRequest, DeleteReviewRequest, any>();

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
