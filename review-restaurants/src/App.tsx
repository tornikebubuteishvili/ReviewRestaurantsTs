import React from "react";
import LoginScreen from "./login/LoginScreen";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignupScreen from "./signup/SignupScreen";

const App: React.FC = () => {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          width: window.innerWidth,
          height: window.innerHeight
        }}
      >
        <Route exact path="/" component={LoginScreen} />
        <Route path="/signup" component={SignupScreen} />
      </div>
    </Router>
  );
};

export default App;
