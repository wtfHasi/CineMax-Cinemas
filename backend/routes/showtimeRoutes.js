import express from 'express';
import ShowtimeController from '../controllers/showtimeController.js';

const router = express.Router();

router.post('/addShowtime', ShowtimeController.addShowtime);
router.put('/updateShowtime/:id', ShowtimeController.updateShowtime);
router.delete('/deleteShowtime/:id', ShowtimeController.deleteShowtime);
router.get('/getAllShowtimes', ShowtimeController.getAllShowtimes);

export default router;
