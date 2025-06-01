// services/textExtractionService.js
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

exports.extractTextFromFile = async (filePath, originalname) => {
  try {
    if (!filePath || !originalname) {
      throw new Error('Invalid file path or original file name');
    }

    const ext = originalname.split('.').pop().toLowerCase();
    
    if (ext === 'pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      return pdfData.text;
    } else if (ext === 'docx') {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (err) {
    console.error('Error extracting text from file:', err);
    throw new Error(`Text extraction failed: ${err.message}`);
  }
};
