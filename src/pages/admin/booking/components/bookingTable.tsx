import { memo, useEffect } from "react";
import { useBooking } from "../service/useBooking";
import TableLoading from "../../../../shared/components/loadings/tableLoading";
import SearchInput from "../../../../shared/components/Search";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../shared/components/pageHeader";
import CustomPagination from "../../../../shared/components/pagination";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import { setPage } from "../../../../shared/components/pagination/store/paginationSlice";

const BookingTable = () => {
  const searchTerm = useSelector((state: RootState) => state.search.userSearch);

  const { page, limit } = useSelector(
    (state: RootState) => state.paginationSlice,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = { 
    page: page, 
    limit: limit 
  };


  const { getAllBookings } = useBooking();
  const { data, isLoading, isFetching } = getAllBookings(params, searchTerm);

  const datas = data?.data?.data || [];
  const total = data?.data?.total ?? 0;
  const pageSize = limit; 
  useEffect(() => {
    if (page !== 1) {
      dispatch(setPage(1));
    }
  }, [searchTerm, dispatch]);

  const statusStyles: Record<string, string> = {
    pending: "bg-amber-500",
    confirmed: "bg-blue-600",
    completed: "bg-green-500",
    cancelled: "bg-red-600",
  };

  const statusPayment: Record<string, string> = {
    pending: "bg-amber-500",
    paid: "bg-green-500",
    failed: "bg-red-600",
  };

  const formatDate = (timestamp: any) => {
    const date = new Date(Number(timestamp));
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  if (isLoading && !data) {
    return <TableLoading />;
  }

  return (
    <div className={isFetching ? "opacity-60 pointer-events-none" : ""}>
      <PageHeader title="Booking" />
      <div className="bg-white py-2 w-full rounded-md shadow-md dark:bg-[#191a1f] mt-12">
        <div className="w-full px-6 mt-6">
          <SearchInput />
        </div>

        {datas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-helpertext text-lg">
              {searchTerm ? "Qidiruv natijasi topilmadi" : "Ma'lumot yo'q"}
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE VIEW */}
            <div className="hidden md:block overflow-x-auto">
              <table className="mt-8 mb-10 w-full">
                <thead className="uppercase text-helpertext border-b border-[#e8e9eb] dark:border-[#30333c]">
                  <tr>
                    <th className="w-[300px] pl-16 pb-3 text-left">
                      user name
                    </th>
                    <th className="w-[300px] pl-16 pb-3 text-left">
                      date of registration
                    </th>
                    <th className="w-[300px] pl-16 pb-3 text-left">
                      booking date
                    </th>
                    <th className="w-[200px] pb-3 text-left">Booking time</th>
                    <th className="w-[200px] pb-3 text-left">Booking status</th>
                    <th className="w-[200px] pb-3 text-left">order Type</th>
                    <th className="w-[200px] pb-3 text-left">payment status</th>
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
                          <p className="text-maintext">
                            {item?.user?.full_name}
                          </p>
                        </div>
                      </td>
                      <td className="text-helpertext pl-16">
                        {formatDate(item?.created_at)}
                      </td>
                      <td className="text-helpertext pl-16">{item?.date}</td>
                      <td className="text-helpertext pl-1">{item?.time}</td>
                      <td className="pl-1 py-3">
                        <span
                          className={`px-3 py-1 text-white rounded-full ${
                            statusStyles[item?.status?.toLowerCase()] ||
                            "bg-gray-400"
                          }`}
                        >
                          {item?.status}
                        </span>
                      </td>
                      <td className="pl-1 py-3">
                        <span
                          className={`inline-block px-3 py-1 text-white rounded-full ${
                            item?.order_type === "online"
                              ? "bg-green-500"
                              : "bg-red-600"
                          }`}
                        >
                          {item?.order_type}
                        </span>
                      </td>
                      <td className="text-helpertext pl-1">
                        <span
                          className={`px-3 py-1 text-white rounded-full ${
                            statusPayment[
                              item?.payment_status?.toLowerCase()
                            ] || "bg-gray-400"
                          }`}
                        >
                          {item?.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="md:hidden flex flex-col gap-4 p-4">
              {datas.map((item: any) => (
                <div
                  onClick={() => navigate(`booking-detail/${item?.id}`)}
                  key={item.id}
                  className="bg-white dark:bg-[#24262d] text-maintext dark:text-white rounded-xl p-5 space-y-3 border border-gray-100 dark:border-gray-800 shadow-sm active:scale-[0.98] transition-transform"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-helpertext uppercase font-bold tracking-wider">
                        User Name
                      </p>
                      <p className="text-[16px] font-bold text-maindark dark:text-white">
                        {item?.user?.full_name}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-[11px] font-bold text-white rounded-full uppercase ${
                        statusStyles[item?.status?.toLowerCase()] ||
                        "bg-gray-400"
                      }`}
                    >
                      {item?.status}
                    </span>
                  </div>

                  <div className="space-y-2 border-t border-gray-100 dark:border-gray-700 pt-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-helpertext dark:text-gray-400 font-medium">
                        Reg. Date:
                      </span>
                      <span className="dark:text-gray-200">
                        {formatDate(item?.created_at)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-helpertext dark:text-gray-400 font-medium">
                        Booking:
                      </span>
                      <span className="font-semibold text-main">
                        {item?.date}{" "}
                        <span className="text-gray-400 ml-1">|</span>{" "}
                        {item?.time}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-helpertext dark:text-gray-400 font-medium">
                        Order Type:
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold text-white uppercase ${
                          item?.order_type === "online"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {item?.order_type}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm pt-1">
                      <span className="text-helpertext dark:text-gray-400 font-medium">
                        Payment:
                      </span>
                      <span
                        className={`px-3 py-0.5 rounded-full text-[11px] font-bold text-white uppercase ${
                          statusPayment[item?.payment_status?.toLowerCase()] ||
                          "bg-gray-400"
                        }`}
                      >
                        {item?.payment_status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-end my-4 pr-6 w-full">
              <CustomPagination
                current={page}
                onChange={(p) => dispatch(setPage(p))}
                pageSize={pageSize}
                total={total}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(BookingTable);