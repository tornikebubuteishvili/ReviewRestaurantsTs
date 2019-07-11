import React, { useState, CSSProperties } from "react";
import { Card, Elevation, Button } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";
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
          alignContent: "center",
          width: "50%",
          height: "70%"
        }}
      >
        <RegisterForms message={"Sign up"} />
        <Button onClick={() => props.history.push("/")}>Log in</Button>
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
