const { StatusCodes } = require('http-status-codes')
const { CustomAPIError } = require('../errors')

const errorHandler = (err, req, res, next) => {// this is the special express middleware it catches all errors  thrown anywhere in app
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })// internal server arror (null pointer)
}

module.exports = errorHandler