import bcryptjs from 'bcryptjs';
import Agency from '../models/agency.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';



export const updateAgency = async (req, res, next) => {
  if (req.agency.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedAgency = await Agency.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedAgency._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteAgency = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await 
    Agency.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('Agency has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const getAgencyListings = async (req, res, next) => {
  if (req.agency.id === req.params.id) {
    try {
      const listings = await Listing.find({ agencyRef: req.params.id });
      console.log(listings);
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
};

export const getAgency = async (req, res, next) => {
  try {
    
    const user = await 
    Agency.findById(req.params.id);
  
    if (!user) return next(errorHandler(404, 'Agency not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
