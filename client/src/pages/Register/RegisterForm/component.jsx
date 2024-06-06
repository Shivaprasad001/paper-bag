import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import { FormGroup } from "@mui/material";
import { Link } from "react-router-dom";

import { INITIAL_INPUT_FIELDS } from "./constants";

export default function RegisterForm() {
	const [inputFields, setInputFields] = useState(INITIAL_INPUT_FIELDS);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((shows) => !shows);

  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    password == event.target.value
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
  };

  const submitButtonClickHandler = () => {
    setValidationError("");

    if (!email || !password) {
      setValidationError("Please provide a valid email and password!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setValidationError("Please provide a valid email!");
    }
  };

  return (
    <section className="pb-register-form">
      <FormGroup className="pb-register-form__row">
        <TextField
          id="outlined-adornment-first-name"
          type="text"
          onChange={(event) => setFirstName(event.target.value)}
          label="First Name"
          className="pb-register-form__input-field pb-register-form__half-width"
        />
        <TextField
          id="outlined-adornment-last-name"
          type="text"
          onChange={(event) => setLastName(event.target.value)}
          label="Last Name"
          className="pb-register-form__input-field pb-register-form__half-width"
        />
      </FormGroup>
      <FormGroup className="pb-register-form__row">
        <TextField
          id="outlined-adornment-email"
          type="text"
          onChange={(event) => setEmail(event.target.value)}
          label="Email"
          className="pb-register-form__input-field"
        />
      </FormGroup>
      <FormGroup className="pb-register-form__row">
        <TextField
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={(event) => setPassword(event.target.value)}
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
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
          type={showConfirmPassword ? "text" : "password"}
          onChange={onConfirmPasswordChange}
          label="Confirm Password"
          className="pb-register-form__input-field"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {passwordMatch ? (
          <CheckIcon sx={{ color: "#41C02C" }} className="check-icon" />
        ) : (
          ""
        )}
      </FormGroup>
      <Button
        variant="contained"
        className="pb-register-form__register-button"
        onClick={submitButtonClickHandler}
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
  );
}
