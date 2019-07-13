import React from "react";
import { Card, Elevation, Button } from "@blueprintjs/core";
import { useSelector } from "react-redux";
import { getAccountState } from "../../redux/selectors/AccountSelectors";

interface Props {
  readonly logout: () => void;
  readonly addRestaurant: () => void;
}

export default function Header(props: Props) {
  const accountState = useSelector(getAccountState);

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
      <Button onClick={props.addRestaurant}>Add restaurant</Button>
      <p
        style={{
          marginLeft: "auto",
          textAlign: "center"
        }}
      >
        {accountState.username}
      </p>
      <Button onClick={props.logout}>Log out</Button>
    </Card>
  );
}

const styles = {};
