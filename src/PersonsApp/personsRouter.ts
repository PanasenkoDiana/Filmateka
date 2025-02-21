import { Router } from 'express'
import personsController from './personsController'

const router = Router()

router.get('/persons', personsController.getAllPersons)
router.get('/person/:id', personsController.getPersonById)

export default router