import { ajax, AjaxResponse } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { serverAddress } from "../const";
import { History } from "history";
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
  FetchUserResponse,
  RegisterResponse,
  UpdateUserResponse,
  RefreshTokenResponse,
  LogoutResponse,
  DeleteUserResponse
} from "./types/Response";
import { GetToken } from "../functions/StoreFunctions";

const address = serverAddress + "Account";

export function RegisterUser(request: RegisterRequest) {
  const { history, ...req } = request;
  return ajax
    .post(address + "/CreateAccount", JSON.stringify(req), {
      Accept: "application/json",
      "Content-Type": "application/json"
    })
    .pipe(
      map((response: AjaxResponse) => {
        return response.response.data as RegisterResponse;
      })
    );
}

export function LoginUser(request: LoginRequest) {
  const { history, ...req } = request;
  return ajax
    .post(address + "/Login", JSON.stringify(req), {
      Accept: "application/json",
      "Content-Type": "application/json"
    })
    .pipe(
      map((response: AjaxResponse) => {
        return {
          ...response.response.data.metadata,
          history: request.history
        } as LoginResponse;
      })
    );
}

export function UpdateUser(request: UpdateUserRequest) {
  return ajax
    .put(address + "/EditAccount", JSON.stringify(request), {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: GetToken()
    })
    .pipe(
      map(
        (response: AjaxResponse) =>
          response.response.data.metadata as UpdateUserResponse
      )
    );
}

export function RefreshToken(request: RefreshTokenRequest) {
  return ajax
    .put(address + "/RefreshToken", JSON.stringify(request), {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: GetToken()
    })
    .pipe(
      map(
        (response: AjaxResponse) =>
          response.response.data.metadata as RefreshTokenResponse
      )
    );
}

export function LogoutUser(request: LogoutRequest) {
  return ajax
    .put(address + "/LogOut", JSON.stringify(request), {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: GetToken()
    })
    .pipe(
      map(
        (response: AjaxResponse) =>
          response.response.data.metadata as LogoutResponse
      )
    );
}

export function DeleteUser(request: DeleteUserRequest) {
  return ajax
    .delete(
      address +
        "/DeleteAccount?" +
        "uId=" +
        request.uId +
        {
          authorization: GetToken()
        }
    )
    .pipe(
      map(
        (response: AjaxResponse) =>
          response.response.data.metadata as DeleteUserResponse
      )
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
    { authorization: GetToken() }
  );
}

export function FetchAccount(request: FetchUserRequest) {
  return ajax.getJSON<FetchUserResponse>(
    address + "/AccountDetails?" + "uId=" + request.uId,
    { authorization: GetToken() }
  );
}
