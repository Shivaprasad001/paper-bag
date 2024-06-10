const jwt = require('jsonwebtoken');
const pool = require('../database');
const User = require('../models/userModel');

const createToken = (_id) => jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY});

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        
        // Create token
        const token = createToken(user.loginId);
        res.status(200).json({...user, token, "message": "Login Success!"});
    } catch (error) {
        res.status(400).send({"message": error.message});
    }
}

const signupUser = async (req, res) => {
    try {
        const user = await User.signUp(req.body);
        const token = createToken(user.userId);
        res.status(200).json({...user, token, "message": "User Successfuly Created!"});  
    } catch (error) {
        if(error.cause == 'USER_EXISTS') {
            res.status(409).json({"message": error.message}); 
        } else {
            res.status(400).json({"message": error.message}); 
        }
    }
}

const searchUsername = async (req, res) => {
    try {
        const { username } = req.body;
        const usernameResult = await User.searchUsername(username);
        res.status(200).json({usernameExists: usernameResult.usernameExists});
    } catch (error) {
        if(error.cause == 'USERNAME_DOES_NOT_EXISTS') {
            res.status(404).send({"message": error.message}); 
        } else {
            res.status(400).send({"message": error.message}); 
        }
    }
}

module.exports = {loginUser, signupUser, searchUsername}