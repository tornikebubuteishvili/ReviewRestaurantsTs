import React, { useState, useEffect } from "react";
import { Button, Dialog, InputGroup } from "@blueprintjs/core";
import { User } from "../../api/types/Model";

interface Props {
  readonly user: User;
  readonly isOpen: boolean;
  readonly onAcceptClick: (username: string, password: string) => void;
  readonly onClose: () => void;
}

interface State {
  username: string;
  password: string;
}

export default function EditUserDialog(props: Props) {
  const [state, setState] = useState<State>({
    username: props.user.username,
    password: props.user.password
  });

  useEffect(() => {
    setState({ username: props.user.username, password: props.user.password });
  }, [props.user]);

  return (
    <Dialog
      isOpen={props.isOpen}
      onClose={() => {
        setState({ username: "", password: "" });
        props.onClose();
      }}
      canOutsideClickClose
      style={{
        alignSelf: "center",
        justifyContent: "center",
        width: "50%",
        height: "70%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: 50
      }}
    >
      <h2 style={{ padding: 10, marginBottom: "auto" }}>Edit account</h2>
      <InputGroup
        style={{ marginBottom: 20 }}
        placeholder="Username"
        large={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setState({ ...state, username: e.target.value });
        }}
        value={state.username}
      />
      <InputGroup
        style={{ marginBottom: 20 }}
        placeholder="Password"
        large={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setState({ ...state, password: e.target.value });
        }}
        value={state.password}
      />
      <Button
        style={{}}
        onClick={() => {
          props.onAcceptClick(state.username, state.password);
          setState({ username: "", password: "" });
        }}
      >
        Accept
      </Button>
    </Dialog>
  );
}

const styles = {};
