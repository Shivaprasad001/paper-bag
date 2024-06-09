import { useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import { FormGroup } from "@mui/material";
import { Link } from "react-router-dom";
import request from "../../../services/apiServices";
import { CancelToken } from "axios";

import FormErrors from "../../../components/FormErrors";
import useValidation from "../../../hooks/useValidation";
import {
  checkValueHasSpecialCharacter,
  checkValueHasLowerCaseCharacter,
  checkValueHasUpperCaseCharacter,
} from "./utils";
import {
  INPUT_FIELD_NAMES,
  VALIDATION_ERROR_MSGS,
  EMAIL_REGEX,
} from "./constants";

import { REQUEST_CANCELLED } from "../../../constants/keys";

export default function RegisterForm() {
  const [passwordVisibility, setpasswordVisibility] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const [registerButtonClicked, setRegisterButtonClicked] = useState(false);
  const [signupDisabled, setSignupDisabled] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const validateRequireField = (inputFieldValue) => {
    if (inputFieldValue.trim() !== "") {
      return [true, ""];
    }

    return [false, VALIDATION_ERROR_MSGS.requiredField];
  };

  const validateEmail = (inputFieldValue) => {
    if (inputFieldValue.trim() == "") {
      return [false, VALIDATION_ERROR_MSGS.requiredField];
    }

    if (!EMAIL_REGEX.test(inputFieldValue)) {
      return [false, VALIDATION_ERROR_MSGS.invalidEmail];
    }

    return [true, ""];
  };

  const validatePassword = (inputFieldValue) => {
    if (inputFieldValue.trim() == "") {
      return [false, VALIDATION_ERROR_MSGS.requiredField];
    }

    if (inputFieldValue.trim().length < 8) {
      return [false, VALIDATION_ERROR_MSGS.shortPassword];
    }

    if (!checkValueHasSpecialCharacter(inputFieldValue.trim())) {
      return [false, VALIDATION_ERROR_MSGS.noSpclCharInPassword];
    }

    if (!checkValueHasUpperCaseCharacter(inputFieldValue.trim())) {
      return [false, VALIDATION_ERROR_MSGS.noUpperCaseInPassword];
    }

    if (!checkValueHasLowerCaseCharacter(inputFieldValue.trim())) {
      return [false, VALIDATION_ERROR_MSGS.noLowerCaseInPassword];
    }

    return [true, ""];
  };

  const validateConfirmPassword = (inputFieldValue) => {
    if (inputFieldValue.trim() == "") {
      return [false, VALIDATION_ERROR_MSGS.requiredField];
    }

    if (inputFieldValue.trim() === password.trim()) {
      return [true, ""];
    }

    return [false, [VALIDATION_ERROR_MSGS.passwordsNotMatch]];
  };

  let cancel;

  const {
    value: firstName,
    valueChangeHandler: firstNameChangeHandler,
    isValid: isFirstNameValid,
    errorMessage: firstNameErrorMsg,
    hasError: firstNameHasError,
    onBlur: firstNameBlurHandler,
  } = useValidation(validateRequireField);

  const {
    value: lastName,
    valueChangeHandler: lastNameChangeHandler,
    isValid: isLastNameValid,
    errorMessage: lastNameErrorMsg,
    hasError: lastNameHasError,
    onBlur: lastNameBlurHandler,
  } = useValidation(validateRequireField);

  const {
    value: email,
    valueChangeHandler: emailChangeHandler,
    isValid: isEmailValid,
    errorMessage: emailErrorMsg,
    hasError: emailHasError,
    onBlur: emailBlurHandler,
  } = useValidation(validateEmail);

  const {
    value: username,
    valueChangeHandler: usernameChangeHandler,
    isValid: isUsernameValid,
    errorMessage: usernameErrorMsg,
    hasError: usernameHasError,
    onBlur: usernameBlurHandler,
  } = useValidation(validateRequireField);

  const {
    value: password,
    valueChangeHandler: passwordChangeHandler,
    isValid: isPasswordValid,
    errorMessage: passwordErrorMsg,
    hasError: passwordHasError,
    onBlur: passwordBlurHandler,
  } = useValidation(validatePassword);

  const {
    value: confirmPassword,
    valueChangeHandler: confirmPasswordChangeHandler,
    isValid: isConfirmPasswordValid,
    errorMessage: confirmPasswordErrorMsg,
    hasError: confirmPasswordHasError,
    onBlur: confirmPasswordBlurHandler,
  } = useValidation(validateConfirmPassword);

  const handlePasswordVisibility = (fieldName) => {
    let map = {
      password: "showPassword",
      confirmPassword: "showConfirmPassword",
    };
    setpasswordVisibility((passwordVisibilityObj) => ({
      ...passwordVisibilityObj,
      [map[fieldName]]: !passwordVisibilityObj[map[fieldName]],
    }));
  };

  const validateForm = () => {
    firstNameBlurHandler();
    lastNameBlurHandler();
    emailBlurHandler();
    usernameBlurHandler();
    passwordBlurHandler();
    confirmPasswordBlurHandler();
  };

  // const showFormErrors = () => {
  //   if(formErrors.length) {
  //     return <FormErrors errorList={formErrors}/>
  //   } else {
  //     return null;
  //   }
  // }
  
  // const formErrorsEle = useMemo(showFormErrors, formErrors);

  const registerButtonClickHandler = async () => {
    setRegisterButtonClicked(true);
    setSignupDisabled(true);
    validateForm();
    setFormErrors([]);
    const isFormValid =
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid;

    if (isFormValid) {
      try {
        if (cancel) cancel(REQUEST_CANCELLED);
        const apiData = await request({
          url: "/api/user/signup",
          method: "post",
          data: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password,
          },
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        });
        setSignupDisabled(false);
        cancel = null;
        console.log(apiData, "apiData");
      } catch (error) {
        console.log(error, "error");
        setFormErrors([error]);
        setSignupDisabled(false);
      }
    }
  };
  return (
    <>
      {!!formErrors.length && <FormErrors errorList={formErrors}/>}
      <section className="pb-register-form">
        <FormGroup className="pb-register-form__row">
          <TextField
            id="outlined-adornment-first-name"
            label="First Name"
            type="text"
            name={INPUT_FIELD_NAMES.firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            error={firstNameHasError && registerButtonClicked}
            helperText={
              firstNameErrorMsg
                ? registerButtonClicked && firstNameErrorMsg
                : ""
            }
            className="pb-register-form__input-field pb-register-form__half-width"
          />
          <TextField
            id="outlined-adornment-last-name"
            label="Last Name"
            type="text"
            name={INPUT_FIELD_NAMES.lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            className="pb-register-form__input-field pb-register-form__half-width"
          />
        </FormGroup>
        <FormGroup className="pb-register-form__row">
          <TextField
            id="outlined-adornment-email"
            label="Email"
            type="text"
            name={INPUT_FIELD_NAMES.email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={registerButtonClicked && emailHasError}
            helperText={
              emailErrorMsg ? registerButtonClicked && emailErrorMsg : ""
            }
            className="pb-register-form__input-field"
          />
        </FormGroup>
        <FormGroup className="pb-register-form__row">
          <TextField
            id="outlined-adornment-username"
            label="Username"
            type="text"
            name={INPUT_FIELD_NAMES.username}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            error={registerButtonClicked && usernameHasError}
            helperText={
              usernameErrorMsg ? registerButtonClicked && usernameErrorMsg : ""
            }
            className="pb-register-form__input-field"
          />
        </FormGroup>
        <FormGroup className="pb-register-form__row">
          <TextField
            id="outlined-adornment-password"
            label="Password"
            type={passwordVisibility.showPassword ? "text" : "password"}
            name={INPUT_FIELD_NAMES.password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={registerButtonClicked && passwordHasError}
            helperText={
              passwordErrorMsg ? registerButtonClicked && passwordErrorMsg : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      handlePasswordVisibility(INPUT_FIELD_NAMES.password)
                    }
                  >
                    {passwordVisibility.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            className="pb-register-form__input-field"
          />
        </FormGroup>
        <FormGroup className="pb-register-form__row">
          <TextField
            id="outlined-adornment-confirm-password"
            label="Confirm Password"
            type={passwordVisibility.showConfirmPassword ? "text" : "password"}
            name={INPUT_FIELD_NAMES.confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={registerButtonClicked && confirmPasswordHasError}
            helperText={
              confirmPasswordErrorMsg
                ? registerButtonClicked && confirmPasswordErrorMsg
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      handlePasswordVisibility(
                        INPUT_FIELD_NAMES.confirmPassword
                      )
                    }
                  >
                    {passwordVisibility.showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            className="pb-register-form__input-field"
          />
          {password && isConfirmPasswordValid ? (
            <CheckIcon sx={{ color: "#41C02C" }} className="check-icon" />
          ) : (
            ""
          )}
        </FormGroup>
        <Button
          variant="contained"
          className="pb-register-form__register-button"
          disabled={signupDisabled}
          onClick={registerButtonClickHandler}
        >
          Create Account
        </Button>
        <div className="pb-register-form__login-link-wrapper">
          <span>Already have an account?</span>
          <Link to="/login" className="pb-register-form__login-link">
            Login
          </Link>
        </div>
      </section>
    </>
  );
}
