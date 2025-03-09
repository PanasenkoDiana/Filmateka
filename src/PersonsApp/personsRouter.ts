import { Router } from 'express'
import personsController from './personsController'

const router = Router()

router.get('/', personsController.getAllPersons)
router.get('/:id', personsController.getPersonById)

export default router