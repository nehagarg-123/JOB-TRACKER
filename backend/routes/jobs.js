const express = require('express')
const router = express.Router()
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs')

router.get('/', getAllJobs) // using get api frontend can take data 
router.get('/:id', getJob)
router.post('/', createJob)// using post api we create like job
router.patch('/:id', updateJob)// using update api we update the data
router.delete('/:id', deleteJob) // using delete api we delete the data

module.exports = router   //exports the router so you can plug it into your server.js file.