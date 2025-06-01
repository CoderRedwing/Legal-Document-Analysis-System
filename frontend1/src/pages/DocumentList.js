

import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import DocumentCard from '../components/documents/DocumentCard';
import { fetchDocuments } from '../services/Api.js';

export default function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response = await fetchDocuments();
        setDocuments(response.data || []);
      } catch (error) {
        console.error('Error loading documents:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDocuments();
  }, []);

 return (
  <div className="pt-24 px-4 max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-900 mb-8">
      {documents && documents.length > 0 ? 'Your Documents' : 'No Documents'}
    </h2>

    {loading ? (
      <div className="flex justify-center">
        <ThreeDots color="#4F46E5" height={50} width={50} />
      </div>
    ) : (
      documents && documents.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <DocumentCard key={doc._id} document={doc} />
          ))}
        </div>
      )
    )}
  </div>
);
}