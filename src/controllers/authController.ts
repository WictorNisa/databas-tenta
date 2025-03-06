import db from "../db";
import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


interface User {
    id: number,
    email: string,
    phone: string,
    password: string
}

// @desc /POST a new user to the database
// @route /auth/register
export const registerNewUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Destructure the required fields from req.body
    let { name, email, phone, password } = req.body;

    // Validate that all required fields are present
    if (!email || !password) {
        res.status(400).json({
            error: "Password and email are required"
        });
        return
    }

    try {
        // Check if the user already exists
        const existingUser = db.prepare('SELECT * FROM customers WHERE email = ?').get(email);
        if (existingUser) {
            res.status(409).json({
                error: "User already exists"
            });
            return
        }

        // Hash password
        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltrounds);

        // Insert new user
        const insert = db.prepare('INSERT INTO customers (name, email, phone, password, created_at) VALUES (?,?,?,?,?)');
        const result = insert.run(name, email, phone, hashedPassword, new Date().toISOString());

        // Send back success response to the client
        res.status(201).json({
            msg: 'Customer registered successfully',
            userId: result.lastInsertRowid
        });
    } catch (error) {
        // Type the error as Error 
        const err = error as Error;
        console.error(`Error registering user: ${err.message}`);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};

// @desc /POST user login
// @route /auth/login
export const loginUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let { email, password } = req.body;

    // Validate that all required fields are present
    if (!email || !password) {
        res.status(400).json({
            error: "Missing required fields"
        });
        return
    }

    try {
        // Get user from the database
        const user = db.prepare('SELECT * FROM customers WHERE email = ?').get(email);
        if (!user) {
            res.status(404).json({
                error: "User not found"
            });
            return
        }

        const typedUser = user as User & { name: string }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, typedUser.password);
        if (!isPasswordValid) {
            res.status(401).json({
                error: "Invalid credentials"
            });
            return
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in .env');
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: typedUser.id, email: typedUser.email, name: typedUser.name },
            jwtSecret,
            { expiresIn: '24h' } // Token expires in 24 hours
        );

        // Send response with token
        res.status(200).json({
            msg: 'Login successful',
            token: token,
            user: {
                id: typedUser.id,
                name: typedUser.name,
                email: typedUser.email
            }
        });
    } catch (error) {
        const err = error as Error;
        console.error(`Error logging in user: ${err.message}`);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};