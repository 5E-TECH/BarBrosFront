import { memo, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { useCategory } from "../service/useCategory";
import { BASE_ASSETS_URL } from "../../../../shared/const";
import CategoryLoading from "../../../../shared/components/loadings/categoryLoading";


const ManCategoryBox = () => {

  const [openId, setOpenId] = useState<number | null>(null);

  const { getCategoryMan, deleteCategory } = useCategory();
  const datas = getCategoryMan?.data?.data || [];

  datas.forEach((element: any) => {
    let imgUrl = element.img;

    if (!/^https?:\/\//.test(imgUrl)) {
      imgUrl = `${BASE_ASSETS_URL}${
        imgUrl.startsWith("/") ? "" : "/"
      }${imgUrl}`;
    }

    element.img = imgUrl;
  });

  if (getCategoryMan.isLoading) {
    return <CategoryLoading />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {datas.length > 0 &&
          datas.map((data: any) => (
            <div
              key={data.id}
              className="gap-4 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="relative">
                <div
                  onClick={() => setOpenId(openId === data.id ? null : data.id)}
                  className="flex justify-end mb-2 cursor-pointer"
                >
                  <EllipsisVertical size={20} />
                </div>

                {openId === data.id && (
                  <div className="absolute right-0 top-6 z-20 w-32 font-medium bg-white border border-gray-100 rounded-lg shadow-md">
                    <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer">
                      Edit
                    </button>

                    <button onClick={() => deleteCategory.mutate({id: data.id})} className="w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-red-50 cursor-pointer">
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-gl font-bold text-maintext truncate">
                  {data.name}
                </h3>
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden shrink-0">
                  {data.img ? (
                    <img
                      src={data.img}
                      alt={data.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-helpertext">No Image</span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(ManCategoryBox);
