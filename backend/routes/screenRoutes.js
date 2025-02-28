import express from 'express';
import ScreenController from '../controllers/screenController.js';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addScreen', authMiddleware, roleMiddleware(['Admin','Manager']), ScreenController.addScreen);
router.put('/updateScreen/:id', authMiddleware, roleMiddleware(['Admin','Manager']), ScreenController.updateScreen);
router.delete('/deleteScreen/:id', authMiddleware, roleMiddleware(['Admin','Manager']), ScreenController.deleteScreen);
router.get('/getAllScreens', authMiddleware, roleMiddleware(['Admin','Manager']), ScreenController.getAllScreens);

export default router;