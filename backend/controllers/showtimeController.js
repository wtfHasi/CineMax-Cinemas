import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ShowtimeController = {
  addShowtime: async (req, res) => {
    try {
      const { film_id, screen_id, showtime } = req.body;
      const screen = await prisma.screen.findUnique({ where: { screen_id } });
      if (!screen) return res.status(404).json({ message: 'Screen not found' });
      // Distribute seats
      const lower_hall_seats = Math.floor(screen.seating_capacity * 0.3); // 30% of total seats
      const vip_seats = Math.min(10, Math.floor(screen.seating_capacity * 0.1)); // Max 10 VIP seats
      const upper_gallery_seats = screen.seating_capacity - (lower_hall_seats + vip_seats); // Remaining seats

      let basePrice;
      const hour = new Date(showtime).getHours();

      if (hour >= 8 && hour < 12) basePrice = 5; // Morning Show
      else if (hour >= 12 && hour < 18) basePrice = 6; // Afternoon Show
      else if (hour >= 18 && hour < 24) basePrice = 7; // Evening Show
      else return res.status(400).json({ message: 'Invalid showtime' });

      const newShowtime = await prisma.showtime.create({
        data: {
          film_id,
          screen_id,
          showtime: new Date(showtime),
          lower_hall_seats,
          upper_gallery_seats,
          vip_seats,
          base_price: basePrice
        }
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