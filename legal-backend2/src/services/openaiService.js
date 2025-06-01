const axios = require('axios');
require('dotenv').config();

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
const MODEL_NAME = 'mistralai/Mixtral-8x7B-Instruct-v0.1';

exports.summarizeDocumentText = async (text) => {
  if (!text || text.trim().length === 0) {
    throw new Error('No text provided for summarization');
  }

  const MAX_CHARS = 3000;
  const documentText = text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) : text;

const prompt = `
You are a professional legal assistant trained to analyze legal documents. 
Respond ONLY in valid JSON format with this structure:

{
  "document_type": "<Type of document, e.g., Legal Contract, NDA, Resume, etc.>",
  "identified_risks": ["<Risk 1>", "..."] or ["None found"],
  "fraud_indicators": ["<Indicator 1>", "..."] or ["None found"],
  "grammatical_issues": ["<Issue 1>", "..."] or ["None found"],
  "plain_english_summary": "<Summary of the document in plain English>"
}

Ensure all fields are filled. If nothing is found, use "None found" or ["None found"] appropriately.
Only respond with a single top-level JSON object with a 'summary' key — no nested summary inside summary.

Analyze the following document:

"""
${documentText}
"""
`;

  try {
    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: MODEL_NAME,
        messages: [
          { role: 'system', content: 'You are a helpful legal assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.4,
        top_p: 0.9
      },
      {
        headers: {
          Authorization: `Bearer ${TOGETHER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const rawReply = response.data?.choices?.[0]?.message?.content?.trim();
    if (!rawReply) throw new Error('No summary returned by the model');

    let parsedJson;
    try {
      parsedJson = JSON.parse(rawReply);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      console.error('Raw reply was:', rawReply);
      throw new Error('Model did not return valid JSON.');
    }

    return parsedJson;

  } catch (err) {
    console.error('Together AI summarization error:', err.response?.data || err.message);
    throw new Error('Document summarization failed. Please check the API key, model, or content format.');
  }
};
