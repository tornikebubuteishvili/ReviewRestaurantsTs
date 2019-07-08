import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import { InputGroup, Tooltip, Button } from "@blueprintjs/core";

interface FormValues {
  email: string;
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
        leftIcon="user"
        // onChange={this.handleFilterChange}
        placeholder="Username"
        // value={filterValue}
      />
      <InputGroup
        placeholder="Enter your password..."
        rightElement={
          <Tooltip content={"Show Password"}>
            <Button
              icon={"lock"}
              //   intent={Intent.WARNING}
              minimal={true}
              //   onClick={this.handleLockClick}
            />
          </Tooltip>
        }
        // type={showPassword ? "text" : "password"}
      />
      <Field type="email" name="email" />
      {touched.email && errors.email && <div>{errors.email}</div>}

      <Field type="password" name="password" />
      {touched.password && errors.password && <div>{errors.password}</div>}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

interface LoginFormProps {
  initialEmail?: string;
  message: string;
}

const LoginForms = withFormik<LoginFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      email: props.initialEmail || "",
      password: ""
    };
  },

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
