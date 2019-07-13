import { createSelector } from "reselect";
import { AppState } from "../types/StateTypes";

export const getAccountState = createSelector(
  (state: AppState) => state.account,
  value => value
);

export const getRequestState = createSelector(
  (state: AppState) => state.account.isLoggingIn,
  (state: AppState) => state.account.isLoggingOut,
  (state: AppState) => state.account.isRegistering,
  (isLoggingIn, isLoggingOut, isRegistering) => {
    return { isLoggingIn, isLoggingOut, isRegistering };
  }
);
