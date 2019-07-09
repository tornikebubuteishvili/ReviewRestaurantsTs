import React from "react";
import LoginScreen from "./auth/login/LoginScreen";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignupScreen from "./auth/signup/SignupScreen";
import UserFeedScreen from "./user/UserFeedScreen";
import OwnerFeedScreen from "./owner/OwnerFeedScreen";
import AdminRestaurantsScreen from "./admin/AdminRestaurantsScreen";
import AdminUsersScreen from "./admin/AdminUsersScreen";

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
        <Route path="/userfeed" component={UserFeedScreen} />
        <Route path="/ownerfeed" component={OwnerFeedScreen} />
        <Route path="/adminrestaurants" component={AdminRestaurantsScreen} />
        <Route path="/adminusers" component={AdminUsersScreen} />
      </div>
    </Router>
  );
};

export default App;
