// services/analysisService.js
const nlp = require('compromise');
const nlpDates = require('compromise-dates');
const nlpNumbers = require('compromise-numbers');

nlp.extend(nlpDates);
nlp.extend(nlpNumbers);

function classifyDocumentType (text) {
  const lowerText = text.toLowerCase();

  const documentTypeKeywords = {
    'Insurance Document': ['insurance policy', 'premium', 'coverage', 'insured'],
    'Legal Document': [
      'agreement', 'plaintiff', 'defendant', 'settlement', 'clause', 'court', 'jurisdiction',
      'indemnity', 'arbitration', 'confidentiality', 'liability', 'breach', 'tort', 'law',
      'litigation', 'injunction', 'statute', 'non-compete', 'non-disclosure', 'memorandum of understanding',
      'terms and conditions', 'warrant', 'power of attorney', 'contract', 'terms', 'license', 'patent',
      'provision', 'mandate', 'consent', 'deed', 'dispute', 'court ruling', 'witness', 'claim',
      'lawsuit', 'jurisprudence', 'remedy', 'compensation', 'order', 'subpoena', 'settlement offer',
      'damages'
    ],
    'Employment Document': ['employment', 'salary', 'designation', 'termination', 'employee'],
    'Bond Document': ['bond', 'investment', 'debenture', 'yield'],
    'Financial Document': ['balance sheet', 'profit', 'loss', 'invoice', 'amount', 'due']
  };

  for (const [type, keywords] of Object.entries(documentTypeKeywords)) {
    if (keywords.some((keyword) => lowerText.includes(keyword))) {
      return type;
    }
  }

  return 'General Document';
};


function extractHighlights(text) {
  const doc = nlp(text);

  // --- People ---
  const people = [...new Set(
    doc.people().out('array')
      .map(p => p.replace(/^Adv\.?|Ms\.?|Mr\.?/i, '').replace(/[,\.]$/, '').trim())
      .filter(p => p.length > 2 && !['adv', 'mr', 'ms'].includes(p.toLowerCase()))
  )];

  // --- Organizations ---
  const organizations = [...new Set(
    doc.organizations().out('array')
      .map(o => o.replace(/[,\.]$/, '').trim())
      .filter(o => /^[A-Za-z\s&]+$/.test(o) && o.length > 3)
  )];

  // --- Dates ---
  const rawDates = doc.dates().out('array');
  const dates = [...new Set(
    rawDates.filter(d => isNaN(d) && d.length > 5)
  )];

  // --- Monetary Values ---
  const money = [...new Set(
    doc.money().out('array')
      .filter(m => /^\₹?\$?\d+([,.\d]*)?$/.test(m))
  )];

  // --- Phone Numbers ---
  const phoneNumbers = [...new Set(
    text.match(/\b\d{10,}\b/g) || []
  )];

  // --- Emails ---
  const emails = [...new Set(
    text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/gi) || []
  )];

  // --- Addresses ---
  const addresses = [...new Set(
    text.match(/\d{1,5}\s[\w\s]+(?:Street|St|Avenue|Ave|Road|Rd|Lane|Ln|Boulevard|Blvd|Nagar|Marg|Colony|Block|Sector)/gi) || []
  )];

  // --- Risk Clauses ---
  const riskKeywords = ['fraud', 'risk', 'penalty', 'criminal', 'liable', 'punishment', 'breach'];
  const riskClauses = riskKeywords.flatMap(phrase => {
    const regex = new RegExp(`.{0,50}${phrase}.{0,50}`, 'gi');
    return text.match(regex) || [];
  });

  // --- Extracted Clauses ---
  const clauseTypes = ['indemnity', 'confidentiality', 'liability', 'termination', 'arbitration', 'force majeure', 'governing law', 'warranty', 'breach'];

  const extractedClauses = {};
  clauseTypes.forEach(type => {
    const regex = new RegExp(`\\b${type}\\b[\\s\\S]{0,300}`, 'gi');
    extractedClauses[type] = text.match(regex) || [];
  });

  return {
    people,
    organizations,
    dates,
    monetaryValues: money,
    emails,
    phoneNumbers,
    addresses,
    riskClauses,
    extractedClauses,
  };
}

module.exports = { extractHighlights, classifyDocumentType };
