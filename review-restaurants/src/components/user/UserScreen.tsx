import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRestaurants,
  getRestaurantIds
} from "../../redux/selectors/OwnerSelectors";
import RestaurantLiteView from "../shared/RestaurantLiteView";
import Header from "../shared/Header";
import {
  fetchRestaurant,
  fetchRestaurants
} from "../../redux/actions/RestaurantActions";
import { getAccountState } from "../../redux/selectors/AccountSelectors";
import { FilterLogic, Comparison } from "../../api/types/Enum";
import SearchBar from "../shared/SearchBar";
import { getError } from "../../redux/selectors/UserSelectors";
import { Toaster, Intent, Button } from "@blueprintjs/core";

interface State {
  isAddReviewDialogOpen: boolean;
  shouldFetchRestaurants: boolean;
  reviewingId: string;
}

export default function UserScreen(props: RouteComponentProps) {
  const [state, setState] = useState<State>({
    isAddReviewDialogOpen: false,
    shouldFetchRestaurants: true,
    reviewingId: ""
  });
  const restaurants = useSelector(getRestaurants);
  const restaurantIds = useSelector(getRestaurantIds);
  const accountState = useSelector(getAccountState);
  const dispatch = useDispatch();
  const error = useSelector(getError);

  useEffect(() => {
    if (accountState.id !== "" && state.shouldFetchRestaurants) {
      setState({ ...state, shouldFetchRestaurants: false });
      dispatch(
        fetchRestaurants.request({
          filterModel: {
            filterItems: [],
            filterLogic: FilterLogic.Or
          },
          page: 1,
          pageSize: 200,
          sortModel: { sortItems: [{ sortBy: "average", desc: true }] }
        })
      );
    }
  });

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

  function onRestaurantClick(id: string) {
    dispatch(
      fetchRestaurant.request({
        uId: id
      })
    );
    props.history.push("/RestaurantDetails");
  }

  return (
    <div style={{ flex: 1 }}>
      <Header
        title={accountState.username}
        history={props.history}
        leftElement={<div />}
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

      <ul style={{ width: "100%", justifyContent: "center", padding: 0 }}>
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
    </div>
  );
}

const styles = {};
