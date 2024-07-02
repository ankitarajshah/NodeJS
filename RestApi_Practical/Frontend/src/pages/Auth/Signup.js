import React, { useState } from "react";
import Input from "../../components/Form/Input/Input";
import Button from "../../components/Button/Button";
import { required, length, email } from "../../util/validators";
import Auth from "./Auth";

const Signup = ({ onSignup, loading }) => {
  const [signupForm, setSignupForm] = useState({
    email: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, email],
    },
    password: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, length({ min: 5 })],
    },
    name: {
      value: "",
      valid: false,
      touched: false,
      validators: [required],
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangeHandler = (input, value) => {
    let isValid = true;
    for (const validator of signupForm[input].validators) {
      if (typeof validator !== "function") {
        console.error(`Validator for ${input} is not a function`);
        return;
      }
      isValid = isValid && validator(value);
    }

    const updatedForm = {
      ...signupForm,
      [input]: {
        ...signupForm[input],
        valid: isValid,
        value: value,
      },
    };

    let formIsValid = true;
    for (const inputName in updatedForm) {
      formIsValid = formIsValid && updatedForm[inputName].valid;
    }

    setSignupForm(updatedForm);
    setFormIsValid(formIsValid);
  };

  const inputBlurHandler = (input) => {
    setSignupForm({
      ...signupForm,
      [input]: {
        ...signupForm[input],
        touched: true,
      },
    });
  };

  const submitHandler = (event) => {
    console.log("Form data on submit:", signupForm);
    event.preventDefault();
    onSignup(event, { signupForm });
  };

  return (
    <Auth>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={(e) => inputChangeHandler("email", e.target.value)}
          onBlur={() => inputBlurHandler("email")}
          value={signupForm.email.value}
          valid={signupForm.email.valid}
          touched={signupForm.email.touched}
        />
        <Input
          id="name"
          label="Your Name"
          type="text"
          control="input"
          onChange={(e) => inputChangeHandler("name", e.target.value)}
          onBlur={() => inputBlurHandler("name")}
          value={signupForm.name.value}
          valid={signupForm.name.valid}
          touched={signupForm.name.touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={(e) => inputChangeHandler("password", e.target.value)}
          onBlur={() => inputBlurHandler("password")}
          value={signupForm.password.value}
          valid={signupForm.password.valid}
          touched={signupForm.password.touched}
        />
        <Button design="raised" type="submit" loading={loading}>
          Signup
        </Button>
      </form>
    </Auth>
  );
};

export default Signup;
