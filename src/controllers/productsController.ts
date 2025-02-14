import db from "../db";
import { Request, Response, NextFunction } from 'express'


// @desc //GET all products, categories -and manufacturer details for each product
// @route /products
export const getAllProducts = (req: Request, res: Response, next: NextFunction) => {
    try {
        const stmt = db.prepare(
            `
          SELECT products.name AS Product_Name, categories.name AS Category, manufactors.name AS
          Manufacturer_Name
          FROM products
          JOIN categories ON products.category_id = categories.id
          JOIN manufactors ON products.manufactor_id = manufactors.id
          `
        );
        const products = stmt.all();
        console.log(products);
        res.json(products);
    } catch (error) {
        const err = error as Error;
        console.error("Error fetching products:", err.message);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: err.message });
    }
}