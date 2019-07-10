import { ajax, AjaxResponse } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { serverAddress } from "../const";
import {
  RegisterRequest,
  LoginRequest,
  LogoutRequest,
  UpdateUserRequest,
  RefreshTokenRequest,
  DeleteUserRequest,
  FetchListRequest,
  FetchUserRequest
} from "./types/Request";
import {
  LoginResponse,
  FetchAccountsResponse,
  FetchUserResponse
} from "./types/Response";
import { GetToken } from "../functions/StoreFunctions";

const address = serverAddress + "Account";

export function RegisterUser(request: RegisterRequest) {
  return ajax.post(address + "/CreateAccount", JSON.stringify(request), {
    Accept: "application/json",
    "Content-Type": "application/json"
  });
}

export function LoginUser(request: LoginRequest) {
  return ajax
    .post(address + "/Authorize", JSON.stringify(request), {
      Accept: "application/json",
      "Content-Type": "application/json"
    })
    .pipe(map((response: AjaxResponse) => response.response as LoginResponse));
}

export function UpdateUser(request: UpdateUserRequest) {
  return ajax.put(address + "/EditAccount", JSON.stringify(request), {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "Bearer " + GetToken()
  });
}

export function RefreshToken(request: RefreshTokenRequest) {
  return ajax.put(address + "/RefreshToken", JSON.stringify(request), {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "Bearer " + GetToken()
  });
}

export function LogoutUser(request: LogoutRequest) {
  return ajax.put(address + "/LogOut", JSON.stringify(request), {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "Bearer " + GetToken()
  });
}

export function DeleteUser(request: DeleteUserRequest) {
  return ajax.delete(
    address +
      "/DeleteAccount?" +
      "uId=" +
      request.uId +
      {
        authorization: "Bearer " + GetToken()
      }
  );
}

export function FetchAccounts(request: FetchListRequest) {
  return ajax.getJSON<FetchAccountsResponse>(
    address +
      "/AccountsList?" +
      "pageSize=" +
      request.pageSize +
      "&page=" +
      request.page +
      "&filterModel.Json=" +
      JSON.stringify(request.filterModel) +
      "&sortModel.Json=" +
      JSON.stringify(request.sortModel),
    { authorization: "Bearer " + GetToken() }
  );
}

export function FetchAccount(request: FetchUserRequest) {
  return ajax.getJSON<FetchUserResponse>(
    address + "/AccountDetails?" + "uId=" + request.uId,
    { authorization: "Bearer " + GetToken() }
  );
}
