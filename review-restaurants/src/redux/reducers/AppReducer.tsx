import { combineReducers } from "redux";
import AccountReducer from "./AccountReducer";
import AdminReducer from "./AdminReducer";
import OwnerReducer from "./OwnerReducer";
import UserReducer from "./UserReducer";
import RestaurantDetailsReducer from "./RestaurantDetailsReducer";

const AppReducer = combineReducers({
  account: AccountReducer,
  admin: AdminReducer,
  owner: OwnerReducer,
  user: UserReducer,
  restaurantDetails: RestaurantDetailsReducer
});

export default AppReducer;
