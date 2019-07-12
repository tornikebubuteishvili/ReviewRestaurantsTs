import React, { useState } from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import { InputGroup, Tooltip, Button, Intent } from "@blueprintjs/core";

interface FormValues {
  username: string;
  password: string;
}

interface State {
  showPassword: boolean;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  const [state, setState] = useState<State>({
    showPassword: false
  });

  return (
    <Form
      style={{
        width: "50%",
        alignSelf: "center",
        marginTop: "auto"
      }}
    >
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
        <Button type={"submit"} disabled={isSubmitting}>
          Log in
        </Button>
      </div>
    </Form>
  );
};

interface LoginFormProps {}

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
