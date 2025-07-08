class CustomAPIError extends Error {
  // here creating own error class that extend the built in error class in js
  constructor(message) {// using constructor->it receives an error message when you throw it (like 'job not found')
    super(message)// the passes the msg to the base error class so it behaves like a real errpr
  }
}

module.exports = CustomAPIError