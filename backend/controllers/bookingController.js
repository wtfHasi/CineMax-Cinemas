import Booking from '../models/booking.js';
import Showtime from '../models/showtime.js';
import User from '../models/user.js';
import sequelize from '../config/database.js';

const BookingController = {
  createBooking: async (req, res) => {
    try {
      const { user_id, showtime_id, seat_numbers, seating_type } = req.body;

      // Start a transaction
      const transaction = await sequelize.transaction();

      // Fetch showtime details
      const showtime = await Showtime.findOne({ where: { showtime_id }, transaction });
      if (!showtime) return res.status(404).json({ message: 'Showtime not found' });

      // Determine seat count
      const seatCount = seat_numbers.split(',').length;

      // Check seat availability & update remaining seats
      let seatPrice;
      if (seating_type === 'Lower Hall') {
        if (showtime.lower_hall_seats < seatCount) return res.status(400).json({ message: 'Not enough Lower Hall seats available' });
        showtime.lower_hall_seats -= seatCount;
        seatPrice = showtime.base_price;
      } else if (seating_type === 'Upper Gallery') {
        if (showtime.upper_gallery_seats < seatCount) return res.status(400).json({ message: 'Not enough Upper Gallery seats available' });
        showtime.upper_gallery_seats -= seatCount;
        seatPrice = showtime.base_price * 1.2;
      } else if (seating_type === 'VIP') {
        if (showtime.vip_seats < seatCount) return res.status(400).json({ message: 'Not enough VIP seats available' });
        showtime.vip_seats -= seatCount;
        seatPrice = showtime.base_price * 1.44;
      } else {
        return res.status(400).json({ message: 'Invalid seating type' });
      }

      // Calculate total price
      const total_price = seatCount * seatPrice;

      // Save updates
      await showtime.save({ transaction });
      const booking = await Booking.create({ user_id, showtime_id, seat_numbers, seating_type, total_price }, { transaction });

      // Commit transaction
      await transaction.commit();

      res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
      console.error(error);
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