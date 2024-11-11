const express = require('express');
const { uploadFile, downloadFile, getAllFiles } = require('../controllers/fileController');
const router = express.Router();

// File Upload Route
router.post('/upload', uploadFile);

// File Download Route
router.get('/download/:id', downloadFile);

// Get All Files Route
router.get('/myfiles', getAllFiles); // New route for fetching all files

module.exports = router;
