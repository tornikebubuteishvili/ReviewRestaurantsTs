import { ajax, AjaxResponse } from "rxjs/ajax";
import { serverAddress } from "../const";
import { GetToken } from "../functions/StoreFunctions";
import {
  FetchListRequest,
  AddReviewRequest,
  UpdateReviewRequest,
  DeleteReviewRequest,
  FetchReviewRequest,
  AddReviewAnswerRequest
} from "./types/Request";
import {
  FetchReviewResponse,
  FetchReviewsResponse,
  AddReviewResponse,
  AddReviewAnswerResponse,
  UpdateReviewResponse,
  DeleteReviewResponse
} from "./types/Response";
import { map } from "rxjs/operators";

const address = serverAddress + "Review";

export function AddReview(request: AddReviewRequest) {
  return ajax
    .post(address + "/CreateReview", JSON.stringify(request), {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer " + GetToken()
    })
    .pipe(
      map((response: AjaxResponse) => response.response as AddReviewResponse)
    );
}

export function AddReviewAnswer(request: AddReviewAnswerRequest) {
  const { ownerUId, restaurantUId, ...req } = request;
  return ajax
    .put(address + "/AnswerReview", JSON.stringify(req), {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer " + GetToken()
    })
    .pipe(
      map(
        (response: AjaxResponse) => response.response as AddReviewAnswerResponse
      )
    );
}

export function UpdateReview(request: UpdateReviewRequest) {
  return ajax
    .put(address + "/EditReview", JSON.stringify(request), {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer " + GetToken()
    })
    .pipe(
      map((response: AjaxResponse) => response.response as UpdateReviewResponse)
    );
}

export function DeleteReview(request: DeleteReviewRequest) {
  return ajax
    .delete(address + "/DeleteReview?" + "uId=" + request.uId, {
      authorization: "Bearer " + GetToken()
    })
    .pipe(
      map((response: AjaxResponse) => response.response as DeleteReviewResponse)
    );
}

export function FetchReviews(request: FetchListRequest) {
  return ajax.getJSON<{ data: FetchReviewsResponse }>(
    address +
      "/ReviewsList?" +
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

export function FetchReview(request: FetchReviewRequest) {
  return ajax.getJSON<FetchReviewResponse>(
    address + "/ReviewDetails?" + "uId=" + request.uId,
    { authorization: "Bearer " + GetToken() }
  );
}
