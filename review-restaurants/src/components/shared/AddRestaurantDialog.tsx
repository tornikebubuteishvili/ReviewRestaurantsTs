import React, { useState, useEffect } from "react";
import { Button, Dialog, InputGroup } from "@blueprintjs/core";

interface Props {
  readonly title: string;
  readonly inputValue: string;
  readonly isOpen: boolean;
  readonly onAcceptClick: (name: string) => void;
  readonly onClose: () => void;
}

interface State {
  inputValue: string;
}

export default function AddRestaurantDialog(props: Props) {
  const [state, setState] = useState<State>({ inputValue: "" });

  useEffect(() => {
    setState({ inputValue: props.inputValue });
  }, [props.inputValue]);

  return (
    <Dialog
      isOpen={props.isOpen}
      canOutsideClickClose
      onClose={() => {
        setState({ inputValue: "" });
        props.onClose();
      }}
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
      <h2 style={{ padding: 10, marginBottom: "auto" }}>{props.title}</h2>
      <InputGroup
        style={{ marginBottom: 20 }}
        placeholder="Name"
        large={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setState({ inputValue: e.target.value });
        }}
        value={state.inputValue}
      />
      <Button
        style={{}}
        onClick={() => {
          props.onAcceptClick(state.inputValue);
          setState({ inputValue: "" });
        }}
      >
        Accept
      </Button>
    </Dialog>
  );
}

const styles = {};
