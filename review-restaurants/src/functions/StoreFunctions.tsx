import { createSelector } from "reselect";
import store from "../redux/store/StoreConfig";
import { AppState } from "../redux/types/StateTypes";

const getToken = createSelector(
  [(state: AppState) => state.account.token],
  token => token
);
export function GetToken() {
  return getToken(store.getState());
}

const getIsLoggedIn = createSelector(
  [(state: AppState) => state.account.isLoggedIn],
  isLoggedIn => isLoggedIn
);
export function GetIsLoggedIn() {
  return getIsLoggedIn(store.getState());
}
