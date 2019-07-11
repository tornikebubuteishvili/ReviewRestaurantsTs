import { Epic, combineEpics } from "redux-observable";
import { AppAction } from "../types/ActionTypes";
import { AppState } from "../types/StateTypes";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { from, of } from "rxjs";
import { AjaxError } from "rxjs/ajax";
import {
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  fetchRestaurants,
  fetchRestaurant
} from "../actions/RestaurantActions";
import {
  AddRestaurant,
  UpdateRestaurant,
  DeleteRestaurant,
  FetchRestaurants,
  FetchRestaurant
} from "../../api/RestaurantApi ";

export const addRestaurantEpic: Epic<
  AppAction,
  AppAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf(addRestaurant.request)),
    switchMap(action =>
      from(AddRestaurant(action.payload)).pipe(
        map(addRestaurant.success),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(addRestaurant.failure(e));
        })
      )
    )
  );

export const updateRestaurantEpic: Epic<
  AppAction,
  AppAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf(updateRestaurant.request)),
    switchMap(action =>
      from(UpdateRestaurant(action.payload)).pipe(
        map(_ => updateRestaurant.success(action.payload)), // might change to response
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(updateRestaurant.failure(e));
        })
      )
    )
  );

export const deleteRestaurantEpic: Epic<
  AppAction,
  AppAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf(deleteRestaurant.request)),
    switchMap(action =>
      from(DeleteRestaurant(action.payload)).pipe(
        map(_ => deleteRestaurant.success(action.payload)), // might change to response
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(deleteRestaurant.failure(e));
        })
      )
    )
  );

export const fetchRestaurantsEpic: Epic<
  AppAction,
  AppAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf(fetchRestaurants.request)),
    switchMap(action =>
      from(FetchRestaurants(action.payload)).pipe(
        map(fetchRestaurants.success),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(fetchRestaurants.failure(e));
        })
      )
    )
  );

export const fetchRestaurantEpic: Epic<
  AppAction,
  AppAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf(fetchRestaurant.request)),
    switchMap(action =>
      from(FetchRestaurant(action.payload)).pipe(
        map(fetchRestaurant.success),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(fetchRestaurant.failure(e));
        })
      )
    )
  );

export default combineEpics(
  addRestaurantEpic,
  updateRestaurantEpic,
  deleteRestaurantEpic,
  fetchRestaurantsEpic,
  fetchRestaurantEpic
);
