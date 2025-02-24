import { Router } from "express"
import personsController from './userController'

const router = Router()

router.get('/user/:id', personsController.getUserById)
router.post('/user/create', personsController.createUser)
router.post('/user/auth/', personsController.authUser)

export default router