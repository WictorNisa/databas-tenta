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
        //Send back the products object as JSON to the client
        res.json(products);
    } catch (error) {
        //Type the error as Error 
        const err = error as Error;
        console.error("Error fetching products:", err.message);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: err.message });
    }
}

// @desc GET a specific product based on ID
// @route /products/:id
export const getProductById = (req: Request, res: Response, next: NextFunction) => {
    try {
        //Parse id into an integer
        const id = parseInt(req.params.id, 10);

        //Validate input
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Invalid ID formatting");
        }
        const stmnt = db.prepare("SELECT * FROM products WHERE id = ?");
        const product = stmnt.get(id);

        //Check if the product is found
        if (!product) {
            res.json({ Msg: `No product where found with ID of ${id}` });
            console.log(`No product where found with ID of ${id}`);
            return;
        }
        //Send back the products object as JSON to the client
        res.json(product);
    } catch (error) {
        //Type the error as Error 
        const err = error as Error;
        console.error(`Error fetching product with id of ${req.params.id}`);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: err.message });
    }
}
// @GET all products that contain the name query
// @route /products/search?name=:name

export const getProductsByName = (req: Request, res: Response, next: NextFunction) => {

    try {
        const searchTerm = `%${req.query.name}%`;
        console.log('Request query:', req.query);

        const stmt = db.prepare('SELECT * FROM products WHERE name LIKE ? ')
        const products = stmt.all(searchTerm)

        if (products.length === 0) {
            res.json({ Msg: `No products where found with the name of ${searchTerm}` });
            console.log(`No products where found with name of ${searchTerm}`);
            return;
        }

        //Send back the products object as JSON to the client
        res.json(products);
    } catch (error) {
        //Type the error as Error 
        const err = error as Error;
        console.error(`Error fetching product with search term `);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: err.message });
    }
}
// @GET all products from a specific category with id
// @route /products/category/categoryId
export const getCategoryById = (req: Request, res: Response, next: NextFunction) => {
    try {
        //Parse id into an integer
        const id = parseInt(req.params.categoryId, 10);

        //Validate input
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Invalid ID formatting");
        }

        const stmnt = db.prepare(`SELECT products.name AS Product_name, categories.name AS category 
            FROM products
            JOIN categories ON products.category_id = categories.id
            WHERE categories.id = ?`);
        const products = stmnt.all(id);

        //Check if the product is found
        if (products.length === 0) {
            res.json({ Msg: `No product where found in the category with the ID of ${id}` });
            console.log(`No product where found with ID of ${id}`);
            return;
        }

        //Send data to the client
        console.log(products)
        res.json(products);
    } catch (error) {
        //Type the error as Error 
        const err = error as Error;
        console.error(`Error fetching category with id`);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: err.message });
    }
}

// @POST a new product to the database
// @route /products
export const postNewProduct = (req: Request, res: Response, next: NextFunction) => {
    try {

        //Destructure the required fields from req.body
        const {
            name,
            description,
            price,
            stock,
            category_id,
            manufactor_id
        } = req.body


        //Validate that all required fields are present
        if (!name || !description || !price || !stock || !category_id || !manufactor_id) {
            res.status(400).json({
                error: 'Missing required fields'
            })
        }

        //Insert the new product into the database
        const stmt = db.prepare(`
            INSERT INTO products (name, description, price, stock, category_id, manufactor_id )
            VALUES (?,?,?,?,?,?)
            `)

        const result = stmt.run(name, description, price, stock, category_id, manufactor_id)

        //Send back success response to the client
        res.status(201).json({
            msg: 'Product created successfully',
            productId: result.lastInsertRowid
        })
        console.log(result)

    } catch (error) {
        //Type the error as Error 
        const err = error as Error;
        console.error(`Error creating new product:${err}`);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: err.message });
    }
}

// @PUT a existing product on the database
// @route /products/:id
export const updateProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        //Parse id into an integer
        const id = parseInt(req.params.id, 10);

        //Validate input
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Invalid ID formatting");
        }

        //Destructure the required fields from req.body
        const {
            price,
            stock,
        } = req.body


        //Validate that all required fields are present
        if (!price || !stock) {
            res.status(400).json({
                error: 'Missing required fields'
            })
        }

        //Update product 
        const stmt = db.prepare(`
            UPDATE products SET price = ? , stock = ? WHERE id = ?
            `)

        const result = stmt.run(price, stock, id)

        //Send back success response to the client
        res.status(201).json({
            msg: 'Updated product successfully',
            productId: result.lastInsertRowid
        })
        console.log(result)

    } catch (error) {
        //Type the error as Error 
        const err = error as Error;
        console.error(`Error updating product:${err}`);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: err.message });
    }
}


// @DELETE a existing product on the database
// @route //products/:id

export const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        //Parse id into an integer
        const id = parseInt(req.params.id, 10);

        //Validate input
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Invalid ID formatting");
        }

        const stmt = db.prepare(`DELETE FROM products WHERE id = ?`)
        const result = stmt.run(id)


        //Send back success response to the client
        res.status(201).json({
            msg: 'Removed product successfully'

        })
        //Log the result of the operation to the console
        console.log(result)
    } catch (error) {
        //Type the error as Error 
        const err = error as Error;
        console.error(`Error deleting product:${err}`);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: err.message });
    }
}

