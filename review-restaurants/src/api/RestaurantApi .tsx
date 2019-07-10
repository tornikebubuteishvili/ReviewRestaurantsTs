import { ajax } from "rxjs/ajax";
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
  FetchRestaurantResponse
} from "./types/Response";

const address = serverAddress + "Restaurant";

export function AddRestaurant(request: AddRestaurantRequest) {
  return ajax.post(address + "/Createrestaurant", JSON.stringify(request), {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "Bearer " + GetToken()
  });
}

export function UpdateRestaurant(request: UpdateRestaurantRequest) {
  return ajax.put(address + "/EditRestaurant", JSON.stringify(request), {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "Bearer " + GetToken()
  });
}

export function DeleteRestaurant(request: DeleteRestaurantRequest) {
  return ajax.delete(address + "/DeleteRestaurant?" + "uId=" + request.uId, {
    authorization: "Bearer " + GetToken()
  });
}

export function FetchRestaurants(request: FetchListRequest) {
  return ajax.getJSON<FetchRestaurantsResponse>(
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
