import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ScreenController = {
  addScreen: async (req, res) => {
    try {
      const { cinema_id, screen_number, seating_capacity } = req.body;
      const cinema = await prisma.cinema.findUnique({ where: { cinema_id } });
      if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
      const screen = await prisma.screen.create({
        data: { cinema_id, screen_number, seating_capacity }
      });
      res.status(201).json({ message: 'Screen added successfully', screen });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateScreen: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedScreen = await prisma.screen.update({
        where: { screen_id: Number(id) },
        data: req.body
      });
      res.json({ message: 'Screen updated successfully', updatedScreen });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Screen not found' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  deleteScreen: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.screen.delete({ where: { screen_id: Number(id) } });
      res.json({ message: 'Screen deleted successfully' });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Screen not found' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  getAllScreens: async (req, res) => {
    try {
      const screens = await prisma.screen.findMany({
        include: { cinema: { select: { city: true, location: true } } }
      });
      res.json(screens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default ScreenController;