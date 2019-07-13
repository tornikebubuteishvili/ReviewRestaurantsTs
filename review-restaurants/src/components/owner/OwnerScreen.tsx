import React, { useState, CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurants } from "../../redux/selectors/OwnerSelectors";

export default function OwnerFeedScreen() {
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
      <div
        style={{
          alignSelf: "center",
          width: "70%",
          height: "70%",
          backgroundColor: "red"
        }}
      >
        <Link to={"/"}>logout</Link>
      </div>
    </div>
  );
}

const styles = {};
