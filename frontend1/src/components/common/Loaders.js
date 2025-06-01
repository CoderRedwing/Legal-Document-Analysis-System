import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export const ThreeDotsLoader = () => (
  <div className="flex justify-center">
    <ThreeDots 
      color="#4F46E5"
      height={50}
      width={50}
      ariaLabel="three-dots-loading"
      visible={true}
    />
  </div>
);

export const ContentLoader = () => (
  <div className="space-y-4 animate-pulse">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="flex space-x-2">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);