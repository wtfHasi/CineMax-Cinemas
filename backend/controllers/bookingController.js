import Booking from '../models/Booking.js';
import Showtime from '../models/showtime.js';
import User from '../models/User.js';

const BookingController = {
  createBooking: async (req, res) => {
    try {
      const { user_id, showtime_id, seat_numbers, total_price } = req.body;

      const booking = await Booking.create({ user_id, showtime_id, seat_numbers, total_price });

      res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  cancelBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBooking = await Booking.destroy({ where: { booking_id: id } });

      if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });

      res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.findAll({
        include: [
          { model: User, attributes: ['username', 'role'] },
          { model: Showtime, include: ['Film', 'Screen'] }
        ]
      });

      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default BookingController;