import Task from '../models/taskModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from './../utils/appError.js'

// @desc      Get tasks
// @route     GET /api/tasks
// @access    Private

const getTasks = catchAsync(async (req, res,next) => {

    const tasks = await Task.find( { user: req.user._id } )

    res.json({
        tasks
    })
})

// @desc      Create task
// @route     POST /api/tasks
// @access    Private

const createTask = catchAsync(async (req, res,next) => {
  
    const {
      description,
      priority
    } = req.body

    if(!description || description.trim()==='')
    {
        return next(new AppError('Please provide a description', 400));
    }

    const allowedPriority= [ 'low', 'moderate' , 'high' ]

    if(!allowedPriority.includes(priority))
    {
        return next(new AppError('Please provide a valid priority', 400));
    }

    const createdTask = await Task.create({
        user: req.user._id,
        description,
        priority
    })
  
    res.status(201).json(createdTask)
})

// @desc      Get task
// @route     GET /api/task/:id
// @access    Private

const getTask = catchAsync(async (req, res,next) => {

    const taskId= req.params.id

    const task = await Task.findOne({ _id: taskId, user: req.user._id})

    if(!task)
    {
        return next(new AppError('No task found with that Id', 404));
    }

    res.json(task)
})

// @desc      Update task
// @route     PATCH /api/task/:id
// @access    Private

const updateTask = catchAsync(async (req, res,next) => {
    
    const updates= Object.keys(req.body)

    const allowedUpdates= [ 'description' ];

    const isValidOperation= updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation)
    {
        return next(new AppError('Invalid updates!', 400));
    }

    const taskId= req.params.id

    const task = await Task.findOneAndUpdate({ _id: taskId, user:req.user._id }, req.body ,{ new: true, runValidators: true })
    
    if(!task)
    {
        return next(new AppError('No task found with that Id', 404));
    }

    res.json(task)
})

// @desc      Delete task
// @route     DELETE /api/task/:id
// @access    Private

const deleteTask = catchAsync(async (req, res,next) => {
  
    const taskId= req.params.id

    const task = await Task.findOneAndDelete({ _id: taskId, user: req.user._id })

    if(!task)
    {
        return next(new AppError('No task found with that Id', 404));
    }

    res.send("task deleted")
})

export{
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}