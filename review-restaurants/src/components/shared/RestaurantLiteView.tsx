import React, { useState, CSSProperties } from "react";
import { Card, Elevation } from "@blueprintjs/core";
import { RestaurantLite } from "../../api/types/Model";

interface Props {
  readonly restaurant: RestaurantLite;
  readonly onClick: (id: string) => void;
  readonly rightElement: JSX.Element;
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
        flexDirection: "row",
        marginBottom: 20,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 10
      }}
    >
      <div style={{ marginRight: "auto" }}>
        <h3>{props.restaurant.name}</h3>
        <p>rating: {props.restaurant.average}</p>
        <p>owner: {props.restaurant.restaurantOwnerName}</p>
      </div>
      {props.rightElement}
    </Card>
  );
}

const styles = {};
