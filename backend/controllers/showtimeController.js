import Showtime from '../models/showtime.js';
import Screen from '../models/screen.js';
import Film from '../models/Film.js';

const ShowtimeController = {
  addShowtime: async (req, res) => {
    try {
      const { film_id, screen_id, showtime, seating_type } = req.body;

      // Set pricing based on showtime & seating type
      let basePrice;
      const hour = new Date(showtime).getHours();

      if (hour >= 8 && hour < 12) basePrice = 5; // Morning Show
      else if (hour >= 12 && hour < 18) basePrice = 6; // Afternoon Show
      else if (hour >= 18 && hour < 24) basePrice = 7; // Evening Show
      else return res.status(400).json({ message: 'Invalid showtime' });

      if (seating_type === 'Upper Gallery') basePrice *= 1.2;
      else if (seating_type === 'VIP') basePrice *= 1.44;

      const showtimeEntry = await Showtime.create({ film_id, screen_id, showtime, seating_type, price: basePrice });

      res.status(201).json({ message: 'Showtime added successfully', showtime: showtimeEntry });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateShowtime: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await Showtime.update(req.body, { where: { showtime_id: id } });

      if (!updated[0]) return res.status(404).json({ message: 'Showtime not found' });

      res.json({ message: 'Showtime updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteShowtime: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Showtime.destroy({ where: { showtime_id: id } });

      if (!deleted) return res.status(404).json({ message: 'Showtime not found' });

      res.json({ message: 'Showtime deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllShowtimes: async (req, res) => {
    try {
      const showtimes = await Showtime.findAll({
        include: [
          { model: Film, attributes: ['title', 'genre', 'rating'] },
          { model: Screen, attributes: ['screen_number', 'seating_capacity'] }
        ]
      });

      res.json(showtimes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default ShowtimeController;
