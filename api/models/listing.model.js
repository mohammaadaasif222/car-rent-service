import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    rentalPrice: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    transmission: {
      type: String,
      enum: ['Automatic', 'Manual'],
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    features:{
      type: Array,
      default:[]
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    agencyRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
