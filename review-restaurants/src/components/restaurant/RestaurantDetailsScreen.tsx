import React, { useState, CSSProperties } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRestaurant } from "../../redux/selectors/RestaurantDetailsSelectors";
import Header from "../shared/Header";
const list = [1, 2, 3];
export default function RestaurantDetailsScreen(props: RouteComponentProps) {
  const restaurant = useSelector(getRestaurant);
  return (
    <div style={{ flex: 1 }}>
      <Header logout={() => {}} addRestaurant={() => {}} />
      <ul style={{ width: "100%", justifyContent: "center", padding: 0 }}>
        {list.map(function(item) {
          return <p key={item}>g</p>;
        })}
      </ul>
    </div>
  );
}

const styles = {};
