import { memo, type FC } from "react";
import { useBooking } from "../service/useBooking";
import TableLoading from "../../../../shared/components/loadings/tableLoading";
import SearchInput from "../../../../shared/components/Search";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../shared/components/pageHeader";
import type { PaginationProps } from "antd";
import CustomPagination from "../../../../shared/components/pagination";

interface Props {
  data: any[];
  page?: number;
  total?: number;
  pageSize?: number;
  onPageChange?: PaginationProps["onChange"];
  onSearch: (searchTerm: string) => void;
}

const BookingTable: FC<Props> = ({
  page = 1,
  total = 0,
  pageSize = 10,
  onPageChange,
}) => {
  const { getAllBookings } = useBooking();
  const { data } = getAllBookings(page, pageSize);
  const datas = data?.data;

  const navigate = useNavigate();

  const statusStyles: Record<string, string> = {
    pending: "bg-amber-500",
    confirmed: "bg-blue-600",
    completed: "bg-green-600",
    cancelled: "bg-red-700",
  };

  const statusPayment: Record<string, string> = {
    pending: "bg-amber-500",
    paid: "bg-green-600",
    faild: "bg-red-700",
  };

  if (!data) {
    return <TableLoading />;
  }

  return (
    <div>
      <PageHeader title="Booking" />
      <div className="bg-white py-2 w-full rounded-md shadow-md dark:bg-[#191a1f] mt-12">
        <div className="w-full px-6 mt-6">
          <SearchInput />
        </div>
        <div className="hidden md:block overflow-x-auto">
          <table className="mt-8 mb-10 w-full">
            <thead className="uppercase text-helpertext border-b border-[#e8e9eb] dark:border-[#30333c]">
              <tr>
                <th className="w-[300px] pl-16 pb-3 text-left">user name</th>
                <th className="w-[300px] pl-16 pb-3 text-left">booking date</th>
                <th className="w-[200px] pb-3 text-left">Booking time</th>
                <th className="w-[200px] pb-3 text-left">Booking status</th>
                <th className="w-[200px] pb-3 text-left">payment status</th>
                <th className="w-[200px] pb-3 text-left">payment Model</th>
                <th className="w-[200px] pb-3 text-left">order Type</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((item: any) => (
                <tr
                  onClick={() => navigate(`booking-detail/${item?.id}`)}
                  key={item.id}
                  className="border-b border-[#e8e9eb] hover:bg-gray-50 cursor-pointer dark:hover:bg-[#1f222b] dark:border-[#30333c]"
                >
                  <td className="py-3 pl-16 flex items-center gap-4">
                    <div>
                      <p className="text-maintext">{item?.user?.full_name}</p>
                    </div>
                  </td>
                  <td className="text-helpertext pl-16">{item?.date}</td>
                  <td className="text-helpertext pl-1">{item?.time}</td>
                  <td className="pl-1 py-3">
                    <span
                      className={`px-3 py-1 text-white rounded-full ${statusStyles[item?.status] || "bg-gray-400"}`}
                    >
                      {item?.status}
                    </span>
                  </td>

                  <td className="text-white pl-1">
                    <span className={`px-3 py-1 rounded-full bg-gray-500`}>
                      {item?.payment_model}
                    </span>
                  </td>
                  <td className="text-helpertext pl-1">
                    <span
                      className={`px-3 py-1 text-white rounded-full ${statusPayment[item?.payment_status] || "bg-gray-400"}`}
                    >
                      {item?.payment_status}
                    </span>
                  </td>
                  <td className="pl-1 py-3">
                    <span
                      className={`inline-block px-3 py-1 text-white rounded-full ${item?.order_type === "online" ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {item?.order_type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="md:hidden flex flex-col gap-4 p-4">
          {datas.map((item: any, index: number) => (
            <div
              onClick={() => navigate(`booking-detail/${item?.id}`)}
              key={item.id}
              className="bg-white dark:bg-[#24262d] text-maintext dark:text-white rounded-xl p-5 space-y-4 border border-gray-100 dark:border-gray-800 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold text-sm">
                  #{index + 1}
                </span>

                <span
                  className={`px-3 py-1 text-xs text-white rounded-full
            ${statusStyles[item?.status] || "bg-gray-400"}
          `}
                >
                  {item?.status}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-semibold">
                  Date
                </span>
                <span className="text-sm">{item?.date}</span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-semibold">
                  Time
                </span>
                <span className="text-sm font-medium">{item?.time}</span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-semibold">
                  Payment
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
            ${
              item?.payment_model === "card"
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            }
          `}
                >
                  {item?.payment_model}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-semibold">
                  Order Type
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs text-white
            ${item?.order_type === "online" ? "bg-green-500" : "bg-red-500"}
          `}
                >
                  {item?.order_type}
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
    </div>
  );
};

export default memo(BookingTable);
