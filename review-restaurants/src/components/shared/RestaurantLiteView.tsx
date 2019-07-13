import React, { useState, CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Card, Elevation } from "@blueprintjs/core";
import { RestaurantLite } from "../../api/types/Model";

interface Props {
  readonly restaurant: RestaurantLite;
  readonly onClick: (id: string) => void;
}

export default function RestaurantLiteView(props: Props) {
  return (
    <Card
      elevation={Elevation.THREE}
      interactive={true}
      onClick={_ => props.onClick(props.restaurant.uId)}
      style={{
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center",
        width: "80%",
        minHeight: 80,
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      {props.restaurant.name}
      {props.restaurant.average}
    </Card>
  );
}

const styles = {};
