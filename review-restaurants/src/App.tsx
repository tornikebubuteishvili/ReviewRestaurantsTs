import React from "react";
import LoginScreen from "./components/auth/login/LoginScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignupScreen from "./components/auth/register/RegisterScreen";
import UserFeedScreen from "./components/user/UserFeedScreen";
import OwnerFeedScreen from "./components/owner/OwnerFeedScreen";
import AdminRestaurantsScreen from "./components/admin/AdminRestaurantsScreen";
import AdminUsersScreen from "./components/admin/AdminUsersScreen";

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
