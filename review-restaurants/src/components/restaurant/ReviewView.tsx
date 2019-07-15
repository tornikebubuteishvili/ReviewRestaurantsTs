import React, { useState } from "react";
import { Card, Elevation, InputGroup, Button } from "@blueprintjs/core";
import { Review } from "../../api/types/Model";
import StarRating from "react-star-rating-component";
import { useSelector, useDispatch } from "react-redux";
import { getAccountState } from "../../redux/selectors/AccountSelectors";
import { Role } from "../../api/types/Enum";

interface Props {
  readonly review: Review;
  readonly onReplyClick: (
    id: string,
    restaurantId: string,
    answer: string
  ) => void;
  readonly onEditClick: (id: string) => void;
  readonly onDeleteClick: (id: string) => void;
}

interface State {
  inputValue: string;
}

export default function ReviewView(props: Props) {
  const accountState = useSelector(getAccountState);
  const [state, setState] = useState<State>({ inputValue: "" });
  const date = new Date(props.review.visitDate);

  return (
    <Card
      elevation={Elevation.THREE}
      style={{
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center",
        width: "80%",
        minHeight: 80,
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 10
      }}
    >
      <div style={{ marginRight: "auto" }}>
        <h3>{props.review.reviewer}</h3>
        <StarRating
          editing={false}
          emptyStarColor={"gray"}
          starColor={"yellow"}
          starCount={5}
          name={"rating"}
          value={props.review.star}
        />
        <p>{props.review.comment}</p>
        <p>Visit date: {date.toDateString()}</p>
        {props.review.hasAnswer ? (
          <p>Reply: {props.review.answer}</p>
        ) : accountState.role === Role.Owner ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <InputGroup
              style={{ marginRight: 20 }}
              placeholder="Answer"
              large={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setState({ ...state, inputValue: e.target.value });
              }}
              value={state.inputValue}
            />
            <Button
              style={{ marginLeft: 20 }}
              onClick={() =>
                props.onReplyClick(
                  props.review.uId,
                  props.review.restaurantUId,
                  state.inputValue
                )
              }
            >
              Reply
            </Button>{" "}
          </div>
        ) : (
          <div />
        )}
      </div>
      {accountState.role === Role.Admin ? (
        <div>
          <Button onClick={() => props.onEditClick(props.review.uId)}>
            Edit
          </Button>
          <Button onClick={() => props.onDeleteClick(props.review.uId)}>
            Delete
          </Button>
        </div>
      ) : (
        <div />
      )}
    </Card>
  );
}

const styles = {};
