import db from "../db";
import { Request, Response, NextFunction } from 'express'


//Define a type for the product
interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    category_id: number,
    manufactor_id: number
}



// @desc //GET all products, categories -and manufacturer details for each product
// @route /products
export const getAllProducts = (req: Request, res: Response, next: NextFunction): void => {

    try {
        let query = `
        SELECT products.name AS Product_Name, categories.name AS Category, categories.id AS Category_id, manufactors.name AS
          Manufacturer_Name, products.image_path AS Img, products.price AS Price, products.description AS Description
          FROM products
          JOIN categories ON products.category_id = categories.id
          JOIN manufactors ON products.manufactor_id = manufactors.id
        `;

        const conditions = [];
        const params = [];

        if (req.query.minPrice) {
            conditions.push('products.price >= ? ')
            params.push(req.query.minPrice)
        }

        if (req.query.maxPrice) {
            conditions.push('products.price <= ?')
            params.push(req.query.maxPrice)
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ')
        }


        const stmt = db.prepare(query);
        const products = stmt.all(params);
        console.log(products);
        //Send back the products object as JSON to the client
        res.status(201).json(products);
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
export const getProductById = (req: Request, res: Response, next: NextFunction): void => {
    try {
        //Parse id into an integer
        const id = Number(req.params.id);

        //Validate input
        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({ error: "Invalid product ID format" });
            return;
        }
        //Pepare and execute query
        const stmnt = db.prepare("SELECT * FROM products WHERE id = ?");
        const product = stmnt.get(id) as Product | undefined;

        //Check if the product is found
        if (!product) {
            res.json({ Msg: `No product where found with ID of ${id}` });
            console.log(`No product where found with ID of ${id}`);
            return;
        }
        //Send back the products object as JSON to the client
        res.status(201).json(product);
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
        res.status(201).json(products);
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

        const stmnt = db.prepare(`SELECT products.name AS Product_Name, categories.name AS Category, products.image_path AS Img
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
        res.status(201).json(products);
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
        let {
            name,
            description,
            price,
            stock,
            category_id,
            manufactor_id
        } = req.body


        //Parse price into an integer
        price = parseInt(price)


        //Validate that all required fields are present
        if (!name || !description || !price || !stock || !category_id || !manufactor_id) {
            res.status(400).json({
                error: 'Missing required fields'
            })
        }

        //Validate that price is bigger than 0
        if (price <= 0) {
            res.status(400).json({
                error: 'Price must be bigger than 0'
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
        let {
            price,
            stock,
        } = req.body

        //Parse price into an integer
        price = parseInt(price)
        //Validate that all required fields are present
        if (!price || !stock) {
            res.status(400).json({
                error: 'Missing required fields'
            })
        }

        //Validate that price is bigger than 0
        if (price <= 0) {
            res.status(400).json({
                error: 'Price must be bigger than 0'
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

// @GET data analytics grouped by categories
// @route /products/stats
export const getDataAboutProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        const stmt = db.prepare(`
        SELECT 
            categories.name AS Category_Name, 
            COUNT(products.id) AS Product_Count, 
            AVG(products.price) AS Avg_Price
        FROM products
        JOIN categories ON products.category_id = categories.id
        GROUP BY categories.name;
            `)

        const products = stmt.all();
        console.log(products);
        //Send back the products object as JSON to the client
        res.status(201).json(products);
    } catch (error) {
        //Type the error as Error 
        const err = error as Error;
        console.error(`Error getting data about products:${err}`);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: err.message });
    }
}

