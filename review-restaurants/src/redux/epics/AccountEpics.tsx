import { Epic, combineEpics } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { AppAction } from "../types/ActionTypes";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  refreshToken,
  deleteUser,
  fetchAccounts,
  fetchAccount
} from "../actions/AccountActions";
import { AppState } from "../types/StateTypes";
import { isActionOf } from "typesafe-actions";
import { from, of } from "rxjs";
import { AjaxError } from "rxjs/ajax";
import {
  LoginUser,
  RegisterUser,
  LogoutUser,
  UpdateUser,
  RefreshToken,
  DeleteUser,
  FetchAccounts,
  FetchAccount
} from "../../api/AccountApi";

export const loginUserEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(loginUser.request)),
    switchMap(action =>
      from(LoginUser(action.payload)).pipe(
        map(loginUser.success),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(loginUser.failure(e));
        })
      )
    )
  );

export const registerUserEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(registerUser.request)),
    switchMap(action =>
      from(RegisterUser(action.payload)).pipe(
        map(_ => registerUser.success(action.payload)),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(registerUser.failure(e));
        })
      )
    )
  );

export const updateUserEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(updateUser.request)),
    switchMap(action =>
      from(UpdateUser(action.payload)).pipe(
        map(_ => updateUser.success(action.payload)), // might change to response
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(updateUser.failure(e));
        })
      )
    )
  );

export const refreshTokenEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(refreshToken.request)),
    switchMap(action =>
      from(RefreshToken(action.payload)).pipe(
        map(refreshToken.success),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(refreshToken.failure(e));
        })
      )
    )
  );

export const logoutUserEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(logoutUser.request)),
    switchMap(action =>
      from(LogoutUser(action.payload)).pipe(
        map(logoutUser.success),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(logoutUser.failure(e));
        })
      )
    )
  );

export const deleteUserEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(deleteUser.request)),
    switchMap(action =>
      from(DeleteUser(action.payload)).pipe(
        map(_ => deleteUser.success(action.payload)), // might change to response
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(deleteUser.failure(e));
        })
      )
    )
  );

export const fetchAccountsEpic: Epic<
  AppAction,
  AppAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf(fetchAccounts.request)),
    switchMap(action =>
      from(FetchAccounts(action.payload)).pipe(
        map(fetchAccounts.success),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(fetchAccounts.failure(e));
        })
      )
    )
  );

export const fetchAccountEpic: Epic<AppAction, AppAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(fetchAccount.request)),
    switchMap(action =>
      from(FetchAccount(action.payload)).pipe(
        map(fetchAccount.success),
        catchError((e: AjaxError) => {
          console.log(JSON.stringify(e.xhr ? e.xhr.response : e));
          return of(fetchAccount.failure(e));
        })
      )
    )
  );

export default combineEpics(
  loginUserEpic,
  registerUserEpic,
  updateUserEpic,
  refreshTokenEpic,
  logoutUserEpic,
  deleteUserEpic,
  fetchAccountsEpic,
  fetchAccountEpic
);
