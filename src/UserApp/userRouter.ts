import { Router } from 'express'
import userController from './userController'
import {authMiddleware} from './authMiddleware'

const router = Router()

// Public routes
router.post('/register', async (req, res) => {
    await userController.createUser(req, res);
})
router.post('/login', async (req, res) => {
    await userController.loginUser(req, res);
})

// Protected routes
router.use(authMiddleware)
router.get('/current', async (req, res) => {
    await userController.getCurrentUser(req, res);
})
router.get('/:id', userController.getUserById)

export default router

