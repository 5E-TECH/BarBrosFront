import { memo } from "react";

const CategoryLoading = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="bg-gray-200 dark:bg-gray-700 w-full md:w-[200px] h-[45px] rounded-2xl animate-pulse"></div>
        <div className="bg-gray-200 dark:bg-gray-700 w-full md:w-[200px] h-[55px] md:h-[60px] rounded-2xl animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <div
            key={item}
            className="bg-white dark:bg-[#191a1f] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="bg-gray-200 dark:bg-gray-700 w-[120px] h-6 rounded-lg"></div>
              <div className="bg-gray-200 dark:bg-gray-700 w-2.5 h-[30px] rounded-md"></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="bg-gray-200 dark:bg-gray-700 w-20 h-5 rounded-lg"></div>
              <div className="bg-gray-200 dark:bg-gray-700 w-[50px] h-[50px] rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(CategoryLoading);
