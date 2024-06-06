import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validationError, setValidationError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitButtonClickHandler = () => {
    setValidationError("");

    if (!email || !password) {
      setValidationError("Please provide a valid email and password!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setValidationError("Please provide a valid email!");
    }
  };

  const errorMessages = () => {
    if (validationError) {
      return (
        <div className="pb-login-form__error-messages">
          <p>{validationError}</p>
        </div>
      );
    }
  };
  return (
    <section className="pb-login-form">
      <FormControl
        variant="outlined"
        className="pb-login-form__email-input-control input-control"
      >
        <TextField
          id="outlined-adornment-email"
          type="text"
          onChange={(event) => setEmail(event.target.value)}
          label="Email"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <PersonIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <FormControl
        variant="outlined"
        className="pb-login-form__password-input-control input-control"
      >
        <TextField
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Password"
        />
      </FormControl>
          {errorMessages()}
      <Button
        variant="contained"
        className="pb-login-form__login-button"
        onClick={submitButtonClickHandler}
      >
        Login
      </Button>
      <div className="pb-login-form__register-link-wrapper">
        <Link to="/register" className="pb-login-form__register-link">
          Create an account?
        </Link>
      </div>
    </section>
  );
}
