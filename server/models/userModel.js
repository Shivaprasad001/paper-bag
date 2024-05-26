const bcrypt = require('bcrypt');
const validator = require('validator');
const pool = require('../database');

const userSchema = {};

userSchema.signUp = async function(email, password) {
    console.log('entered signUp inside model');

    // Validation
    if(!email || !password) {
        throw Error('Email or Password is empty!');
    }

    if(!validator.isEmail(email)) {
        throw Error('Please enter a valid email!');
    }
    console.log(!validator.isStrongPassword(password), 'password validator');
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough!');
    }
    
    const userExistsQuery = {
        name: 'fetch-user',
        text: 'SELECT EXISTS(SELECT 1 FROM logins WHERE email=$1)',
        values:[email]
    }
    const userExistsResult = await pool.query(userExistsQuery.text, userExistsQuery.values);
    if(userExistsResult.rows[0].exists) {
        throw Error('User with email already exists!');
    }

    const createUserQuery = {
        name: 'create-user',
        text: 'INSERT INTO logins (email, password_hash, created_at) VALUES ($1, $2, $3)',
        values:[email, password, new Date()]
    }

    const createUserResult = await pool.query(createUserQuery.text, createUserQuery.values);
    console.log(createUserResult);

    return 1;
}

module.exports = userSchema;