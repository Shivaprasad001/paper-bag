export const INITIAL_INPUT_FIELDS = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const INPUT_FIELD_NAMES = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  username: 'username',
  password: "password",
  confirmPassword: "confirmPassword",
};

export const VALIDATION_ERROR_MSGS = {
  invalidEmail: "Please provide a valid email",
  shortPassword: "Password should be minimum 8 characters",
  noDigitInPassword: "Password should contain atleast one digit",
  noLowerCaseInPassword:
    "Password should contain atleast one lower case character",
  noUpperCaseInPassword:
    "Password should contain atleast one upper case character",
  noSpclCharInPassword: "Password should contain atleast one special character",
  requiredField: "This field is required",
  passwordsNotMatch: 'Password and Confirm password should match'
};

export const EMAIL_REGEX = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

export const SPECIAL_CHARACTERS = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "[",
  "{",
  "]",
  "}",
  ":",
  ";",
  "<",
  ">",
];
