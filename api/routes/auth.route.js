import express from 'express';
import { google, signOut, signin, signup, register, login } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/register", register);
router.post("/login", login);
router.post('/google', google);
router.get('/signout', signOut)

export default router;