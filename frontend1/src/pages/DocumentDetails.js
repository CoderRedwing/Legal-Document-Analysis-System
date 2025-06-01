
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiTrash2, FiFileText, FiAlertTriangle } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';
import { fetchDocumentAnalysis, fetchDocumentSummary, deleteDocument } from '../services/Api';
import AnalysisSection from '../components/common/AnalysisSection';
import RiskChart from '../components/documents/RiskChart';
import EntityVisualization from '../components/documents/EntityVisualization';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          <h3>Component Error:</h3>
          <pre>{this.state.error.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function DocumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadDocument = async () => {
      try {
        const [summaryRes, analysisRes] = await Promise.all([
          fetchDocumentSummary(id),
          fetchDocumentAnalysis(id)
        ]);

        const docSummary = summaryRes?.data?.summary;
        const analysisData = analysisRes?.data;

        const docData = {
          id,
          filename: analysisData?.originalname || 'Document',
          upload_date: analysisData?.uploadedAt || new Date(),
          text: analysisData?.text || '',
          analysis: {
            summary: docSummary?.document_type || 'No document type available',
            risks: docSummary?.identified_risks || [],
            grammaticalIssues: docSummary?.grammatical_issues || [],
            fraudIndicators: docSummary?.fraud_indicators || [],
            plainEnglishSummary: docSummary?.plain_english_summary || ''
          },
          entities: {
              organizations: analysisData?.highlights?.organizations || [],
              dates: analysisData?.highlights?.dates || []
          },
        };

        setDocument(docData);
      } catch (error) {
        console.error('Document load error:', error);
        navigate('/documents');
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [id, navigate]);

  const handleDeleteDocument = async () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(id);
        navigate('/documents');
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="pt-24 flex justify-center">
        <ThreeDots color="#4F46E5" height={50} width={50} />
      </div>
    );
  }

  if (!document) {
    return (
      <div className="pt-24 text-center text-red-500">
        Document not found or failed to load
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{document.filename}</h1>
            <p className="text-gray-500 mt-2">
              Uploaded: {new Date(document.upload_date).toLocaleDateString()}
            </p>
          </div>
          <button
            className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 flex items-center"
            onClick={handleDeleteDocument}
            aria-label="Delete document"
          >
            <FiTrash2 className="mr-2" /> Delete Document
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <AnalysisSection
            title="Document Type"
            icon={<FiFileText />}
            content={document.analysis.summary}
          />

          <ErrorBoundary>
            <AnalysisSection
              title="Identified Risks"
              icon={<FiAlertTriangle />}
              content={
                document.analysis.risks.length > 0 ? (
                  <RiskChart risks={document.analysis.risks} />
                ) : 'No risks identified'
              }
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <AnalysisSection
              title="Grammatical Issues"
              icon={<FiFileText />}
              content={
                document.analysis.grammaticalIssues.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {document.analysis.grammaticalIssues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                ) : 'No grammatical issues found'
              }
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <AnalysisSection
              title="Fraud Indicators"
              icon={<FiAlertTriangle />}
              content={
                document.analysis.fraudIndicators.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {document.analysis.fraudIndicators.map((indicator, index) => (
                      <li key={index}>{indicator}</li>
                    ))}
                  </ul>
                ) : 'No fraud indicators detected'
              }
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <AnalysisSection
              title="Plain-English Summary"
              icon={<FiFileText />}
              content={document.analysis.plainEnglishSummary || 'No plain-English summary available'}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <AnalysisSection
              title="Entity & Clause"
              icon={<FiFileText />}
              content={
                document.entities && Object.keys(document.entities).length > 0 ? (
                  <EntityVisualization entities={document.entities} />
                ) : 'No entities available'
              }
            />
          </ErrorBoundary>

          <div className="bg-white rounded-xl p-6 shadow-sm md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Full Text</h3>
            <div className="prose max-h-96 overflow-y-auto whitespace-pre-wrap">
              {document.text ? (
                <pre className="whitespace-pre-wrap">{document.text}</pre>
              ) : (
                <div className="text-gray-400 text-sm">
                  <p>Text content not available</p>
                  <ul className="list-disc pl-4 mt-2">
                    <li>Document might still be processing</li>
                    <li>Text extraction might have failed</li>
                    <li>Unsupported file format</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

