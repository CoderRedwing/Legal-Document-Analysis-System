import React, { useState } from 'react';
import DragDropZone from '../components/common/DragDropZone';
import FeatureGrid from '../components/common/FeatureGrid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const navigate = useNavigate();

  const handleFileUpload = async (file, error) => {
    if (error) {
      setUploadError(error);
      setUploadProgress(0);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post('https://legal-document-analysis-system-g6tz.onrender.com/api/docs/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });
      console.log("response",response);
      if (response.status === 200) {
        navigate(`/documents/${response.data.document._id}`);

      }
    } catch (error) {
      setUploadError(error.response?.data?.message || 'Upload failed');
      setUploadProgress(0);
    }
  };

  return (
    <div className="pt-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Smart Legal Document Analysis
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Upload your legal documents and get instant AI-powered insights
        </p>

        <DragDropZone 
          onDrop={handleFileUpload}
          progress={uploadProgress}
          error={uploadError}
        />

        <FeatureGrid />
      </div>
    </div>
  );
};

export default Home;