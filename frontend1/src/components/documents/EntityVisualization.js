import React from 'react';

export default function EntityVisualization({ entities }) {
  return (
   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(entities).map(([type, values]) => {
          // Ensure we're working with an array and filter out empty values
          const items = Array.isArray(values) ? values.filter(Boolean) : [];
          
          if (items.length === 0) return null;

          return (
            <div key={type} className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-medium text-indigo-700 capitalize">
                {type.replace(/([A-Z])/g, ' $1').trim()} ({items.length})
              </h4>
              <ul className="mt-2 space-y-1">
                {items.slice(0, 5).map((value, index) => (
                  <li 
                    key={`${type}-${index}`} 
                    className="text-indigo-600 truncate"
                    title={value}
                  >
                    {value}
                  </li>
                ))}
                {items.length > 5 && (
                  <li className="text-indigo-400 text-sm">
                    + {items.length - 5} more...
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>

  );
}