import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { FiFileText, FiChevronRight } from 'react-icons/fi';

export default function DocumentCard({ document }) {
  const springs = useSpring({
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 }
  });

  const risks = document?.analysis?.risks ?? [];

  return (
    <animated.div style={springs}>
      <Link 
        to={`/documents/${document._id}`}
        className="bg-white group block rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold truncate">{document.originalname}</h3>
            <p className="text-sm text-gray-500">
              {new Date(document.uploadedAt).toLocaleDateString()}
            </p>
          </div>
          <FiChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
            <FiFileText className="mr-2" />
            {document.filename.split('.').pop().toUpperCase()}
          </span>
          <div className="flex space-x-2">
            {risks.slice(0, 2).map((risk, i) => (
              <span 
                key={i}
                className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs"
              >
                {risk?.split(':')[0] ?? 'Unknown Risk'}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </animated.div>
  );
}