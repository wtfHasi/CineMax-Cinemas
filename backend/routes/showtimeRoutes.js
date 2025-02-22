import express from 'express';
import ShowtimeController from '../controllers/showtimeController.js';

const router = express.Router();

router.post('/addShowtime', authMiddleware, roleMiddleware(['Admin','Manager']), ShowtimeController.addShowtime);
router.put('/updateShowtime/:id', authMiddleware, roleMiddleware(['Admin','Manager']), ShowtimeController.updateShowtime);
router.delete('/deleteShowtime/:id', authMiddleware, roleMiddleware(['Admin','Manager']), ShowtimeController.deleteShowtime);
router.get('/getAllShowtimes', ShowtimeController.getAllShowtimes);

export default router;
