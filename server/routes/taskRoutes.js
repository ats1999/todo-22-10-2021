import express from 'express'
const router = express.Router()
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getTask
} from '../controllers/taskController.js'
import { protect } from '../middlewares/authMiddleware.js'

router.route('/:id').get(protect,getTask).patch(protect,updateTask).delete(protect,deleteTask)

router.route('/').get(protect,getTasks).post(protect,createTask)

export default router
