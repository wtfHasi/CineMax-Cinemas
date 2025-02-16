import express from 'express';
import BookingController from '../controllers/bookingController.js';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/createBooking', authMiddleware, roleMiddleware(['Booking Staff','Admin','Manager']), BookingController.createBooking);
router.delete('/cancelBooking/:id', authMiddleware, roleMiddleware(['Booking Staff','Admin','Manager']), BookingController.cancelBooking);
router.get('/getAllBookings', authMiddleware, BookingController.getAllBookings);

export default router;