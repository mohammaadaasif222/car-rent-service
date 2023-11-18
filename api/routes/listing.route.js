import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyAgencyToken } from '../utils/verifyAgency.js';
import { authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', verifyAgencyToken,authorizeRoles('agency'), createListing);
router.delete('/delete/:id', verifyAgencyToken,authorizeRoles('agency'), deleteListing);
router.post('/update/:id', verifyAgencyToken,authorizeRoles('agency'), updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

export default router;
