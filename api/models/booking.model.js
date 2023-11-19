import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  customer: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  listingRef: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  agencyRef: {
    type: Schema.Types.ObjectId,
    ref: "Agency",
    required: true,
  },
  details: {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    rentPrice: {
      type: Number,
      required: true,
    },
    day: {
      type: String,
      required: true,
      default: 1,
    },
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});
const Booking = model("Booking", bookingSchema);

export default Booking;
