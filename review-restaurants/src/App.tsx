import React from "react";
import LoginScreen from "./login/LoginScreen";

const App: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        width: window.innerWidth,
        height: window.innerHeight
      }}
    >
      <LoginScreen />
    </div>
  );
};

export default App;
