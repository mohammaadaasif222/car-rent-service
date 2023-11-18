import express from 'express';
import { createBooking, getAgencyBookings, getUserBookings } from '../controllers/booking.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAgencyToken } from '../utils/verifyAgency.js';
const router = express.Router()

router.post('/create', verifyToken, createBooking )
router.get('/agency/get', verifyAgencyToken, getAgencyBookings)
router.get('/user/get', verifyToken, getUserBookings)

export default router;