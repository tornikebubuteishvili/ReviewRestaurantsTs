import React from "react";
import { Card, Elevation, Button } from "@blueprintjs/core";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/AccountActions";
import { History } from "history";

interface Props {
  readonly title: string;
  readonly leftElement: JSX.Element;
  readonly history: History;
}

export default function Header(props: Props) {
  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutUser.request({}));
    props.history.push("/");
  }

  return (
    <Card
      elevation={Elevation.FOUR}
      style={{
        width: "100%",
        minHeight: 80,
        marginBottom: 20,
        display: "flex",
        justifyContent: "center"
      }}
    >
      {props.leftElement}
      <h3
        style={{
          marginLeft: "auto",
          marginRight: 20,
          textAlign: "center"
        }}
      >
        {props.title}
      </h3>
      <Button onClick={logout}>Log out</Button>
    </Card>
  );
}

const styles = {};
