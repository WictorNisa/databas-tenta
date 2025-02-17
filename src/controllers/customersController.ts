import db from "../db";
import { Request, Response, NextFunction } from 'express'


// @desc GET information of customer and their order history with customer id
// @route customers/:id

export const getCustomerById = (req: Request, res: Response, next: NextFunction) => {
    try {
        //Parse id into an integer
        const id = parseInt(req.params.id, 10);

        //Validate input
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Invalid ID formatting");
        }
        const stmt = db.prepare(`
            SELECT customers.name AS Customer_Name, customers.email AS Customer_Email, customers.phone AS
            Customer_Phone, customers.delivery_adress AS Customer_Delivery_Adress,
            orders.shippment_status AS Shippment_Status, orders.shippment_choice AS Shippment_Choice,
            orders.order_date AS Order_Date, orders.order_adress AS Order_Adress,  orders.quantity AS Quantity
            FROM customers
            JOIN orders ON orders.customer_id = customers.id
            WHERE customers.id = ?
           `)
        const customer = stmt.all(id)

        //Check if there is a customer with the provided id
        if (!customer) {
            res.json({
                msg: `No customer found with the id of ${id}`
            }); console.log(`No customer found with the id of ${id}`)
        }
        //Send back data to client
        res.status(201).json(customer)
        console.log(customer)

    } catch (error) {
        //Type the error as Error
        const err = error as Error;
        console.log(`Error fetching customer, ${err.message}`)
        res.status(500).json({
            error: 'Internal Server Error',
            details: err.message
        })
    }
}

// @desc PUT information of customer and with customer id
// @route customers/:id

export const updateCustomerById = (req: Request, res: Response, next: NextFunction) => {
    try {
        //Parse id into an integer
        const id = parseInt(req.params.id, 10);

        //Validate input
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Invalid ID formatting");
        }

        //Destructure the required fields from req.body
        const {
            name,
            email,
            phone,
        } = req.body

        //Validate that all required fields are present
        if (!name || !email || !phone) {
            res.status(400).json({
                error: 'Missing required fields'
            })
        }

        //Update customer
        const stmt = db.prepare(`
            UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?
            `)
        const customer = stmt.run(name, email, phone, id)

        //Send back success response to the client
        res.status(201).json({
            msg: 'Updated customer successfully',
            id: customer.lastInsertRowid
        })
        console.log(customer)
    } catch (error) {
        //Type the error as Error
        const err = error as Error;
        console.log(`Error updating customer, ${err.message}`)
        res.status(500).json({
            error: 'Internal Server Error',
            details: err.message
        })
    }
}

// @GET all orders for a specific customer with id
// @route /:id/orders

export const getAllOrdersFromCustomerById = (req: Request, res: Response, next: NextFunction) => {
    try {
        //Parse id into an integer
        const id = parseInt(req.params.id, 10);

        //Validate input
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Invalid ID formatting");
        }

        const stmt = db.prepare(`
            SELECT 
            customers.name AS Customer_Name, 
            orders.order_date AS Order_Date, 
            orders.order_adress AS Order_Adress,
            orders.quantity AS Quantity,
            orders.shippment_status AS Shippment_Status, 
            orders.shippment_choice AS Shippment_Choice
            FROM orders
            JOIN customers ON orders.customer_id = customers.id
            WHERE customers.id = ?
            `)
        const customer = stmt.all(id)

        //Check if the product is found
        if (customer.length === 0) {
            res.json({ Msg: `Customer with id of ${id} hasnt made any orders yet` });
            console.log(`Customer with id of ${id} hasnt made any orders yet`);
            return;
        }
        //Send back the products object as JSON to the client
        res.status(201).json(customer);
        console.log(customer)
    } catch (error) {
        //Type the error as Error 
        const err = error as Error;
        console.error(`Error deleting product:${err}`);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: err.message });
    }
}