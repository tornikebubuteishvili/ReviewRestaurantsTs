import React, { useState, CSSProperties } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import LoginForms from "./LoginForms";
import { Card, Elevation, Button } from "@blueprintjs/core";

interface State {}

export default function LoginScreen(props: RouteComponentProps) {
  const [state, setState] = useState<State>({});

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
          width: "50%",
          height: "70%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <LoginForms />
        <h3 style={{ textAlign: "center", marginTop: "auto" }}>
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </h3>
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
