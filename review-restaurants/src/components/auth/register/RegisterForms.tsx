import React, { useState } from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import {
  InputGroup,
  Tooltip,
  Button,
  Intent,
  MenuItem
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { Role } from "../../../api/types/Enum";

interface FormValues {
  role: Role;
  username: string;
  password: string;
  repeatPassword: string;
}

interface OtherProps {
  message: string;
}

interface State {
  showPassword: boolean;
  showRepeatPassword: boolean;
  selectedRole: Role;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  const [state, setState] = useState<State>({
    showPassword: false,
    showRepeatPassword: false,
    selectedRole: Role.user
  });

  return (
    <Form>
      Sign up as a(n):
      <Select
        items={[Role.user, Role.owner, Role.admin]}
        itemRenderer={item => {
          return (
            <MenuItem
              active={item == state.selectedRole}
              key={item}
              onClick={() => {
                setState({ ...state, selectedRole: item });
              }}
              text={Role[item]}
            />
          );
        }}
        onItemSelect={item => {
          setState({ ...state, selectedRole: item });
        }}
        filterable={false}
      >
        <Button
          text={Role[state.selectedRole]}
          rightIcon="double-caret-vertical"
        />
      </Select>
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
              onClick={() =>
                setState({ ...state, showPassword: !state.showPassword })
              }
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
      <InputGroup
        placeholder="Repeat Password"
        leftIcon="lock"
        large={true}
        rightElement={
          <Tooltip
            content={
              state.showRepeatPassword ? "Hide Password" : "Show Password"
            }
          >
            <Button
              icon={state.showRepeatPassword ? "eye-off" : "eye-open"}
              intent={Intent.WARNING}
              minimal={true}
              onClick={() =>
                setState({
                  ...state,
                  showRepeatPassword: !state.showRepeatPassword
                })
              }
            />
          </Tooltip>
        }
        type={state.showRepeatPassword ? "text" : "password"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setFieldValue("repeatPassword", e.target.value);
        }}
        value={props.values.repeatPassword}
      />
      {touched.repeatPassword && errors.repeatPassword && (
        <div>{errors.repeatPassword}</div>
      )}
      <Button type={"submit"} disabled={isSubmitting}>
        Sign up
      </Button>
    </Form>
  );
};

interface LoginFormProps {
  message: string;
}

const RegisterForms = withFormik<LoginFormProps, FormValues>({
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.repeatPassword) {
      errors.repeatPassword = "Required";
    }
    return errors;
  },

  handleSubmit: values => {}
})(InnerForm);

export default RegisterForms;
