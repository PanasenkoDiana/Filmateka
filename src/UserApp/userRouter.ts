import { Router } from "express"
import personsController from './userController'

const router = Router()

router.get('/', personsController.getAllUsers)
router.get('/:id', personsController.getUserById)
router.post('/create', personsController.createUser)
router.post('/delete', personsController.deleteUser)


export default router