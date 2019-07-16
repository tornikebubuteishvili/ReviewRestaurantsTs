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
import { Comparison, FilterLogic } from "../../api/types/Enum";
import store from "../store/StoreConfig";
import { getRestaurant } from "../selectors/RestaurantDetailsSelectors";
import { fetchRestaurant } from "../actions/RestaurantActions";

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

export const fetchReviewsAfterAddReviewEpic: Epic<
  AppAction,
  AppAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf(addReview.success)),
    switchMap(action =>
      of(
        fetchReviews.request({
          filterModel: {
            filterItems: [
              {
                comparison: Comparison.Equal,
                propertyName: "restaurantUId",
                value: action.payload.restaurantUId
              }
            ],
            filterLogic: FilterLogic.Or
          },
          page: 1,
          pageSize: 200,
          sortModel: { sortItems: [{ sortBy: "visitDate", desc: true }] }
        })
      )
    )
  );

export const fetchRestaurantAfterAddReviewEpic: Epic<
  AppAction,
  AppAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf(addReview.success)),
    switchMap(action =>
      of(fetchRestaurant.request({ uId: action.payload.restaurantUId }))
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
        map(_ => addReviewAnswer.success(action.payload)),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(addReviewAnswer.failure(e));
        })
      )
    )
  );

export const fetchReviewsAfterAddReviewAnswerEpic: Epic<
  AppAction,
  AppAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf(addReviewAnswer.success)),
    switchMap(action =>
      of(
        fetchReviews.request({
          filterModel: {
            filterItems: [
              {
                comparison: Comparison.Equal,
                propertyName:
                  action.payload.ownerUId !== ""
                    ? "restaurantOwnerUId"
                    : "restaurantUId",
                value:
                  action.payload.ownerUId !== ""
                    ? action.payload.ownerUId
                    : action.payload.restaurantUId
              },
              ...(action.payload.ownerUId !== ""
                ? [
                    {
                      comparison: Comparison.Equal,
                      propertyName: "hasAnswer",
                      value: false
                    }
                  ]
                : [])
            ],
            filterLogic: FilterLogic.And
          },
          page: 1,
          pageSize: 200,
          sortModel: { sortItems: [{ sortBy: "visitDate", desc: true }] }
        })
      )
    )
  );

export const fetchRestaurantAfterAddReviewAnswerEpic: Epic<
  AppAction,
  AppAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf(addReviewAnswer.success)),
    switchMap(action =>
      of(fetchRestaurant.request({ uId: action.payload.restaurantUId }))
    )
  );

export const updateReviewEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(updateReview.request)),
    switchMap(action =>
      from(UpdateReview(action.payload)).pipe(
        map(_ => updateReview.success(action.payload)),
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
        map(_ => deleteReview.success(action.payload)),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(deleteReview.failure(e));
        })
      )
    )
  );

export const fetchRestaurantAfterUpdateOrDeleteReviewEpic: Epic<
  AppAction,
  AppAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf([updateReview.success, deleteReview.success])),
    switchMap(action =>
      of(fetchRestaurant.request({ uId: getRestaurant(store.getState()).uId }))
    )
  );

export const fetchReviewsAfterUpdateOrDeleteReviewEpic: Epic<
  AppAction,
  AppAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf([updateReview.success, deleteReview.success])),
    switchMap(action =>
      of(
        fetchReviews.request({
          filterModel: {
            filterItems: [
              {
                comparison: Comparison.Equal,
                propertyName: "restaurantUId",
                value: getRestaurant(store.getState()).uId
              }
            ],
            filterLogic: FilterLogic.Or
          },
          page: 1,
          pageSize: 200,
          sortModel: { sortItems: [{ sortBy: "visitDate", desc: true }] }
        })
      )
    )
  );

export const fetchReviewsEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(fetchReviews.request)),
    switchMap(action =>
      from(FetchReviews(action.payload)).pipe(
        map(response => fetchReviews.success(response.data)),
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
  fetchReviewsAfterAddReviewEpic,
  fetchRestaurantAfterAddReviewEpic,
  addReviewAnswerEpic,
  fetchReviewsAfterAddReviewAnswerEpic,
  fetchRestaurantAfterAddReviewAnswerEpic,
  updateReviewEpic,
  deleteReviewEpic,
  fetchReviewsAfterUpdateOrDeleteReviewEpic,
  fetchRestaurantAfterUpdateOrDeleteReviewEpic,
  fetchReviewsEpic,
  fetchReviewEpic
);
