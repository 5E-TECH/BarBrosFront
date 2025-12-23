import { memo, type FC } from "react";
import avatar from "../../../../../shared/assets/Avatar.png";
import CustomPagination from "../../../../../shared/components/pagination";
import type { PaginationProps } from "antd";
import { useNavigate } from "react-router-dom";
import Search from "../../../../../shared/components/Search";
import TableLoading from "../../../../../shared/components/loadings/tableLoading";
// import { debounce } from "../../../../../shared/helper/debounceFunc";

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
  // const [search, setSearch] = useState<any>(null)
  const navigate = useNavigate();

  // const debounceSearch = useMemo(
  //   () =>
  //     debounce((value: string) => {
  //       setSearch(value);
  //     }, 800),
  //   []
  // );


  if(!data) {
    return <TableLoading/>
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md">
        <div className="w-full px-6 mt-6 flex justify-between gap-10">
          <Search />
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
                  onClick={() => navigate(`user-detail/${item.id}`)}
                  key={item.id}
                  className="border-b border-[#e8e9eb] hover:bg-gray-50 cursor-pointer"
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

export default memo(UserTable);
