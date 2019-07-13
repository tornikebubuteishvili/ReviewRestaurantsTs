import { Epic, combineEpics } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { AppAction } from "../types/ActionTypes";
import { AppState } from "../types/StateTypes";
import { isActionOf } from "typesafe-actions";
import { from, of } from "rxjs";
import { AjaxError } from "rxjs/ajax";
import {
  addReview,
  updateReview,
  deleteReview,
  fetchReviews,
  fetchReview,
  addReviewAnswer
} from "../actions/ReviewActions";
import {
  AddReview,
  UpdateReview,
  DeleteReview,
  FetchReviews,
  FetchReview,
  AddReviewAnswer
} from "../../api/ReviewApi";

export const addReviewEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(addReview.request)),
    switchMap(action =>
      from(AddReview(action.payload)).pipe(
        map(_ => addReview.success(action.payload)), // might change to response
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(addReview.failure(e));
        })
      )
    )
  );

export const addReviewAnswerEpic: Epic<
  AppAction,
  AppAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf(addReviewAnswer.request)),
    switchMap(action =>
      from(AddReviewAnswer(action.payload)).pipe(
        map(addReviewAnswer.success),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(addReviewAnswer.failure(e));
        })
      )
    )
  );

export const updateReviewEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(updateReview.request)),
    switchMap(action =>
      from(UpdateReview(action.payload)).pipe(
        map(updateReview.success),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(updateReview.failure(e));
        })
      )
    )
  );

export const deleteReviewEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(deleteReview.request)),
    switchMap(action =>
      from(DeleteReview(action.payload)).pipe(
        map(deleteReview.success),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(deleteReview.failure(e));
        })
      )
    )
  );

export const fetchReviewsEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(fetchReviews.request)),
    switchMap(action =>
      from(FetchReviews(action.payload)).pipe(
        map(fetchReviews.success),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(fetchReviews.failure(e));
        })
      )
    )
  );

export const fetchReviewEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(fetchReview.request)),
    switchMap(action =>
      from(FetchReview(action.payload)).pipe(
        map(fetchReview.success),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(fetchReview.failure(e));
        })
      )
    )
  );

export default combineEpics(
  addReviewEpic,
  addReviewAnswerEpic,
  updateReviewEpic,
  deleteReviewEpic,
  fetchReviewsEpic,
  fetchReviewEpic
);
