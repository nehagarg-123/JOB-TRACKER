require('express-async-errors')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const jobRoutes = require('./routes/jobs')
const authRoutes = require('./routes/auth')
const connectDB = require('./db/connect')
const errorHandler = require('./middlewares/errorHandler')
const authenticate = require('./middlewares/authenticate')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1/jobs', authenticate, jobRoutes)
app.use('/api/v1/auth', authRoutes)// authroutes contain login and register using this route we suignup /register and login using /login 
app.use(notFound)
app.use(errorHandler)

const start = async () => {
  try {
    console.log('MONGO_URI:', process.env.MONGO_URI); 
    await connectDB(process.env.MONGO_URI)
    app.listen(3000, () => console.log('Server started... on port 3000'))
  } catch (err) {
    console.log(err)
  }
}

start()