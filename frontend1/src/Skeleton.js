export const DocumentListSkeleton = () => (
    <div className="space-y-4 animate-pulse pt-24 px-4 max-w-7xl mx-auto">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-48"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-6"></div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="flex space-x-2">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );