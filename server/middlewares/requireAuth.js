const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.send(401).json({ message: "Authorization token required!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { loginId } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(loginId, "loginId inside requireAuth");

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
        
        let user = {};
        user.userId = currentUserRow.user_id;
        user.firstName = currentUserRow.first_name;
        user.lastName = currentUserRow.last_name;
        user.dob = currentUserRow.dob;
        user.username = currentUserRow.username;
      
        req.user = user;
    }
  } catch (error) {}
};
