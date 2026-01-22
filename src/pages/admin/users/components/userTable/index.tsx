import { memo, type FC, useEffect } from "react";
import avatar from "../../../../../shared/assets/Avatar.png";
import CustomPagination from "../../../../../shared/components/pagination";
import type { PaginationProps } from "antd";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../../../../shared/components/Search";
import TableLoading from "../../../../../shared/components/loadings/tableLoading";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store";
import { setPage } from "../../../../../shared/components/pagination/store/paginationSlice";

interface Props {
  data: any[];
  page?: number;
  total?: number;
  pageSize?: number;
  onPageChange?: PaginationProps["onChange"];
}

const UserTable: FC<Props> = ({
  data,
  page,
  total,
  pageSize,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.userSearch);

  // Search o'zgarganda page'ni 1 ga qaytarish
  useEffect(() => {
    if (page !== 1) {
      dispatch(setPage(1));
    }
  }, [searchTerm, dispatch]);

  if (!data) {
    return <TableLoading />;
  }

  const formatDate = (timestamp: any) => {
    const date = new Date(Number(timestamp));
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md dark:bg-[#191a1f]">
        <div className="w-full px-6 mt-6">
          <SearchInput />
        </div>

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-helpertext text-lg">
              {searchTerm ? "Qidiruv natijasi topilmadi" : "Ma'lumot yo'q"}
            </p>
          </div>
        ) : (
          <div className="w-full h-full">
            <div className="hidden md:block overflow-x-auto">
              <table className="mt-8 mb-10 w-full">
                <thead className="uppercase text-helpertext border-b border-[#e8e9eb] dark:border-[#30333c]">
                  <tr>
                    <th className="w-[300px] pl-8 pb-3 text-left">FullName</th>
                    <th className="w-[200px] pb-3 text-left">
                      Date of registration
                    </th>
                    <th className="w-[100px] pb-3 text-left">Phone number</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: any) => (
                    <tr
                      onClick={() => navigate(`user-detail/${item.id}`)}
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

            <div className="md:hidden flex flex-col gap-4 p-4">
              {data.map((item: any, index) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`user-detail/${item.id}`)}
                  className="bg-white dark:bg-[#24262d] text-maintext dark:text-white rounded-lg p-4 space-y-3 divide-y divide-gray-100 dark:divide-gray-700 cursor-pointer border border-gray-200 dark:border-gray-800 shadow-sm"
                >
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-helpertext dark:text-gray-400 text-sm font-bold">
                      #
                    </span>
                    <span className="font-semibold text-sm">
                      {page && pageSize
                        ? (page - 1) * pageSize + index + 1
                        : index + 1}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-medium">
                      Fullname
                    </span>
                    <span className="text-sm font-medium">
                      {item?.full_name}
                    </span>
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
        )}
      </div>
    </div>
  );
};

export default memo(UserTable);