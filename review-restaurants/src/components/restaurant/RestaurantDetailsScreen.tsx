import React, { useState, CSSProperties, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRestaurant,
  getReviews,
  getReviewIds
} from "../../redux/selectors/RestaurantDetailsSelectors";
import Header from "../shared/Header";
import { Button } from "@blueprintjs/core";
import { getAccountState } from "../../redux/selectors/AccountSelectors";
import { Role, Comparison, FilterLogic } from "../../api/types/Enum";
import {
  fetchReviews,
  addReview,
  addReviewAnswer,
  updateReview,
  deleteReview
} from "../../redux/actions/ReviewActions";
import ReviewView from "./ReviewView";
import AddReviewDialog from "./AddReviewDialog";
import EditReviewDialog from "./EditReviewDialog";

interface State {
  isAddReviewDialogOpen: boolean;
  isEditReviewDialogOpen: boolean;
  editingReviewId: string;
  shouldFetchReviews: boolean;
}

export default function RestaurantDetailsScreen(props: RouteComponentProps) {
  const [state, setState] = useState<State>({
    isAddReviewDialogOpen: false,
    isEditReviewDialogOpen: false,
    editingReviewId: "",
    shouldFetchReviews: true
  });
  const accountState = useSelector(getAccountState);
  const restaurant = useSelector(getRestaurant);
  const reviews = useSelector(getReviews);
  const reviewIds = useSelector(getReviewIds);
  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurant.uId !== "" && state.shouldFetchReviews) {
      setState({ ...state, shouldFetchReviews: false });
      dispatch(
        fetchReviews.request({
          filterModel: {
            filterItems: [
              {
                comparison: Comparison.Equal,
                propertyName: "restaurantUId",
                value: restaurant.uId
              }
            ],
            filterLogic: FilterLogic.Or
          },
          page: 1,
          pageSize: 200,
          sortModel: { sortItems: [{ sortBy: "visitDate", desc: true }] }
        })
      );
    }
  });

  function onReplyClick(id: string, answer: string) {
    dispatch(
      addReviewAnswer.request({
        reviewUId: id,
        answer,
        ownerUId: "",
        restaurantUId: restaurant.uId
      })
    );
  }

  function onAddReviewClick(comment: string, rating: number, visitDate: Date) {
    dispatch(
      addReview.request({
        comment,
        star: rating,
        visitDate,
        restaurantUId: restaurant.uId
      })
    );
    setState({ ...state, isAddReviewDialogOpen: false });
  }

  function onEditReviewClick(id: string) {
    setState({ ...state, isEditReviewDialogOpen: true, editingReviewId: id });
  }
  function onEditReviewAcceptClick(
    comment: string,
    star: number,
    visitDate: Date,
    answer: string
  ) {
    dispatch(
      updateReview.request({
        uId: state.editingReviewId,
        star,
        comment,
        answer,
        visitDate
      })
    );
    setState({ ...state, isEditReviewDialogOpen: false, editingReviewId: "" });
  }

  function onDeleteReviewClick(id: string) {
    dispatch(deleteReview.request({ uId: id }));
  }

  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <Header
        title={restaurant.name}
        history={props.history}
        leftElement={
          accountState.role === Role.User ? (
            <Button
              onClick={() =>
                setState({ ...state, isAddReviewDialogOpen: true })
              }
            >
              Add review
            </Button>
          ) : (
            <div />
          )
        }
      />
      <AddReviewDialog
        isOpen={state.isAddReviewDialogOpen}
        onAddClick={onAddReviewClick}
        onClose={() => setState({ ...state, isAddReviewDialogOpen: false })}
      />
      <EditReviewDialog
        review={
          state.editingReviewId !== ""
            ? reviews[state.editingReviewId]
            : {
                answer: "",
                visitDate: new Date(),
                uId: "",
                comment: "",
                restaurantOwnerUId: "",
                restaurantUId: "",
                hasAnswer: false,
                restaurant: "",
                reviewer: "",
                star: 0
              }
        }
        isOpen={state.isEditReviewDialogOpen}
        onAcceptClick={onEditReviewAcceptClick}
        onClose={() =>
          setState({
            ...state,
            isEditReviewDialogOpen: false,
            editingReviewId: ""
          })
        }
      />
      <h2>{restaurant.name}</h2>
      <h3>Rating: {restaurant.average}</h3>
      <ul
        style={{
          width: "100%",
          justifyContent: "center",
          padding: 0,
          textAlign: "start"
        }}
      >
        {restaurant.highestRatedReviewUId !== "" &&
        restaurant.highestRatedReviewUId !== null &&
        restaurant.highestRatedReviewUId !== undefined &&
        reviews[restaurant.highestRatedReviewUId] !== undefined ? (
          <div>
            Highest rated review:
            <ReviewView
              review={reviews[restaurant.highestRatedReviewUId]}
              onReplyClick={onReplyClick}
              onEditClick={onEditReviewClick}
              onDeleteClick={onDeleteReviewClick}
            />
            Lowest rated review:
            <ReviewView
              review={reviews[restaurant.lowestRatedReviewUId]}
              onReplyClick={onReplyClick}
              onEditClick={onEditReviewClick}
              onDeleteClick={onDeleteReviewClick}
            />
          </div>
        ) : (
          <div>No reviews yet.</div>
        )}
        {reviewIds
          .filter(
            item =>
              item !== restaurant.highestRatedReviewUId &&
              item !== restaurant.lowestRatedReviewUId
          )
          .map(function(item) {
            return (
              <li key={item}>
                <ReviewView
                  review={reviews[item]}
                  onReplyClick={onReplyClick}
                  onEditClick={onEditReviewClick}
                  onDeleteClick={onDeleteReviewClick}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}

const styles = {};
