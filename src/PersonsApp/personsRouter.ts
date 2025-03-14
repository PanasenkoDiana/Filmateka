import { Router } from 'express'
import personsController from './personsController'

const router = Router()

router.get('/', personsController.getAllPersons)
router.get('/:id', personsController.getPersonById)

router.post('/create', personsController.createPerson)
router.post('/delete', personsController.deletePersonById)

export default router