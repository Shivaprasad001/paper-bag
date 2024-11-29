const bcrypt = require("bcrypt");
const validator = require("validator");
const pool = require("../database");

const userSchema = {};

userSchema.signUp = async function (userDetails) {
  const { email, password, firstName, lastName, username } = userDetails;
  // Validation
  if (!email || !password) {
    throw Error("Email or Password is empty!");
  }

  if (!firstName || !lastName || !username) {
    const firstNameEmpty = !firstName && "First Name";
    const lastNameEmpty = !lastName && "Last Name";
    const usernameEmpty = !username && "Username";
    let emptyValues = [firstNameEmpty, lastNameEmpty, usernameEmpty]
      .filter(Boolean)
      .join(",");

    throw Error("Please provide value(s) for: " + emptyValues);
  }

  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email!");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough!");
  }

  const userExistsQuery = {
    name: "fetch-user",
    text: "SELECT EXISTS(SELECT 1 FROM logins WHERE email=$1)",
    values: [email],
  };
  const userExistsResult = await pool.query(
    userExistsQuery.text,
    userExistsQuery.values
  );
  if (userExistsResult.rows[0].exists) {
    throw Error("User with email already exists!", { cause: "USER_EXISTS" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const createUserQuery = {
    name: "create-user",
    text: "INSERT INTO logins (email, password, created_at) VALUES ($1, $2, $3) RETURNING login_id",
    values: [email, hash, new Date()],
  };

  const createUserResult = await pool.query(
    createUserQuery.text,
    createUserQuery.values
  );
  const loginId = createUserResult.rows[0].login_id;

  const insertUserDetails = {
    name: "insert-user-details",
    text: "INSERT INTO users (first_name, last_name, login_id, is_active, username, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id",
    values: [firstName, lastName, loginId, true, username, new Date()],
  };

  const insertUserDetailsResult = await pool.query(
    insertUserDetails.text,
    insertUserDetails.values
  );
  const userId = insertUserDetailsResult.rows[0].user_id;

  return { userId, email, firstName, lastName, username };
};

userSchema.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled!");
  }

  const getUserQuery = {
    name: "get-user-with-email",
    text: "SELECT * FROM logins WHERE email=$1",
    values: [email],
  };

  const getUserResult = await pool.query(
    getUserQuery.text,
    getUserQuery.values
  );
  if (!getUserResult.rowCount) {
    throw Error("Incorrect Email!");
  }

  const user = {};
  user.loginId = getUserResult.rows[0].login_id;
  user.password = getUserResult.rows[0].password;
  user.email = getUserResult.rows[0].email;

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid login credentials!");
  }

  // Get user Details from users table
  const getUserByLoginIdQuery = {
    name: "get-user-details",
    text: "SELECT user_id, first_name, last_name, dob, is_active, username from users where login_id = $1",
    values: [user.loginId],
  };

  const getUserDetails = await pool.query(
    getUserByLoginIdQuery.text,
    getUserByLoginIdQuery.values
  );

  if (getUserDetails.rowCount) {
    let currentUserRow = getUserDetails.rows[0];

    user.userId = currentUserRow.user_id;
    user.firstName = currentUserRow.first_name;
    user.lastName = currentUserRow.last_name;
    user.dob = currentUserRow.dob;
    user.username = currentUserRow.username;

    return {
      loginId: user.loginId,
      email: user.email,
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      username: user.username,
    };
  }
};

userSchema.searchUsername = async function (username) {
  if (!username) {
    throw Error("Please provide a valid username!");
  }

  const getUsernameQuery = {
    name: "search-username",
    text: "SELECT EXISTS(SELECT 1 FROM users WHERE username=$1)",
    values: [username],
  };

  const getUsernameResult = await pool.query(
    getUsernameQuery.text,
    getUsernameQuery.values
  );
  console.log(getUsernameResult);
  if (!getUsernameResult.rowCount) {
    throw Error("Username not found!", { cause: "USERNAME_DOES_NOT_EXISTS" });
  }

  return { usernameExists: getUsernameResult.rows[0].exists };
};

userSchema.getUserById = async function (id) {
  if (!id) {
    throw Error("Please provide a valid login Id!");
  }

  const getUserByIdQuery = {
    name: "get-user-details",
    text: "SELECT user_id, first_name, last_name, dob, is_active, username, login_id from users where user_id = $1",
    values: [id],
  };

  const getUserDetails = await pool.query(
    getUserByIdQuery.text,
    getUserByIdQuery.values
  );

  if (!getUserDetails.rowCount) {
    throw Error("User not found!", { cause: "USER_NOT_FOUND" });
  }

  let currentUserRow = getUserDetails.rows[0];
  let user = {};
  user.userId = currentUserRow.user_id;
  user.firstName = currentUserRow.first_name;
  user.lastName = currentUserRow.last_name;
  user.dob = currentUserRow.dob;
  user.username = currentUserRow.username;
  user.loginId = currentUserRow.login_id;
  user.isActive = currentUserRow.is_active;

  return user;
};

module.exports = userSchema;
