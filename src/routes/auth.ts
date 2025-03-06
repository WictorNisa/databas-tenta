import { Router } from 'express';
import { registerNewUser, loginUser } from '../controllers/authController';
const router = Router();

// Register a user to the database
router.post('/register', registerNewUser);

// Login a user
router.post('/login', loginUser);

export default router;