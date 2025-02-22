import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const CinemaController = {
  addCinema: async (req, res) => {
    try {
      const { city, location, screen_count } = req.body;
      const cinema = await prisma.cinema.create({
        data: {
          city,
          location,
          screen_count
        }
      });
      res.status(201).json({ message: 'Cinema added successfully', cinema });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllCinemas: async (req, res) => {
    try {
      const cinemas = await prisma.cinema.findMany();
      res.json(cinemas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default CinemaController;