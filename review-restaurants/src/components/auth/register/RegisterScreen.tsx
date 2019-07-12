import React, { useState, CSSProperties } from "react";
import { Card, Elevation, Button } from "@blueprintjs/core";
import { RouteComponentProps, Link } from "react-router-dom";
import RegisterForms from "./RegisterForms";

interface State {}

export default function SignupScreen(props: RouteComponentProps) {
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
        <RegisterForms />
        <h3 style={{ textAlign: "center", marginTop: "auto" }}>
          Already have an account? <Link to={"/"}>Log in</Link>
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
