import express from 'express';
import multer from 'multer';
import {uploadStudents, getAllStudents} from "../controllers/studentRecords.controller.js";

const router = express.Router();

// Multer setup to handle CSV file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('csv'), uploadStudents);
router.get('/', getAllStudents);

export default router;
