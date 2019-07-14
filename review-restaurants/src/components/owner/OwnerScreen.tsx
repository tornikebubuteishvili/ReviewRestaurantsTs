import React, { useState, CSSProperties, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRestaurants,
  getRestaurantIds,
  getPendingReviews,
  getPendingReviewIds
} from "../../redux/selectors/OwnerSelectors";
import { RestaurantLite } from "../../api/types/Model";
import RestaurantLiteView from "../shared/RestaurantLiteView";
import Header from "../shared/Header";
import {
  fetchRestaurant,
  addRestaurant,
  fetchRestaurants
} from "../../redux/actions/RestaurantActions";
import AddRestaurantDialog from "../shared/AddRestaurantDialog";
import { getAccountState } from "../../redux/selectors/AccountSelectors";
import { Comparison, FilterLogic } from "../../api/types/Enum";
import { Button } from "@blueprintjs/core";
import SearchBar from "../shared/SearchBar";
import ReviewView from "../restaurant/ReviewView";
import {
  fetchReviews,
  addReviewAnswer
} from "../../redux/actions/ReviewActions";

interface State {
  isAddRestaurantDialogOpen: boolean;
  isReplyDialogOpen: boolean;
  shouldFetchRestaurants: boolean;
  shouldFetchPendingReviews: boolean;
}

export default function OwnerScreen(props: RouteComponentProps) {
  const [state, setState] = useState<State>({
    isAddRestaurantDialogOpen: false,
    isReplyDialogOpen: false,
    shouldFetchRestaurants: true,
    shouldFetchPendingReviews: true
  });
  const restaurants = useSelector(getRestaurants);
  const restaurantIds = useSelector(getRestaurantIds);
  const pendingReviews = useSelector(getPendingReviews);
  const pendingReviewIds = useSelector(getPendingReviewIds);
  const accountState = useSelector(getAccountState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accountState.id !== "") {
      if (state.shouldFetchRestaurants) {
        setState({ ...state, shouldFetchRestaurants: false });
        dispatch(
          fetchRestaurants.request({
            filterModel: {
              filterItems: [
                {
                  comparison: Comparison.Equal,
                  propertyName: "restaurantOwnerUId",
                  value: accountState.id
                }
              ],
              filterLogic: FilterLogic.And
            },
            page: 1,
            pageSize: 200,
            sortModel: { sortItems: [{ sortBy: "average", desc: true }] }
          })
        );
      }
      if (state.shouldFetchPendingReviews) {
        console.log("should");
        setState({ ...state, shouldFetchPendingReviews: false });
        dispatch(
          fetchReviews.request({
            filterModel: {
              filterItems: [
                {
                  comparison: Comparison.Equal,
                  propertyName: "restaurantOwnerUId",
                  value: accountState.id
                },
                {
                  comparison: Comparison.Equal,
                  propertyName: "hasAnswer",
                  value: false
                }
              ],
              filterLogic: FilterLogic.And
            },
            page: 1,
            pageSize: 200,
            sortModel: { sortItems: [{ sortBy: "visitDate", desc: false }] }
          })
        );
      }
    }
  });

  function onRestaurantClick(id: string) {
    dispatch(
      fetchRestaurant.request({
        uId: id,
        name: restaurants[id].name,
        average: restaurants[id].average
      })
    );
    props.history.push("/RestaurantDetails");
  }

  function onAddRestaurantClick(name: string) {
    dispatch(addRestaurant.request({ name, ownerUId: accountState.id }));
    setState({ ...state, isAddRestaurantDialogOpen: false });
  }

  function onReplyClick(id: string, answer: string) {
    dispatch(
      addReviewAnswer.request({
        reviewUId: id,
        answer,
        ownerUId: accountState.id,
        restaurantUId: ""
      })
    );
  }

  function onFilterClick(lowerRating: number, higherRating: number) {
    dispatch(
      fetchRestaurants.request({
        filterModel: {
          filterItems: [
            {
              comparison: Comparison.GreaterThanOrEqual,
              propertyName: "average",
              value: lowerRating
            },
            {
              comparison: Comparison.LessThanOrEqual,
              propertyName: "average",
              value: higherRating
            },
            {
              comparison: Comparison.Equal,
              propertyName: "restaurantOwnerUId",
              value: accountState.id
            }
          ],
          filterLogic: FilterLogic.And
        },
        page: 1,
        pageSize: 200,
        sortModel: { sortItems: [{ sortBy: "average", desc: true }] }
      })
    );
  }

  return (
    <div style={{ flex: 1 }}>
      <Header
        title={accountState.username}
        history={props.history}
        leftElement={
          <Button
            onClick={() =>
              setState({
                ...state,
                isAddRestaurantDialogOpen: !state.isAddRestaurantDialogOpen
              })
            }
          >
            Add restaurant
          </Button>
        }
      />
      <SearchBar onFilterClick={onFilterClick} />
      <AddRestaurantDialog
        isOpen={state.isAddRestaurantDialogOpen}
        onClick={onAddRestaurantClick}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ul style={{ width: "100%", justifyContent: "center", padding: 0 }}>
          <h2 style={{ marginLeft: 55 }}>Restaurants</h2>
          {restaurantIds.map(function(item) {
            return (
              <RestaurantLiteView
                key={item}
                restaurant={restaurants[item]}
                onClick={onRestaurantClick}
                rightElement={<div />}
              />
            );
          })}
        </ul>
        <ul style={{ width: "100%", justifyContent: "center", padding: 0 }}>
          <h2 style={{ marginLeft: 55 }}>Pending Reviews</h2>
          {pendingReviewIds.map(function(item) {
            return (
              <ReviewView
                key={item}
                review={pendingReviews[item]}
                onReplyClick={onReplyClick}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const styles = {};
