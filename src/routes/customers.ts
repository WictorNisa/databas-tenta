import { Router } from 'express'
import { getCustomerById, updateCustomerById, getAllOrdersFromCustomerById } from '../controllers/customersController'
const router = Router()


//Get information of customer and their order history with id
router.get('/:id', getCustomerById)


//Update(PUT) information of a customer with customer id
router.put('/:id',updateCustomerById)

// Get all orders from a specific customer with id
router.get('/:id/orders', getAllOrdersFromCustomerById)




export default router

//SALSTENTA KOMMER BESTÅ AV::

//ER DIAGRAM SOM INTE ÄR HELT IFYLLD, UPPGIFTEN ÄR ATT FYLLA I RÄTT RELATIONER, FOREGIN KEYS, PRIMARY KEYS OSV.
//FRÅGOR OM DIVERSE OLIKA CONTRSTAINS, VILKEN RELATION MAN SKA HA I VILKA FALL. ONE TO MANY, MANY TO MANY, MANY TO ONE
//FÄRRE FRITEXT FRÅGOR, MINDRE SKRIVA, MER FYLLA I
