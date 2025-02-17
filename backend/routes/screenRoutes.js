import express from 'express';
import ScreenController from '../controllers/screenController.js';

const router = express.Router();

router.post('/addScreen', ScreenController.addScreen);
router.put('/updateScreen/:id', ScreenController.updateScreen);
router.delete('/deleteScreen/:id', ScreenController.deleteScreen);
router.get('/getAllScreens', ScreenController.getAllScreens);

export default router;