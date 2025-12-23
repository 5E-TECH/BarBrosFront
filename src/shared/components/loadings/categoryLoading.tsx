import { memo } from "react";

const CategoryLoading = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-8">
        <div className="bg-gray-200 w-[200px] h-[45px] rounded-2xl animate-pulse"></div>
        <div className="bg-gray-200 w-[200px] h-[60px] rounded-2xl animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <div key={item} className="bg-gray-200 p-4 rounded-2xl shadow-sm animate-pulse mb-2">
            <div className="flex items-center justify-between">
              <div className="bg-gray-100 rounded-lg"></div>
              <div className="bg-gray-100 w-2.5 h-[34px] rounded-md mb-2"></div>
            </div>

              <div className="flex items-center justify-between">
              <div className="bg-gray-100 w-[100px] h-6 rounded-lg"></div>
              <div className="bg-gray-100 w-[50px] h-[50px] rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(CategoryLoading);
