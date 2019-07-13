import { AccountState } from "../types/StateTypes";
import { AccountAction } from "../types/ActionTypes";
import * as AccountActions from "../actions/AccountActions";
import { getType } from "typesafe-actions";
import { Role } from "../../api/types/Enum";

export default function AccountReducer(
  state: AccountState = {
    id: "",
    username: "",
    token: "",
    role: Role.User,
    isLoggedIn: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isRegistering: false
  },
  action: AccountAction
): AccountState {
  switch (action.type) {
    case getType(AccountActions.loginUser.request):
      return { ...state, isLoggingIn: true };
    case getType(AccountActions.loginUser.success):
      return {
        ...state,
        id: action.payload.uId,
        username: action.payload.username,
        token: action.payload.token,
        isLoggedIn: true,
        isLoggingIn: false
      };
    case getType(AccountActions.loginUser.failure):
      return { ...state, isLoggingIn: false };
    case getType(AccountActions.registerUser.request):
      return { ...state, isRegistering: true };
    case getType(AccountActions.registerUser.success):
      return { ...state, isRegistering: false };
    case getType(AccountActions.registerUser.failure):
      return { ...state, isRegistering: false };
    case getType(AccountActions.logoutUser.request):
      return { ...state, isLoggingOut: true };
    case getType(AccountActions.logoutUser.success):
      return {
        ...state,
        id: "",
        username: "",
        token: "",
        role: Role.User,
        isLoggedIn: false,
        isLoggingOut: false
      };
    case getType(AccountActions.logoutUser.failure):
      return { ...state, isLoggingOut: false };
    case getType(AccountActions.refreshToken.success):
      return {
        ...state,
        token: action.payload.token,
        isLoggedIn: true
      };
    default:
      return state;
  }
}
