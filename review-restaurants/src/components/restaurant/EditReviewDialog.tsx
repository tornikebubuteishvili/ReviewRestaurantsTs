import React, { useState, useEffect } from "react";
import { Button, Dialog, InputGroup } from "@blueprintjs/core";
import { useSelector } from "react-redux";
import { getAccountState } from "../../redux/selectors/AccountSelectors";
import StarRating from "react-star-rating-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Review } from "../../api/types/Model";

interface Props {
  readonly isOpen: boolean;
  readonly review: Review;
  readonly onAcceptClick: (
    comment: string,
    star: number,
    visitDate: Date,
    answer: string
  ) => void;
  readonly onClose: () => void;
}

interface State {
  comment: string;
  rating: number;
  visitDate: Date;
  answer: string;
}

export default function EditReviewDialog(props: Props) {
  const [state, setState] = useState<State>({
    comment: "",
    rating: 1,
    visitDate: new Date(),
    answer: ""
  });

  useEffect(() => {
    setState({
      comment: props.review.comment,
      rating: props.review.star,
      visitDate: new Date(props.review.visitDate),
      answer: props.review.answer
    });
  }, [props.review]);

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
      <h2 style={{ padding: 10, marginBottom: "auto" }}>Edit review</h2>
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
      Comment:
      <InputGroup
        style={{ marginBottom: 20 }}
        large={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setState({ ...state, comment: e.target.value });
        }}
        value={state.comment}
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
      {props.review.hasAnswer && "Answer:"}
      {props.review.hasAnswer ? (
        <InputGroup
          style={{ marginBottom: 20 }}
          large={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setState({ ...state, answer: e.target.value });
          }}
          value={state.answer}
        />
      ) : (
        <div />
      )}
      <div>
        <Button
          style={{}}
          onClick={() => {
            props.onAcceptClick(
              state.comment,
              state.rating,
              state.visitDate,
              state.answer
            );
            setState({ ...state, comment: "", rating: 1 });
          }}
        >
          Accept
        </Button>
      </div>
    </Dialog>
  );
}

const styles = {};
