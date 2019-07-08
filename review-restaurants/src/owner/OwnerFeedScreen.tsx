import React, { useState, CSSProperties } from "react";
import BackgroundImage from "../shared/BackgroundImage";
import { Link } from "react-router-dom";

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
      <BackgroundImage />
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
