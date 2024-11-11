const multer = require('multer');
const path = require('path');
const uuid = require('uuid');
const pool = require('../config');

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = uuid.v4() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
}).single('file');

// Upload File
const uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: 'File upload failed', error: err });
    }
    const fileName = req.file.filename;
    const originalName = req.file.originalname;
    try {
      await pool.query('INSERT INTO files (original_name, file_name) VALUES (?, ?)', [originalName, fileName]);
      res.status(201).send({ message: 'File uploaded successfully', fileId: fileName });
    } catch (err) {
      res.status(500).send({ message: 'Database error', error: err });
    }
  });
};

// Download File
const downloadFile = async (req, res) => {
  const fileId = req.params.id;
  console.log(`Received download request for file ID: ${fileId}`);
  try {
    const [result] = await pool.query('SELECT file_name FROM files WHERE file_name = ?', [fileId]);
    if (!result.length) {
      return res.status(404).send({ message: 'File not found' });
    }
    
    const fileName = result[0].file_name;
    console.log(`Downloading file: ${fileName}`);
    const filePath = path.join(__dirname, '../uploads', fileName);
    
    console.log(`File path for download: ${filePath}`);
    
    // Check if file exists before sending
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err); // Log any error
        res.status(err.status).send({ message: 'Error downloading file', error: err });
      } else {
        console.log('File sent successfully');
      }
    });
  } catch (err) {
    console.error('Error retrieving file:', err);
    res.status(500).send({ message: 'Error retrieving file', error: err });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM files'); // Adjust this query based on your DB schema
    res.status(200).send(results);
  } catch (err) {
    console.error('Error retrieving files:', err);
    res.status(500).send({ message: 'Error retrieving files', error: err });
  }
};


module.exports = { uploadFile, downloadFile,getAllFiles };
