import React, { useState, CSSProperties } from "react";
import { Link } from "react-router-dom";

export default function AdminUsersScreen() {
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
