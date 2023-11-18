import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {

  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = await User.findById(user.id);

    next();
  });
};
