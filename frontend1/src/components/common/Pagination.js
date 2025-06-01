import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

  return (
    <div className="flex justify-center mt-8 space-x-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed 
          bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
      >
        Previous
      </button>
      
      <span className="flex items-center px-4">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed
          bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
      >
        Next
      </button>
    </div>
  );
}