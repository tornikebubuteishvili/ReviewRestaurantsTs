import React from "react";
import LoginScreen from "./components/auth/login/LoginScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignupScreen from "./components/auth/register/RegisterScreen";
import UserScreen from "./components/user/UserScreen";
import OwnerScreen from "./components/owner/OwnerScreen";
import AdminScreen from "./components/admin/AdminScreen";
import RestaurantDetailsScreen from "./components/restaurant/RestaurantDetailsScreen";

const App: React.FC = () => {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%"
        }}
      >
        <Route exact path="/" component={LoginScreen} />
        <Route path="/signup" component={SignupScreen} />
        <Route path="/user" component={UserScreen} />
        <Route path="/owner" component={OwnerScreen} />
        <Route path="/admin" component={AdminScreen} />
        <Route path="/admin-restaurants" component={RestaurantDetailsScreen} />
      </div>
    </Router>
  );
};

export default App;
