const { StatusCodes } = require('http-status-codes')

//  basically stauts code is a 3 digit no. sent by a server in response to a request from the fronted or client
//It tells the client what happened on the server side — whether the request was successful, failed, or had an error. like 404 not found ( resources missing)

const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors')

//BadRequestError->Custom error for missing fields like email/password.
// UnauthenticatedError->Custom error used when login credentials are invalid.

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const passwordCompare = await user.comparePassword(password)

  if (!passwordCompare) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const token = user.createToken()

  res.status(StatusCodes.OK).json({ name: user.name, token })
}
// here we are trying to login 
// we use async function becz many task in backend take time (asynchronous) like fetching from databse api calls,reading writing files  
  // await  that pauses the line until the task is finished then continues

const register = async (req, res) => {
  const user = await User.create(req.body)
  const token = user.createToken()
  res.status(StatusCodes.CREATED).json({ name: user.name, token })
}

module.exports = { login, register }