import React, { useState, CSSProperties, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRestaurants,
  getRestaurantIds
} from "../../redux/selectors/OwnerSelectors";
import { RestaurantLite } from "../../api/types/Model";
import RestaurantLiteView from "../shared/RestaurantLiteView";
import Header from "../shared/Header";
import {
  fetchRestaurant,
  addRestaurant,
  fetchRestaurants
} from "../../redux/actions/RestaurantActions";
import AddRestaurantDialog from "./AddRestaurantDialog";
import { getAccountState } from "../../redux/selectors/AccountSelectors";
import { Comparison, FilterLogic } from "../../api/types/Enum";

interface State {
  isDialogOpen: boolean;
}

export default function OwnerScreen(props: RouteComponentProps) {
  const [state, setState] = useState<State>({ isDialogOpen: false });
  const restaurants = useSelector(getRestaurants);
  const restaurantIds = useSelector(getRestaurantIds);
  const accountState = useSelector(getAccountState);
  const dispatch = useDispatch();

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
        filterLogic: FilterLogic.Or
      },
      page: 1,
      pageSize: 200,
      sortModel: { sortItems: [{ sortBy: "average", desc: true }] }
    })
  );

  function onRestaurantClick(id: string) {
    dispatch(
      fetchRestaurant.request({
        uId: id,
        name: "restaurants[id].name",
        average: 0
      })
    );
    props.history.push("/RestaurantDetails");
  }

  function onAddRestaurantClick(name: string) {
    dispatch(addRestaurant.request({ name, ownerUId: accountState.id }));
    setState({ ...state, isDialogOpen: false });
  }

  return (
    <div style={{ flex: 1 }}>
      <Header
        logout={() => {}}
        addRestaurant={() => setState({ isDialogOpen: !state.isDialogOpen })}
      />
      <AddRestaurantDialog
        isOpen={state.isDialogOpen}
        onClick={onAddRestaurantClick}
      />
      <ul style={{ width: "100%", justifyContent: "center", padding: 0 }}>
        {restaurantIds.map(function(item) {
          return (
            <RestaurantLiteView
              key={item}
              restaurant={restaurants[item]}
              onClick={onRestaurantClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

const styles = {};
