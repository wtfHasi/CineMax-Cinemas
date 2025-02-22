import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const FilmController = {
  addFilm: async (req, res) => {
    try {
      const { title, description, genre, rating, duration } = req.body;
      const film = await prisma.film.create({
        data: { title, description, genre, rating, duration }
      });

      res.status(201).json({ message: 'Film added successfully', film });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateFilm: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedFilm = await prisma.film.update({
        where: { film_id: Number(id) },
        data: req.body
      });

      res.json({ message: 'Film updated successfully', updatedFilm });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteFilm: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.film.delete({ where: { film_id: Number(id) } });

      res.json({ message: 'Film deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllFilms: async (req, res) => {
    try {
      const films = await prisma.film.findMany();
      res.json(films);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default FilmController;