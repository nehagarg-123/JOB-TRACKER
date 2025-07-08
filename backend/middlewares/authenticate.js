const { UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')//Library used to verify JWT tokens sent by the frontend.

const authenticate = (req, res, next) => {//
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication Failed')
  }

  const token = authHeader.split(' ')[1]//split(' ') separates the word Bearer and the actual token.

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: decoded.userId, name: decoded.name }
    next()
  } catch (err) {
    throw new UnauthenticatedError('Authentication Failed')
  }
}// jwt token->json web token  ->structure=header,payload,signature

//Step	What It Does
// 1️	Checks for token in Authorization header
// 2️	Splits the token from "Bearer "
// 3️	Verifies token using jwt.verify()
// 4️	Attaches userId and name to req.user
// 	Calls next() if successful->lets continue to the next route
// 	Throws 401 error if token is missing/invalid

module.exports = authenticate