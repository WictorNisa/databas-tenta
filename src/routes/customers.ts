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

