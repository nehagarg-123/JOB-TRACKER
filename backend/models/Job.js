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
    jobLink: {
    type: String,
    default: '', 
    },
    status: {
      type: String,
      enum: ['Online-Assessment','interview', 'pending', 'declined'],
      default: 'pending',
    },
    Have_Filled :{
      type:String,
      enum : ['Yes','No'],
      default: 'No',
    },
     statusDate: {
       type: Date,
       default: null,
    },
    notes: {
      type: String,
      default: '',
    },
    resumeUrl: {
      type: String,
      default: '',
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
