import React, { useState, CSSProperties } from "react";
import BackgroundImage from "../shared/BackgroundImage";
import { Link } from "react-router-dom";

interface Props {}

interface State {
  usernameInputValue: string;
  text: string;
}

export default function SignupScreen(props: Props) {
  const [state, setState] = useState<State>({
    usernameInputValue: "",
    text: ""
  });

  function onUsernameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.value.length <= 10 &&
      setState({ ...state, usernameInputValue: e.target.value });
  }

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
        <label style={{}}>
          P:{state.text}
          <input
            value={state.usernameInputValue}
            onChange={onUsernameInputChange}
          />
        </label>
        <button
          style={styles.buttonStyle}
          onClick={() => {
            setState({ ...state, text: state.usernameInputValue });
          }}
        >
          Submit
        </button>
        <Link to={"/"}>login</Link>
      </div>
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
