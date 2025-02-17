import { Router } from 'express'
import { getAvgProductRating } from '../controllers/analycticsController'
const router = Router()



//GET average rating per product
router.get('/stats', getAvgProductRating)









export default router