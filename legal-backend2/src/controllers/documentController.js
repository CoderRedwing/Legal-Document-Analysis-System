const fs = require('fs');
const path = require('path');
const Document = require('../models/document.model');
const { extractTextFromFile } = require('../services/textExtractionService');
const { classifyDocumentType, extractHighlights } = require('../services/analysisService');
const { summarizeDocumentText } = require('../services/openaiService');


exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const originalname = req.file.originalname;

    const text = await extractTextFromFile(filePath, originalname);

    const newDocument = new Document({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      text: text
    });

    await newDocument.save();
    res.json({ message: 'Document uploaded successfully', document: newDocument });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.analyzeDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    const type = classifyDocumentType(doc.text);
    const highlights = extractHighlights(doc.text);

    doc.type = type;
    doc.highlights = highlights;
    await doc.save();

    res.json({ type, highlights, text: doc.text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.summarizeDocument = async (req, res) => {
  try {
    
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    const summary = await summarizeDocumentText(doc.text);

    doc.summary = summary;
    await doc.save();

    res.json({ summary });
  } catch (err) {
    console.error('Error summarizing document:', err.message);
    res.status(500).json({ error: 'Failed to summarize document. Please try again later.' });
  }
};

exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const filePath = doc.path;

    if (filePath) {
      try {
        await fs.promises.access(filePath);
        await fs.promises.unlink(filePath);
      } catch (fileErr) {
        if (fileErr.code === 'ENOENT') {
          console.warn(`File not found at path: ${filePath}`);
        } else {
          console.error('Error deleting file:', fileErr.message);
          return res.status(500).json({ error: 'Failed to delete document file' });
        }
      }
    } else {
      console.warn(`File path is undefined for document: ${doc._id}`);
    }

    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: 'Document deleted successfully' });
  } catch (err) {
    console.error('Error deleting document:', err.message);
    res.status(500).json({ error: 'Failed to delete document. Please try again later.' });
  }
};
