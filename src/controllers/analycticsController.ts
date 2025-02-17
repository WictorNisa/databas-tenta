import db from "../db";
import { Request, Response, NextFunction } from 'express'



// @desc /GET average rating from each product
// @route /reviews/stats
export const getAvgProductRating = (req: Request, res: Response, next: NextFunction) => {
    try {
        const stmt = db.prepare(`
        SELECT 
		    products.name AS Product_Name,
            AVG(reviews.rating) AS Avg_Rating
        FROM products
        JOIN reviews ON reviews.product_id = products.id
        GROUP BY products.name
            `)
        const products = stmt.all()
        //Return data back to client
        console.log(products)
        res.status(201).json(products)

    } catch (error) {
        //Type the error as Error 
        const err = error as Error;
        console.error(`Error getting average price of product:${err}`);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: err.message });
    }
}

