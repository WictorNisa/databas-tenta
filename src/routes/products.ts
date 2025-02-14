import express from 'express'
import { Router } from 'express'
import { getAllProducts, getProductById, getProductsByName, getCategoryById } from '../controllers/productsController'

const router = Router()

//GET all products, categories -and manufacturer details for each product

router.get('/', getAllProducts)

//GET products based on a search term
router.get('/search', getProductsByName )


//GET a specific product based on ID
router.get('/:id', getProductById)

//GET all products from a specific category
router.get('/category/:categoryId', getCategoryById)




export default router;