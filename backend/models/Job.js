const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['Online-Assessment','interview', 'pending', 'declined'],
      default: 'pending',
    },
     statusDate: {
       type: Date,
       default: null,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Job', jobSchema)
