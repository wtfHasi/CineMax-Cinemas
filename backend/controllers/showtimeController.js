import Showtime from '../models/showtime.js';
import Screen from '../models/screen.js';
import Film from '../models/Film.js';

const ShowtimeController = {
    addShowtime: async (req, res) => {
        try {
          const { film_id, screen_id, showtime } = req.body;
    
          // Get screen seating capacity
          const screen = await Screen.findOne({ where: { screen_id } });
          if (!screen) return res.status(404).json({ message: 'Screen not found' });
    
          // Distribute seats
          const lower_hall_seats = Math.floor(screen.seating_capacity * 0.3); //30% of total seats
          const vip_seats = Math.min(10, Math.floor(screen.seating_capacity * 0.1)); // Max 10
          const upper_gallery_seats = screen.seating_capacity - (lower_hall_seats + vip_seats);//rest of the total seats
    
          // Determine base price based on showtime
          let basePrice;
          const hour = new Date(showtime).getHours();
    
          if (hour >= 8 && hour < 12) basePrice = 5; // Morning Show
          else if (hour >= 12 && hour < 18) basePrice = 6; // Afternoon Show
          else if (hour >= 18 && hour < 24) basePrice = 7; // Evening Show
          else return res.status(400).json({ message: 'Invalid showtime' });
    
          const newShowtime = await Showtime.create({ 
            film_id, screen_id, showtime, 
            lower_hall_seats, upper_gallery_seats, vip_seats, 
            base_price: basePrice 
          });
    
          res.status(201).json({ message: 'Showtime added successfully', showtime: newShowtime });
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
        include: [{ model: Film, attributes: ['title', 'genre', 'rating'] }, { model: Screen }]
      });

      res.json(showtimes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default ShowtimeController;