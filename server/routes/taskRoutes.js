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

router.route('/task/:id').get(protect,getTask).patch(protect,updateTask).delete(protect,deleteTask)
router.route('/task').post(protect,createTask)
router.route('/tasks').get(protect,getTasks)

export default router
