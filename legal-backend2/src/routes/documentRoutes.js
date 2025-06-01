const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  uploadDocument,
  analyzeDocument,
  summarizeDocument,
  getAllDocuments,
  deleteDocument
} = require('../controllers/documentController');


router.post('/upload', upload.single('file'), uploadDocument);


router.get('/analyze/:id', analyzeDocument);


router.get('/summary/:id', summarizeDocument);

router.delete('/delete/:id', deleteDocument);
router.get('/history', getAllDocuments);


module.exports = router;
