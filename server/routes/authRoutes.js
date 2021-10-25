import express from 'express'
const router = express.Router()
import {
  loginUser,
  registerUser
} from '../controllers/authController.js'


router.route('/login').post(loginUser)

router.route('/register').post(registerUser)

export default router