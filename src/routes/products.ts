import express from 'express'
import { Router } from 'express'
import { getAllProducts } from '../controllers/productsController'

const router = Router()

//GET all products, categories -and manufacturer details for each product

router.get('/', getAllProducts)

export default router;