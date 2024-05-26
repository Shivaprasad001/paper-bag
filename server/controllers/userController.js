const pool = require('../database');
const User = require('../models/userModel');

const loginUser = (req, res) => {
    console.log('inside loginUser');
}

const signupUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.signUp(email, password);
        res.status(200).send({"status": "success"});  
    } catch (error) {
        res.status(409).send({"message": error.message}); 
    }
}

module.exports = {loginUser, signupUser}