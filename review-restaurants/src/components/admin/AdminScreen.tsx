import React, { useState, CSSProperties, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRestaurants,
  getRestaurantIds,
  getPendingReviews,
  getPendingReviewIds
} from "../../redux/selectors/OwnerSelectors";
import RestaurantLiteView from "../shared/RestaurantLiteView";
import Header from "../shared/Header";
import {
  fetchRestaurant,
  addRestaurant,
  fetchRestaurants,
  updateRestaurant,
  deleteRestaurant
} from "../../redux/actions/RestaurantActions";
import AddRestaurantDialog from "../shared/AddRestaurantDialog";
import { getAccountState } from "../../redux/selectors/AccountSelectors";
import { Comparison, FilterLogic, Role } from "../../api/types/Enum";
import { Button } from "@blueprintjs/core";
import SearchBar from "../shared/SearchBar";
import ReviewView from "../restaurant/ReviewView";
import {
  fetchReviews,
  addReviewAnswer
} from "../../redux/actions/ReviewActions";
import { getUsers, getUserIds } from "../../redux/selectors/AdminSelectors";
import EditUserDialog from "./EditUserDialog";
import {
  fetchAccounts,
  updateUser,
  deleteUser
} from "../../redux/actions/AccountActions";
import UserView from "./UserView";

interface State {
  isEditUserDialogOpen: boolean;
  editingUserId: string;
  isAddRestaurantDialogOpen: boolean;
  editingRestaurantId: string;
  shouldFetchRestaurants: boolean;
  shouldFetchUsers: boolean;
}

export default function AdminScreen(props: RouteComponentProps) {
  const [state, setState] = useState<State>({
    isEditUserDialogOpen: false,
    editingUserId: "",
    isAddRestaurantDialogOpen: false,
    editingRestaurantId: "",
    shouldFetchRestaurants: true,
    shouldFetchUsers: true
  });
  const restaurants = useSelector(getRestaurants);
  const restaurantIds = useSelector(getRestaurantIds);
  const users = useSelector(getUsers);
  const userIds = useSelector(getUserIds);
  const accountState = useSelector(getAccountState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accountState.id !== "") {
      if (state.shouldFetchRestaurants) {
        setState({ ...state, shouldFetchRestaurants: false });
        dispatch(
          fetchRestaurants.request({
            filterModel: {
              filterItems: [],
              filterLogic: FilterLogic.And
            },
            page: 1,
            pageSize: 200,
            sortModel: { sortItems: [{ sortBy: "average", desc: true }] }
          })
        );
      }
      if (state.shouldFetchUsers) {
        setState({ ...state, shouldFetchUsers: false });
        dispatch(
          fetchAccounts.request({
            filterModel: {
              filterItems: [],
              filterLogic: FilterLogic.And
            },
            page: 1,
            pageSize: 200,
            sortModel: { sortItems: [{ sortBy: "username", desc: false }] }
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

  function onUserEditClick(id: string) {
    setState({ ...state, editingUserId: id, isEditUserDialogOpen: true });
  }

  function onUserEditAcceptClick(username: string, password: string) {
    dispatch(
      updateUser.request({ uId: state.editingUserId, username, password })
    );
    setState({ ...state, isEditUserDialogOpen: false, editingUserId: "" });
  }

  function onUserDeleteClick(id: string) {
    dispatch(deleteUser.request({ uId: id }));
  }

  function onRestaurantEditClick(id: string) {
    setState({
      ...state,
      editingRestaurantId: id,
      isAddRestaurantDialogOpen: true
    });
  }

  function onRestaurantEditAcceptClick(name: string) {
    dispatch(
      updateRestaurant.request({ uId: state.editingRestaurantId, name })
    );
    setState({
      ...state,
      isAddRestaurantDialogOpen: false,
      editingRestaurantId: ""
    });
  }

  function onRestaurantDeleteClick(id: string) {
    dispatch(deleteRestaurant.request({ uId: id }));
  }

  return (
    <div style={{ flex: 1 }}>
      <Header
        title={accountState.username}
        history={props.history}
        leftElement={<div />}
      />
      <SearchBar onFilterClick={onFilterClick} />
      <AddRestaurantDialog
        title={"Edit restaurant"}
        inputValue={
          state.editingRestaurantId !== ""
            ? restaurants[state.editingRestaurantId].name
            : ""
        }
        isOpen={state.isAddRestaurantDialogOpen}
        onAcceptClick={onRestaurantEditAcceptClick}
        onClose={() =>
          setState({
            ...state,
            isAddRestaurantDialogOpen: false,
            editingRestaurantId: ""
          })
        }
      />
      <EditUserDialog
        user={
          state.editingUserId !== ""
            ? users[state.editingUserId]
            : { password: "", username: "", role: Role.User, uId: "" }
        }
        isOpen={state.isEditUserDialogOpen}
        onAcceptClick={onUserEditAcceptClick}
        onClose={() =>
          setState({ ...state, isEditUserDialogOpen: false, editingUserId: "" })
        }
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
                rightElement={
                  <div>
                    <Button
                      onClick={(
                        e: React.MouseEvent<HTMLElement, MouseEvent>
                      ) => {
                        e.stopPropagation();
                        onRestaurantEditClick(item);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={(
                        e: React.MouseEvent<HTMLElement, MouseEvent>
                      ) => {
                        e.stopPropagation();
                        onRestaurantDeleteClick(item);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                }
              />
            );
          })}
        </ul>
        <ul style={{ width: "100%", justifyContent: "center", padding: 0 }}>
          <h2 style={{ marginLeft: 55 }}>Accounts</h2>
          {userIds.map(function(item) {
            return (
              <UserView
                key={item}
                user={users[item]}
                onEditClick={onUserEditClick}
                onDeleteClick={onUserDeleteClick}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const styles = {};
