import express from 'express'
import { Router } from 'express'
import { getAllProducts, getProductById, getProductsByName, getCategoryById, postNewProduct, updateProduct, deleteProduct, getDataAboutProduct } from '../controllers/productsController'

const router = Router()

//GET all products, categories -and manufacturer details for each product

router.get('/', getAllProducts)

//GET data analytics grouped by categories
router.get('/stats', getDataAboutProduct)

//GET products based on a search term
router.get('/search', getProductsByName)


//GET a specific product based on ID
router.get('/:id', getProductById)

//GET all products from a specific category
router.get('/category/:categoryId', getCategoryById)


//Create a new product
router.post('/', postNewProduct)


//Update a existing product
router.put('/:id', updateProduct)


//Update a existing product
router.delete('/:id', deleteProduct)




export default router;