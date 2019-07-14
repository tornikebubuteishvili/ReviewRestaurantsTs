import { ajax, AjaxResponse } from "rxjs/ajax";
import { serverAddress } from "../const";
import { GetToken } from "../functions/StoreFunctions";
import {
  AddRestaurantRequest,
  UpdateRestaurantRequest,
  DeleteRestaurantRequest,
  FetchListRequest,
  FetchRestaurantRequest
} from "./types/Request";
import {
  FetchRestaurantsResponse,
  FetchRestaurantResponse,
  AddRestaurantResponse,
  UpdateRestaurantResponse,
  DeleteRestaurantResponse
} from "./types/Response";
import { map } from "rxjs/operators";

const address = serverAddress + "Restaurant";

export function AddRestaurant(request: AddRestaurantRequest) {
  return ajax
    .post(address + "/Createrestaurant", JSON.stringify(request), {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer " + GetToken()
    })
    .pipe(
      map(
        (response: AjaxResponse) => response.response as AddRestaurantResponse
      )
    );
}

export function UpdateRestaurant(request: UpdateRestaurantRequest) {
  return ajax
    .put(address + "/EditRestaurant", JSON.stringify(request), {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer " + GetToken()
    })
    .pipe(
      map(
        (response: AjaxResponse) =>
          response.response as UpdateRestaurantResponse
      )
    );
}

export function DeleteRestaurant(request: DeleteRestaurantRequest) {
  return ajax
    .delete(address + "/DeleteRestaurant?" + "uId=" + request.uId, {
      authorization: "Bearer " + GetToken()
    })
    .pipe(
      map(
        (response: AjaxResponse) =>
          response.response as DeleteRestaurantResponse
      )
    );
}

export function FetchRestaurants(request: FetchListRequest) {
  return ajax.getJSON<{ data: FetchRestaurantsResponse }>(
    address +
      "/RestaurantsList?" +
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

export function FetchRestaurant(request: FetchRestaurantRequest) {
  return ajax.getJSON<FetchRestaurantResponse>(
    address + "/RestaurantDetails?" + "uId=" + request.uId,
    { authorization: "Bearer " + GetToken() }
  );
}
