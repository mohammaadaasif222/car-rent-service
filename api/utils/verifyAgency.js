import jwt from 'jsonwebtoken';
import Agency from '../models/agency.model.js';
import { errorHandler } from './error.js';

export const verifyAgencyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, async (err, agency) => {
    if (err) return next(errorHandler(403, 'Forbidden'));
   
   
    req.agency = await Agency.findById(agency.id);

    next();
  });
};
