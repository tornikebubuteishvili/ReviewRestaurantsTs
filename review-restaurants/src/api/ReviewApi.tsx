import { ajax } from "rxjs/ajax";
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
import { FetchReviewResponse, FetchReviewsResponse } from "./types/Response";

const address = serverAddress + "Restaurant";

export function AddReview(request: AddReviewRequest) {
  return ajax.post(address + "/CreateReview", JSON.stringify(request), {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "Bearer " + GetToken()
  });
}

export function AddReviewAnswer(request: AddReviewAnswerRequest) {
  return ajax.put(address + "/AnswerReview", JSON.stringify(request), {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "Bearer " + GetToken()
  });
}

export function UpdateReview(request: UpdateReviewRequest) {
  return ajax.put(address + "/EditReview", JSON.stringify(request), {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "Bearer " + GetToken()
  });
}

export function DeleteReview(request: DeleteReviewRequest) {
  return ajax.delete(address + "/DeleteReview?" + "uId=" + request.uId, {
    authorization: "Bearer " + GetToken()
  });
}

export function FetchReviews(request: FetchListRequest) {
  return ajax.getJSON<FetchReviewsResponse>(
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
