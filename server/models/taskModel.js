import mongoose from 'mongoose'


const taskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    priority:{
      type: String,
      required: true,
      default: 'low'
    }
  }
)

const Task = mongoose.model('Task', taskSchema)

export default Task
