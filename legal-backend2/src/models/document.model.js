// models/Document.js
const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  text: String,
  type: String,
  highlights: Object,
  summary: {
    document_type: { type: String },
    identified_risks: { type: [String], default: ["None found"] },
    fraud_indicators: { type: [String], default: ["None found"] },
    grammatical_issues: { type: [String], default: ["None found"] },
    plain_english_summary: { type: String }
  },
  path: String,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', DocumentSchema);
