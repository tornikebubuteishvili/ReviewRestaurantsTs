import React, { useState } from "react";
import { Button, Dialog, InputGroup } from "@blueprintjs/core";
import { useSelector } from "react-redux";
import { getAccountState } from "../../redux/selectors/AccountSelectors";
import StarRating from "react-star-rating-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  readonly isOpen: boolean;
  readonly onAddClick: (
    comment: string,
    rating: number,
    visitDate: Date
  ) => void;
  readonly onClose: () => void;
}

interface State {
  inputValue: string;
  rating: number;
  visitDate: Date;
}

export default function AddReviewDialog(props: Props) {
  const accountState = useSelector(getAccountState);
  const [state, setState] = useState<State>({
    inputValue: "",
    rating: 1,
    visitDate: new Date()
  });

  return (
    <Dialog
      isOpen={props.isOpen}
      canOutsideClickClose
      onClose={props.onClose}
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
      <h2 style={{ padding: 10, marginBottom: "auto" }}>Add a review</h2>
      <div style={{ fontSize: 50 }}>
        <StarRating
          name={"rating"}
          emptyStarColor={"gray"}
          starColor={"yellow"}
          starCount={5}
          value={state.rating}
          onStarClick={(nextValue: number, _: number, __: string) =>
            setState({ ...state, rating: nextValue })
          }
        />
      </div>
      <InputGroup
        style={{ marginBottom: 20 }}
        placeholder="Comment"
        large={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setState({ ...state, inputValue: e.target.value });
        }}
        value={state.inputValue}
      />
      <div>
        Visit date:{"     "}
        <DatePicker
          customInput={<InputGroup />}
          adjustDateOnChange
          placeholderText={"Visit date"}
          startDate={state.visitDate}
          value={state.visitDate.toDateString()}
          onChange={(date: Date) => setState({ ...state, visitDate: date })}
          selected={state.visitDate}
        />
      </div>
      <div>
        <Button
          style={{}}
          onClick={() => {
            props.onAddClick(state.inputValue, state.rating, state.visitDate);
            setState({ ...state, inputValue: "", rating: 1 });
          }}
        >
          Add
        </Button>
      </div>
    </Dialog>
  );
}

const styles = {};
