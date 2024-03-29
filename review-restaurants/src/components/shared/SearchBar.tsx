import React, { useState } from "react";
import { Button, NumericInput } from "@blueprintjs/core";
import { clamp } from "@blueprintjs/core/lib/esm/common/utils";

interface Props {
  readonly onFilterClick: (lowerRating: number, higherRating: number) => void;
}

interface State {
  lowerRating: number;
  higherRating: number;
}

export default function SearchBar(props: Props) {
  const [state, setState] = useState<State>({
    lowerRating: 0,
    higherRating: 5
  });

  return (
    <div
      style={{
        width: "100%",
        marginBottom: 20,
        display: "flex",
        justifyContent: "center"
      }}
    >
      Filter restaurants by rating from:
      <NumericInput
        style={{ marginLeft: 10, marginRight: 10 }}
        value={state.lowerRating}
        allowNumericCharactersOnly
        max={5}
        min={0}
        onValueChange={(value: number, _: string) =>
          setState({ ...state, lowerRating: clamp(value, 0, 5) })
        }
      />
      to:
      <NumericInput
        style={{ marginLeft: 10, marginRight: 10 }}
        value={state.higherRating}
        allowNumericCharactersOnly
        max={5}
        min={0}
        onValueChange={(value: number, _: string) =>
          setState({ ...state, higherRating: clamp(value, 0, 5) })
        }
      />
      <Button
        style={{ marginLeft: 10, marginRight: 10 }}
        onClick={() =>
          props.onFilterClick(state.lowerRating, state.higherRating)
        }
      >
        Filter
      </Button>
    </div>
  );
}

const styles = {};
