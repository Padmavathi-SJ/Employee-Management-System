import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { changePassword } from '../controllers/settingsController.js'

const router=express.Router()

router.put('/change-password', authMiddleware, changePassword)



export default router;