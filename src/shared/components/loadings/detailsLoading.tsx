import { memo } from "react";

const DetailsLoading = () => {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="flex items-center gap-2 mb-2 md:mb-6">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="w-40 md:w-48 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      <div className="flex flex-col lg:flex-row justify-between w-full gap-8 lg:gap-12 bg-white dark:bg-[#191a1f] px-6 md:px-10 py-9 rounded-2xl shadow-sm">
        <div className="w-full lg:w-[15%] flex flex-col items-center gap-4 border-b lg:border-b-0 pb-6 lg:pb-0">
          <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>

        <div className="w-full lg:w-[85%] flex flex-col gap-6 md:gap-8 mt-4 lg:mt-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full">
              <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2.5" />
              <div className="h-[50px] bg-gray-100 dark:bg-[#1f222b] rounded-xl border border-gray-100 dark:border-gray-800" />
            </div>
            <div className="w-full">
              <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2.5" />
              <div className="h-[50px] bg-gray-100 dark:bg-[#1f222b] rounded-xl border border-gray-100 dark:border-gray-800" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-end gap-6 md:gap-8">
            <div className="w-full md:w-[65%]">
              <div className="w-28 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2.5" />
              <div className="h-[50px] bg-gray-100 dark:bg-[#1f222b] rounded-xl border border-gray-100 dark:border-gray-800" />
            </div>
            <div className="w-full md:w-auto flex justify-end">
              <div className="w-full md:w-32 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailsLoading);
