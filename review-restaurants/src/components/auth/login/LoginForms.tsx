import React, { useState } from "react";
import { withFormik, FormikProps, FormikErrors, Form } from "formik";
import {
  InputGroup,
  Tooltip,
  Button,
  Intent,
  Toaster
} from "@blueprintjs/core";
import { LoginRequest } from "../../../api/types/Request";
import { History } from "history";
import { useSelector, useDispatch } from "react-redux";
import {
  getRequestState,
  getError
} from "../../../redux/selectors/AccountSelectors";
import { INTENT_DANGER } from "@blueprintjs/core/lib/esm/common/classes";
import { clearError } from "../../../redux/actions/AccountActions";

interface FormValues {
  username: string;
  password: string;
  history: History;
  loginUser: (request: LoginRequest) => void;
}

interface State {
  showPassword: boolean;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  const [state, setState] = useState<State>({
    showPassword: false
  });
  const requestState = useSelector(getRequestState);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  return (
    <Form
      style={{
        width: "50%",
        alignSelf: "center",
        marginTop: "auto"
      }}
    >
      {error !== "" ? (
        <div style={{ position: "absolute" }}>
          <Toaster canEscapeKeyClear>
            <Button intent={Intent.DANGER}>{error}</Button>
          </Toaster>
        </div>
      ) : (
        <div />
      )}
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>Log in</h2>
      <InputGroup
        style={{ marginBottom: 20 }}
        placeholder="Username"
        leftIcon="user"
        large={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setFieldValue("username", e.target.value);
        }}
        value={props.values.username}
      />
      <InputGroup
        style={{ marginBottom: 20 }}
        placeholder="Password"
        leftIcon="lock"
        large={true}
        rightElement={
          <Tooltip
            content={state.showPassword ? "Hide Password" : "Show Password"}
          >
            <Button
              icon={state.showPassword ? "eye-off" : "eye-open"}
              intent={Intent.WARNING}
              minimal={true}
              onClick={() => setState({ showPassword: !state.showPassword })}
            />
          </Tooltip>
        }
        type={state.showPassword ? "text" : "password"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setFieldValue("password", e.target.value);
        }}
        value={props.values.password}
      />
      {touched.password && errors.password && <div>{errors.password}</div>}
      <div
        style={{
          textAlign: "center"
        }}
      >
        <Button type={"submit"} disabled={requestState.isLoggingIn}>
          Log in
        </Button>
      </div>
    </Form>
  );
};

interface LoginFormProps {
  history: History;
  loginUser: (request: LoginRequest) => void;
}

const LoginForms = withFormik<LoginFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      history: props.history,
      loginUser: props.loginUser,
      password: "",
      username: ""
    };
  },
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  },

  handleSubmit: values => {
    values.loginUser({
      password: values.password,
      username: values.username,
      history: values.history
    });
  }
})(InnerForm);

export default LoginForms;
