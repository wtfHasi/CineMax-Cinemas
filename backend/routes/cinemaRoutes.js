import express from 'express';
import CinemaController from '../controllers/cinemaController.js';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addCinema', authMiddleware, roleMiddleware(['Manager']), CinemaController.addCinema);
router.get('/getAllCinemas', CinemaController.getAllCinemas);

export default router;
