import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import PropTypes from 'prop-types';

const DragDropZone = ({ onDrop, progress, error }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndHandleFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) validateAndHandleFile(file);
    e.target.value = null;
  };

  const validateAndHandleFile = (file) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    const maxSize = 16 * 1024 * 1024; // 16MB

    if (!validTypes.includes(file.type)) {
      onDrop(null, 'Invalid file type. Please upload PDF, DOCX, or TXT files.');
      return;
    }

    if (file.size > maxSize) {
      onDrop(null, 'File size exceeds 16MB limit');
      return;
    }

    onDrop(file);
  };

  return (
    <div 
      className={`border-4 border-dashed rounded-2xl p-8 mb-12 transition-all 
        ${isDragging ? 'border-purple-500 bg-purple-50' : 
         progress > 0 ? 'border-purple-300 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
      onDrop={handleDrop}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
    >
      {progress > 0 ? (
        <div className="space-y-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-600">Processing... {progress}%</p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <FiUploadCloud className={`w-12 h-12 ${isDragging ? 'text-purple-700' : 'text-purple-600'}`} />
          <p className="text-gray-600">
            Drag & drop your document here or{' '}
            <label className="text-purple-600 cursor-pointer hover:text-purple-700">
              browse files
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileSelect}
                accept=".pdf,.docx,.txt"
              />
            </label>
          </p>
          <p className="text-sm text-gray-500">Supports PDF, DOCX, and TXT files up to 16MB</p>
          {error && (
            <p className="text-red-500 text-sm max-w-xs text-center">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

DragDropZone.propTypes = {
  onDrop: PropTypes.func.isRequired,
  progress: PropTypes.number,
  error: PropTypes.string
};

export default DragDropZone;
