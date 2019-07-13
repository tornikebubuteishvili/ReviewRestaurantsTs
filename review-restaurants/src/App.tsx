import React from "react";
import LoginScreen from "./components/auth/login/LoginScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignupScreen from "./components/auth/register/RegisterScreen";
import UserScreen from "./components/user/UserScreen";
import OwnerScreen from "./components/owner/OwnerScreen";
import AdminScreen from "./components/admin/AdminScreen";
import RestaurantDetailsScreen from "./components/restaurant/RestaurantDetailsScreen";
import { Provider } from "react-redux";
import store from "./redux/store/StoreConfig";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%"
          }}
        >
          <Route exact path="/" component={LoginScreen} />
          <Route path="/Signup" component={SignupScreen} />
          <Route path="/User" component={UserScreen} />
          <Route path="/Owner" component={OwnerScreen} />
          <Route path="/Admin" component={AdminScreen} />
          <Route path="/AdminRestaurants" component={RestaurantDetailsScreen} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
