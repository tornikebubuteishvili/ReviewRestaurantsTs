import React, { useState, CSSProperties } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import LoginForms from "./LoginForms";
import { Card, Elevation, Button } from "@blueprintjs/core";

interface State {}

export default function LoginScreen(props: RouteComponentProps) {
  const [state, setState] = useState<State>({});

  function onUsernameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.value.length <= 10 &&
      setState({ ...state, usernameInputValue: e.target.value });
  }

  return (
    <div
      style={{
        flex: 1,
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
      }}
    >
      <Card
        elevation={Elevation.FOUR}
        style={{
          alignSelf: "center",
          justifyContent: "center",
          alignContent: "center",
          width: "50%",
          height: "70%"
        }}
      >
        <LoginForms message={"Log in"} />
        <Button onClick={() => props.history.push("/signup")}>Sign up</Button>
      </Card>
    </div>
  );
}

const styles = {
  labelStyle: { flexDirection: "row" } as CSSProperties,
  buttonStyle: {
    borderColor: "red",
    borderWidth: 5,
    marginLeft: 10
  } as CSSProperties
};
