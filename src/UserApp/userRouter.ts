import { Router } from "express"
import personsController from './userController'

const router = Router()

router.get('/user/:id', personsController.getUserById)
router.post('/user/create', personsController.createUser)

export default router