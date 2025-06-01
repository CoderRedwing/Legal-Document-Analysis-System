import React from 'react';
import { FiUploadCloud, FiSettings, FiCheckCircle } from 'react-icons/fi';

export default function DocumentTimeline({ document }) {
  const timeline = [
    {
      title: 'Document Uploaded',
      date: document.uploadedAt,
      icon: <FiUploadCloud className="w-4 h-4" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Processing Started',
      date: document.uploadedAt, // Should be replaced with actual processing date from API
      icon: <FiSettings className="w-4 h-4" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Analysis Completed',
      date: document.uploadedAt, // Should be replaced with actual completion date from API
      icon: <FiCheckCircle className="w-4 h-4" />,
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Processing Timeline</h3>
      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div key={index} className="flex items-start">
            <div className={`w-8 h-8 rounded-full ${item.color} text-white flex items-center justify-center mr-4`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-gray-500">
                {new Date(item.date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}