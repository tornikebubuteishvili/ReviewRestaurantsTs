import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import { InputGroup, Tooltip, Button, Intent } from "@blueprintjs/core";

interface FormValues {
  email: string;
  username: string;
  password: string;
}

interface OtherProps {
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <Form>
      <h1>{message}</h1>
      <InputGroup
        placeholder="Email"
        leftIcon="envelope"
        large={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setFieldValue("email", e.target.value);
        }}
        value={props.values.email}
      />
      {touched.email && errors.email && <div>{errors.email}</div>}
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
          <Tooltip content={"Show Password"}>
            <Button
              icon={"eye-on"}
              intent={Intent.WARNING}
              minimal={true}
              // onClick={this.handleLockClick}
            />
          </Tooltip>
        }
        // type={showPassword ? "text" : "password"}
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
    if (!values.email) {
      errors.email = "Required";
    } else if (!Yup.string().email(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  },

  handleSubmit: values => {}
})(InnerForm);

export default LoginForms;
