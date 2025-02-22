import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BookingController = {
  createBooking: async (req, res) => {
    try {
      const { user_id, showtime_id, seat_numbers, seating_type } = req.body;
      const showtime = await prisma.showtime.findUnique({ where: { showtime_id } });
      if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
      const seatCount = seat_numbers.split(',').length;
      let seatPrice;
      if (seating_type === 'Lower Hall') {
        if (showtime.lower_hall_seats < seatCount) return res.status(400).json({ message: 'Not enough Lower Hall seats available' });
        await prisma.showtime.update({ where: { showtime_id }, data: { lower_hall_seats: showtime.lower_hall_seats - seatCount } });
        seatPrice = showtime.base_price;
      } else if (seating_type === 'Upper Gallery') {
        if (showtime.upper_gallery_seats < seatCount) return res.status(400).json({ message: 'Not enough Upper Gallery seats available' });
        await prisma.showtime.update({ where: { showtime_id }, data: { upper_gallery_seats: showtime.upper_gallery_seats - seatCount } });
        seatPrice = showtime.base_price * 1.2;
      } else if (seating_type === 'VIP') {
        if (showtime.vip_seats < seatCount) return res.status(400).json({ message: 'Not enough VIP seats available' });
        await prisma.showtime.update({ where: { showtime_id }, data: { vip_seats: showtime.vip_seats - seatCount } });
        seatPrice = showtime.base_price * 1.44;
      } else {
        return res.status(400).json({ message: 'Invalid seating type' });
      }
      const total_price = seatCount * seatPrice;
      // Create Booking inside a transaction
      const booking = await prisma.$transaction(async (prisma) => {
        return await prisma.booking.create({
          data: { user_id, showtime_id, seat_numbers, seating_type, total_price }
        });
      });
      res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  cancelBooking: async (req, res) => {
    try {
      const { id } = req.params;

      // Find booking
      const booking = await prisma.booking.findUnique({ where: { booking_id: Number(id) } });
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
      const showtime = await prisma.showtime.findUnique({ where: { showtime_id: booking.showtime_id } });
      // Restore seats
      const seatCount = booking.seat_numbers.split(',').length;
      if (booking.seating_type === 'Lower Hall') {
        await prisma.showtime.update({
          where: { showtime_id: booking.showtime_id },
          data: { lower_hall_seats: showtime.lower_hall_seats + seatCount }
        });
      } else if (booking.seating_type === 'Upper Gallery') {
        await prisma.showtime.update({
          where: { showtime_id: booking.showtime_id },
          data: { upper_gallery_seats: showtime.upper_gallery_seats + seatCount }
        });
      } else if (booking.seating_type === 'VIP') {
        await prisma.showtime.update({
          where: { showtime_id: booking.showtime_id },
          data: { vip_seats: showtime.vip_seats + seatCount }
        });
      }
      await prisma.booking.delete({ where: { booking_id: Number(id) } });
      res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllBookings: async (req, res) => {
    try {
      const bookings = await prisma.booking.findMany({
        include: {
          user: { select: { username: true, role: true } },
          showtime: {
            include: { film: true, screen: { include: { cinema: true } } }
          }
        }
      });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default BookingController;