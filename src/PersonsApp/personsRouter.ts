import { Router } from 'express'
import personsController from './personsController'

const router = Router()

router.get('/persons', personsController.getAllPersons)
router.get('/person/:id', personsController.getPersonById)
router.delete('/persons/:id', personsController.deletePerson)
router.post('/persons', personsController.createPerson)
router.put('/persons/:id', personsController.updatePerson)




export default router