import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ShowtimeController = {
  addShowtime: async (req, res) => {
    try {
      const { film_id, screen_id, showtime } = req.body;
      const screen = await prisma.screen.findUnique({ where: { screen_id } });
      if (!screen) return res.status(404).json({ message: 'Screen not found' });
  
      // Calculate seat distribution
      const lowerHallSeats = Math.floor(screen.seating_capacity * 0.3);
      const vipSeats = Math.min(10, Math.floor(screen.seating_capacity * 0.1));
      const upperGallerySeats = screen.seating_capacity - (lowerHallSeats + vipSeats);
  
      // Generate seat data
      const seats = [];
      for (let i = 1; i <= lowerHallSeats; i++) {
        seats.push({ seating_type: 'Lower Hall', seat_number: `LH${i}` });
      }
      for (let i = 1; i <= vipSeats; i++) {
        seats.push({ seating_type: 'VIP', seat_number: `VIP${i}` });
      }
      for (let i = 1; i <= upperGallerySeats; i++) {
        seats.push({ seating_type: 'Upper Gallery', seat_number: `UG${i}` });
      }
  
      // Calculate base price based on showtime
      const hour = new Date(showtime).getHours();
      let basePrice;
      if (hour >= 8 && hour < 12) basePrice = 5; // Morning Show
      else if (hour >= 12 && hour < 18) basePrice = 6; // Afternoon Show
      else if (hour >= 18 && hour < 24) basePrice = 7; // Evening Show
      else throw new Error('Invalid showtime');
  
      // Create showtime and seats in transaction
      const newShowtime = await prisma.$transaction(async (prisma) => {
        const showtimeRecord = await prisma.showtime.create({
          data: {
            film_id,
            screen_id,
            showtime: new Date(showtime),
            base_price: basePrice, // Add the calculated base price
            lower_hall_seats: lowerHallSeats,
            upper_gallery_seats: upperGallerySeats,
            vip_seats: vipSeats
          }
        });
  
        await prisma.seat.createMany({
          data: seats.map(seat => ({
            showtime_id: showtimeRecord.showtime_id,
            ...seat,
            booking_id: null
          }))
        });
  
        return showtimeRecord;
      });
  
      res.status(201).json({ message: 'Showtime added successfully', showtime: newShowtime });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateShowtime: async (req, res) => {
    try {
      const { id } = req.params;

      const updatedShowtime = await prisma.showtime.update({
        where: { showtime_id: Number(id) },
        data: req.body
      });

      res.json({ message: 'Showtime updated successfully', updatedShowtime });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Showtime not found' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  deleteShowtime: async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.showtime.delete({ where: { showtime_id: Number(id) } });

      res.json({ message: 'Showtime deleted successfully' });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Showtime not found' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  getAllShowtimes: async (req, res) => {
    try {
      const showtimes = await prisma.showtime.findMany({
        include: {
          film: { select: { title: true, genre: true, rating: true } },
          screen: { include: { cinema: true } }
        }
      });

      res.json(showtimes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default ShowtimeController;