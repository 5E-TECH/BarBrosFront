import { memo, type FC } from "react";
import Search from "../../../../shared/components/Search";
import avatar from "../../../../shared/assets/Avatar.png";
import CustomPagination from "../../../../shared/components/pagination";
import type { PaginationProps } from "antd";
import { Plus, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../shared/components/pageHeader";

interface Props {
  data: any[];
  page?: number;
  total?: number;
  pageSize?: number;
  onPageChange?: PaginationProps["onChange"];
}

const UsersTable: FC<Props> = ({
  data,
  page,
  total,
  pageSize,
  onPageChange,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex gap-25 items-center mb-2">
        <PageHeader title="Users" />

        <div className="flex items-center px-6 py-2 rounded-xl bg-white w-[300px] cursor-pointer">
          <div className="w-full">
            <p className="text-helpertext text-[18px] font-medium">Users</p>
            <strong className="text-[24px]">200</strong>
          </div>
          <div className="rounded-2xl bg-[#fff4e6] px-3 py-3">
            <UsersRound size={30} color="#FA8B00" />
          </div>
        </div>

        <div className="flex items-center px-6 py-2 rounded-xl bg-white w-[300px] cursor-pointer">
          <div className="w-full">
            <p className="text-helpertext text-[18px] font-medium">Admins</p>
            <strong className="text-[24px]">25</strong>
          </div>
          <div className="rounded-2xl bg-[#fff4e6] px-3 py-3">
            <UsersRound size={30} color="#FA8B00" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md">
        <div className="w-full px-6 mt-6 flex justify-between gap-10">
          <Search />
          <button
            onClick={() => navigate("add-admin")}
            className="bg-main text-white px-2 py-1 w-[10%] flex justify-center items-center gap-2 rounded-2xl cursor-pointer font-semibold"
          >
            <Plus size={22} />
            Add admin
          </button>
        </div>

        <div className="w-full h-[80%]">
          <table className="mt-8 mb-10 w-full">
            <thead className="uppercase text-helpertext border-b border-[#e8e9eb]">
              <tr>
                <th className="w-[300px] pl-8 pb-3 text-left">Name Surname</th>
                <th className="w-[200px] pb-3 text-left">
                  Ro'yxatdan o'tgan sana
                </th>
                <th className="w-[100px] pb-3 text-left">Phone number</th>
                <th className="w-[100px]"></th>
              </tr>
            </thead>

            <tbody>
              {data.map((item: any) => (
                <tr
                  onClick={() => navigate("user-detail")}
                  key={item.id}
                  className="border-b border-[#e8e9eb] hover:bg-gray-50"
                >

                  <td className="py-3 pl-8 flex items-center gap-4">
                    <img src={avatar} alt="" className="w-10 h-10" />
                    <div>
                      <p className="text-maintext">{item?.full_name}</p>
                      <p className="text-helpertext">{item?.email}</p>
                    </div>
                  </td>

                  <td className="text-helpertext">
                    {(() => {
                      const date = new Date(Number(item?.created_at));
                      const day = String(date.getDate()).padStart(2, "0");
                      const month = String(date.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const year = date.getFullYear();
                      const hours = String(date.getHours()).padStart(2, "0");
                      const minutes = String(date.getMinutes()).padStart(
                        2,
                        "0"
                      );

                      return `${day}-${month}-${year} ${hours}:${minutes}`;
                    })()}
                  </td>

                  <td className="text-maintext">{item?.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end my-4 pr-6 w-full">
            <CustomPagination
              current={page}
              onChange={onPageChange}
              pageSize={pageSize}
              total={total}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(UsersTable);
