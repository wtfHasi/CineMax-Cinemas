import Film from '../models/Film.js';

const FilmController = {
  addFilm: async (req, res) => {
    try {
      const { title, description, genre, rating, duration } = req.body;
      const film = await Film.create({ title, description, genre, rating, duration });
      res.status(201).json({ message: 'Film added successfully', film });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateFilm: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedFilm = await Film.update(req.body, { where: { film_id: id } });
      if (!updatedFilm[0]) return res.status(404).json({ message: 'Film not found' });
      res.json({ message: 'Film updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteFilm: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedFilm = await Film.destroy({ where: { film_id: id } });
      if (!deletedFilm) return res.status(404).json({ message: 'Film not found' });
      res.json({ message: 'Film deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllFilms: async (req, res) => {
    try {
      const films = await Film.findAll();
      res.json(films);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default FilmController;
