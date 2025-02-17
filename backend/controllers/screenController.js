import Screen from '../models/screen.js';
import Cinema from '../models/Cinema.js';

const ScreenController = {
  addScreen: async (req, res) => {
    try {
      const { cinema_id, screen_number, seating_capacity } = req.body;
      const screen = await Screen.create({ cinema_id, screen_number, seating_capacity });

      res.status(201).json({ message: 'Screen added successfully', screen });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateScreen: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await Screen.update(req.body, { where: { screen_id: id } });

      if (!updated[0]) return res.status(404).json({ message: 'Screen not found' });

      res.json({ message: 'Screen updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteScreen: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Screen.destroy({ where: { screen_id: id } });

      if (!deleted) return res.status(404).json({ message: 'Screen not found' });

      res.json({ message: 'Screen deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllScreens: async (req, res) => {
    try {
      const screens = await Screen.findAll({
        include: [{ model: Cinema, attributes: ['city', 'location'] }]
      });

      res.json(screens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default ScreenController;
