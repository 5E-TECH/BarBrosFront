import { memo } from 'react';

const TableLoading = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl mb-4 animate-pulse">
        <div className="p-4">
          <div className="w-48 h-10 bg-gray-200 rounded-lg" />
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden">
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-100">
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-28 h-4 bg-gray-200 rounded animate-pulse" />
        </div>

        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div 
            key={item} 
            className="grid grid-cols-3 gap-4 p-4 border-b border-gray-100 last:border-b-0 items-center"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />

            <div className="w-36 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}

        <div className="flex justify-end gap-2 p-4 border-t border-gray-100">
          <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="w-10 h-10 bg-orange-200 rounded-lg animate-pulse" />
          <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default memo(TableLoading)