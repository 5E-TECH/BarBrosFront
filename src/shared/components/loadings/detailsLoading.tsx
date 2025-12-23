import { memo } from "react";

const DetailsLoading = () => {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 bg-gray-200 rounded" />
        <div className="w-48 h-6 bg-gray-200 rounded" />
      </div>

      <div className="flex justify-between w-full gap-12 bg-white px-10 py-9 rounded-2xl">
        <div className="w-[15%] flex flex-col items-center gap-3">
          <div className="w-[100px] h-[100px] bg-gray-200 rounded-full" />
          <div className="w-20 h-6 bg-gray-200 rounded-full" />
          <div className="w-24 h-4 bg-gray-200 rounded" />
        </div>

        <div className="w-[85%] flex flex-col gap-8 mt-8">
          <div className="flex gap-8">
            <div className="w-full">
              <div className="w-24 h-4 bg-gray-200 rounded mb-2" />
              <div className="h-12 bg-gray-200 rounded-xl" />
            </div>
            <div className="w-full">
              <div className="w-32 h-4 bg-gray-200 rounded mb-2" />
              <div className="h-12 bg-gray-200 rounded-xl" />
            </div>
          </div>

          <div className="flex gap-8">
            <div className="w-full">
              <div className="w-28 h-4 bg-gray-200 rounded mb-2" />
              <div className="h-12 bg-gray-200 rounded-xl" />
            </div>
            <div className="w-full">
              <div className="w-24 h-4 bg-gray-200 rounded mb-2" />
              <div className="h-12 bg-gray-200 rounded-xl" />
            </div>
          </div>

          <div className="flex justify-end mt-6 px-8">
            <div className="w-32 h-12 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailsLoading);
