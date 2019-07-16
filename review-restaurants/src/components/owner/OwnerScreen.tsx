import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRestaurants,
  getRestaurantIds,
  getPendingReviews,
  getPendingReviewIds,
  getError
} from "../../redux/selectors/OwnerSelectors";
import RestaurantLiteView from "../shared/RestaurantLiteView";
import Header from "../shared/Header";
import {
  fetchRestaurant,
  addRestaurant,
  fetchRestaurants,
  setError
} from "../../redux/actions/RestaurantActions";
import AddRestaurantDialog from "../shared/AddRestaurantDialog";
import {
  getAccountState,
  getRequestState
} from "../../redux/selectors/AccountSelectors";
import { Comparison, FilterLogic } from "../../api/types/Enum";
import { Button, Toaster, Intent } from "@blueprintjs/core";
import SearchBar from "../shared/SearchBar";
import ReviewView from "../restaurant/ReviewView";
import {
  fetchReviews,
  addReviewAnswer
} from "../../redux/actions/ReviewActions";
import { GetIsLoggedIn } from "../../functions/StoreFunctions";

interface State {
  isAddRestaurantDialogOpen: boolean;
  shouldFetchRestaurants: boolean;
  shouldFetchPendingReviews: boolean;
}

export default function OwnerScreen(props: RouteComponentProps) {
  const isLoggedIn = useSelector(GetIsLoggedIn);
  const accountRequestState = useSelector(getRequestState);
  const [state, setState] = useState<State>({
    isAddRestaurantDialogOpen: false,
    shouldFetchRestaurants: true,
    shouldFetchPendingReviews: true
  });
  const restaurants = useSelector(getRestaurants);
  const restaurantIds = useSelector(getRestaurantIds);
  const pendingReviews = useSelector(getPendingReviews);
  const pendingReviewIds = useSelector(getPendingReviewIds);
  const accountState = useSelector(getAccountState);
  const dispatch = useDispatch();
  const error = useSelector(getError);

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
        uId: id
      })
    );
    props.history.push("/RestaurantDetails");
  }

  function onAddRestaurantClick(name: string) {
    name === ""
      ? dispatch(setError("Cann't create reastaurant without name"))
      : dispatch(addRestaurant.request({ name, ownerUId: accountState.id }));
    setState({ ...state, isAddRestaurantDialogOpen: false });
  }

  function onReplyClick(id: string, restaurantId: string, answer: string) {
    answer === ""
      ? dispatch(setError("Answer can not be empty"))
      : dispatch(
          addReviewAnswer.request({
            reviewUId: id,
            answer,
            ownerUId: accountState.id,
            restaurantUId: restaurantId
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

  if (!accountRequestState.isLoggingIn && !isLoggedIn)
    return <Redirect to="/" />;
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
      {error !== "" ? (
        <div style={{ position: "absolute" }}>
          <Toaster canEscapeKeyClear>
            <Button intent={Intent.DANGER}>{error}</Button>
          </Toaster>
        </div>
      ) : (
        <div />
      )}
      <AddRestaurantDialog
        title={"Add a restaurant"}
        inputValue={""}
        isOpen={state.isAddRestaurantDialogOpen}
        onAcceptClick={onAddRestaurantClick}
        onClose={() => setState({ ...state, isAddRestaurantDialogOpen: false })}
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
                onEditClick={() => {}}
                onDeleteClick={() => {}}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const styles = {};
