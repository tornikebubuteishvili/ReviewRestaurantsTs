import React, { useState, useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRestaurants,
  getRestaurantIds
} from "../../redux/selectors/OwnerSelectors";
import RestaurantLiteView from "../shared/RestaurantLiteView";
import Header from "../shared/Header";
import {
  fetchRestaurant,
  fetchRestaurants,
  updateRestaurant,
  deleteRestaurant,
  setError,
  clearError
} from "../../redux/actions/RestaurantActions";
import AddRestaurantDialog from "../shared/AddRestaurantDialog";
import {
  getAccountState,
  getRequestState
} from "../../redux/selectors/AccountSelectors";
import { Comparison, FilterLogic, Role } from "../../api/types/Enum";
import { Button, Toaster, Intent } from "@blueprintjs/core";
import SearchBar from "../shared/SearchBar";
import {
  getUsers,
  getUserIds,
  getError
} from "../../redux/selectors/AdminSelectors";
import EditUserDialog from "./EditUserDialog";
import {
  fetchAccounts,
  updateUser,
  deleteUser
} from "../../redux/actions/AccountActions";
import UserView from "./UserView";
import { GetIsLoggedIn } from "../../functions/StoreFunctions";

interface State {
  isEditUserDialogOpen: boolean;
  editingUserId: string;
  isAddRestaurantDialogOpen: boolean;
  editingRestaurantId: string;
  shouldFetchRestaurants: boolean;
  shouldFetchUsers: boolean;
}

export default function AdminScreen(props: RouteComponentProps) {
  const isLoggedIn = useSelector(GetIsLoggedIn);
  const accountRequestState = useSelector(getRequestState);
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
  const error = useSelector(getError);
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

  useEffect(() => {
    setTimeout(() => dispatch(clearError()), 3000);
  }, [error]);

  function onRestaurantClick(id: string) {
    dispatch(
      fetchRestaurant.request({
        uId: id
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
    username === ""
      ? dispatch(setError("Username can't be empty."))
      : password === ""
      ? dispatch(setError("Password can't be empty."))
      : dispatch(
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
    name === ""
      ? dispatch(setError("Restaurant name can't be empty."))
      : dispatch(
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

  if (!accountRequestState.isLoggingIn && !isLoggedIn)
    return <Redirect to="/" />;
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
