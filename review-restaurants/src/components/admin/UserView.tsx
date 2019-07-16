import React from "react";
import { Card, Elevation, Button } from "@blueprintjs/core";
import { User } from "../../api/types/Model";

interface Props {
  readonly user: User;
  readonly onEditClick: (id: string) => void;
  readonly onDeleteClick: (id: string) => void;
}

export default function UserView(props: Props) {
  return (
    <Card
      elevation={Elevation.THREE}
      style={{
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center",
        width: "80%",
        minHeight: 80,
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 10
      }}
    >
      <div style={{ marginRight: "auto" }}>
        <h3>{props.user.username}</h3>
        <p>password: {props.user.password}</p>
        <p>role: {props.user.role}</p>
      </div>
      <div>
        <Button onClick={() => props.onEditClick(props.user.uId)}>Edit</Button>
        <Button onClick={() => props.onDeleteClick(props.user.uId)}>
          Delete
        </Button>
      </div>
    </Card>
  );
}

const styles = {};
