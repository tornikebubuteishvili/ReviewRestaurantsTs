import React, { useState } from "react";
import { Card, Elevation, Button, Dialog, InputGroup } from "@blueprintjs/core";
import { useSelector } from "react-redux";
import { getAccountState } from "../../redux/selectors/AccountSelectors";

interface Props {
  readonly isOpen: boolean;
  readonly onClick: (name: string) => void;
}

interface State {
  inputValue: string;
}

export default function AddRestaurantDialog(props: Props) {
  const accountState = useSelector(getAccountState);
  const [state, setState] = useState<State>({ inputValue: "" });

  return (
    <Dialog
      isOpen={props.isOpen}
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
      <h2 style={{ padding: 10, marginBottom: "auto" }}>Add a restaurant</h2>
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
          props.onClick(state.inputValue);
          setState({ inputValue: "" });
        }}
      >
        Add
      </Button>
    </Dialog>
  );
}

const styles = {};
