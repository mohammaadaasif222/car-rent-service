import express from 'express';
import { updateAgency, deleteAgency, getAgency, getAgencyListings} from '../controllers/agency.controller.js';
import { verifyAgencyToken } from '../utils/verifyAgency.js';


const router = express.Router();


router.post('/update/:id', verifyAgencyToken, updateAgency)
router.delete('/delete/:id', verifyAgencyToken, deleteAgency)
router.get('/listings/:id', verifyAgencyToken, getAgencyListings)
router.get('/:id', verifyAgencyToken, getAgency)

export default router;