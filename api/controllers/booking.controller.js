import Booking from "../models/booking.model.js";

export const createBooking = async (req, res) => {
  console.log(req.body);
  try {
    const {
      agencyRef,
      details,
      listingRef,
      startDate,
      endDate,
      totalPrice,
    } = req.body;

    const booking = new Booking({
      user: req.user.id,
      listingRef,
      agencyRef,
      details,
      startDate,
      endDate,
      totalPrice,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Function to get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getAgencyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ agencyRef: req.agency.id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Other booking-related controller functions
