import { memo, type FC } from "react";
import avatar from "../../../../../shared/assets/Avatar.png";
import type { PaginationProps } from "antd";
import { useNavigate } from "react-router-dom";
import Search from "../../../../../shared/components/Search";
import { Plus } from "lucide-react";

interface Props {
  data: any[];
  page?: number;
  total?: number;
  pageSize?: number;
  onPageChange?: PaginationProps["onChange"];
}

const AdminTable: FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md dark:bg-[#191a1f]">
        <div className="w-full px-6 mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1 min-w-[280px]">
            <Search />
          </div>
          <button
            onClick={() => navigate("add-admin")}
            className="bg-main text-white px-4 py-3 w-full md:w-auto flex justify-center items-center gap-2 rounded-xl cursor-pointer font-semibold whitespace-nowrap"
          >
            <Plus size={22} />
            Add admin
          </button>
        </div>

        <div className="w-full h-full mt-8">
          <div className="hidden md:block overflow-x-auto">
            <table className="mb-10 w-full">
              <thead className="uppercase text-helpertext border-b border-[#e8e9eb] dark:border-[#30333c]">
                <tr>
                  <th className="w-[300px] pl-8 pb-3 text-left">FullName</th>
                  <th className="w-[200px] pb-3 text-left">
                    Ro'yxatdan o'tgan sana
                  </th>
                  <th className="w-[100px] pb-3 text-left">Phone number</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item: any) => (
                  <tr
                    onClick={() => navigate(`admin-detail/${item.id}`)}
                    key={item.id}
                    className="border-b border-[#e8e9eb] hover:bg-gray-50 cursor-pointer dark:hover:bg-[#1f222b] dark:border-[#30333c]"
                  >
                    <td className="py-3 pl-8 flex items-center gap-4">
                      <img src={avatar} alt="" className="w-10 h-10" />
                      <div>
                        <p className="text-maintext">{item?.full_name}</p>
                        <p className="text-helpertext">{item?.email}</p>
                      </div>
                    </td>
                    <td className="text-helpertext">
                      {formatDate(item?.created_at)}
                    </td>
                    <td className="text-maintext">{item?.phone_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW */}
          <div className="md:hidden flex flex-col gap-4 p-4">
            {data?.map((item: any, index: number) => (
              <div
                key={item.id}
                onClick={() => navigate(`admin-detail/${item.id}`)}
                className="bg-white dark:bg-[#24262d] text-maintext dark:text-white rounded-lg p-4 space-y-3 divide-y divide-gray-100 dark:divide-[#30333c] cursor-pointer border border-gray-100 dark:border-gray-800 shadow-sm transition-colors"
              >
                <div className="flex justify-between items-center pb-2">
                  <span className="text-helpertext dark:text-gray-400 font-bold">
                    #
                  </span>
                  <span className="font-semibold">{index + 1}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-medium">
                    FullName
                  </span>
                  <span className="text-sm font-medium">{item?.full_name}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-medium">
                    Phone
                  </span>
                  <span className="text-sm">{item?.phone_number}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-medium">
                    Created At
                  </span>
                  <span className="text-sm">
                    {formatDate(item?.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateValue: any) => {
  const date = new Date(Number(dateValue));
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export default memo(AdminTable);
