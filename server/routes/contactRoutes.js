import express from 'express';
import {
  createContactMessage,
  getContactMessages
} from '../controllers/contactController.js';

const router = express.Router();

router.get('/', getContactMessages);
router.post('/', createContactMessage);

export default router;
