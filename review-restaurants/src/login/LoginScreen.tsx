import React from "react";

interface Props {}

interface State {
  usernameInputValue: string;
  text: string;
}

export default class LoginScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { usernameInputValue: "", text: "" };
  }

  onUsernameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.length <= 10 &&
      this.setState({ usernameInputValue: e.target.value });
  };

  render() {
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
            height: "70%"
          }}
        >
          <label style={{}}>
            Name:
            <input
              value={this.state.usernameInputValue}
              onChange={this.onUsernameInputChange}
            />
          </label>
          <button
            style={styles.buttonStyle}
            onClick={() => {
              this.setState({ text: this.state.usernameInputValue });
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  labelStyle: { flexDirection: "row" },
  buttonStyle: {
    borderColor: "red",
    borderWidth: 5,
    marginLeft: 10
  }
};
