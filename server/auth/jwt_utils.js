/**
 * helper functions for jwt 
 */
require('dotenv').config()
const jwt = require('jsonwebtoken')

function createJWT(userInfo) {
    return jwt.sign({ userInfo }, process.env.JWT_SECKEY)
}

module.exports = { createJWT }