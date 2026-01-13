import { memo } from "react";

const TableLoading = () => {
  return (
    <div>
      <div className="bg-white dark:bg-[#191a1f] rounded-xl mb-6 animate-pulse">
        <div className="p-4">
          <div className="w-full md:w-48 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden dark:bg-[#191a1f] shadow-md">
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-100 dark:border-[#30333c]">
            <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="w-40 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="w-28 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>

          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="grid grid-cols-3 gap-4 p-6 border-b border-gray-100 dark:border-[#30333c] last:border-b-0 items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="w-40 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-36 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>

        <div className="md:hidden flex flex-col gap-4 p-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-[#24262d] rounded-xl p-5 space-y-4 border border-gray-800 animate-pulse"
            >
              <div className="flex justify-between items-center pb-2 border-b border-[#30333c]">
                <div className="w-8 h-4 bg-gray-700 rounded" />
                <div className="w-12 h-4 bg-gray-700 rounded" />
              </div>
              <div className="flex justify-between pt-1">
                <div className="w-20 h-3 bg-gray-700 rounded" />
                <div className="w-32 h-3 bg-gray-700 rounded" />
              </div>
              <div className="flex justify-between">
                <div className="w-20 h-3 bg-gray-700 rounded" />
                <div className="w-24 h-3 bg-gray-700 rounded" />
              </div>
              <div className="flex justify-between">
                <div className="w-20 h-3 bg-gray-700 rounded" />
                <div className="w-28 h-3 bg-gray-700 rounded" />
              </div>
              <div className="flex justify-between pt-2">
                <div className="w-16 h-3 bg-gray-700 rounded" />
                <div className="w-20 h-6 bg-blue-900/30 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center md:justify-end gap-2 p-6 border-t border-gray-100 dark:border-[#30333c]">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="w-10 h-10 bg-orange-200 dark:bg-orange-900/30 rounded-lg animate-pulse" />
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default memo(TableLoading);
