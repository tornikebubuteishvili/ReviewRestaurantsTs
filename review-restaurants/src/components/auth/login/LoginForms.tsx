import React, { useState } from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import { InputGroup, Tooltip, Button, Intent } from "@blueprintjs/core";

interface FormValues {
  username: string;
  password: string;
}

interface OtherProps {
  message: string;
}

interface State {
  showPassword: boolean;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  const [state, setState] = useState<State>({
    showPassword: false
  });

  return (
    <Form>
      <h1>{message}</h1>
      <InputGroup
        placeholder="Username"
        leftIcon="user"
        large={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setFieldValue("username", e.target.value);
        }}
        value={props.values.username}
      />
      <InputGroup
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
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

interface LoginFormProps {
  message: string;
}

const LoginForms = withFormik<LoginFormProps, FormValues>({
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

  handleSubmit: values => {}
})(InnerForm);

export default LoginForms;
