import express from 'express';
import FilmController from '../controllers/filmController.js';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addFilm', authMiddleware, roleMiddleware(['Admin','Manager']), FilmController.addFilm);
router.put('/updateFilm/:id', authMiddleware, roleMiddleware(['Admin','Manager']), FilmController.updateFilm);
router.delete('/deleteFilm/:id', authMiddleware, roleMiddleware(['Admin','Manager']), FilmController.deleteFilm);
router.get('/getAllFilms', FilmController.getAllFilms);

export default router;
